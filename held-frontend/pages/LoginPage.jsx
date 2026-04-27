import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("We couldn’t sign you in. Check your details and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page theme-soft-pink">
      <div className="auth-background-blur" />
      <div className="auth-card glass-card fade-in">
        <div className="auth-header">
          <div className="auth-logo-mark">H</div>
          <h1 className="auth-logo">Held</h1>
          <p className="auth-tagline">
            A quiet, luxurious corner of the internet where your feelings have
            somewhere soft to land.
          </p>
        </div>

        <form onSubmit={onSubmit} className="auth-form">
          {error && <div className="error-msg">{error}</div>}

          <div className="field">
            <label className="auth-label">Email</label>
            <input
              className="input auth-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@softplace.com"
              required
            />
          </div>

          <div className="field">
            <label className="auth-label">Password</label>
            <input
              className="input auth-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button className="btn btn-full btn-auth" type="submit" disabled={loading}>
            {loading ? "Signing you in..." : "Sign In"}
          </button>
        </form>

        <p className="auth-footer">
          <span className="auth-footer-text">New to Held?</span>{" "}
          <Link to="/register" className="auth-link">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
