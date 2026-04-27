import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../services/api.js";

function normalizeEntry(entry) {
  return {
    id: entry.id,
    title: entry.title || "Untitled Entry",
    content: entry.content || "",
    mood: entry.mood ?? entry.moodType ?? "neutral",
    date: entry.date ?? entry.createdAt ?? null,
  };
}

export default function JournalListPage() {
  const { token, loading: authLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (authLoading) return;

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    let ignore = false;

    api
      .get("/api/journal")
      .then((res) => {
        if (ignore) return;
        const normalized = Array.isArray(res.data)
          ? res.data.map(normalizeEntry)
          : [];
        setEntries(normalized);
      })
      .catch((err) => {
        if (ignore) return;
        setError(
          err?.response?.data?.message ||
            "We could not load your journal entries right now."
        );
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [authLoading, token, navigate, location.state?.refreshJournalList]);

  if (loading) return <div className="loading">Loading your entries...</div>;

  if (error) {
    return (
      <div className="page fade-in">
        <div className="page-header">
          <h2>My Journal</h2>
          <Link to="/journal/new">
            <button className="btn">+ New Entry</button>
          </Link>
        </div>
        <div className="error-msg">{error}</div>
      </div>
    );
  }

  return (
    <div className="page fade-in">
      <div className="page-header">
        <h2>My Journal</h2>
        <Link to="/journal/new">
          <button className="btn">+ New Entry</button>
        </Link>
      </div>

      {entries.length === 0 ? (
        <div className="empty-state">
          <p>You have not written any entries yet.</p>
          <Link to="/journal/new">
            <button className="btn">Write your first entry</button>
          </Link>
        </div>
      ) : (
        <div className="entries-grid">
          {entries.map((entry) => (
            <Link
              to={`/journal/entry/${entry.id}`}
              key={entry.id}
              className="entry-card-link"
            >
              <div className={`card entry-card mood-${entry.mood}`}>
                <div className="entry-mood-tag">{entry.mood}</div>
                <h4>{entry.title}</h4>
                <p>
                  {entry.content.length > 120
                    ? `${entry.content.slice(0, 120)}...`
                    : entry.content}
                </p>
                <div className="entry-meta">
                  <span>{entry.date ? new Date(entry.date).toLocaleDateString() : ""}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
