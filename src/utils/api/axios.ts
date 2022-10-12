import axios, { AxiosInstance } from 'axios';
import { JwtIntercept } from '@src/utils/api/interceptors/jwt.interceptor';
import { ErrorIntercept } from '@src/utils/api/interceptors/error.interceptor';
import { logger } from '@src/utils/logger';

logger.log('base url: ', process.env.GATSBY_API_SERVER_URL);

const appConfig = {
  API_URL: process.env.GATSBY_API_SERVER_URL,
  API_TIMEOUT: 20000,
};

const axiosInstance = axios.create({
  baseURL: appConfig.API_URL,
  timeout: appConfig.API_TIMEOUT,
  headers: {
    'Content-type': 'application/json',
  },
});

const registerInterceptors = (axiosInst: AxiosInstance) => {
  JwtIntercept(axiosInst.interceptors.request);
  ErrorIntercept(axiosInst.interceptors.response);
};

registerInterceptors(axiosInstance);

export default axiosInstance;
