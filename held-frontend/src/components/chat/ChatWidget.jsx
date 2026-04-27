import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const CRISIS_KEYWORDS = [
  "suicide", "kill myself", "want to die", "end my life", "hurt myself",
  "self harm", "self-harm", "not worth living", "no reason to live",
  "can't go on", "giving up on life",
];

const VALIDATION_PHRASES = [
  "Thank you for sharing that with me.",
  "I hear you, and that makes a lot of sense.",
  "It takes real courage to say that out loud.",
  "What you are feeling is completely valid.",
  "I am really glad you told me that.",
  "That sounds so hard, and you are carrying it with such grace.",
  "You are not alone in this.",
];

const QUESTION_CATEGORIES = [
  {
    keywords: ["anxious", "anxiety", "worry", "worried", "nervous", "panic", "stress", "stressed"],
    questions: [
      "What does that anxiety feel like in your body right now?",
      "When you imagine this resolving — what does relief look like for you?",
      "Is there one small thing that might help you feel even a little safer right now?",
    ],
  },
  {
    keywords: ["sad", "cry", "crying", "tears", "grief", "loss", "miss", "missing"],
    questions: [
      "How long have you been sitting with this sadness?",
      "What does this sadness need from you right now — space, or company?",
      "Is there something you are grieving that you haven't fully let yourself acknowledge yet?",
    ],
  },
  {
    keywords: ["angry", "anger", "frustrated", "frustration", "mad", "rage", "furious", "unfair"],
    questions: [
      "Underneath the anger, is there something that feels hurt or dismissed?",
      "What would it feel like to fully express this anger in a safe way?",
      "What boundary do you feel has been crossed?",
    ],
  },
  {
    keywords: ["overwhelmed", "too much", "exhausted", "burnout", "tired", "drained", "cope"],
    questions: [
      "What feels like the heaviest thing you are carrying right now?",
      "If you could put one thing down today — even temporarily — what would it be?",
      "When did you last truly rest without guilt?",
    ],
  },
  {
    keywords: ["lonely", "alone", "isolated", "disconnected", "invisible", "unseen"],
    questions: [
      "When did you last feel truly seen by someone?",
      "Is there one person in your life you could reach out to, even just with a message?",
      "What would connection feel like for you right now?",
    ],
  },
  {
    keywords: ["happy", "grateful", "joy", "joyful", "excited", "proud", "celebrate", "good"],
    questions: [
      "What made this moment feel so meaningful to you?",
      "How can you carry this feeling with you as you move through your week?",
      "Is there someone you would love to share this joy with?",
    ],
  },
  {
    keywords: ["confused", "lost", "uncertain", "unsure", "direction", "purpose", "meaning"],
    questions: [
      "When you imagine your life a year from now — what do you hope has changed?",
      "What feels most unclear to you right now?",
      "Is there a version of yourself that already knows what she wants?",
    ],
  },
  {
    keywords: ["relationship", "partner", "friend", "family", "mother", "father", "sister", "brother"],
    questions: [
      "How does this relationship make you feel in your quietest moments?",
      "What do you need from this person that you haven't been able to ask for?",
      "What would a healthy version of this relationship look like?",
    ],
  },
  {
    keywords: ["work", "job", "career", "boss", "colleague", "office", "workplace"],
    questions: [
      "Is your work feeding you or depleting you right now?",
      "What would it look like to protect your energy in this environment?",
      "What do you actually want — beyond what others expect of you?",
    ],
  },
  {
    keywords: ["body", "weight", "appearance", "ugly", "fat", "skin", "health"],
    questions: [
      "What does your body need from you right now?",
      "When did you last feel at home in your body?",
      "What is one thing your body does beautifully that you could appreciate today?",
    ],
  },
];

const DEFAULT_QUESTIONS = [
  "What do you think is at the root of this feeling?",
  "If your feelings had a message for you, what would they be saying?",
  "What would you tell a friend who was going through exactly this?",
  "What part of this feels the most unresolved?",
  "What does your gut tell you that your mind is afraid to say?",
];

