import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(form);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err?.response?.data?.error || "Registration failed. Please try again."
      );
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
            Begin your soft, intentional journey — a space made just for you.
          </p>
        </div>

        <form onSubmit={onSubmit} className="auth-form">
          {error && <div className="error-msg">{error}</div>}

          <div className="field">
            <label className="auth-label">Username</label>
            <input
              className="input auth-input"
              value={form.username}
              onChange={(e) => update("username", e.target.value)}
              placeholder="yourname"
              required
            />
          </div>

          <div className="field">
            <label className="auth-label">Email</label>
            <input
              className="input auth-input"
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="you@email.com"
              required
            />
          </div>

          <div className="field">
            <label className="auth-label">Password</label>
            <input
              className="input auth-input"
              type="password"
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button className="btn btn-full btn-auth" type="submit" disabled={loading}>
            {loading ? "Creating your space..." : "Create Account"}
          </button>
        </form>

        <p className="auth-footer">
          <span className="auth-footer-text">Already have an account?</span>{" "}
          <Link to="/login" className="auth-link">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
