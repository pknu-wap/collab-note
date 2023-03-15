import React from 'react';
import Header from '../base/Header';
import { Outlet } from 'react-router-dom';

const BaseLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default BaseLayout;
