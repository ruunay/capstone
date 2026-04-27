import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function DashboardPage() {
  const { user } = useAuth();
  const name = user?.email?.split("@")[0] || "love";

  return (
    <div className="page dashboard-page">
      <div className="dashboard-bg-blobs"></div>
      <div className="dashboard-bg-texture"></div>


      <div className="dashboard-hero">
        <div className="hero-image-wrapper">
          <div className="hero-image-overlay"></div>
          <img
            src="/images/soft-nature-hero.jpg"
            alt="soft nature"
            className="hero-image"
          />
        </div>

        <div className="hero-content glass-card">
          <h2 className="hero-title">Welcome back, {name} 🌿</h2>
          <p className="hero-subtitle">
            Take a breath. This is your soft corner of the internet — a place to
            land, reflect, and reconnect with yourself.
          </p>

          <Link to="/journal/new">
            <button className="btn btn-hero">Open My Journal</button>
          </Link>
        </div>
      </div>

      
      <div className="dashboard-grid">
        {/* JOURNAL */}
        <div className="feature-card glass-card hover-lift">
          <div className="feature-image-wrapper">
            <img
              src="/images/journal-pink.jpg"
              alt="journal aesthetic"
              className="feature-image"
            />
          </div>
          <h3 className="feature-title">My Journal</h3>
          <p className="feature-description">
            Revisit your past entries and witness your growth.
          </p>
          <Link to="/journal">
            <button className="btn btn-outline feature-btn">View Entries</button>
          </Link>
        </div>

     
        <div className="feature-card glass-card hover-lift">
          <div className="feature-image-wrapper">
            <img
              src="/images/guided-chat-green.jpg"
              alt="guided chat"
              className="feature-image"
            />
          </div>
          <h3 className="feature-title">Guided Chat</h3>
          <p className="feature-description">
            Let Held gently guide you through your thoughts with warm,
            reflective prompts.
          </p>
          <Link to="/journal/new">
            <button className="btn btn-outline feature-btn">Start Session</button>
          </Link>
        </div>

    
        <div className="feature-card glass-card hover-lift">
          <div className="feature-image-wrapper">
            <img
              src="/images/community-moodboard.jpg"
              alt="community moodboard"
              className="feature-image"
            />
          </div>
          <h3 className="feature-title">Community</h3>
          <p className="feature-description">
            Explore aesthetic mood boards, shared prompts, and vision boards
            from the Held community.
          </p>
          <Link to="/community">
            <button className="btn btn-outline feature-btn">Explore</button>
          </Link>
        </div>

      
        <div className="feature-card glass-card hover-lift">
          <div className="feature-image-wrapper">
            <img
              src="/images/affirmations-nature.jpg"
              alt="affirmations nature"
              className="feature-image"
            />
          </div>
          <h3 className="feature-title">Affirmations & Nature</h3>
          <p className="feature-description">
            A soft sanctuary of affirmations, nature sounds, and grounding
            visuals to soothe your nervous system.
          </p>
          <Link to="/affirmations">
            <button className="btn btn-outline feature-btn">Enter Portal</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
