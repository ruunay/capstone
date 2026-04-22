import React, { useState } from "react";
import "../../styles/book.css";

export default function JournalBook({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`journal-book ${open ? "open" : ""}`}>
      {!open && (
        <div className="book-cover" onClick={()=>setOpen(true)}>
          Open Journal
        </div>
      )}
      {open && <div className="pages">{children}</div>}
    </div>
  );
}