const MOOD_OPENERS = {
  anxious:     "I can feel that something is weighing on you. What is making you feel most anxious right now?",
  sad:         "Sadness always deserves space. When did you start feeling this way?",
  angry:       "Anger is often a signal something important has been crossed. What triggered this feeling?",
  happy:       "I love that warmth. What made today feel so good?",
  grateful:    "Gratitude is such a beautiful place to be. What are you most grateful for right now?",
  overwhelmed: "It sounds like there is a lot on your plate. What feels heaviest right now?",
  neutral:     "Sometimes neutral is a gift. What is sitting with you today?",
};

const CLOSING_MESSAGE =
  "You have done something brave today — you showed up for yourself. " +
  "Take a breath. You are held. Continue exploring these feelings in your journal, " +
  "or simply rest in knowing that you are not alone.";

const CRISIS_MESSAGE =
  "I hear you, and I want you to know that what you are feeling matters deeply. " +
  "Please reach out to a crisis line right now — you deserve real, immediate support. " +
  "In the US: call or text 988 (Suicide & Crisis Lifeline). " +
  "Internationally: findahelpline.com. " +
  "You are not alone, and this moment is not the end of your story.";

function ts() {
  return new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

function hasCrisis(text) {
  const lower = text.toLowerCase();
  return CRISIS_KEYWORDS.some((kw) => lower.includes(kw));
}

function getContextualQuestion(userText, askedSet) {
  const lower = userText.toLowerCase();
  for (const cat of QUESTION_CATEGORIES) {
    if (cat.keywords.some((kw) => lower.includes(kw))) {
      const available = cat.questions.filter((q) => !askedSet.has(q));
      if (available.length > 0) return available[Math.floor(Math.random() * available.length)];
    }
  }
  const available = DEFAULT_QUESTIONS.filter((q) => !askedSet.has(q));
  return available.length > 0
    ? available[Math.floor(Math.random() * available.length)]
    : DEFAULT_QUESTIONS[Math.floor(Math.random() * DEFAULT_QUESTIONS.length)];
}

export default function ChatWidget({ moodType, journalEntry }) {
  const navigate = useNavigate();

  const opening = journalEntry?.content
    ? `I read what you wrote — "${journalEntry.content.slice(0, 60)}${journalEntry.content.length > 60 ? "…" : ""}". What feelings came up for you as you wrote that?`
    : moodType && MOOD_OPENERS[moodType]
    ? MOOD_OPENERS[moodType]
    : "Hey. I am really glad you are here. This is a safe space and I am not going anywhere. What has been on your mind lately?";

  const [messages, setMessages]         = useState([{ text: opening, from: "bot", time: ts() }]);
  const [input, setInput]               = useState("");
  const [isTyping, setIsTyping]         = useState(false);
  const [sessionEnded, setSessionEnded] = useState(false);

  const questionCountRef  = useRef(1);
  const sessionEndedRef   = useRef(false);
  const askedQuestionsRef = useRef(new Set());
  const userMessagesRef   = useRef([]);
  const usedValidationRef = useRef(new Set());
  const bottomRef         = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const getValidation = () => {
    const indices = VALIDATION_PHRASES.map((_, i) => i).filter((i) => !usedValidationRef.current.has(i));
    if (indices.length === 0) {
      usedValidationRef.current.clear();
      return VALIDATION_PHRASES[0];
    }
    const idx = indices[Math.floor(Math.random() * indices.length)];
    usedValidationRef.current.add(idx);
    return VALIDATION_PHRASES[idx];
  };

  const send = () => {
    if (!input.trim() || sessionEndedRef.current) return;
    const text = input.trim();
    setInput("");
    setMessages((m) => [...m, { text, from: "user", time: ts() }]);
    userMessagesRef.current = [...userMessagesRef.current, text].slice(-5);

    if (hasCrisis(text)) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        sessionEndedRef.current = true;
        setSessionEnded(true);
        setMessages((m) => [...m, { text: CRISIS_MESSAGE, from: "bot", time: ts(), crisis: true }]);
      }, 700);
      return;
    }

    if (questionCountRef.current >= 3) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        sessionEndedRef.current = true;
        setSessionEnded(true);
        setMessages((m) => [...m, { text: CLOSING_MESSAGE, from: "bot", time: ts(), closing: true }]);
      }, 1200);
      return;
    }

    const validation = getValidation();
    const question   = getContextualQuestion(text, askedQuestionsRef.current);
    askedQuestionsRef.current.add(question);
    questionCountRef.current += 1;

    const delay = 1000 + Math.random() * 500;
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((m) => [...m, { text: `${validation} ${question}`, from: "bot", time: ts() }]);
    }, delay);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="chat-widget">
      <div className="chat-log">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`chat-msg chat-msg--${m.from}${m.crisis ? " chat-msg--crisis" : ""}${m.closing ? " chat-msg--closing" : ""}`}
          >
            {m.from === "bot" && <div className="chat-avatar">H</div>}
            <div className="chat-bubble-col">
              <div className="chat-bubble">{m.text}</div>
              <div className="chat-ts">{m.time}</div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="chat-msg chat-msg--bot">
            <div className="chat-avatar">H</div>
            <div className="chat-bubble-col">
              <div className="chat-bubble chat-bubble--typing">
                <span className="tdot" />
                <span className="tdot" />
                <span className="tdot" />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {sessionEnded ? (
        <div className="chat-ended">
          <p className="chat-ended-label">This reflection session has ended.</p>
          <button className="btn btn-full" onClick={() => navigate("/journal")}>
            Continue in my journal
          </button>
        </div>
      ) : (
        <div className="chat-input-row">
          <input
            className="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Share what is on your heart…"
          />
          <button className="btn" onClick={send} disabled={!input.trim()}>
            Send
          </button>
        </div>
      )}

      <style>{`
        .chat-widget{display:flex;flex-direction:column;gap:0}
        .chat-log{display:flex;flex-direction:column;gap:1rem;padding:0.75rem 0;min-height:220px;max-height:370px;overflow-y:auto}
        .chat-msg{display:flex;align-items:flex-start;gap:0.55rem}
        .chat-msg--user{flex-direction:row-reverse}
        .chat-avatar{width:28px;height:28px;border-radius:50%;background:var(--accent);color:#fff;display:flex;align-items:center;justify-content:center;font-size:0.72rem;font-weight:700;flex-shrink:0;margin-top:2px}
        .chat-bubble-col{display:flex;flex-direction:column;gap:0.18rem;max-width:82%}
        .chat-msg--user .chat-bubble-col{align-items:flex-end}
        .chat-bubble{padding:0.6rem 0.9rem;border-radius:12px;line-height:1.65;font-size:0.875rem;border-left:3px solid var(--accent);background:rgba(255,182,211,0.07);color:var(--text)}
        .chat-msg--user .chat-bubble{border-left:none;border-right:3px solid #6fcf97;background:rgba(111,207,151,0.08)}
        .chat-msg--crisis .chat-bubble{background:rgba(220,38,38,0.1);border-left-color:#dc2626;color:#fca5a5}
        .chat-msg--closing .chat-bubble{background:rgba(212,175,122,0.09);border-left-color:#d4af7a}
        .chat-ts{font-size:0.68rem;color:var(--text-muted);padding:0 2px}
        .chat-msg--user .chat-ts{text-align:right}
        .chat-bubble--typing{display:flex;align-items:center;gap:5px;min-height:36px}
        .tdot{width:7px;height:7px;border-radius:50%;background:var(--accent);display:inline-block;animation:tdotBounce 1.2s infinite ease-in-out}
        .tdot:nth-child(2){animation-delay:.2s}
        .tdot:nth-child(3){animation-delay:.4s}
        @keyframes tdotBounce{0%,60%,100%{transform:translateY(0);opacity:.4}30%{transform:translateY(-6px);opacity:1}}
        .chat-input-row{display:flex;gap:0.5rem;padding-top:0.5rem;border-top:1px solid var(--border)}
        .chat-input-row .input{flex:1}
        .chat-ended{margin-top:0.75rem;padding:1rem;background:rgba(212,175,122,0.07);border:1px solid rgba(212,175,122,0.18);border-radius:var(--radius-sm);display:flex;flex-direction:column;gap:0.65rem}
        .chat-ended-label{font-size:0.82rem;color:var(--text-muted);text-align:center}
      `}</style>
    </div>
  );
}
