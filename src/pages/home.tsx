import React from 'react';
import { Router, RouterProps } from '@gatsbyjs/reach-router';
import Dashboard from '@src/sections/Dashboard';
import Layout from '@src/components/Layout';

const Home = ({ location }: RouterProps) => {
  return (
    <Layout location={location}>
      <Router>
        <Dashboard path='/home/dashboard' default />
      </Router>
    </Layout>
  );
};

export default Home;
