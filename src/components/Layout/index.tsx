/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { css, ThemeProvider } from '@emotion/react';
import { RouterProps } from '@gatsbyjs/reach-router';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfigFile from '../../../tailwind.config';
import { Config } from 'tailwindcss';
import tw from 'twin.macro';

interface LayoutProps {
  children: React.ReactNode;
  location: RouterProps['location'];
}

const getTailwindConfig: any = (config: Config) => {
  return resolveConfig(config);
};

const tailwindTheme = getTailwindConfig(tailwindConfigFile).theme;

export const media = (key: string) => {
  return `@media (min-width: ${tailwindTheme.screens[key]})`;
};

const theme = {
  ...tailwindTheme,
  media,
};

const Layout: React.FunctionComponent<LayoutProps> = ({ location, children }) => {
  console.log('location: ', location);
  return (
    <ThemeProvider theme={theme}>
      <h1
        className='text-gray'
        css={css`
          background: green;
          ${tw`bg-gray-800`}
        `}
      >
        Layout
      </h1>
      {children}
    </ThemeProvider>
  );
};

export default Layout;
