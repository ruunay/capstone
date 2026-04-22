import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api.js";
import JournalBook from "../components/journal/JournalBook.jsx";
import ChatWidget from "../components/chat/ChatWidget.jsx";

export default function JournalCreatePage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    content: "",
    moodType: "",
    moodIntensity: 5,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await api.post("/api/journal-entries/user/1", form);
      navigate("/journal");
    } catch (err) {
      setError("Could not save entry. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="page journal-create-page theme-soft-pink">
      <div className="journal-background-blur" />

      <div className="journal-create-layout fade-in">
        {/* NOTEBOOK SECTION */}
        <div className="journal-book-side">
          <div className="notebook-wrapper notebook-open">
            <div className="notebook-page left-page">
              <form onSubmit={onSubmit} className="journal-form">
                {error && <div className="error-msg">{error}</div>}

                <input
                  className="journal-title-input"
                  placeholder="Title your entry..."
                  value={form.title}
                  onChange={(e) => update("title", e.target.value)}
                />

                <textarea
                  className="journal-content-input notebook-lines"
                  placeholder="Write freely… this page is yours."
                  value={form.content}
                  rows={10}
                  onChange={(e) => update("content", e.target.value)}
                  required
                />

                <div className="journal-meta-row">
                  <select
                    className="input journal-select"
                    value={form.moodType}
                    onChange={(e) => update("moodType", e.target.value)}
                    required
                  >
                    <option value="">How are you feeling?</option>
                    <option value="happy">Happy</option>
                    <option value="sad">Sad</option>
                    <option value="anxious">Anxious</option>
                    <option value="angry">Angry</option>
                    <option value="grateful">Grateful</option>
                    <option value="neutral">Neutral</option>
                    <option value="overwhelmed">Overwhelmed</option>
                  </select>

                  <div className="intensity-row">
                    <label>Intensity: {form.moodIntensity}</label>
                    <input
                      type="range"
                      min={1}
                      max={10}
                      value={form.moodIntensity}
                      onChange={(e) =>
                        update("moodIntensity", Number(e.target.value))
                      }
                    />
                  </div>
                </div>

                <button className="btn btn-full btn-auth" type="submit" disabled={saving}>
                  {saving ? "Saving..." : "Save Entry"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* GUIDED CHAT SECTION */}
        <div className="chat-side">
          <div className="chat-panel glass-card">
            <h3 className="chat-title">💬 Guided Reflection</h3>
            <p className="chat-subtitle">
              Let Held gently guide you through your thoughts.
            </p>

            <ChatWidget moodType={form.moodType} />
          </div>
        </div>
      </div>
    </div>
  );
}
