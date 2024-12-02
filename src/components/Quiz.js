// src/components/Quiz.js
import React, { useState, useEffect } from 'react';
import QuestionType1 from './QuestionType1';
import QuestionType2 from './QuestionType2';
import QuestionType3 from './QuestionType3';
import QuestionType4 from './QuestionType4';

import '../styles/Quiz.css';

// const sampleAnswers = [
//   "Никогда/очень редко",
//   "Раз в день",
//   "2-4 раза в неделю",
//   "Раз в неделю",
//   "2 раза в месяц",
//   "Раз в месяц",
//   "2-4 раза в год"
// ]

function Quiz({ quizQuestions, endQuiz, setFinalAnswers }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const loadedAnswers = quizQuestions.map(q => {
      const savedAnswer = localStorage.getItem(`answer-${q.id}`);
      const savedWeight = localStorage.getItem(`weight-${q.id}`);
      if (q.type === 1 && savedAnswer) {
        return { id: q.id, answer: savedAnswer };
      } else if (q.type === 2 && savedAnswer) {
        return { id: q.id, answer: savedAnswer, weight: savedWeight || 0 };
      } else if (q.type === 3 && savedAnswer) {
        return { id: q.id, answer: savedAnswer, }
      } else if (q.type === 4 && savedAnswer) {
        return { id: q.id, answer: savedAnswer }
      }
      return null;
    }).filter(a => a !== null);

    setAnswers(loadedAnswers);

    const lastUnansweredQuestionIndex = quizQuestions.findIndex(q =>
      !loadedAnswers.findLast(a => a.id === q.id)
    );
    setCurrentQuestionIndex(lastUnansweredQuestionIndex !== -1 ? lastUnansweredQuestionIndex : quizQuestions.length - 1);
  }, []);

  const handleAnswer = (answer) => {
    const updatedAnswers = [...answers];
    const answerIndex = updatedAnswers.findIndex(a => a.id === answer.id);
    if (answerIndex > -1) {
      updatedAnswers[answerIndex] = answer;
    } else {
      updatedAnswers.push(answer);
    }
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = (finalAnswers) => {
    setFinalAnswers(finalAnswers);
    endQuiz();
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const currentAnswer = answers.find(a => a.id === currentQuestion.id);

  return (
    <div className="main-container">
      {currentQuestion.type === 1 && (
        <QuestionType1
          data={currentQuestion}
          onAnswer={handleAnswer}
          amount={quizQuestions.length}
        />
      )} 
      {currentQuestion.type === 2 && (
        <QuestionType2
          data={currentQuestion}
          onAnswer={handleAnswer}
          savedAnswer={currentAnswer}
          amount={quizQuestions.length}
        />
      )}
      {currentQuestion.type === 3 && (
        <QuestionType3
          data={currentQuestion}
          onAnswer={handleAnswer}
          amount={quizQuestions.length}
        />
      )}
      {currentQuestion.type === 4 && (
        <QuestionType4
          data={currentQuestion}
          onAnswer={handleAnswer}
          amount={quizQuestions.length}
        />
      )}
      <div className="navigation-buttons">
        <button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
          &larr;
        </button>
        <button id="submit-answers" onClick={() => handleSubmit(answers)} disabled={answers.length !== quizQuestions.length}>
          Отправить ответы
        </button>
        <button onClick={() => currentAnswer && handleAnswer(currentAnswer)} disabled={!currentAnswer || currentQuestion.id === quizQuestions.length}>
          &rarr;
        </button>
      </div>
    </div>
  );
}

export default Quiz;
