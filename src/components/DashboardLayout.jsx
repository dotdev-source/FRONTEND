import { Outlet } from "react-router-dom";

import React from 'react'
import Navbar from "./Navbar";
import SideNav from "./SideNav";

const DashboardLayout = () => {
  return (
      <>
          <Navbar />
          <SideNav />
          <div className="dash-container">
              <Outlet />
          </div>
      </>
  )
}

export default DashboardLayout