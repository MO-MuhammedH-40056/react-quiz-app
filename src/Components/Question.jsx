import React from "react";
import "./../styles/Quiz.css";

export default function Question({ question, selectedAnswer, onAnswer, submitted }) {
  return (
    <div className="question-card">
      <h3>{question.question}</h3>
      <ul className="options-list">
        {question.options.map((option, idx) => {
          let className = "option";
          if (submitted) {
            if (idx === question.correctIndex) className += " correct";
            else if (idx === selectedAnswer) className += " wrong";
          } else if (idx === selectedAnswer) {
            className += " selected";
          }
          return (
            <li
              key={idx}
              className={className}
              onClick={() => !submitted && onAnswer(idx)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") onAnswer(idx);
              }}
              aria-pressed={selectedAnswer === idx}
              role="button"
            >
              {option}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
