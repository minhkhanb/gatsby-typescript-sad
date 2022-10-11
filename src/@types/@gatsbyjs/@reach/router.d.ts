/* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */
import { Attributes } from 'react';

declare module 'react' {
  interface Attributes {
    path?: string;
    default?: boolean;
  }
}
