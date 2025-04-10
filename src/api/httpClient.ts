import axios from 'axios';
import {env} from '../env';
import {storageService} from '../services/storage/storageService';

export const api = axios.create({
  baseURL: `${env.API_URL}/api/v1/`,
  timeout: 5000,
});

api.interceptors.request.use(config => {
  const token = storageService.getItem<string>('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status;

    if (status === 401) {
      console.warn('Invalid token.');
    }
    return Promise.reject(error);
  },
);
