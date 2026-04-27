import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const QUOTES = [
  "You are allowed to be both a masterpiece and a work in progress.",
  "She remembered who she was and the game changed.",
  "In the middle of difficulty lies opportunity.",
  "You are enough. You have always been enough.",
  "Bloom where you are planted.",
  "The most powerful thing you can do is exactly what you fear.",
  "She was a girl who knew how to be happy even when she was sad.",
  "Your vibe is your superpower.",
  "Healing is not linear.",
  "You deserve the love you keep trying to give everyone else.",
  "Be the energy you want to attract.",
  "Growth is uncomfortable because you have never been here before.",
  "Your only limit is your mind.",
  "She turned her cant into cans and her dreams into plans.",
  "The sky is not the limit. Your mind is.",
  "Everything you need is already within you.",
  "You are the hero of your own story.",
  "Rest is productive.",
  "You are not behind. You are on your own path.",
  "Trust the timing of your life.",
  "You were not made to be small.",
  "Stars cannot shine without darkness.",
  "Be gentle with yourself. You are a child of the universe.",
  "Your feelings are valid.",
  "She believed she could so she did.",
  "The present moment is your home.",
  "You attract what you are.",
  "Do it scared.",
  "Your sensitivity is your strength.",
  "You are becoming who you were always meant to be.",
  "Let go of who you think you should be and embrace who you are.",
  "You are worthy of rest.",
  "Breathe. You are exactly where you need to be.",
  "Your story is not over.",
  "Choose yourself every single day.",
  "You are not a burden. You are a gift.",
  "Soft is strong.",
  "Peace is your birthright.",
  "You are more powerful than you know.",
  "The universe is conspiring in your favor.",
  "You do not have to earn your worth.",
  "Every day is a second chance.",
  "Your mind is a garden. Tend to it.",
  "You are allowed to outgrow people.",
  "Be patient with yourself.",
  "Magic happens outside your comfort zone.",
  "You are braver than you believe.",
  "Your light is needed in this world.",
  "She is clothed in strength and dignity.",
  "You are held.",
];

const FEATURES = [
  {
    icon: "◈",
    iconBg: "linear-gradient(135deg, rgba(255,182,211,0.25), rgba(232,137,156,0.2))",
    title: "My Journal",
    description: "Revisit your past entries and witness your growth over time.",
    to: "/journal",
    label: "View Entries",
  },
  {
    icon: "◎",
    iconBg: "linear-gradient(135deg, rgba(204,233,214,0.25), rgba(168,212,184,0.2))",
    title: "Guided Reflection",
    description: "Let Held gently guide you through your thoughts with warm reflective prompts.",
    to: "/journal/new",
    label: "Start Session",
  },
  {
    icon: "◇",
    iconBg: "linear-gradient(135deg, rgba(255,228,240,0.2), rgba(255,182,211,0.15))",
    title: "Community",
    description: "Explore shared prompts and mood boards from the Held sisterhood.",
    to: "/community",
    label: "Explore",
  },
  {
    icon: "◉",
    iconBg: "linear-gradient(135deg, rgba(204,233,214,0.22), rgba(168,212,184,0.15))",
    title: "Affirmations",
    description: "A sanctuary of affirmations and nature scenes to soothe your nervous system.",
    to: "/affirmations",
    label: "Enter Portal",
  },
];

const MOODS = [
  { label: "Happy",       value: "happy" },
  { label: "Sad",         value: "sad" },
  { label: "Anxious",     value: "anxious" },
  { label: "Angry",       value: "angry" },
  { label: "Grateful",    value: "grateful" },
  { label: "Neutral",     value: "neutral" },
  { label: "Overwhelmed", value: "overwhelmed" },
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const name = user?.username || user?.email?.split("@")[0] || "love";
  const greeting = getGreeting();
  const dailyQuote = useMemo(
    () => QUOTES[Math.floor(Math.random() * QUOTES.length)],
    []
  );

  const handleMood = (value) => {
    navigate("/journal/new", { state: { mood: value } });
  };

  return (
    <div className="page fade-in">
      {/* Hero */}
      <div className="dashboard-hero glow-border" style={{ padding: "4rem 2.5rem" }}>
        <h2>{greeting}, {name}</h2>
        <p style={{ marginBottom: "0.5rem" }}>
          Take a breath. You made it here — and that already takes courage. This is your space to land, feel, and come back to yourself. No performance needed. Just you.
        </p>
        <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "1.5rem", fontStyle: "italic" }}>
          What would you like to explore today?
        </p>
        <Link to="/journal/new">
          <button className="btn btn-hero">Open My Journal</button>
        </Link>
      </div>

      {/* Daily quote */}
      <div className="card daily-quote-card">
        <p className="daily-quote-label">Today's Affirmation</p>
        <div className="daily-quote-text">
          <span className="daily-quote-mark">"</span>
          {dailyQuote}
          <span className="daily-quote-mark">"</span>
        </div>
      </div>

      {/* Mood check-in */}
      <div className="card mood-checkin-card">
        <p className="mood-checkin-title">How are you feeling today?</p>
        <div className="mood-buttons">
          {MOODS.map((m) => (
            <button
              key={m.value}
              className="mood-btn"
              onClick={() => handleMood(m.value)}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Feature cards */}
      <div className="dashboard-grid">
        {FEATURES.map((f) => (
          <div key={f.to} className="card feature-card hover-lift">
            <div className="feature-icon" style={{ background: f.iconBg }}>
              {f.icon}
            </div>
            <div className="feature-title">{f.title}</div>
            <p className="feature-description">{f.description}</p>
            <Link to={f.to}>
              <button className="btn btn-outline btn-sm">{f.label}</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
