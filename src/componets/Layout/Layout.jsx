import React from 'react'
import { Outlet } from 'react-router-dom';
import NavBar from '../Navbar/NavBar';
import './layout.scss';

const Layout = () => {
  return (
      <div className='bg'>
          <NavBar />
          <Outlet/>
    </div>
  )
}

export default Layout