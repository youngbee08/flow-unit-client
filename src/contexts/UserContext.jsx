import React, { createContext, useContext, useEffect, useState } from "react";
import api, { setupInterceptors } from "../helpers/api";
import { toast } from "sonner";

export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dashboardMetrics, setDashboardMetrics] = useState({
    total_projects: 0,
    pending_tasks: 0,
    completed_projects: 0,
  });
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    setupInterceptors(logout);
  }, []);

  useEffect(() => {
    async function initAuth() {
      setLoading(true);
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");
      const storedMetrics = localStorage.getItem("dashboardMetrics");
      if (!storedToken || !storedUser) {
        setLoading(false);
        return;
      }
      try {
        const parsedUser = JSON.parse(storedUser);
        const parsedMetrics = JSON.parse(storedMetrics);
        setToken(storedToken);
        setUser(parsedUser);
        setDashboardMetrics(parsedMetrics);
        await refreshUser(storedToken);
      } catch (error) {
        console.warn("Invalid or expired session. Clearing...");
        console.log("errorDuringInitialization", error);
        logout({ redirect: false });
      } finally {
        setLoading(false);
      }
    }
    initAuth();
  }, []);

  async function login(token) {
    localStorage.setItem("token", token);
    setToken(token);
    refreshUser(token);
  }

  async function refreshUser(token) {    
    if (!token || isLoggingOut) {
      throw new Error("No token!, or you are logging out already");
    }
    try {
      const res = await api.get("/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        const { user, pending_tasks, completed_projects, total_projects } =
          res.data;
        setUser(user);
        setDashboardMetrics({
          pending_tasks,
          total_projects,
          completed_projects,
        });
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem(
          "dashboardMetrics",
          JSON.stringify({
            pending_tasks,
            total_projects,
            completed_projects,
          })
        );
      }
    } catch (error) {
      console.log("errorRefreshing-user", error);
      if (error.response?.status === 401) {
        logout({ redirect: false });
      }
    }
  }
  async function logout({ redirect = false } = {}) {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await api.put("/auth/logout").catch(() => {});
    } catch {}

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("dashboardMetrics");
    setToken(null);
    setUser(null);

    toast.success("Logged out successfully");
    if (redirect) {
      window.location.href = "/";
    }
    setIsLoggingOut(false);
  }

  const isLoggedIn = !!token;

  const value = {
    refreshUser,
    user,
    token,
    loading,
    login,
    isLoggedIn,
    dashboardMetrics,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
