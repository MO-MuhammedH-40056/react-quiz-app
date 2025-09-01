import React, { useEffect, useState } from "react";
import "./../styles/Scoreboard.css";

export default function Scoreboard() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchScores() {
      try {
        const res = await fetch(
          "https://personal-pc23uixx.outsystemscloud.com/MotilalDevAPITest_Core/rest/MotilalDevAPI/Scoreboard"
        );
        if (!res.ok) throw new Error("Failed to fetch scoreboard");
        const data = await res.json();
        setScores(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchScores();
  }, []);

  return (
    <div className="scoreboard-container">
      <h2>Scoreboard</h2>
      {loading && <p>Loading scores...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {scores.length ? (
              scores.map(({ User, Score }, idx) => (
                <tr key={idx}>
                  <td>{User}</td>
                  <td>{Score}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2}>No scores yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
