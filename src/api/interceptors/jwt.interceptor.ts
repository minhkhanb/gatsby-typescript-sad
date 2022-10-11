import { AxiosInterceptorManager, AxiosRequestConfig } from 'axios';
import storage from '@src/api/storage';

export const JwtIntercept = (request: AxiosInterceptorManager<AxiosRequestConfig>): void => {
  request.use((config) => {
    const token = storage.loadData('token');

    if (token) {
      return {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        },
      };
    }

    return config;
  });
};
