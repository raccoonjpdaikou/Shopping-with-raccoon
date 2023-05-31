import { Outlet, useLocation } from "react-router-dom";
import React from "react";
import Navbar from "./Navbar";

const Layout = () => {
  const { pathname } = useLocation();
  return (
    <>
      <Navbar info={pathname} />
      <Outlet />
    </>
  );
};

export default Layout;
