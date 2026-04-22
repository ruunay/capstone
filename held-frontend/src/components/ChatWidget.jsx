import React, { useState } from "react";

export default function ChatWidget() {
  const [messages, setMessages] = useState([
    { text: "How are you feeling today?", from: "bot" }
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    setMessages([...messages, { text: input, from: "user" }]);
    setMessages(m => [...m, { text: "Tell me more.", from: "bot" }]);
    setInput("");
  };

  return (
    <div className="card">
      <div>
        {messages.map((m,i)=>(
          <div key={i} className={m.from}>{m.text}</div>
        ))}
      </div>
      <input value={input} onChange={e=>setInput(e.target.value)} />
      <button onClick={send}>Send</button>
    </div>
  );
}