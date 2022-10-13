/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { withProperties } from '@src/utils';

interface InputProps extends React.AllHTMLAttributes<HTMLInputElement> {
  className?: string;
  type?: 'text' | 'email';
}

const Input: React.FunctionComponent<InputProps> = React.forwardRef<any>(
  ({ className, type = 'text', ...props }: InputProps, ref) => {
    return (
      <input
        {...props}
        ref={ref}
        type={type}
        className={`${className} mt-1 appearance-none block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
        onChange={(evt) => props.onChange && props.onChange(evt)}
      />
    );
  }
);
export default withProperties(Input, {});
