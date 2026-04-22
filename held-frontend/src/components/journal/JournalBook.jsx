import React, { useState } from "react";
import "../../styles/book.css";

export default function JournalBook({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="book-wrapper">
      {!isOpen ? (
        <div className="book-cover" onClick={() => setIsOpen(true)}>
          <div className="book-cover-inner">
            <div className="book-title">Held</div>
            <div className="book-subtitle">Your Journal</div>
            <div className="book-hint">Click to open</div>
          </div>
        </div>
      ) : (
        <div className="book-open">
          <div className="book-page left-page">
            <div className="page-lines">
              {Array.from({ length: 18 }).map((_, i) => (
                <div key={i} className="page-line" />
              ))}
            </div>
          </div>
          <div className="book-page right-page">
            <div className="book-content">{children}</div>
          </div>
        </div>
      )}
    </div>
  );
}
