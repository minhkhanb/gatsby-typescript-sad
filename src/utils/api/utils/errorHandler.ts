import { logger } from '@src/utils/logger';

export const handleApiError = (url: string, err: Error): void => {
  logger.log(`GOT ERROR WHILE CALLING API: ${url}`, err);
  throw err;
};
