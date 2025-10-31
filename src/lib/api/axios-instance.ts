import axios, { AxiosError } from 'axios';

const API_BASE_URL = 'https://fe-hometask-api.qa.vault.tryvault.com';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      console.log('API Error', error.response.status, error.response.data);
    } else if (error.request) {
      console.log('Network Error', error.message);
    } else {
      console.log('Error', error.message);
    }
    return Promise.reject(error);
  },
);
