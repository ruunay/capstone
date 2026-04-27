jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api.js";

const mockEntries = [
  {
    id: "mock-1",
    title: "Too much on my plate",
    content: "I woke up already feeling behind. My to-do list is longer than the day and I cannot seem to catch up no matter how hard I try.",
    moodType: "overwhelmed",
    moodIntensity: 9,
    createdAt: "2026-04-26T10:00:00"
  },
  {
    id: "mock-2",
    title: "Small moments of grace",
    content: "There is this morning light that comes through my window at just the right angle. I am trying to collect it.",
    moodType: "grateful",
    moodIntensity: 7,
    createdAt: "2026-04-25T08:30:00"
  },
  {
    id: "mock-3",
    title: "The weight of it all",
    content: "I keep telling myself I am fine. My chest tightens when I think about it.",
    moodType: "anxious",
    moodIntensity: 8,
    createdAt: "2026-04-25T14:00:00"
  },
  {
    id: "mock-4",
    title: "She is back",
    content: "I laughed today — really laughed — and it surprised me. I had forgotten what that felt like.",
    moodType: "happy",
    moodIntensity: 8,
    createdAt: "2026-04-24T16:00:00"
  },
  {
    id: "mock-5",
    title: "A quiet kind of ache",
    content: "Missing someone I cannot call. The grief is softer now but it still finds me in quiet moments.",
    moodType: "sad",
    moodIntensity: 6,
    createdAt: "2026-04-24T20:00:00"
  }
];

export default function JournalListPage() {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingMock, setUsingMock] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("held_user");
    if (!userData) {
      navigate("/login");
      return;
    }

    const user = JSON.parse(userData);
    const userId = user?.id;

    if (!userId) {
      navigate("/login");
      return;
    }

    api.get(`/api/journal-entries/user/${userId}`)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setEntries(res.data);
          setUsingMock(false);
        } else {
          setEntries(mockEntries);
          setUsingMock(true);
        }
      })
      .catch(() => {
        setEntries(mockEntries);
        setUsingMock(true);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Loading your journal...</div>;

  return (
    <div className="page">
      <div className="page-header">
        <h2>My Journal</h2>
        <Link to="/journal/new">
          <button className="btn">+ New Entry</button>
        </Link>
      </div>

      {usingMock && (
        <div className="mock-banner">
          These are example entries to inspire you. Write your first entry to get started.
        </div>
      )}

      <div className="entries-grid">
        {entries.map((entry) => (
          <Link
            to={typeof entry.id === "string" && entry.id.startsWith("mock")
              ? "#"
              : `/journal/entry/${entry.id}`}
            key={entry.id}
            className="entry-card-link"
          >
            <div className={`card entry-card mood-${entry.moodType}`}>
              <div className="entry-mood-tag">{entry.moodType}</div>
              <h4>{entry.title || "Untitled Entry"}</h4>
              <p>{entry.content.slice(0, 120)}...</p>
              <div className="entry-meta">
                <span>Intensity: {entry.moodIntensity}/10</span>
                <span>{new Date(entry.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
