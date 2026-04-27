import React from "react";

const mockPosts = [
  {
    id: 1,
    type: "prompt",
    content: "What is one thing you are proud of today?",
    author: "sarah",
    image: "/images/prompt-pink.jpg"
  },
  {
    id: 2,
    type: "moodboard",
    content: "Feeling grateful and calm 🌸",
    author: "brina",
    image: "/images/moodboard-green.jpg"
  },
  {
    id: 3,
    type: "prompt",
    content: "Write about a moment that changed you.",
    author: "jordan",
    image: "/images/prompt-grey.jpg"
  }
];

export default function CommunityPage() {
  return (
    <div className="page community-page">

      <div className="community-bg-blobs"></div>
      <div className="community-bg-texture"></div>

      <div className="community-header">
        <h2 className="community-title">Held Community</h2>
        <p className="community-subtitle">
          A curated space for shared reflections, aesthetic mood boards, and
          vision boards created by the Held sisterhood.
        </p>
      </div>

      <div className="community-masonry">
        {mockPosts.map((post) => (
          <div key={post.id} className="community-card glass-card hover-lift">
            <div className="community-image-wrapper">
              <img
                src={post.image}
                alt="community post"
                className="community-image"
              />
              <div className="community-image-overlay"></div>
            </div>

            <div className="community-card-content">
              <div className={`community-tag ${post.type}`}>
                {post.type === "prompt" ? "📝 Prompt" : "🎨 Mood Board"}
              </div>

              <p className="community-text">{post.content}</p>

              <div className="community-author">— {post.author}</div>

              <div className="community-actions">
                <button className="btn btn-ghost">♡</button>
                <button className="btn btn-ghost">💬</button>
                <button className="btn btn-ghost">↗</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="vision-board-section">
        <h3 className="vision-board-title">Monthly Vision Boards</h3>
        <p className="vision-board-subtitle">
          Create, curate, and share your 2–3 month vision boards — a softer,
          more intentional way to manifest without overwhelm.
        </p>

        <div className="vision-board-grid">
          {/* CREATE NEW */}
          <div className="vision-board-card glass-card hover-lift">
            <div className="vision-board-create">
              <span className="vision-board-icon">✨</span>
              <p>Create a new vision board</p>
            </div>
          </div>

          <div className="vision-board-card glass-card hover-lift">
            <div className="vision-board-collage">
              <img src="/images/vision1.jpg" className="vision-img" />
              <img src="/images/vision2.jpg" className="vision-img" />
              <img src="/images/vision3.jpg" className="vision-img" />
            </div>
            <p className="vision-board-label">March–May Vision Board</p>
          </div>
        </div>
      </div>
    </div>
  );
}
