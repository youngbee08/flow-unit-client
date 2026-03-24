import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

const ClearCache = () => {
  useEffect(() => {
    // Clear service worker / cache storage if available
    if ("caches" in window) {
      caches.keys().then((names) => {
        names.forEach((name) => caches.delete(name));
      });
    }

    // Force reload from server (bypass browser cache)
    window.location.reload();
  }, []);

  return <Outlet />;
};

export default ClearCache;
