import React, { useState } from "react";

const affirmations = [
  { id: 1, text: "I am becoming softer and stronger every day.", image: "/images/aff1.jpg" },
  { id: 2, text: "My feelings are valid, gentle, and welcome here.", image: "/images/aff2.jpg" },
  { id: 3, text: "I choose peace over pressure today.", image: "/images/aff3.jpg" },
  { id: 4, text: "I am allowed to rest without guilt.", image: "/images/aff4.jpg" },
  { id: 5, text: "I trust the timing of my life.", image: "/images/aff5.jpg" },
];

const natureVisuals = [
  { id: 1, label: "Forest", image: "/images/nature-forest.jpg" },
  { id: 2, label: "Ocean", image: "/images/nature-ocean.jpg" },
  { id: 3, label: "Rain", image: "/images/nature-rain.jpg" },
  { id: 4, label: "Mountains", image: "/images/nature-mountain.jpg" },
];

export default function AffirmationsPortal() {
  const [sound, setSound] = useState("forest");

  return (
    <div className="page affirmations-page">
      <div className="affirmations-bg-blobs"></div>
      <div className="affirmations-bg-texture"></div>

      <div className="affirmations-header">
        <h2 className="affirmations-title">Affirmations & Nature</h2>
        <p className="affirmations-subtitle">
          A soft sanctuary of grounding words, nature sounds, and gentle visuals
          to soothe your nervous system.
        </p>
      </div>

      <div className="daily-affirmation glass-card hover-lift">
        <h3 className="daily-title">Your Daily Affirmation</h3>
        <p className="daily-text">
          “I am safe to slow down and breathe.”
        </p>
      </div>

      <div className="nature-sounds-section glass-card">
        <h3 className="section-title">Nature Sounds</h3>
        <p className="section-subtitle">Choose a sound to accompany your reflection.</p>

        <div className="sound-options">
          <button
            className={`sound-btn ${sound === "forest" ? "active" : ""}`}
            onClick={() => setSound("forest")}
          >
            🌲 Forest
          </button>
          <button
            className={`sound-btn ${sound === "ocean" ? "active" : ""}`}
            onClick={() => setSound("ocean")}
          >
            🌊 Ocean
          </button>
          <button
            className={`sound-btn ${sound === "rain" ? "active" : ""}`}
            onClick={() => setSound("rain")}
          >
            🌧️ Rain
          </button>
          <button
            className={`sound-btn ${sound === "wind" ? "active" : ""}`}
            onClick={() => setSound("wind")}
          >
            🍃 Wind
          </button>
        </div>
      </div>

      <div className="affirmation-grid-section">
        <h3 className="section-title">Affirmation Gallery</h3>
        <p className="section-subtitle">
          Soft reminders for your heart — curated for your inner peace.
        </p>

        <div className="affirmation-masonry">
          {affirmations.map((a) => (
            <div key={a.id} className="affirmation-card glass-card hover-lift">
              <div className="affirmation-image-wrapper">
                <img src={a.image} alt="affirmation" className="affirmation-image" />
                <div className="affirmation-overlay"></div>
              </div>
              <p className="affirmation-text">“{a.text}”</p>
            </div>
          ))}
        </div>
      </div>

      <div className="nature-visuals-section">
        <h3 className="section-title">Nature Visuals</h3>
        <p className="section-subtitle">
          Choose a calming scene to ground your mind and soften your breath.
        </p>

        <div className="nature-visuals-grid">
          {natureVisuals.map((v) => (
            <div key={v.id} className="nature-card glass-card hover-lift">
              <img src={v.image} alt={v.label} className="nature-image" />
              <div className="nature-label">{v.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
