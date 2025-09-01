import React, { useState, useEffect, useRef } from "react";
import MusicToggle from "./MusicToggle";
import "./../styles/Header.css";

export default function Header({ username, onLogout, onViewChange, currentView }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleViewChange = (view) => {
    onViewChange(view);
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <button className="menu-btn" onClick={toggleMenu} aria-label="Menu">
        &#9776;
      </button>
      <nav className={`menu ${menuOpen ? "open" : ""}`}>
        <button
          className={currentView === "quiz" ? "active" : ""}
          onClick={() => handleViewChange("quiz")}
        >
          Quiz
        </button>
        <button
          className={currentView === "scoreboard" ? "active" : ""}
          onClick={() => handleViewChange("scoreboard")}
        >
          Scoreboard
        </button>
        <MusicToggle />
        <button onClick={onLogout} className="logout-btn">
          Logout
        </button>
      </nav>
      <div className="user-display">Logged in as: <b>{username}</b></div>
    </header>
  );
}
