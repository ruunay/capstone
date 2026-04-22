import React, { useEffect, useState } from "react";

export default function DashboardPage() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/test")
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div className="page">
      <h1>Dashboard</h1>
      <p>Backend says:</p>
      <h3>{message || "Loading..."}</h3>
    </div>
  );
}