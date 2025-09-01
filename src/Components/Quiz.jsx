import React, { useState, useEffect } from "react";
import Question from "./Question";
import "./../styles/Quiz.css";

const quizQuestions = [
  {
    id: 1,
    question: "Which hook is used to add state to functional components?",
    options: ["useState", "useEffect", "useContext", "useReducer"],
    correctIndex: 0,
  },
  {
    id: 2,
    question: "What does JSX stand for?",
    options: [
      "JavaScript XML",
      "Java Source X",
      "Java Syntax eXtension",
      "JSON Syntax Extension",
    ],
    correctIndex: 0,
  },
  {
    id: 3,
    question: "Which method is used to render React components to the DOM?",
    options: ["React.render", "ReactDOM.render", "ReactDOM.create", "React.create"],
    correctIndex: 1,
  },
  {
    id: 4,
    question: "How do you pass data between components?",
    options: ["Props", "Hooks", "State", "Reducers"],
    correctIndex: 0,
  },
  {
    id: 5,
    question: "Which of the following is NOT a React lifecycle method?",
    options: [
      "componentDidMount",
      "componentWillUpdate",
      "useEffect",
      "componentIsReady",
    ],
    correctIndex: 3,
  },
];

export default function Quiz({ username }) {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState(() => {
    const saved = localStorage.getItem("quizAnswers");
    return saved ? JSON.parse(saved) : Array(quizQuestions.length).fill(null);
  });

  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null); // ✅ New state

  useEffect(() => {
    localStorage.setItem("quizAnswers", JSON.stringify(answers));
  }, [answers]);

  const handleAnswer = (answerIndex) => {
    if (submitted) return;
    const newAnswers = [...answers];
    newAnswers[currentQIndex] = answerIndex;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQIndex < quizQuestions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQIndex > 0) {
      setCurrentQIndex(currentQIndex - 1);
    }
  };

  const submitQuiz = async () => {
    if (answers.includes(null)) {
      alert("Please answer all questions before submitting.");
      return;
    }

    const correctCount = answers.reduce((acc, ans, i) => {
      return ans === quizQuestions[i].correctIndex ? acc + 1 : acc;
    }, 0);

    setScore(correctCount); // ✅ Store score
    setSubmitted(true); // ✅ Show summary but stay on quiz

    try {
    await fetch(
      "https://personal-pc23uixx.outsystemscloud.com/MotilalDevAPITest_Core/rest/MotilalDevAPI/AddScore",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Score: correctCount,
          User: username,
        }),
      }
    );
  } catch (e) {
      console.error("Failed to submit score", e);
    }

    // ❌ Don't navigate away
    // onQuizEnd(correctCount);
  };

  const correctCount = score ?? 0;
  const wrongCount = quizQuestions.length - correctCount;

  return (
    <div className="quiz-container">
      <h2>React Quiz</h2>

      <Question
        question={quizQuestions[currentQIndex]}
        selectedAnswer={answers[currentQIndex]}
        onAnswer={handleAnswer}
        submitted={submitted}
      />

      <div className="quiz-navigation">
        <button onClick={prevQuestion} disabled={currentQIndex === 0}>
          Previous
        </button>
        {currentQIndex < quizQuestions.length - 1 && (
          <button onClick={nextQuestion}>Next</button>
        )}
        {currentQIndex === quizQuestions.length - 1 && !submitted && (
          <button onClick={submitQuiz}>Submit</button>
        )}
      </div>

      {submitted && (
        <div className="quiz-summary">
          <h3>Quiz Submitted!</h3>
          <p>✅ Correct Answers: {correctCount}</p>
          <p>❌ Incorrect Answers: {wrongCount}</p>
        </div>
      )}
    </div>
  );
}
