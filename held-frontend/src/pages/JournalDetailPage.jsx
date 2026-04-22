import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api.js";

export default function JournalDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/api/journal-entries/${id}`)
      .then((res) => setEntry(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this entry?")) return;
    await api.delete(`/api/journal-entries/${id}`);
    navigate("/journal");
  };

  if (loading)
    return <div className="page fade-in loading">Loading your entry…</div>;

  if (!entry)
    return (
      <div className="page fade-in">
        <div className="error-msg">Entry not found.</div>
      </div>
    );

  return (
    <div className="page journal-detail-page theme-soft-pink fade-in">
      <div className="journal-background-blur" />

      <div className="detail-card glass-card">
        {/* HEADER */}
        <div className="detail-header">
          <div className="entry-mood-tag detail-mood">{entry.moodType}</div>
          <span className="detail-date">
            {new Date(entry.createdAt).toLocaleDateString()}
          </span>
        </div>

        {/* TITLE */}
        <h2 className="detail-title">
          {entry.title || "Untitled Entry"}
        </h2>

        {/* CONTENT */}
        <p className="detail-content">
          {entry.content}
        </p>

        {/* INTENSITY */}
        <div className="detail-intensity">
          Mood Intensity: <span>{entry.moodIntensity}/10</span>
        </div>

        {/* ACTIONS */}
        <div className="detail-actions">
          <button
            className="btn btn-outline detail-back-btn"
            onClick={() => navigate("/journal")}
          >
            ← Back to Journal
          </button>

          <button
            className="btn btn-danger detail-delete-btn"
            onClick={handleDelete}
          >
            Delete Entry
          </button>
        </div>
      </div>
    </div>
  );
}
