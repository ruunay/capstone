import React, { useState, useCallback } from "react";
import axios from "axios";
import api, {
  clearStoredAuth,
  getStoredToken,
  USER_STORAGE_KEY,
} from "../services/api.js";

const BASE = "http://localhost:8080";

const METHOD_COLORS = {
  GET:    { bg: "#1a3d2b", text: "#4ade80", border: "#22543d" },
  POST:   { bg: "#1a2d4d", text: "#60a5fa", border: "#1e3a5f" },
  PUT:    { bg: "#3d2e0a", text: "#fbbf24", border: "#5a4010" },
  DELETE: { bg: "#3d0f0f", text: "#f87171", border: "#5a1a1a" },
};

const S = {
  page: {
    minHeight: "100vh",
    background: "#0a0a0f",
    color: "#e2e8f0",
    fontFamily: "'DM Sans', system-ui, sans-serif",
    padding: "0 0 4rem",
  },
  topbar: {
    background: "#111118",
    borderBottom: "1px solid #1e1e2e",
    padding: "1rem 2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "sticky",
    top: 0,
    zIndex: 50,
  },
  logo: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.4rem",
    fontWeight: 600,
    background: "linear-gradient(135deg, #ffb6d3, #d4af7a)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  tokenBadge: (hasToken) => ({
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    background: hasToken ? "#0f2d1a" : "#2d0f0f",
    border: `1px solid ${hasToken ? "#22543d" : "#5a1a1a"}`,
    borderRadius: 8,
    padding: "0.35rem 0.75rem",
    fontSize: "0.75rem",
    fontFamily: "monospace",
    color: hasToken ? "#4ade80" : "#f87171",
  }),
  container: { maxWidth: 1100, margin: "0 auto", padding: "2rem" },
  section: { marginBottom: "2.5rem" },
  sectionTitle: {
    fontSize: "0.7rem",
    fontWeight: 700,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: "#6b7280",
    marginBottom: "0.75rem",
    paddingBottom: "0.5rem",
    borderBottom: "1px solid #1e1e2e",
  },
  card: {
    background: "#111118",
    border: "1px solid #1e1e2e",
    borderRadius: 12,
    marginBottom: "0.75rem",
    overflow: "hidden",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "0.9rem 1.25rem",
    cursor: "pointer",
    userSelect: "none",
  },
  methodBadge: (method) => ({
    ...METHOD_COLORS[method],
    fontSize: "0.68rem",
    fontWeight: 700,
    letterSpacing: "0.1em",
    padding: "0.2rem 0.6rem",
    borderRadius: 6,
    border: `1px solid ${METHOD_COLORS[method]?.border || "#333"}`,
    fontFamily: "monospace",
    flexShrink: 0,
  }),
  urlText: {
    fontFamily: "monospace",
    fontSize: "0.85rem",
    color: "#94a3b8",
    flex: 1,
  },
  cardBody: { padding: "0 1.25rem 1.25rem", borderTop: "1px solid #1e1e2e" },
  label: {
    display: "block",
    fontSize: "0.7rem",
    fontWeight: 600,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#6b7280",
    marginBottom: "0.4rem",
    marginTop: "0.9rem",
  },
  textarea: {
    width: "100%",
    background: "#0d0d14",
    border: "1px solid #1e1e2e",
    borderRadius: 8,
    color: "#e2e8f0",
    fontFamily: "monospace",
    fontSize: "0.82rem",
    padding: "0.75rem 1rem",
    resize: "vertical",
    outline: "none",
    lineHeight: 1.6,
  },
  input: {
    width: "100%",
    background: "#0d0d14",
    border: "1px solid #1e1e2e",
    borderRadius: 8,
    color: "#e2e8f0",
    fontFamily: "monospace",
    fontSize: "0.82rem",
    padding: "0.55rem 0.9rem",
    outline: "none",
  },
  sendBtn: (loading) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
    background: loading ? "#374151" : "linear-gradient(135deg, #ffb6d3, #e8899c)",
    color: loading ? "#9ca3af" : "white",
    border: "none",
    borderRadius: 20,
    padding: "0.5rem 1.25rem",
    fontSize: "0.8rem",
    fontWeight: 600,
    cursor: loading ? "not-allowed" : "pointer",
    marginTop: "0.9rem",
    letterSpacing: "0.03em",
    transition: "all 0.2s",
  }),
  responsePre: (ok) => ({
    marginTop: "0.9rem",
    background: "#0a0a0f",
    border: `1px solid ${ok ? "#22543d" : "#5a1a1a"}`,
    borderRadius: 8,
    padding: "0.9rem 1rem",
    fontFamily: "monospace",
    fontSize: "0.78rem",
    color: ok ? "#86efac" : "#fca5a5",
    overflowX: "auto",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    maxHeight: 320,
    overflowY: "auto",
  }),
  statusBadge: (code) => ({
    display: "inline-flex",
    alignItems: "center",
    padding: "0.15rem 0.55rem",
    borderRadius: 6,
    fontSize: "0.7rem",
    fontWeight: 700,
    fontFamily: "monospace",
    background: code >= 200 && code < 300 ? "#1a3d2b" : "#3d0f0f",
    color: code >= 200 && code < 300 ? "#4ade80" : "#f87171",
    border: `1px solid ${code >= 200 && code < 300 ? "#22543d" : "#5a1a1a"}`,
    marginLeft: "0.75rem",
  }),
};

