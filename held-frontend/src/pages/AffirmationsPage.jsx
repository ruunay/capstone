import React, { useState, useEffect, useRef } from "react";

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
  "The woman you are becoming will cost you people, places, and things. Choose her anyway.",
  "You owe yourself the love that you so freely give to other people.",
  "She was unstoppable not because she did not have failures and doubts, but because she continued on despite them.",
  "In a world that wants women to whisper, I choose to yell.",
  "Your crown has been bought and paid for. Put it on your head and wear it.",
  "Darling, you are a wild thing and you were not made to be tamed.",
  "Do not shrink yourself to fit spaces you have outgrown.",
  "A woman who walks in purpose doesn't have to chase people or opportunities.",
  "There is no force more powerful than a woman determined to rise.",
  "You are not too much. You are just too much for the wrong people.",
  "She made broken look beautiful and strong look invincible.",
  "Own your story, or someone else will write it for you.",
  "You are the answer to a prayer you forgot you made.",
  "Reclaim your time, your energy, your joy. It was always yours.",
  "You do not need permission to take up space.",
  "The most radical thing you can do is rest.",
  "She needed a hero so that's what she became.",
  "Your softness is not weakness. It is a superpower.",
  "Let her be a mystery to those who never cared to learn her depths.",
  "You are allowed to want more.",
  "Nourish your body. Honor your mind. Trust your soul.",
  "She was a universe full of possibilities dressed as a woman.",
  "Choose the life that looks good on the inside, not just the outside.",
  "Healing takes time and asking for help is a courageous step.",
  "You are not defined by your worst days.",
  "A gentle woman is not a weak woman.",
  "Fall in love with taking care of yourself.",
  "Your pace is perfect for your path.",
  "You do not always need a plan. Sometimes you just need to breathe and trust.",
  "There is power in your vulnerability.",
  "She carved a world out of chaos and called it home.",
  "You are more than your productivity.",
  "The kindness you offer others — offer it to yourself first.",
  "Every version of you that got you here deserves gratitude.",
  "You are allowed to rest without guilt.",
  "She was both fire and water. Do not dare confine her to just one element.",
  "You are living proof that hard things can be survived.",
  "Take up space. Make noise. Leave a mark.",
  "Your intuition is the most faithful compass you have.",
  "You do not have to hustle for your worthiness.",
  "The version of you on the other side of fear is extraordinary.",
  "Everything about you is a gift — even the parts you are still learning to love.",
  "You are exactly where you are meant to be, even when it does not feel that way.",
  "She wore her scars like wings.",
  "Be so rooted in your own peace that nothing can disturb you.",
  "You are not your anxiety. You are not your past. You are not your mistakes.",
  "Abundance begins the moment you decide you are worthy of it.",
  "She did not find herself. She created herself.",
  "You are loved beyond measure and held beyond what you can see.",
];

