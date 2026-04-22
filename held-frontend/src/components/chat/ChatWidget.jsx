import React, { useState, useEffect, useRef } from "react";

const getPromptForMood = (mood) => {
  const prompts = {
    anxious: "What is making you feel most anxious right now?",
    sad: "When did you start feeling this way?",
    angry: "What triggered this feeling for you?",
    happy: "What made today feel good?",
    grateful: "What are you most grateful for in this moment?",
    overwhelmed: "What feels like the heaviest thing on your plate right now?",
    neutral: "What is on your mind today?",
  };
  return prompts[mood] || "Tell me more about how you are feeling.";
};

export default function ChatWidget({ moodType }) {
  const [messages, setMessages] = useState([
    {
      text: "Hi, I am here with you. What would you like to explore today?",
      from: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    if (moodType) {
      const prompt = getPromptForMood(moodType);
      setMessages((m) => [...m, { text: prompt, from: "bot" }]);
    }
  }, [moodType]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    setMessages((m) => [...m, { text: input, from: "user" }]);
    setInput("");

    setTimeout(() => {
      const replies = [
        "That sounds really significant. Can you tell me more?",
        "How long have you been carrying this feeling?",
        "What do you think you need most right now?",
        "Is there someone in your life who understands this feeling?",
        "What would help you feel even a little bit lighter?",
      ];
      const reply = replies[Math.floor(Math.random() * replies.length)];
      setMessages((m) => [...m, { text: reply, from: "bot" }]);
    }, 800);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") send();
  };

  return (
    <div className="chat-widget">
      <div className="chat-log">
        {messages.map((m, idx) => (
          <div key={idx} className={`message ${m.from}`}>
            {m.from === "bot" && <div className="bot-avatar">H</div>}
            <div className="message-bubble">{m.text}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="chat-input-row">
        <input
          className="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Type your response..."
        />
        <button className="btn" onClick={send}>
          Send
        </button>
      </div>
    </div>
  );
}
