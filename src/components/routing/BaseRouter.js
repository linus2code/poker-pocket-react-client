import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import GamePage from '@/pages/GamePage';

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => {
  return (
    <Layout {...rest}>
      <Component {...rest} />
    </Layout>
  );
};

const BaseRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<AppRoute component={GamePage} layout={MainLayout} />} />
    </Routes>
  );
};

export default BaseRouter;
