import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = localStorage.getItem("held_token");
    const u = localStorage.getItem("held_user");
    if (t) {
      setToken(t);
      setUser(u ? JSON.parse(u) : null);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await axios.post("http://localhost:8080/api/auth/login", {
      email,
      password,
    });
    const t = res.data?.token;
    if (t) {
      setToken(t);
      setUser(res.data);
      localStorage.setItem("held_token", t);
      localStorage.setItem("held_user", JSON.stringify(res.data));
    }
    return res.data;
  };

  const register = async (payload) => {
    const res = await axios.post(
      "http://localhost:8080/api/auth/register",
      payload
    );
    const t = res.data?.token;
    if (t) {
      setToken(t);
      setUser(res.data);
      localStorage.setItem("held_token", t);
      localStorage.setItem("held_user", JSON.stringify(res.data));
    }
    return res.data;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("held_token");
    localStorage.removeItem("held_user");
  };

  return (
    <AuthContext.Provider value={{ token, user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
