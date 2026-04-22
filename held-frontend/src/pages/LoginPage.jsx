import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      window.location.href = "/dashboard";
    } catch {
      alert("Login failed.");
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Sign in</h2>
        <form onSubmit={onSubmit}>
          <input className="input" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
          <input className="input" type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
          <button className="btn">Login</button>
        </form>
      </div>
    </div>
  );
}