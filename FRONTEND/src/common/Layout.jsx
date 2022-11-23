import React from 'react';
import { Outlet } from 'react-router-dom';
import { getUser } from '../utils/auth';
import NotFound from './NotFound';



function Layout() {
    const user = getUser();
  return (
      <>
        {user ? <Outlet></Outlet> : <NotFound></NotFound>}
      </>
  )
}

export default Layout