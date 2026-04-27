import React, { useEffect, useState } from "react";
import api from "../services/api.js";

const BOARD_GRADIENTS = [
  "linear-gradient(135deg, rgba(255,182,211,0.25), rgba(232,137,156,0.2))",
  "linear-gradient(135deg, rgba(204,233,214,0.25), rgba(168,212,184,0.2))",
  "linear-gradient(135deg, rgba(255,182,211,0.18), rgba(204,233,214,0.18))",
  "linear-gradient(135deg, rgba(212,175,122,0.2),  rgba(255,182,211,0.18))",
  "linear-gradient(135deg, rgba(139,92,185,0.2),   rgba(255,182,211,0.15))",
];

const DAILY_PROMPTS = [
  "What is one thing you are letting go of this week?",
  "Describe the last moment you felt truly at peace.",
  "What does your body need from you today?",
  "Who or what has been holding space for you lately?",
  "What would you do today if fear was not in the room?",
  "What is a small act of love you can give yourself right now?",
  "What emotion have you been avoiding, and what might it be trying to tell you?",
];

const MOCK_RESPONSES = [
  {
    id: 1,
    initials: "SA",
    name: "moonflower",
    text: "I am letting go of the need to have everything figured out. It is exhausting to carry certainty like a shield. Some things are allowed to stay soft and open.",
    likes: 24,
    liked: false,
  },
  {
    id: 2,
    initials: "MR",
    name: "quietstorm",
    text: "Yesterday morning, coffee in hand, watching the rain. No phone. No pressure. Just me and the sound of the world waking up. I want to live in that moment forever.",
    likes: 17,
    liked: false,
  },
  {
    id: 3,
    initials: "JL",
    name: "innerlight",
    text: "My body needs sleep that is not haunted by tomorrow's list. It needs food I actually enjoy. It needs me to stop apologising for taking up space.",
    likes: 31,
    liked: false,
  },
  {
    id: 4,
    initials: "NW",
    name: "softground",
    text: "My best friend has been holding space for me through the hardest season of my life. She does not try to fix it. She just stays. That is everything.",
    likes: 19,
    liked: false,
  },
  {
    id: 5,
    initials: "CK",
    name: "stillwater",
    text: "I would call her. The person I have been too scared to reach out to. I would just say hi. No agenda. Fear makes the smallest things feel impossible.",
    likes: 13,
    liked: false,
  },
  {
    id: 6,
    initials: "RP",
    name: "goldenhour",
    text: "A long bath without rushing. A meal I actually sit down to eat. An hour of reading without guilt. Self-love is almost never dramatic — it is always just this.",
    likes: 28,
    liked: false,
  },
];

