import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import App from "./App.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import JournalListPage from "./pages/JournalListPage.jsx";
import JournalCreatePage from "./pages/JournalCreatePage.jsx";
import JournalDetailPage from "./pages/JournalDetailPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import CommunityPage from "./pages/CommunityPage.jsx";
import PrivateRoute from "./components/layout/PrivateRoute.jsx";
import "./styles/globals.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<App />}>
            <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
            <Route path="/journal" element={<PrivateRoute><JournalListPage /></PrivateRoute>} />
            <Route path="/journal/new" element={<PrivateRoute><JournalCreatePage /></PrivateRoute>} />
            <Route path="/journal/entry/:id" element={<PrivateRoute><JournalDetailPage /></PrivateRoute>} />
            <Route path="/admin" element={<PrivateRoute><AdminPage /></PrivateRoute>} />
            <Route path="/community" element={<PrivateRoute><CommunityPage /></PrivateRoute>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
