import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const SideNav = () => {
  const { fullname, status } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  
  return <div>
    <p>{fullname}</p>
    <p>{status}</p>
    <h1>SideNav</h1></div>;
};

export default SideNav;
