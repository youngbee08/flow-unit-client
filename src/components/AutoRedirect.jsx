import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AutoRedirect = () => {
  return window.location.hostname === "flowunitapp.vercel.app" ? (
    window.location.reload(true)
  ) : (
    <Outlet />
  );
};

export default AutoRedirect;
