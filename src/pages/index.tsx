import * as React from 'react';
import type { HeadFC } from 'gatsby';
import Layout from '@src/components/Layout';
import { RouterProps, Router, Link } from '@gatsbyjs/reach-router';

const Home = () => (
  <div>
    <h1>Home</h1>
    <nav>
      <Link to='/home'>Home</Link> | <Link to='/dashboard'>Dashboard</Link>
    </nav>
  </div>
);

const Dash = () => <div>Dash</div>;

const IndexPage = ({ location }: RouterProps) => {
  return (
    <Layout location={location}>
      <div>Index</div>

      <Router>
        <Home path='/home' />
        <Dash path='/dashboard' />
      </Router>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
