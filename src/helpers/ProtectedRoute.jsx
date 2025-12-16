import React from "react";
import { useUser } from "../contexts/UserContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useUser();

  if (loading) {
    return null;
  }

  if (!isLoggedIn) {
    window.location.replace("/");
    return null;
  }

  return children;
};

export default ProtectedRoute;
