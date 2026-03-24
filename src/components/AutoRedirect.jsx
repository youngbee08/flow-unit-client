import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

const AutoRedirect = () => {
  useEffect(() => {
    if (window.location.hostname === "flowunitapp.vercel.app") {
      const newUrl =
        "https://app.flowunit.co" +
        window.location.pathname +
        window.location.search +
        window.location.hash;

      window.location.replace(newUrl);
    }
  }, []);

  return <Outlet />;
};

export default AutoRedirect;
