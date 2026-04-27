import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChatWidget from "../components/chat/ChatWidget.jsx";
import api from "../services/api.js";

function normalizeEntry(entry) {
  return {
    ...entry,
    mood: entry.mood ?? entry.moodType ?? "neutral",
    date: entry.date ?? entry.createdAt ?? null,
  };
}

export default function JournalDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [showReflect, setShowReflect] = useState(false);

  useEffect(() => {
    let ignore = false;
    api
      .get(`/api/journal/${id}`)
      .then((res) => {
        if (!ignore) setEntry(normalizeEntry(res.data));
      })
      .catch(() => {
        if (!ignore) setEntry(null);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this entry? This cannot be undone.")) return;

    setDeleting(true);
    try {
      await api.delete(`/api/journal/${id}`);
      navigate("/journal", {
        replace: true,
        state: { refreshJournalList: Date.now() },
      });
    } catch {
      alert("Could not delete entry. Please try again.");
      setDeleting(false);
    }
  };

  if (loading) return <div className="loading">Loading your entry...</div>;

  if (!entry) {
    return (
      <div className="page fade-in">
        <div className="error-msg">Entry not found.</div>
      </div>
    );
  }

  return (
    <div className="page fade-in">
      <div className="detail-card card">
        <div className="detail-header">
          <div className="entry-mood-tag">{entry.mood || "—"}</div>
          <span className="detail-date">
            {entry.date
              ? new Date(entry.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : ""}
          </span>
        </div>

        <h2 style={{ margin: "1rem 0 0.25rem" }}>
          {entry.title || "Untitled Entry"}
        </h2>

        <p className="detail-content">{entry.content}</p>

        <div className="detail-actions">
          <button className="btn btn-outline" onClick={() => navigate("/journal")}>
            Back to Journal
          </button>
          <button
            className="btn btn-danger"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete Entry"}
          </button>
        </div>
      </div>

      <div style={{ marginTop: "1.5rem" }}>
        {!showReflect ? (
          <button
            className="btn btn-outline btn-full"
            onClick={() => setShowReflect(true)}
            style={{ fontSize: "0.92rem", padding: "0.85rem" }}
          >
            Reflect on this entry with Held
          </button>
        ) : (
          <div className="card fade-in" style={{ padding: "1.5rem" }}>
            <h4 style={{ marginBottom: "0.25rem" }}>Guided Reflection</h4>
            <p
              style={{
                fontSize: "0.85rem",
                color: "var(--text-muted)",
                marginBottom: "1.25rem",
              }}
            >
              Held will help you go deeper into what you wrote.
            </p>
            <ChatWidget moodType={entry.mood} journalEntry={entry} />
          </div>
        )}
      </div>
    </div>
  );
}
