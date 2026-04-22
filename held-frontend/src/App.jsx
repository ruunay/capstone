import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/layout/Navbar.jsx";

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
