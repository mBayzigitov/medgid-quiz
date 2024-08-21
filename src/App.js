// src/App.js
import React, { useState, useEffect } from 'react';
import Quiz from './components/Quiz';
import './App.css';

const QUIZ_STARTED_FLAG_STORAGE_KEY = "quiz-started"
const STEPS_BEFORE_QUIZ = 3;

function App() {
  const [step, setStep] = useState(0)
  const [quizStarted, setQuizStarted] = useState(false)

  useEffect(() => {
    const startFlag = localStorage.getItem(QUIZ_STARTED_FLAG_STORAGE_KEY)
    if (startFlag) {
      setQuizStarted(true)
    }
  });

  const handleStartQuiz = () => {
    setQuizStarted(true)
    localStorage.setItem(QUIZ_STARTED_FLAG_STORAGE_KEY, true)
  }

  const handleNextStep = () => {
    setStep(step + 1)

    if (step >= STEPS_BEFORE_QUIZ) {
      handleStartQuiz()
    }
  }

  return quizStarted ? (
    <div className="App">
      <main>
        <Quiz />
      </main>
    </div>
  ) : (
    <div className="App">
      {step === 0 && (
        <h1>Введение</h1>
      )}
      {step === 1 && (
        <h1>Согласие на обработку персухи</h1>
      )}
      {step === 2 && (
        <h1>*Страница с аллегренами*</h1>
      )}
      {step === 3 && (
        <h1>*Страница с анкетой*</h1>
      )}
      <button onClick={handleNextStep}>Далее</button>
    </div>
  );
}

export default App;
