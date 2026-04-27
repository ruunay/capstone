import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Navbar() {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();
  const [showPinterest, setShowPinterest] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const closeModal = (e) => {
    if (e.target === e.currentTarget) setShowPinterest(false);
  };

  if (!token) return null;

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/dashboard">Held</Link>
        </div>
        <div className="navbar-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/journal">Journal</Link>
          <Link to="/affirmations">Affirmations</Link>
          <Link to="/community">Community</Link>
          <button
            className="btn-ghost"
            onClick={() => setShowPinterest(true)}
            style={{ fontSize: "0.9rem", color: "var(--text-muted)", padding: "0.25rem 0" }}
          >
            Pinterest
          </button>
          {user?.role === "ADMIN" && <Link to="/admin">Admin</Link>}
          <button className="btn-logout" onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      </nav>

      {showPinterest && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="card modal-card fade-in" style={{ maxWidth: 440 }}>
            <div className="modal-header">
              <h3>Pinterest Integration</h3>
              <button className="modal-close" onClick={() => setShowPinterest(false)}>✕</button>
            </div>

            <div style={{
              padding: "1.5rem 0",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
            }}>
              <div style={{
                width: 64, height: 64, borderRadius: "50%",
                background: "linear-gradient(135deg, rgba(230,0,35,0.15), rgba(255,182,211,0.2))",
                border: "1px solid rgba(230,0,35,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.8rem",
              }}>
                P
              </div>

              <div>
                <h4 style={{ marginBottom: "0.5rem" }}>Coming Soon</h4>
                <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.65, maxWidth: 320 }}>
                  We are building a seamless Pinterest integration so you can pull your saved boards directly into your Held vision boards. A softer, more curated way to manifest.
                </p>
              </div>

              <div style={{
                padding: "0.75rem 1.25rem",
                borderRadius: "var(--radius-sm)",
                background: "rgba(255,182,211,0.06)",
                border: "1px solid var(--border)",
                fontSize: "0.82rem",
                color: "var(--text-muted)",
                width: "100%",
                textAlign: "left",
                lineHeight: 1.6,
              }}>
                Planned features: sync Pinterest boards, import pins as vision board cards, mood-matched board suggestions.
              </div>
            </div>

            <button className="btn btn-full" onClick={() => setShowPinterest(false)}>
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}
