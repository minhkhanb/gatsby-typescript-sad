/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { withProperties } from '@src/utils';
import Submit from '@src/components/ui/Button/Submit';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  as?: React.FunctionComponent | string;
  form?: string;
  onClick?: React.MouseEventHandler;
}

const Button: React.FunctionComponent<ButtonProps> = ({
  as = 'button',
  type = 'button',
  children,
  className,
  ...props
}) => {
  const ButtonElement = as as any;

  return (
    <ButtonElement
      {...props}
      type={type}
      className={`${className} inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
    >
      {children}
    </ButtonElement>
  );
};

export default withProperties(Button, { Submit });
