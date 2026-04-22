import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api.js";

export default function JournalListPage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/api/journal-entries/user/1")
      .then((res) => setEntries(res.data))
      .catch(() => setError("Could not load your entries."))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return <div className="loading page fade-in">Loading your entries…</div>;

  if (error)
    return <div className="page fade-in"><div className="error-msg">{error}</div></div>;

  return (
    <div className="page journal-list-page theme-soft-pink fade-in">
      <div className="journal-background-blur" />

      {/* HEADER */}
      <div className="page-header journal-header">
        <div>
          <h2 className="journal-title">My Journal</h2>
          <p className="journal-subtitle">
            A soft archive of your thoughts, feelings, and growth.
          </p>
        </div>

        <Link to="/journal/new">
          <button className="btn btn-auth">+ New Entry</button>
        </Link>
      </div>

      {/* EMPTY STATE */}
      {entries.length === 0 ? (
        <div className="empty-state glass-card fade-in">
          <h3 className="empty-title">Your journal is waiting for you</h3>
          <p className="empty-text">
            You haven’t written anything yet — your first entry could be the
            start of something beautiful.
          </p>
          <Link to="/journal/new">
            <button className="btn btn-auth">Write your first entry</button>
          </Link>
        </div>
      ) : (
        /* ENTRIES GRID */
        <div className="entries-grid journal-grid fade-in">
          {entries.map((entry) => (
            <Link
              to={`/journal/entry/${entry.id}`}
              key={entry.id}
              className="entry-card-link"
            >
              <div className="card entry-card glass-card hover-lift">
                <div className="entry-mood-tag">{entry.moodType}</div>

                <h4 className="entry-title">
                  {entry.title || "Untitled Entry"}
                </h4>

                <p className="entry-preview">
                  {entry.content.slice(0, 140)}…
                </p>

                <div className="entry-meta">
                  <span className="entry-intensity">
                    Intensity: {entry.moodIntensity}/10
                  </span>
                  <span className="entry-date">
                    {new Date(entry.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