const CATEGORIES = [
  {
    name: "Ocean", slug: "ocean",
    images: ["ocean1.jpg","ocean2.jpg","ocean3.jpg","ocean4.jpg","ocean5.jpg","ocean6.jpg","ocean7.jpg","ocean8.png"],
    colors: { bg: "rgba(10,35,64,0.88)", border: "#4fc3d7", accent: "#7de3f0", text: "#b8f0f8" },
    message: "Vast, powerful, and ever-moving — like you. Let the waves carry away what no longer serves you.",
  },
  {
    name: "Forest", slug: "forest",
    images: ["forest1.png","forest2.jpg","forest3.jpg","forest4.jpg","forest5.jpg","forest6.jpg","forest7.jpg","forest8.jpg"],
    colors: { bg: "rgba(18,40,16,0.88)", border: "#7bc97a", accent: "#a0e8a0", text: "#c8f0c0" },
    message: "Rooted, resilient, and quietly powerful. You are growing even when you cannot see it.",
  },
  {
    name: "Flowers", slug: "flowers",
    images: ["flower1.jpg","flower2.jpg","flower3.jpg","flower4.jpg","flower5.jpg","flower6.png","flower7.jpg","flower8.jpg"],
    colors: { bg: "rgba(90,20,50,0.88)", border: "#f4c2d4", accent: "#f9d8e8", text: "#fce8f0" },
    message: "Fleeting, beautiful, and perfectly timed. You bloom in your own season.",
  },
  {
    name: "Moon", slug: "moon",
    images: ["moon1.jpg","moon2.png","moon3.jpg","moon4.jpg","moon5.jpg","moon6.jpg","moon7.jpg","moon8.jpg"],
    colors: { bg: "rgba(12,16,48,0.88)", border: "#c8d8f0", accent: "#d8e8ff", text: "#e8f0ff" },
    message: "You are allowed to have phases. Every version of you is whole and worthy.",
  },
  {
    name: "Sunrise", slug: "sunrise",
    images: ["sunrise1.jpg","sunrise2.jpg","sunrise3.jpg","sunrise4.jpg","sunrise5.jpg","sunrise6.jpg","sunrise7.jpg","sunrise8.jpg"],
    colors: { bg: "rgba(90,40,10,0.88)", border: "#f4c06a", accent: "#f8d890", text: "#fce8b8" },
    message: "Every morning is a new invitation. You get to begin again, always.",
  },
  {
    name: "Waterfall", slug: "waterfall",
    images: ["waterfall1.jpg","waterfall2.jpg","waterfall3.jpg","waterfall4.jpg","waterfall5.jpg","waterfall6.jpg","waterfall7.jpg","waterfall8.jpg"],
    colors: { bg: "rgba(10,50,50,0.88)", border: "#a0e8e8", accent: "#c0f4f4", text: "#d8fcfc" },
    message: "Flowing freely, unstoppable and pure. Your path forward is clear.",
  },
  {
    name: "Storm", slug: "storm",
    images: ["storm1.jpg","storm2.jpg","storm3.jpg","storm4.jpg","storm5.jpg","storm6.jpg","storm7.jpg","storm8.jpg"],
    colors: { bg: "rgba(20,28,40,0.88)", border: "#8aa8c0", accent: "#a8c4dc", text: "#c8dced" },
    message: "Even the storm has beauty. You are stronger than anything that tries to dim your light.",
  },
  {
    name: "Meadow", slug: "meadow",
    images: ["meadow1.jpg","meadow2.jpg","meadow3.jpg","meadow4.jpg","meadow5.jpg","meadow6.jpg","meadow7.jpg","meadow8.jpg"],
    colors: { bg: "rgba(20,45,10,0.88)", border: "#b0d890", accent: "#c8f0a0", text: "#ddfcc8" },
    message: "Open, golden, and full of quiet grace. Let yourself wander without destination.",
  },
];

const catImg = (slug, filename) =>
  filename.startsWith("http") ? filename : `/images/${slug}/${filename}`;

const HERO_BG = `/images/ocean/ocean1.jpg`;

const tileImageStyle = {
  position: "absolute",
  inset: "0.55rem",
  width: "calc(100% - 1.1rem)",
  height: "calc(100% - 1.1rem)",
  objectFit: "contain",
  objectPosition: "center",
  borderRadius: "calc(var(--radius-sm) - 4px)",
  zIndex: 0,
};

const slideshowImageStyle = (slideVisible) => ({
  width: "100%",
  height: "100%",
  objectFit: "contain",
  objectPosition: "center",
  display: "block",
  opacity: slideVisible ? 1 : 0,
  transition: "opacity 0.5s ease",
});

