import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../services/api.js";
import JournalBook from "../components/journal/JournalBook.jsx";
import ChatWidget from "../components/chat/ChatWidget.jsx";

const MOOD_PROMPTS = {
  happy: "What made today feel good? Describe the moment, the feeling in your body, the small details you want to remember.",
  sad: "What is weighing on your heart right now? You do not have to explain it or fix it. Just let it out here.",
  anxious: "What is your mind circling around right now? Write it all out without editing yourself. Get it out of your head and onto the page.",
  angry: "What happened? What did it feel like? What do you wish you could have said or done differently?",
  grateful: "What are you grateful for in this moment? Go deeper than the surface. What does this gratitude feel like in your body?",
  overwhelmed: "What feels like too much right now? If you could set one thing down today, what would it be and why?",
  neutral: "What has been on your mind lately? Sometimes the quiet days hold the most important thoughts.",
};

export default function JournalCreatePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({
    title: "",
    content: "",
    mood: location.state?.mood || "",
    date: new Date().toISOString().split("T")[0],
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.content.trim()) {
      setError("Please write something before saving.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const payload = {
        title: form.title.trim(),
        content: form.content.trim(),
        mood: form.mood,
        date: form.date,
      };

      await api.post("/api/journal", payload);
      navigate("/journal", {
        replace: true,
        state: { refreshJournalList: Date.now() },
      });
    } catch (err) {
      setError(
        err?.response?.data?.message || "Could not save entry. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  const currentPrompt = form.mood ? MOOD_PROMPTS[form.mood] : null;

  return (
    <div className="page journal-create-page">
      <div className="page-header">
        <h2>New Entry</h2>
      </div>

      <div className="journal-create-layout">
        {/* Book side */}
        <div className="journal-book-side">
          <JournalBook>
            <form onSubmit={onSubmit} className="journal-form">
              {error && <div className="error-msg">{error}</div>}

              {currentPrompt && (
                <div
                  key={form.mood}
                  style={{
                    animation: "fadeIn 0.4s ease-out both",
                    borderTop: "1.5px solid rgba(232,137,156,0.35)",
                    paddingTop: "0.75rem",
                    marginBottom: "0.25rem",
                  }}
                >
                  <p style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontSize: "1.05rem",
                    color: "#c96b88",
                    lineHeight: 1.65,
                    margin: 0,
                  }}>
                    {currentPrompt}
                  </p>
                </div>
              )}

              <input
                className="journal-title-input"
                placeholder="Entry title…"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
              />

              <textarea
                className="journal-content-input"
                placeholder="Write freely… this is your space."
                value={form.content}
                rows={8}
                onChange={(e) => update("content", e.target.value)}
              />

              <div className="journal-meta-row">
                <select
                  className="input"
                  value={form.mood}
                  onChange={(e) => update("mood", e.target.value)}
                  style={{ flex: 1 }}
                >
                  <option value="">How are you feeling?</option>
                  <option value="happy">Happy</option>
                  <option value="grateful">Grateful</option>
                  <option value="neutral">Neutral</option>
                  <option value="sad">Sad</option>
                  <option value="anxious">Anxious</option>
                  <option value="angry">Angry</option>
                  <option value="overwhelmed">Overwhelmed</option>
                </select>
              </div>

              <button className="btn btn-full" type="submit" disabled={saving}>
                {saving ? "Saving…" : "Save Entry"}
              </button>
            </form>
          </JournalBook>
        </div>

        {/* Chat side */}
        <div className="chat-side">
          <div className="card">
            <h4 className="chat-title">Guided Reflection</h4>
            <p className="chat-subtitle">Let Held help you go deeper.</p>
            <ChatWidget moodType={form.mood} journalEntry={form} />
          </div>
        </div>
      </div>
    </div>
  );
}
