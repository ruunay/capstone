import axios from "axios";

export const TOKEN_STORAGE_KEYS = ["token", "jwt", "held_token"];
export const USER_STORAGE_KEY = "held_user";

export function getStoredToken() {
  for (const key of TOKEN_STORAGE_KEYS) {
    const value = localStorage.getItem(key);
    if (value) return value;
  }
  return null;
}

export function clearStoredAuth() {
  for (const key of TOKEN_STORAGE_KEYS) {
    localStorage.removeItem(key);
  }
  localStorage.removeItem(USER_STORAGE_KEY);
}

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (config) => {
    const token = getStoredToken();
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearStoredAuth();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