export default function AffirmationsPage() {
  const [showOverlay, setShowOverlay] = useState(
    !sessionStorage.getItem("held_aff_visited")
  );
  const [currentQuote, setCurrentQuote] = useState(0);
  const [quoteVisible, setQuoteVisible] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [slideVisible, setSlideVisible] = useState(true);
  const slideIntervalRef = useRef(null);

  useEffect(() => {
    if (showOverlay) return;
    const id = setInterval(() => {
      setQuoteVisible(false);
      setTimeout(() => {
        setCurrentQuote((c) => (c + 1) % QUOTES.length);
        setQuoteVisible(true);
      }, 600);
    }, 8000);
    return () => clearInterval(id);
  }, [showOverlay]);

  useEffect(() => {
    if (!selectedCategory) {
      clearInterval(slideIntervalRef.current);
      return;
    }
    const cat = CATEGORIES.find((c) => c.name === selectedCategory);
    const imgCount = cat ? cat.images.length : 8;
    clearInterval(slideIntervalRef.current);
    setSlideIndex(0);
    setSlideVisible(true);
    slideIntervalRef.current = setInterval(() => {
      setSlideVisible(false);
      setTimeout(() => {
        setSlideIndex((i) => (i + 1) % imgCount);
        setSlideVisible(true);
      }, 500);
    }, 4000);
    return () => clearInterval(slideIntervalRef.current);
  }, [selectedCategory]);

  const handleEnter = () => {
    sessionStorage.setItem("held_aff_visited", "1");
    setShowOverlay(false);
  };

  const goTo = (dir) => {
    setQuoteVisible(false);
    setTimeout(() => {
      setCurrentQuote((c) => (c + dir + QUOTES.length) % QUOTES.length);
      setQuoteVisible(true);
    }, 350);
  };

  const activeCat = CATEGORIES.find((c) => c.name === selectedCategory);

  if (showOverlay) {
    return (
      <div style={{
        position: "fixed", inset: 0, zIndex: 999,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexDirection: "column", textAlign: "center", padding: "2rem",
      }}>
        <img
          src={HERO_BG} alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: -2 }}
        />
        <div style={{
          position: "absolute", inset: 0, zIndex: -1,
          background: "linear-gradient(135deg, rgba(26,10,18,0.78) 0%, rgba(10,5,18,0.85) 100%)",
        }} />

        <div style={{ animation: "overlayPulse 3.5s ease-in-out infinite" }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
            fontWeight: 600,
            letterSpacing: "0.08em",
            lineHeight: 1.2,
            background: "linear-gradient(135deg, #ffe4f0, #ffb6d3, #d4af7a)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "0.75rem",
          }}>
            You are held.
          </div>

          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
            color: "rgba(245,230,211,0.65)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginBottom: "3rem",
          }}>
            Welcome to your sanctuary
          </div>

          <button
            className="btn btn-hero"
            onClick={handleEnter}
            style={{ fontSize: "1rem", padding: "0.9rem 2.8rem", marginTop: 0 }}
          >
            Enter
          </button>
        </div>

        <style>{`
          @keyframes overlayPulse {
            0%,100% { opacity:1; transform:scale(1); }
            50%      { opacity:0.9; transform:scale(1.012); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="page fade-in" style={{ maxWidth: 980, margin: "0 auto" }}>

      {/* Quote hero banner */}
      <div style={{
        position: "relative", borderRadius: "var(--radius)", overflow: "hidden",
        marginBottom: "2.5rem", minHeight: 360,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "3.5rem 2rem", textAlign: "center",
      }}>
        <img
          src={HERO_BG} alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
        />
        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: "linear-gradient(135deg, rgba(26,10,18,0.78), rgba(10,5,18,0.84))",
        }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 700 }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.35rem, 3vw, 2rem)",
            fontStyle: "italic",
            color: "#f5e6d3",
            lineHeight: 1.75,
            marginBottom: "2rem",
            opacity: quoteVisible ? 1 : 0,
            transform: quoteVisible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.55s ease, transform 0.55s ease",
          }}>
            <span style={{ color: "#ffb6d3", fontSize: "1.8rem", lineHeight: 0, verticalAlign: "-0.32em", marginRight: "0.15rem" }}>"</span>
            {QUOTES[currentQuote]}
            <span style={{ color: "#ffb6d3", fontSize: "1.8rem", lineHeight: 0, verticalAlign: "-0.32em", marginLeft: "0.15rem" }}>"</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.5rem" }}>
            <button className="btn btn-outline btn-sm" onClick={() => goTo(-1)}>←</button>
            <span style={{ fontSize: "0.8rem", color: "rgba(245,230,211,0.45)" }}>
              {currentQuote + 1} / {QUOTES.length}
            </span>
            <button className="btn btn-outline btn-sm" onClick={() => goTo(1)}>→</button>
          </div>
        </div>
      </div>

      {/* Nature category grid */}
      <h3 style={{ marginBottom: "0.5rem" }}>Find Your Calm</h3>
      <p style={{ marginBottom: "1.5rem", fontSize: "0.9rem", color: "var(--text-muted)" }}>
        Choose a nature scene to ground yourself.
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
        gap: "1.15rem",
        marginBottom: "2rem",
        alignItems: "stretch",
      }}>
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.name;
          return (
            <div
              key={cat.name}
              onClick={() => setSelectedCategory(isSelected ? null : cat.name)}
              style={{
                position: "relative",
                borderRadius: "var(--radius-sm)",
                overflow: "hidden",
                cursor: "pointer",
                minHeight: 340,
                aspectRatio: "3 / 4.2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                background: "rgba(9, 4, 8, 0.88)",
                border: isSelected ? `2px solid ${cat.colors.accent}` : "2px solid transparent",
                transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
                transform: isSelected ? "translateY(-4px)" : "translateY(0)",
                boxShadow: isSelected
                  ? `0 18px 40px rgba(0,0,0,0.28), 0 0 0 1px ${cat.colors.accent}25`
                  : "0 10px 24px rgba(0,0,0,0.18)",
                padding: "0.8rem",
              }}
            >
              <img
                src={catImg(cat.slug, cat.images[0])}
                alt={cat.name}
                style={{
                  ...tileImageStyle,
                  inset: "0.8rem",
                  width: "calc(100% - 1.6rem)",
                  height: "calc(100% - 1.6rem)",
                }}
                loading="lazy"
              />
              <div style={{
                position: "absolute", inset: 0, zIndex: 1,
                background: "linear-gradient(to bottom, rgba(0,0,0,0.16) 0%, rgba(0,0,0,0.42) 52%, rgba(0,0,0,0.72) 100%)",
              }} />
              <div style={{ position: "relative", zIndex: 2, textAlign: "center", marginTop: "auto", paddingBottom: "1rem" }}>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.74rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  color: cat.colors.accent,
                  textTransform: "uppercase",
                  textShadow: "0 4px 18px rgba(0,0,0,0.45)",
                }}>
                  {cat.name}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Expanded category slideshow */}
      {activeCat && (
        <div
          className="fade-in"
          style={{
            borderRadius: "var(--radius)",
            overflow: "hidden",
            border: `1px solid ${activeCat.colors.border}50`,
            background: activeCat.colors.bg,
            backdropFilter: "blur(24px)",
            padding: "2.25rem",
            marginBottom: "2rem",
            maxWidth: 1080,
            marginInline: "auto",
          }}
        >
          <div style={{
            display: "grid",
            gridTemplateColumns: "minmax(260px, 320px) minmax(0, 1fr)",
            gap: "2rem",
            alignItems: "start",
          }}>
            <div style={{
              position: "relative",
              borderRadius: "var(--radius-sm)",
              overflow: "hidden",
              aspectRatio: "3 / 4.2",
              maxHeight: 560,
              background: "rgba(255,255,255,0.05)",
              padding: "0.9rem",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)",
            }}>
              <img
                key={slideIndex}
                src={catImg(activeCat.slug, activeCat.images[slideIndex % activeCat.images.length])}
                alt={`${activeCat.name} ${slideIndex + 1}`}
                style={slideshowImageStyle(slideVisible)}
                loading="lazy"
              />
              {activeCat.images.length > 1 && (
                <div style={{
                  position: "absolute",
                  bottom: "1rem",
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  gap: "6px",
                }}>
                  {activeCat.images.map((_, i) => (
                    <div
                      key={i}
                      onClick={() => { setSlideIndex(i); setSlideVisible(true); }}
                      style={{
                        width: i === slideIndex ? 20 : 8,
                        height: 8,
                        borderRadius: 4,
                        background: i === slideIndex ? activeCat.colors.accent : "rgba(255,255,255,0.35)",
                        cursor: "pointer",
                        transition: "all 0.3s",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            <div>
              <h3 style={{ color: activeCat.colors.accent, marginBottom: "0.5rem", fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}>
                {activeCat.name}
              </h3>
              <p style={{ fontSize: "0.95rem", color: activeCat.colors.text, lineHeight: 1.65, opacity: 0.85 }}>
                {activeCat.message}
              </p>
              <div style={{
                marginTop: "1.4rem",
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                gap: "0.85rem",
              }}>
                {activeCat.images.map((img, i) => (
                  <div
                    key={img}
                    onClick={() => { setSlideIndex(i); setSlideVisible(true); }}
                    style={{
                      position: "relative",
                      aspectRatio: "3 / 4",
                      borderRadius: "14px",
                      overflow: "hidden",
                      cursor: "pointer",
                      border: i === slideIndex
                        ? `1.5px solid ${activeCat.colors.accent}`
                        : "1px solid rgba(255,255,255,0.08)",
                      background: "rgba(255,255,255,0.05)",
                      boxShadow: i === slideIndex
                        ? `0 0 0 1px ${activeCat.colors.accent}25`
                        : "none",
                    }}
                  >
                    <img
                      src={catImg(activeCat.slug, img)}
                      alt={`${activeCat.name} thumbnail ${i + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        opacity: i === slideIndex ? 1 : 0.72,
                      }}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