export default function CommunityPage() {
  const [prompts, setPrompts]               = useState([]);
  const [loading, setLoading]               = useState(true);
  const [visionBoards, setVisionBoards]     = useState([]);
  const [responses, setResponses]           = useState(MOCK_RESPONSES);
  const [newResponse, setNewResponse]       = useState("");
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [toast, setToast]                   = useState("");

  const todayPrompt = DAILY_PROMPTS[new Date().getDay()];

  useEffect(() => {
    api
      .get("/api/prompts")
      .then((res) => setPrompts(res.data))
      .catch(() => setPrompts([]))
      .finally(() => setLoading(false));
  }, []);

  const toggleLike = (id) => {
    setResponses((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, liked: !r.liked, likes: r.liked ? r.likes - 1 : r.likes + 1 }
          : r
      )
    );
  };

  const submitResponse = () => {
    if (!newResponse.trim()) return;
    const newEntry = {
      id: Date.now(),
      initials: "ME",
      name: "You",
      text: newResponse.trim(),
      likes: 0,
      liked: false,
    };
    setResponses((prev) => [newEntry, ...prev]);
    setNewResponse("");
  };

  const openMemberModal = () => setShowMemberModal(true);

  const handleStartMembership = () => {
    setShowMemberModal(false);
    setToast("Coming soon! Membership features are on the way.");
    setTimeout(() => setToast(""), 3500);
  };

  const closeMemberModal = (e) => {
    if (e.target === e.currentTarget) setShowMemberModal(false);
  };

  return (
    <div className="page fade-in">
      <div className="page-header">
        <div>
          <h2>Held Community</h2>
          <p className="community-subtitle">
            A curated space for shared reflections and soft prompts from the Held sisterhood.
          </p>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontStyle: "italic", marginTop: "-1.25rem", marginBottom: "1.5rem" }}>
            This is a safe and anonymous space. Your identity is protected within the community.
          </p>
        </div>
      </div>

      {/* Daily Prompt */}
      <div style={{
        borderRadius: "var(--radius)",
        padding: "2rem",
        marginBottom: "2rem",
        background: "linear-gradient(135deg, rgba(255,182,211,0.1), rgba(212,175,122,0.08))",
        border: "1px solid rgba(255,182,211,0.18)",
      }}>
        <div style={{ fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.6rem", fontWeight: 600 }}>
          Today's Prompt
        </div>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(1.15rem, 2.5vw, 1.55rem)",
          fontStyle: "italic",
          color: "var(--text)",
          lineHeight: 1.65,
          marginBottom: "1.5rem",
        }}>
          "{todayPrompt}"
        </p>

        {/* Community responses */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", marginBottom: "1.25rem" }}>
          {responses.map((r) => (
            <div key={r.id} style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "0.75rem",
              padding: "0.9rem 1rem",
              borderRadius: "var(--radius-sm)",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid var(--border)",
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                background: "linear-gradient(135deg, var(--accent), #d4af7a)",
                color: "#fff", display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: "0.72rem", fontWeight: 700,
                flexShrink: 0,
              }}>
                {r.initials}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--pink)", marginBottom: "0.3rem" }}>
                  @{r.name}
                </div>
                <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.6, margin: 0 }}>
                  {r.text}
                </p>
              </div>
              <button
                onClick={() => toggleLike(r.id)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  display: "flex", flexDirection: "column", alignItems: "center",
                  gap: "0.15rem", padding: "0.25rem", flexShrink: 0,
                  color: r.liked ? "var(--accent)" : "var(--text-muted)",
                  transition: "color 0.2s",
                }}
              >
                <span style={{ fontSize: "1.1rem" }}>{r.liked ? "♥" : "♡"}</span>
                <span style={{ fontSize: "0.7rem" }}>{r.likes}</span>
              </button>
            </div>
          ))}
        </div>

        {/* User input */}
        <div style={{ display: "flex", gap: "0.6rem" }}>
          <input
            className="input"
            style={{ flex: 1 }}
            placeholder="Share your reflection anonymously…"
            value={newResponse}
            onChange={(e) => setNewResponse(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submitResponse()}
          />
          <button className="btn" onClick={submitResponse} disabled={!newResponse.trim()}>
            Share
          </button>
        </div>
      </div>

      {/* API prompts (if any) */}
      {!loading && prompts.length > 0 && (
        <>
          <h3 style={{ marginBottom: "1rem" }}>More Prompts</h3>
          <div className="community-masonry" style={{ marginBottom: "2rem" }}>
            {prompts.map((prompt) => (
              <div key={prompt.id} className="card community-card hover-lift">
                <div className="community-tag prompt">Prompt</div>
                <div className="community-card-content">
                  <p className="community-text">{prompt.question || prompt.text}</p>
                </div>
                <div className="community-actions">
                  <button className="btn-ghost">♡</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Vision Boards */}
      <div className="vision-board-section">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h3 className="vision-board-title">Vision Boards</h3>
            <span className="members-badge">Members Only ✦</span>
          </div>
          <button className="btn btn-sm" onClick={openMemberModal}>
            + New Board
          </button>
        </div>
        <p className="vision-board-subtitle">
          Create, curate, and share your monthly vision boards — a softer, more intentional way to manifest.
        </p>

        {/* Pinterest integration button */}
        <div style={{ marginBottom: "1.25rem" }}>
          <button
            onClick={openMemberModal}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem 1.25rem",
              borderRadius: "20px",
              background: "linear-gradient(135deg, rgba(230,0,35,0.12), rgba(255,182,211,0.1))",
              border: "1px solid rgba(230,0,35,0.2)",
              color: "var(--text-muted)",
              fontSize: "0.82rem",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(230,0,35,0.4)"; e.currentTarget.style.color = "var(--text)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(230,0,35,0.2)"; e.currentTarget.style.color = "var(--text-muted)"; }}
          >
            <span style={{ fontWeight: 700, fontSize: "1rem" }}>P</span>
            Connect Pinterest Boards
          </button>
        </div>

        <div className="vision-board-grid">
          <div className="vision-board-card vision-board-create-card" onClick={openMemberModal}>
            <div className="vision-board-create">
              <span className="vision-board-icon">+</span>
              <p>Create a vision board</p>
            </div>
          </div>

          {visionBoards.map((board) => (
            <div
              key={board.id}
              className="vision-board-card hover-lift"
              style={{
                background: board.gradient,
                border: "1px solid rgba(255,182,211,0.15)",
                flexDirection: "column",
                gap: "0.5rem",
                padding: "1.25rem",
              }}
            >
              <span style={{ fontSize: "1.5rem" }}>*</span>
              <p style={{ color: "var(--text)", fontSize: "0.9rem", fontWeight: 500, textAlign: "center" }}>
                {board.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Members Only Modal */}
      {showMemberModal && (
        <div className="modal-backdrop" onClick={closeMemberModal}>
          <div className="card modal-card fade-in" style={{ maxWidth: 480, padding: "2.5rem" }}>
            <div className="modal-header">
              <h3>Unlock the Full Held Experience</h3>
              <button className="modal-close" onClick={() => setShowMemberModal(false)}>✕</button>
            </div>

            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              Vision boards, Pinterest integration, unlimited journal entries, and deeper reflection tools are available to Held Members.
            </p>

            <div style={{
              padding: "1.25rem",
              borderRadius: "var(--radius-sm)",
              background: "linear-gradient(135deg, rgba(201,169,110,0.1), rgba(232,213,163,0.08))",
              border: "1px solid rgba(201,169,110,0.25)",
              marginBottom: "1.5rem",
            }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "var(--gold)", marginBottom: "0.75rem", fontWeight: 600 }}>
                Held Membership — $5.99/month
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 2 }}>
                • Unlimited journal entries<br />
                • Pinterest board integration<br />
                • Vision board creation and sharing<br />
                • Priority access to new features<br />
                • Ad-free experience
              </div>
            </div>

            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.65, marginBottom: "1.5rem", fontStyle: "italic" }}>
              Join a community of women committed to their growth and emotional wellness.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <button className="btn btn-full" onClick={handleStartMembership}>
                Start My Membership
              </button>
              <button className="btn btn-outline btn-full" onClick={() => setShowMemberModal(false)}>
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(30,10,20,0.95)",
          border: "1px solid rgba(255,182,211,0.3)",
          borderRadius: "var(--radius-sm)",
          padding: "0.75rem 1.5rem",
          color: "var(--pink)",
          fontSize: "0.88rem",
          zIndex: 1000,
          backdropFilter: "blur(12px)",
          animation: "fadeIn 0.3s ease",
          whiteSpace: "nowrap",
        }}>
          {toast}
        </div>
      )}
    </div>
  );
}
