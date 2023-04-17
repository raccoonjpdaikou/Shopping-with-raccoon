import { Outlet, useLocation } from "react-router-dom";
import React from "react";
import Navbar from "./Navbar";

const Layout = () => {
  const info = useLocation();
  return (
    <>
      <Navbar info={info.pathname === "/"} />
      <Outlet />
    </>
  );
};

export default Layout;
