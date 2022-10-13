import * as React from 'react';
import type { HeadFC } from 'gatsby';
import { RouterProps } from '@gatsbyjs/reach-router';
import Landing from '@src/components/Landing';

const Index = ({ location }: RouterProps) => {
  return (
    <Landing location={location}>
      <div>Landing Page</div>
    </Landing>
  );
};

export default Index;

export const Head: HeadFC = () => <title>Home Page</title>;
