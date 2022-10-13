import React from 'react';
import { RouterProps } from '@gatsbyjs/reach-router';

interface LandingProps {
  children: React.ReactNode;
  location: RouterProps['location'];
}

const Landing: React.FunctionComponent<LandingProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default Landing;
