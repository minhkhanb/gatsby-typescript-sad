import React from 'react';
import { RouterProps } from '@gatsbyjs/reach-router';
import { isLoggedIn } from '@src/services/auth.service';
import { navigate } from 'gatsby';

interface NoAuthProps {
  location: RouterProps['location'];
  children: React.ReactNode;
}

const NoAuth: React.FunctionComponent<NoAuthProps> = ({ children }) => {
  if (isLoggedIn()) {
    navigate(`/home/dashboard`);
  }

  return <div>{children}</div>;
};

export default NoAuth;
