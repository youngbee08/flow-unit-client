import React, { createContext, useContext, useEffect, useState } from "react";
import api, { setupInterceptors } from "../helpers/api";
import { toast } from "sonner";

export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setupInterceptors(logout);
  }, []);

  useEffect(() => {
    async function initAuth() {
      setLoading(true);
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");
      if (!storedToken || !storedUser) {
        setLoading(false);
        return;
      }
      try {
        const parsedUser = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(parsedUser);
        await refreshUser(storedToken);
      } catch (error) {
        console.warn("Invalid or expired session. Clearing...");
        console.log("errorDuringInitialization", error);
        logout();
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
    if (!token) {
      throw new Error("No token!");
    }
    try {
      const res = await api.get("/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }
    } catch (error) {
      console.log("errorRefreshing-user", error);
      if (error.response?.status === 401) {
        logout();
      }
    }
  }

  async function logout() {
    try {
      const res = await api.put("/auth/logout");
      if (res.status === 200) {
        const loading = toast.loading("Logging out");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        setTimeout(() => {
          toast.success("Logged out successfull");
          setTimeout(() => {
            toast.dismiss(loading);
          }, 1000);
        }, 2000);
        window.location.href = "/";
      }
    } catch (error) {
      console.log("errorLogging-out", error);
    }
  }

  const isLoggedIn = !!token;

  const value = { refreshUser, user, token, loading, login, isLoggedIn };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
