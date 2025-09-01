import React, { useState, useEffect } from "react";
import Login from "./Components/Login";
import Quiz from "./Components/Quiz";
import Scoreboard from "./Components/Scoreboard";
import Header from "./Components/Header";
import "./styles/App.css";

export default function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("login"); // login, quiz, scoreboard
  const [score, setScore] = useState(null);

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    setScore(null);
    setView("login");
  };

  return (
    <div className="app">
      {user && (
        <Header
          username={user}
          onLogout={handleLogout}
          onViewChange={setView}
          currentView={view}
        />
      )}
      <main>
        {view === "login" && <Login onLoginSuccess={(username) => {
          setUser(username);
          setView("quiz");
        }} />}
        {view === "quiz" && user && (
          <Quiz username={user} onQuizEnd={(finalScore) => {
            setScore(finalScore);
            setView("scoreboard");
          }} />
        )}
        {view === "scoreboard" && user && (
          <Scoreboard />
        )}
      </main>
    </div>
  );
}
