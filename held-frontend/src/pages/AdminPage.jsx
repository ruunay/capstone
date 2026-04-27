import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api.js";

const FLAGGED_CONTENT = [
  {
    id: 1,
    user: "anonymous_user_47",
    content: "This content was flagged for review by the community safety system.",
    reason: "Potential community guidelines violation",
    flaggedAt: "2026-04-26",
    status: "Under Review",
  },
  {
    id: 2,
    user: "anonymous_user_12",
    content: "Content flagged for inappropriate language.",
    reason: "Language violation",
    flaggedAt: "2026-04-25",
    status: "Under Review",
  },
  {
    id: 3,
    user: "anonymous_user_33",
    content: "Content flagged for potential self-harm reference.",
    reason: "Safety concern",
    flaggedAt: "2026-04-25",
    status: "Resolved",
  },
];

const NAV_ITEMS = [
  { id: "overview",  label: "Overview",        icon: "◈" },
  { id: "users",     label: "Users",            icon: "◎" },
  { id: "content",   label: "Content",          icon: "◇" },
  { id: "prompts",   label: "Prompts",          icon: "◉" },
  { id: "health",    label: "Platform Health",  icon: "◆" },
];

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState("overview");
  const [users, setUsers] = useState([]);
  const [prompts, setPrompts] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingPrompts, setLoadingPrompts] = useState(true);
  const [userSearch, setUserSearch] = useState("");
  const [newPrompt, setNewPrompt] = useState("");
  const [savingPrompt, setSavingPrompt] = useState(false);
  const [toast, setToast] = useState("");

  const adminEmail = (() => {
    try { return JSON.parse(localStorage.getItem("held_user"))?.email || "Admin"; } catch { return "Admin"; }
  })();

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  useEffect(() => {
    api.get("/api/admin/users")
      .then((res) => setUsers(res.data))
      .catch(() => {})
      .finally(() => setLoadingUsers(false));

    api.get("/api/prompts")
      .then((res) => setPrompts(res.data))
      .catch(() => {})
      .finally(() => setLoadingPrompts(false));
  }, []);

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Remove this user? This cannot be undone.")) return;
    try {
      await api.delete(`/api/admin/users/${id}`);
      setUsers((u) => u.filter((user) => user.id !== id));
      showToast("User removed.");
    } catch {
      showToast("Could not remove user.");
    }
  };

  const handleAddPrompt = async () => {
    if (!newPrompt.trim()) return;
    setSavingPrompt(true);
    try {
      const res = await api.post("/api/prompts", { text: newPrompt });
      setPrompts((p) => [...p, res.data]);
      setNewPrompt("");
      showToast("Prompt added.");
    } catch {
      showToast("Could not add prompt.");
    } finally {
      setSavingPrompt(false);
    }
  };

  const handleDeletePrompt = async (id) => {
    if (!window.confirm("Delete this prompt?")) return;
    try {
      await api.delete(`/api/prompts/${id}`);
      setPrompts((p) => p.filter((prompt) => prompt.id !== id));
      showToast("Prompt deleted.");
    } catch {
      showToast("Could not delete prompt.");
    }
  };

  const filteredUsers = users.filter((u) =>
    u.username?.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.email?.toLowerCase().includes(userSearch.toLowerCase())
  );

  const shows = (section) => activeSection === "overview" || activeSection === section;

  return (
    <div className="admin-shell">
      {/* ── Sidebar ── */}
      <div className="admin-sidebar">
        <div className="admin-sidebar-logo">Held</div>
        <div className="admin-sidebar-subtitle">Admin Console</div>

        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`admin-nav-item${activeSection === item.id ? " active" : ""}`}
            onClick={() => setActiveSection(item.id)}
          >
            <span style={{ fontSize: "1rem" }}>{item.icon}</span>
            {item.label}
          </button>
        ))}

        <div style={{ marginTop: "auto", paddingTop: "2rem" }}>
          <Link
            to="/dashboard"
            style={{ fontSize: "0.8rem", color: "var(--text-muted)", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.4rem" }}
          >
            ← Back to Site
          </Link>
        </div>
      </div>

      {/* ── Main ── */}
      <div className="admin-main">
        {/* Topbar */}
        <div className="admin-topbar">
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", fontWeight: 600 }}>
            Admin Dashboard
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{adminEmail}</span>
            <Link to="/dashboard">
              <button className="btn btn-sm btn-outline" style={{ fontSize: "0.78rem" }}>← Back to Site</button>
            </Link>
          </div>
        </div>

        {/* ── Stat Cards ── */}
        {shows("overview") && (
          <div className="stat-cards-grid">
            <div className="stat-card users">
              <div className="stat-card-number">{loadingUsers ? "—" : users.length}</div>
              <div className="stat-card-label">Total Users</div>
            </div>
            <div className="stat-card entries">
              <div className="stat-card-number">47</div>
              <div className="stat-card-label">Journal Entries</div>
            </div>
            <div className="stat-card active">
              <div className="stat-card-number">12</div>
              <div className="stat-card-label">Active Today</div>
            </div>
            <div className="stat-card flagged">
              <div className="stat-card-number">3</div>
              <div className="stat-card-label">Flagged Content</div>
            </div>
          </div>
        )}

        {/* ── Users ── */}
        {shows("users") && (
          <div style={{ marginBottom: "2.5rem" }}>
            <h3 className="admin-section-title">Recent Users</h3>
            <input
              className="input admin-search"
              placeholder="Search by username or email…"
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
            />
            {loadingUsers ? (
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Loading users…</p>
            ) : filteredUsers.length === 0 ? (
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>No users found.</p>
            ) : (
              <div className="admin-table-wrap card">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Joined</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((u) => (
                      <tr key={u.id}>
                        <td style={{ color: "var(--text-muted)", fontSize: "0.78rem" }}>{u.id}</td>
                        <td>{u.username}</td>
                        <td style={{ color: "var(--text-muted)" }}>{u.email}</td>
                        <td><span className={`role-tag ${u.role}`}>{u.role}</span></td>
                        <td style={{ color: "var(--text-muted)", fontSize: "0.78rem" }}>
                          {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—"}
                        </td>
                        <td>
                          <div style={{ display: "flex", gap: "0.5rem" }}>
                            <button
                              className="btn btn-sm btn-outline"
                              style={{ borderColor: "#e05252", color: "#e05252", fontSize: "0.74rem" }}
                              onClick={() => alert("Suspend feature coming soon")}
                            >
                              Suspend
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDeleteUser(u.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ── Flagged Content ── */}
        {shows("content") && (
          <div style={{ marginBottom: "2.5rem" }}>
            <h3 className="admin-section-title">Flagged Content</h3>
            {FLAGGED_CONTENT.map((item) => (
              <div key={item.id} className="flagged-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: "0.75rem" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "0.78rem", color: "var(--pink)", fontWeight: 600, marginBottom: "0.3rem" }}>
                      @{item.user}
                    </div>
                    <p style={{ fontSize: "0.87rem", color: "var(--text-muted)", lineHeight: 1.6, margin: 0 }}>
                      {item.content}
                    </p>
                  </div>
                  <span className={`status-badge ${item.status === "Resolved" ? "resolved" : "review"}`}>
                    {item.status}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: "0.74rem", color: "var(--text-muted)" }}>
                    Reason: {item.reason} · Flagged {item.flaggedAt}
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => showToast("Content removed.")}
                    >
                      Remove Content
                    </button>
                    <button
                      className="btn btn-sm btn-outline"
                      onClick={() => showToast("Flag cleared.")}
                    >
                      Clear Flag
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Prompts ── */}
        {shows("prompts") && (
          <div style={{ marginBottom: "2.5rem" }}>
            <h3 className="admin-section-title">Prompt Management</h3>
            <div className="prompt-add-row">
              <input
                className="input"
                placeholder="Add a new community prompt…"
                value={newPrompt}
                onChange={(e) => setNewPrompt(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddPrompt()}
              />
              <button
                className="btn"
                onClick={handleAddPrompt}
                disabled={savingPrompt || !newPrompt.trim()}
              >
                {savingPrompt ? "Adding…" : "Add Prompt"}
              </button>
            </div>
            {loadingPrompts ? (
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Loading prompts…</p>
            ) : prompts.length === 0 ? (
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>No prompts yet.</p>
            ) : (
              <div className="prompt-list">
                {prompts.map((p) => (
                  <div key={p.id} className="prompt-item">
                    <span style={{ fontSize: "0.88rem" }}>{p.text || p.question}</span>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeletePrompt(p.id)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Platform Health ── */}
        {shows("health") && (
          <div style={{ marginBottom: "2.5rem" }}>
            <h3 className="admin-section-title">Platform Health</h3>
            <div className="platform-health-grid">
              <div className="health-card">
                <div className="health-label">Platform Status</div>
                <div className="health-value">
                  <span className="status-dot" />
                  Operational
                </div>
              </div>
              <div className="health-card">
                <div className="health-label">Last Backup</div>
                <div className="health-value">Today at 3:00 AM</div>
              </div>
              <div className="health-card">
                <div className="health-label">Active Sessions</div>
                <div className="health-value">24</div>
              </div>
              <div className="health-card">
                <div className="health-label">Storage Used</div>
                <div className="health-value">2.3 GB</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Toast ── */}
      {toast && (
        <div style={{
          position: "fixed",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(30,10,20,0.95)",
          border: "1px solid rgba(255,182,211,0.3)",
          borderRadius: "var(--radius-sm)",
          padding: "0.75rem 1.5rem",
          color: "var(--pink)",
          fontSize: "0.88rem",
          zIndex: 1000,
          backdropFilter: "blur(12px)",
          whiteSpace: "nowrap",
        }}>
          {toast}
        </div>
      )}
    </div>
  );
}
