import axios from 'axios';
import {env} from '../env';
import {storageService} from '../services/storage/storageService';
import {showToastError} from '../services/toast/toastService';

export const api = axios.create({
  baseURL: `${env.API_URL}/api/v1/`,
  timeout: 5000,
});

api.interceptors.request.use(config => {
  const token = storageService.getItem('TOKEN');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status;
    const message = error.response?.data?.message || 'Erro inesperado';
    showToastError(message);
    if (status === 401) {
      console.warn('Invalid token.');
    }
    return Promise.reject(error);
  },
);
