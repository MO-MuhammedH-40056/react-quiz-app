import React from "react";
import "./../styles/AnimatedDialog.css";

export default function AnimatedDialog({ message, onClose }) {
  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div
        className="dialog-box"
        onClick={(e) => e.stopPropagation()}
        role="alertdialog"
        aria-modal="true"
      >
        <p>{message}</p>
        <button onClick={onClose} aria-label="Close dialog">
          Close
        </button>
      </div>
    </div>
  );
}
