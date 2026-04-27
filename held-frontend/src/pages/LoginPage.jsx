import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../services/api.js";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [showForgot, setShowForgot] = useState(false);
  const [forgotStep, setForgotStep] = useState(1);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotToken, setForgotToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState("");
  const [copied, setCopied] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      const redirect = localStorage.getItem("held_redirect") || "/dashboard";
      localStorage.removeItem("held_redirect");
      navigate(redirect);
    } catch {
      setError("We couldn't sign you in. Check your details and try again.");
    } finally {
      setLoading(false);
    }
  };

  const openForgot = () => {
    setShowForgot(true);
    setForgotStep(1);
    setForgotError("");
    setForgotSuccess("");
    setForgotEmail("");
    setForgotToken("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const closeForgot = (e) => {
    if (e.target === e.currentTarget) setShowForgot(false);
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setForgotError("");
    setForgotLoading(true);
    try {
      const res = await api.post("/api/auth/forgot-password", { email: forgotEmail });
      setForgotToken(res.data.token);
      setForgotStep(2);
    } catch (err) {
      setForgotError(err?.response?.data?.message || "No account found with that email.");
    } finally {
      setForgotLoading(false);
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setForgotError("Passwords do not match.");
      return;
    }
    setForgotError("");
    setForgotLoading(true);
    try {
      await api.post("/api/auth/reset-password", { token: forgotToken, newPassword });
      setForgotSuccess("Password reset successfully. You can now sign in.");
      setTimeout(() => setShowForgot(false), 2500);
    } catch (err) {
      setForgotError(
        err?.response?.data?.message || "Failed to reset password. Token may have expired."
      );
    } finally {
      setForgotLoading(false);
    }
  };

  const copyToken = () => {
    navigator.clipboard.writeText(forgotToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="auth-page">
      <div className="auth-card fade-in">
        <div className="auth-header">
          <div className="auth-logo-icon">H</div>
          <h1 className="auth-logo">Held</h1>
          <p className="auth-tagline">
            A quiet, luxurious corner of the internet where your feelings have
            somewhere soft to land.
          </p>
        </div>

        <form onSubmit={onSubmit} className="auth-form">
          {error && <div className="error-msg">{error}</div>}

          <div className="field">
            <label>Email</label>
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@softplace.com"
              required
            />
          </div>

          <div className="field">
            <label>Password</label>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="forgot-password-link">
            <span onClick={openForgot}>Forgot your password?</span>
          </div>

          <button className="btn btn-full btn-hero" type="submit" disabled={loading}>
            {loading ? "Signing you in…" : "Sign In"}
          </button>
        </form>

        <p className="auth-footer">
          New to Held?{" "}
          <Link to="/register">Create an account</Link>
        </p>
      </div>

      {showForgot && (
        <div className="terms-modal-overlay" onClick={closeForgot}>
          <div className="terms-modal-content" style={{ maxWidth: 480, padding: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", color: "var(--pink)", margin: 0 }}>
                {forgotStep === 1 ? "Reset your password" : "Create new password"}
              </h2>
              <button
                onClick={() => setShowForgot(false)}
                style={{ background: "none", border: "none", color: "var(--text-muted)", fontSize: "1.2rem", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>

            {forgotError && (
              <div className="error-msg" style={{ marginBottom: "1rem" }}>{forgotError}</div>
            )}

            {forgotSuccess && (
              <div style={{
                background: "rgba(204,233,214,0.1)",
                border: "1px solid rgba(204,233,214,0.25)",
                borderRadius: "8px",
                padding: "0.75rem 1rem",
                color: "var(--green-dark)",
                fontSize: "0.88rem",
                marginBottom: "1rem",
              }}>
                {forgotSuccess}
              </div>
            )}

            {forgotStep === 1 && !forgotSuccess && (
              <form onSubmit={handleForgotSubmit}>
                <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.65, marginBottom: "1.25rem" }}>
                  Enter your email address and we'll generate a reset token for you.
                </p>
                <div className="field">
                  <label>Email Address</label>
                  <input
                    className="input"
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="you@email.com"
                    required
                  />
                </div>
                <button className="btn btn-full" type="submit" disabled={forgotLoading}>
                  {forgotLoading ? "Generating token…" : "Send Reset Token"}
                </button>
              </form>
            )}

            {forgotStep === 2 && !forgotSuccess && (
              <form onSubmit={handleResetSubmit}>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "0.75rem" }}>
                  Your reset token has been generated. Copy it below — it expires in 1 hour.
                </p>
                <div className="reset-token-box">
                  {forgotToken}
                  <button type="button" className="copy-btn" onClick={copyToken}>
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>

                <div className="field" style={{ marginTop: "1rem" }}>
                  <label>Reset Token</label>
                  <input
                    className="input"
                    value={forgotToken}
                    onChange={(e) => setForgotToken(e.target.value)}
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
                <button className="btn btn-full" type="submit" disabled={forgotLoading}>
                  {forgotLoading ? "Resetting…" : "Reset Password"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
