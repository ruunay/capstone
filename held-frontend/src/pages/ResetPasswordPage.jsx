import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api.js";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await api.post("/api/auth/reset-password", { token, newPassword });
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2500);
    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to reset password. Token may be invalid or expired."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card fade-in">
        <div className="auth-header">
          <div className="auth-logo-icon">H</div>
          <h1 className="auth-logo">Held</h1>
          <p className="auth-tagline">Reset your password to get back to your safe space.</p>
        </div>

        {success ? (
          <div style={{
            textAlign: "center",
            padding: "2rem 0",
          }}>
            <div style={{
              background: "rgba(204,233,214,0.1)",
              border: "1px solid rgba(204,233,214,0.25)",
              borderRadius: "12px",
              padding: "1.25rem",
              color: "var(--green-dark)",
              fontSize: "0.92rem",
              lineHeight: 1.65,
              marginBottom: "1.5rem",
            }}>
              Password reset successfully. Redirecting you to sign in…
            </div>
            <Link to="/login" style={{ color: "var(--pink)", fontSize: "0.88rem" }}>
              Go to sign in now
            </Link>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="auth-form">
            {error && <div className="error-msg">{error}</div>}

            <div className="field">
              <label>Reset Token</label>
              <input
                className="input"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Paste your reset token"
                required
              />
            </div>

            <div className="field">
              <label>New Password</label>
              <input
                className="input"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <div className="field">
              <label>Confirm New Password</label>
              <input
                className="input"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <button className="btn btn-full btn-hero" type="submit" disabled={loading}>
              {loading ? "Resetting…" : "Reset Password"}
            </button>
          </form>
        )}

        <p className="auth-footer">
          Remember your password?{" "}
          <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