/* ── Endpoint card ── */
function EndpointCard({ method, path, name, defaultBody, useAuth, params, onSuccess, note }) {
  const [open, setOpen]         = useState(false);
  const [body, setBody]         = useState(defaultBody ? JSON.stringify(defaultBody, null, 2) : "");
  const [response, setResponse] = useState(null);
  const [status, setStatus]     = useState(null);
  const [loading, setLoading]   = useState(false);

  const resolvedPath = path
    .replace(/{userId}/g,   params.userId   || "1")
    .replace(/{id}/g,       params.entryId  || "1")
    .replace(/{entryId}/g,  params.entryId  || "1")
    .replace(/{promptId}/g, params.promptId || "1");

  const send = async () => {
    setLoading(true);
    setResponse(null);
    setStatus(null);
    try {
      let parsedBody;
      if (body.trim()) {
        try { parsedBody = JSON.parse(body); }
        catch { setResponse({ error: "Invalid JSON in request body" }); setStatus(0); setLoading(false); return; }
      }

      let res;
      if (useAuth) {
        res = await api.request({
          method,
          url: resolvedPath,
          data: parsedBody,
        });
      } else {
        res = await axios({
          method,
          url: `${BASE}${resolvedPath}`,
          data: parsedBody,
          headers: { "Content-Type": "application/json" },
        });
      }

      setStatus(res.status);
      setResponse(res.data);
      if (onSuccess) onSuccess(res.data);
      setOpen(true);
    } catch (err) {
      setStatus(err.response?.status || 0);
      setResponse(err.response?.data || { error: err.message });
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const isOk = status >= 200 && status < 300;

  return (
    <div style={S.card}>
      <div style={S.cardHeader} onClick={() => setOpen((o) => !o)}>
        <span style={S.methodBadge(method)}>{method}</span>
        <span style={S.urlText}>{BASE}{resolvedPath}</span>
        <span style={{ fontSize: "0.8rem", color: "#6b7280" }}>{name}</span>
        {status !== null && <span style={S.statusBadge(status)}>{status}</span>}
        <span style={{ color: "#4b5563", fontSize: "0.7rem", marginLeft: "0.5rem" }}>{open ? "▲" : "▼"}</span>
      </div>

      {open && (
        <div style={S.cardBody}>
          {note && (
            <div style={{ fontSize: "0.78rem", color: "#f59e0b", background: "#1c1505", border: "1px solid #3d2e0a", borderRadius: 6, padding: "0.5rem 0.75rem", marginTop: "0.75rem" }}>
              ⚠ {note}
            </div>
          )}

          {defaultBody !== undefined && (
            <>
              <label style={S.label}>Request Body (JSON)</label>
              <textarea
                style={{ ...S.textarea, minHeight: 100 }}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                spellCheck={false}
              />
            </>
          )}

          <button style={S.sendBtn(loading)} onClick={send} disabled={loading}>
            {loading ? "Sending…" : `Send ${method}`}
          </button>

          {response !== null && (
            <div>
              <div style={{ display: "flex", alignItems: "center", marginTop: "0.9rem" }}>
                <span style={{ fontSize: "0.7rem", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.1em" }}>Response</span>
                <span style={S.statusBadge(status)}>{status} {isOk ? "OK" : "Error"}</span>
              </div>
              <pre style={S.responsePre(isOk)}>
                {JSON.stringify(response, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Main page ── */
export default function ApiTestPage() {
  const initialStoredToken = getStoredToken() || "";
  const initialStoredUser = localStorage.getItem(USER_STORAGE_KEY);
  let initialStoredUserId = "";

  if (initialStoredUser) {
    try {
      initialStoredUserId = JSON.parse(initialStoredUser)?.id?.toString() || "";
    } catch {
      initialStoredUserId = "";
    }
  }

  const [storedToken,  setStoredToken]  = useState(initialStoredToken);
  const [storedUserId, setStoredUserId] = useState(initialStoredUserId);
  const [params, setParams]             = useState({
    userId: initialStoredUserId,
    entryId: "",
    promptId: "",
  });
  const [loginEmail,    setLoginEmail]    = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginStatus,   setLoginStatus]   = useState(null);
  const [loginLoading,  setLoginLoading]  = useState(false);

  const saveAuthData = useCallback((data) => {
    if (data?.token) {
      localStorage.setItem("token", data.token);
      localStorage.removeItem("jwt");
      localStorage.removeItem("held_token");
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data));
      setStoredToken(data.token);
      setStoredUserId(data.id?.toString() || "");
      setParams((p) => ({ ...p, userId: data.id?.toString() || "" }));
    }
  }, []);

  const handleQuickLogin = async () => {
    setLoginLoading(true);
    setLoginStatus(null);
    try {
      const res = await axios.post(`${BASE}/api/auth/login`, {
        email: loginEmail,
        password: loginPassword,
      });
      saveAuthData(res.data);
      setLoginStatus({ ok: true, msg: `Logged in as ${res.data.username} (${res.data.role})` });
    } catch (err) {
      setLoginStatus({ ok: false, msg: err.response?.data?.message || err.message });
    } finally {
      setLoginLoading(false);
    }
  };

  const handleClearToken = () => {
    clearStoredAuth();
    setStoredToken("");
    setStoredUserId("");
    setParams((p) => ({ ...p, userId: "" }));
  };

  const setParam = (key) => (e) => setParams((p) => ({ ...p, [key]: e.target.value }));

  const hasToken = !!storedToken;

  return (
    <div style={S.page}>
      {/* Top bar */}
      <div style={S.topbar}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span style={S.logo}>Held</span>
          <span style={{ fontSize: "0.7rem", color: "#4b5563", letterSpacing: "0.1em", textTransform: "uppercase" }}>API Tester</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={S.tokenBadge(hasToken)}>
            <span>{hasToken ? "🟢" : "🔴"}</span>
            <span>{hasToken ? `Token: ${storedToken.slice(0, 24)}…` : "No token"}</span>
            {storedUserId && <span style={{ opacity: 0.6 }}>| uid: {storedUserId}</span>}
          </div>
          {hasToken && (
            <button onClick={handleClearToken} style={{ background: "none", border: "1px solid #374151", borderRadius: 6, color: "#9ca3af", fontSize: "0.72rem", padding: "0.3rem 0.6rem", cursor: "pointer" }}>
              Clear
            </button>
          )}
        </div>
      </div>

      <div style={S.container}>
        {/* Quick login */}
        <div style={{ ...S.card, marginBottom: "2rem" }}>
          <div style={{ ...S.cardHeader, cursor: "default" }}>
            <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6b7280" }}>Quick Login</span>
          </div>
          <div style={S.cardBody}>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 180 }}>
                <label style={S.label}>Email</label>
                <input style={S.input} type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="you@held.com" />
              </div>
              <div style={{ flex: 1, minWidth: 160 }}>
                <label style={S.label}>Password</label>
                <input style={S.input} type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="••••••••" onKeyDown={(e) => e.key === "Enter" && handleQuickLogin()} />
              </div>
              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <button style={S.sendBtn(loginLoading)} onClick={handleQuickLogin} disabled={loginLoading}>
                  {loginLoading ? "Logging in…" : "Login & Save Token"}
                </button>
              </div>
            </div>
            {loginStatus && (
              <div style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: loginStatus.ok ? "#4ade80" : "#f87171", fontFamily: "monospace" }}>
                {loginStatus.ok ? "✓" : "✗"} {loginStatus.msg}
              </div>
            )}
          </div>
        </div>

        {/* Global params */}
        <div style={{ ...S.card, marginBottom: "2rem" }}>
          <div style={{ ...S.cardHeader, cursor: "default" }}>
            <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6b7280" }}>Path Parameters</span>
          </div>
          <div style={{ ...S.cardBody, display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {[
              { key: "userId",   label: "User ID",   hint: "used in /user/{userId}" },
              { key: "entryId",  label: "Entry ID",  hint: "used in /entries/{id}" },
              { key: "promptId", label: "Prompt ID", hint: "used in /prompts/{id}" },
            ].map(({ key, label, hint }) => (
              <div key={key} style={{ flex: 1, minWidth: 140 }}>
                <label style={S.label}>{label}</label>
                <input
                  style={S.input}
                  value={params[key]}
                  onChange={setParam(key)}
                  placeholder={hint}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── AUTH ── */}
        <div style={S.section}>
          <div style={S.sectionTitle}>Auth — Public</div>
          <EndpointCard name="Register" method="POST" path="/api/auth/register" useAuth={false} params={params}
            defaultBody={{ username: "newuser", email: "newuser@held.com", password: "password123" }}
            onSuccess={saveAuthData}
          />
          <EndpointCard name="Login" method="POST" path="/api/auth/login" useAuth={false} params={params}
            defaultBody={{ email: "testuser@held.com", password: "password123" }}
            onSuccess={saveAuthData}
          />
        </div>

        {/* ── JOURNAL ENTRIES ── */}
        <div style={S.section}>
          <div style={S.sectionTitle}>Journal Entries — requires token</div>
          <EndpointCard name="Create Entry" method="POST" path="/api/journal" useAuth params={params}
            defaultBody={{ title: "My Entry", content: "Today I felt grateful for small things.", mood: "grateful", date: "2026-04-27" }}
          />
          <EndpointCard name="Get All Entries" method="GET" path="/api/journal" useAuth params={params} />
          <EndpointCard name="Get Entry by ID" method="GET" path="/api/journal/{id}" useAuth params={params} />
          <EndpointCard name="Update Entry" method="PUT" path="/api/journal/{id}" useAuth params={params}
            defaultBody={{ title: "Updated Title", content: "Revised entry content.", mood: "happy", date: "2026-04-27" }}
          />
          <EndpointCard name="Delete Entry" method="DELETE" path="/api/journal/{id}" useAuth params={params} />
        </div>

        {/* ── PROMPTS ── */}
        <div style={S.section}>
          <div style={S.sectionTitle}>Prompts — GET requires token · POST/DELETE require ADMIN</div>
          <EndpointCard name="Get All Prompts" method="GET" path="/api/prompts" useAuth params={params} />
          <EndpointCard name="Create Prompt" method="POST" path="/api/prompts" useAuth params={params}
            defaultBody={{ question: "What is one thing you are proud of today?" }}
            note="Requires ADMIN role token"
          />
          <EndpointCard name="Delete Prompt" method="DELETE" path="/api/prompts/{promptId}" useAuth params={params}
            note="Requires ADMIN role token"
          />
        </div>

        {/* ── RESPONSES ── */}
        <div style={S.section}>
          <div style={S.sectionTitle}>Responses — requires token</div>
          <EndpointCard name="Create Response" method="POST" path="/api/responses" useAuth params={params}
            defaultBody={{ entryId: Number(params.entryId) || 1, promptId: Number(params.promptId) || 1, responseText: "Reflecting on this helped me understand myself better." }}
          />
          <EndpointCard name="Get Responses for Entry" method="GET" path="/api/responses/entry/{entryId}" useAuth params={params} />
        </div>

        {/* ── ADMIN ── */}
        <div style={S.section}>
          <div style={S.sectionTitle}>Admin — requires ADMIN token</div>
          <EndpointCard name="Get All Users" method="GET" path="/api/admin/users" useAuth params={params}
            note="Requires ADMIN role token"
          />
          <EndpointCard name="Delete User" method="DELETE" path="/api/admin/users/{userId}" useAuth params={params}
            note="Requires ADMIN role token — make sure userId is set to a test account"
          />
        </div>

        <div style={{ textAlign: "center", fontSize: "0.72rem", color: "#374151", marginTop: "2rem" }}>
          Backend: <span style={{ fontFamily: "monospace", color: "#6b7280" }}>{BASE}</span>
          {" · "}
          Import <span style={{ fontFamily: "monospace", color: "#6b7280" }}>held-api-collection.json</span> into Postman for the full collection
        </div>
      </div>
    </div>
  );
}
