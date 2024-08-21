// src/components/Quiz.js
import React, { useState, useEffect } from 'react';
import QuestionType1 from './QuestionType1';
import QuestionType2 from './QuestionType2';

const quizQuestions = [
  { 
    id: 1, 
    type: 1, 
    question: "Какой из этих городов является столицей Франции?", 
    answers: ["Париж", "Берлин", "Мадрид", "Рим"] 
  },
  { 
    id: 2, 
    type: 2, 
    question: "Как часто вы едите овсянку?", 
    image: "https://via.placeholder.com/150", 
    answers: [
      "Никогда/очень редко", 
      "Раз в день", 
      "2-4 раза в неделю", 
      "Раз в неделю", 
      "2 раза в месяц", 
      "Раз в месяц", 
      "2-4 раза в год"
    ],
    hints: [150, 200]
  },
  { 
    id: 3, 
    type: 1, 
    question: "Сколько будет 2 + 2?", 
    answers: ["3", "4", "5", "6"] 
  }
];

function Quiz() {
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
      }
      return null;
    }).filter(a => a !== null);
    
    setAnswers(loadedAnswers);

    const lastUnansweredQuestionIndex = quizQuestions.findIndex(q => 
      !loadedAnswers.some(a => a.id === q.id)
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
    console.log('Submitting answers:', finalAnswers);
    localStorage.clear();
    // Отправка структуры ответов на сервер
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const currentAnswer = answers.find(a => a.id === currentQuestion.id);

  return (
    <div className="quiz-container">
      {currentQuestion.type === 1 ? (
        <QuestionType1
          data={currentQuestion}
          onAnswer={handleAnswer}
        />
      ) : (
        <QuestionType2
          data={currentQuestion}
          onAnswer={handleAnswer}
          savedAnswer={currentAnswer}
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
