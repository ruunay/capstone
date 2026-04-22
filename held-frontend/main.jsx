import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import JournalListPage from "./pages/JournalListPage.jsx";
import JournalCreatePage from "./pages/JournalCreatePage.jsx";
import JournalDetailPage from "./pages/JournalDetailPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import CommunityPage from "./pages/CommunityPage.jsx";

import "./styles/globals.css";

const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/dashboard", element: <DashboardPage /> },
  { path: "/journal", element: <JournalListPage /> },
  { path: "/journal/new", element: <JournalCreatePage /> },
  { path: "/journal/entry/:id", element: <JournalDetailPage /> },
  { path: "/admin", element: <AdminPage /> },
  { path: "/community", element: <CommunityPage /> },
]);

const root = createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);