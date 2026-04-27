/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";
import api, {
  clearStoredAuth,
  getStoredToken,
  USER_STORAGE_KEY,
} from "../services/api.js";

const AuthContext = createContext(null);

function getStoredUser() {
  const rawUser = localStorage.getItem(USER_STORAGE_KEY);
  if (!rawUser) return null;

  try {
    return JSON.parse(rawUser);
  } catch {
    localStorage.removeItem(USER_STORAGE_KEY);
    return null;
  }
}

function persistAuth(data) {
  const token = data?.token;
  if (!token) return;

  localStorage.setItem("token", token);
  localStorage.removeItem("jwt");
  localStorage.removeItem("held_token");
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data));
  localStorage.setItem(
    "held_redirect",
    data.role === "ADMIN" ? "/admin" : "/dashboard"
  );
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => getStoredToken());
  const [user, setUser] = useState(() => getStoredUser());
  const loading = false;

  const login = async (email, password) => {
    const res = await api.post("/api/auth/login", {
      email,
      password,
    });

    const storedToken = res.data?.token;
    if (storedToken) {
      persistAuth(res.data);
      setToken(storedToken);
      setUser(res.data);
    }
    return res.data;
  };

  const register = async (payload) => {
    const res = await api.post("/api/auth/register", payload);

    const storedToken = res.data?.token;
    if (storedToken) {
      persistAuth(res.data);
      setToken(storedToken);
      setUser(res.data);
    }
    return res.data;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    clearStoredAuth();
    localStorage.removeItem("held_redirect");
  };

  const getUserId = () => user?.id || null;

  return (
    <AuthContext.Provider
      value={{ token, user, login, register, logout, loading, getUserId }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
