/* eslint-disable @typescript-eslint/no-explicit-any, no-console */
import config from '@src/config';

export const logger = (() => ({
  debug(...args: any[]) {
    if (config.env === 'production') {
      return;
    }

    console.debug(...args);
  },
  log(...args: any[]) {
    console.log(...args);
  },
  warn(...args: any[]) {
    console.warn(...args);
  },
  error(...args: any[]) {
    console.error(...args);
  },
}))();
