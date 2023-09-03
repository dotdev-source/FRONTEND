import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SideNav = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  
  return <div><h1>SideNav</h1></div>;
};

export default SideNav;
