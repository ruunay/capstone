import React, { useState } from "react";

const affirmations = [
  "I am enough exactly as I am.",
  "My feelings are valid and worthy of space.",
  "I am learning and growing every single day.",
  "I choose peace over perfection.",
  "I deserve rest, joy, and love.",
  "My story is still being written.",
  "I am allowed to take up space.",
  "Healing is not linear and that is okay.",
  "I trust myself to handle whatever comes.",
  "I am worthy of the life I dream about.",
];

const nature = [
  { emoji: "🌸", label: "Cherry Blossom" },
  { emoji: "🌿", label: "Forest" },
  { emoji: "🌊", label: "Ocean" },
  { emoji: "🌙", label: "Moon" },
  { emoji: "☀️", label: "Sunrise" },
  { emoji: "🍃", label: "Breeze" },
];

export default function AffirmationsPage() {
  const [current, setCurrent] = useState(0);
  const [selectedNature, setSelectedNature] = useState(null);

  const next = () => setCurrent((c) => (c + 1) % affirmations.length);
  const prev = () =>
    setCurrent((c) => (c - 1 + affirmations.length) % affirmations.length);

  return (
    <div className="page affirmations-page">
      <div className="aff-hero">
        <h2>Daily Affirmations</h2>
        <p>Take a breath. You are held.</p>
      </div>

      <div className="aff-card card">
        <div className="aff-quote">
          <span className="aff-mark">"</span>
          {affirmations[current]}
          <span className="aff-mark">"</span>
        </div>
        <div className="aff-controls">
          <button className="btn btn-outline" onClick={prev}>←</button>
          <span className="aff-counter">
            {current + 1} / {affirmations.length}
          </span>
          <button className="btn btn-outline" onClick={next}>→</button>
        </div>
      </div>

      <div className="nature-section">
        <h3>Find Your Calm</h3>
        <p>Choose a nature scene to ground yourself.</p>
        <div className="nature-grid">
          {nature.map((n) => (
            <div
              key={n.label}
              className={`nature-card card ${
                selectedNature === n.label ? "selected" : ""
              }`}
              onClick={() => setSelectedNature(n.label)}
            >
              <div className="nature-emoji">{n.emoji}</div>
              <div className="nature-label">{n.label}</div>
            </div>
          ))}
        </div>
        {selectedNature && (
          <div className="nature-message card">
            <p>
              You chose <strong>{selectedNature}</strong>. Close your eyes,
              take three deep breaths, and imagine yourself there. You are safe.
              You are held.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
