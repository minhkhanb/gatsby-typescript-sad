/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { RouterProps, useLocation } from '@gatsbyjs/reach-router';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfigFile from '../../../tailwind.config';
import { Config } from 'tailwindcss';
import { navigate } from 'gatsby';
import { getLoggedUser, hasPermission } from '@src/utils';

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

export const RedirectIfNoPermission: React.FunctionComponent = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    const canAccess = hasPermission(pathname);

    console.log('ca: ', canAccess);

    if (!canAccess) {
      navigate('/login');
    }
  }, [pathname]);

  return null;
};

const PermissionContext = React.createContext({});

type PermissionProviderProps = {
  children: React.ReactNode;
};

const PermissionProvider: React.FunctionComponent<PermissionProviderProps> = ({ children }) => {
  const loggedUser = getLoggedUser();

  if (!loggedUser) {
    return <div>Loading...</div>;
  }

  return <PermissionContext.Provider value={{}}>{children}</PermissionContext.Provider>;
};

type RouterGuardProps = {
  location: RouterProps['location'];
  children: React.ReactNode;
};

const RouterGuard = ({ children }: RouterGuardProps) => {
  return (
    <>
      <RedirectIfNoPermission />
      <PermissionProvider>{children}</PermissionProvider>
    </>
  );
};

const Layout: React.FunctionComponent<LayoutProps> = ({ location, children }) => {
  return (
    <ThemeProvider theme={theme}>
      <RouterGuard location={location}>{children}</RouterGuard>
    </ThemeProvider>
  );
};

export default Layout;
