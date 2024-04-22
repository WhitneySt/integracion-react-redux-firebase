import React from 'react'
import { Outlet } from 'react-router-dom';
import NavBar from '../Navbar/NavBar'

const Layout = () => {
  return (
      <div>
          <NavBar />
          <Outlet/>
    </div>
  )
}

export default Layout