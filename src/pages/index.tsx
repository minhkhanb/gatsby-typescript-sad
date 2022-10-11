import * as React from 'react';
import type { HeadFC } from 'gatsby';
import Layout from '@src/components/Layout';
import { RouterProps } from '@gatsbyjs/reach-router';

const IndexPage = ({ location }: RouterProps) => {
  return (
    <Layout location={location}>
      <div>Index</div>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
