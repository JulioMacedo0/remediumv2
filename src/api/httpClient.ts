import axios, {AxiosError, AxiosRequestConfig} from 'axios';
import {env} from '../env';
import {storageService} from '../services/storage/storageService';
import {showToastError} from '../services/toast/toastService';
import {STORAGE_KEYS} from '../services/storage/storegesKeys';
import {logService} from '../services/log/logService';
import {useAuthStore} from '../stores/auth/authStore';
const logger = logService.scope('HttpClient');

export const api = axios.create({
  baseURL: `${env.API_URL}/api/v1/`,
  timeout: 5000,
  //  withCredentials: true,
});

const refreshApi = axios.create({
  baseURL: `${env.API_URL}/api/v1/`,
  timeout: 5000,
  // withCredentials: true,
});

let isRefreshing = false;
let failedRequestsQueue: {
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
  config: AxiosRequestConfig;
}[] = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  logger.debug(
    `Processing queue: ${failedRequestsQueue.length} requests`,
    undefined,
    {
      hasError: !!error,
      hasToken: !!token,
    },
  );

  failedRequestsQueue.forEach(request => {
    if (error) {
      request.reject(error);
    } else if (token) {
      request.config.headers = request.config.headers || {};
      request.config.headers.Authorization = `Bearer ${token}`;
      request.resolve(api(request.config));
    }
  });

  failedRequestsQueue = [];
};

const handleAuthFailure = () => {
  useAuthStore.getState().logout();
  showToastError('Sessão expirada. Por favor entre loge novamente.');
};

api.interceptors.request.use(config => {
  const token = storageService.getItem(STORAGE_KEYS.TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    logger.verbose(`Request to ${config.url} with token`);
  } else {
    logger.verbose(`Request to ${config.url} without token`);
  }
  return config;
});

api.interceptors.response.use(
  response => {
    logger.verbose(
      `Response from ${response.config.url} - Status: ${response.status}`,
    );
    return response;
  },
  async (error: AxiosError) => {
    if (!error.response) {
      logger.error('Network error', undefined, error);
      showToastError('Connection error. Check your internet connection.');
      return Promise.reject(error);
    }

    const status = error.response.status;
    const originalRequest = error.config;

    logger.verbose(`Error ${status} from ${originalRequest?.url}`);

    if (status !== 401 || !originalRequest) {
      const message = error.response?.data?.message || 'Unexpected error';
      showToastError(message);
      return Promise.reject(error);
    }

    try {
      if (!isRefreshing) {
        logger.debug('Token expired, attempting refresh');
        isRefreshing = true;

        const response = await refreshApi.post<{
          accessToken: string;
          refreshToken: string;
          user: any;
        }>('auth/refresh');

        if (response.data) {
          const {accessToken, refreshToken, user} = response.data;
          logger.debug('Token refresh successful');
          storageService.setItem(STORAGE_KEYS.TOKEN, accessToken);
          storageService.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
          storageService.setItem(STORAGE_KEYS.USER, user);

          processQueue(null, accessToken);

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axios(originalRequest);
        }
      }

      logger.debug('Adding request to queue while refreshing token');
      return new Promise((resolve, reject) => {
        failedRequestsQueue.push({
          resolve,
          reject,
          config: originalRequest,
        });
      });
    } catch (refreshError) {
      logger.error('Token refresh failed', undefined, refreshError);
      processQueue(new Error('Token refresh failed'));

      handleAuthFailure();

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);
