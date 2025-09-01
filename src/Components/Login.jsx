import React, { useState } from "react";
import AnimatedDialog from "./AnimatedDialog";
import "./../styles/Login.css";

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const validateLogin = async () => {
    if (!username.trim()) {
      setError("Username cannot be empty");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `https://personal-pc23uixx.outsystemscloud.com/MotilalDevAPITest_Core/rest/MotilalDevAPI/Login?Username=${encodeURIComponent(
          username
        )}`
      );
      if (!res.ok) throw new Error("Network error");
      const data = await res.json();
      if (data === true) {
        onLoginSuccess(username.trim());
      } else {
        setError("Invalid username. Please try again.");
      }
    } catch {
      setError("Login API error. Please try later.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    validateLogin();
  };

  return (
    <div className="login-container">
      <h1>React Quiz Login</h1>
      <form onSubmit={onSubmit} className="login-form">
        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
          autoFocus
        />
        <button type="submit" disabled={loading}>
          {loading ? "Checking..." : "Login"}
        </button>
      </form>
      {error && (
        <AnimatedDialog message={error} onClose={() => setError(null)} />
      )}
    </div>
  );
}
