import * as React from 'react';
import type { HeadFC } from 'gatsby';
import Layout from '@src/components/Layout';
import { RouterProps, Router, Link } from '@gatsbyjs/reach-router';
import { useSelector } from 'react-redux';
import { RootState } from '@src/store/reducers/rootReducer';

const Home = () => (
  <div>
    <h1>Home</h1>
    <nav>
      <Link to='/home'>Home</Link> | <Link to='/home/dashboard'>Dashboard</Link>
    </nav>
  </div>
);

const Dash = () => (
  <div>
    <h1>Dash</h1>
    <nav>
      <Link to='/home'>Home</Link> | <Link to='/home/dashboard'>Dashboard</Link>
    </nav>
  </div>
);

const HomePage = ({ location }: RouterProps) => {
  const { repos } = useSelector((state: RootState) => state.auth);

  console.log('repos: ', repos);

  return (
    <Layout location={location}>
      <div>Home Page</div>

      <Router>
        <Home path='/home' />
        <Dash path='/home/dashboard' />
      </Router>
    </Layout>
  );
};

export default HomePage;

export const Head: HeadFC = () => <title>Home Page</title>;
