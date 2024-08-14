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
    question: "Как часто вы едите яблоки?", 
    image: "https://via.placeholder.com/150", 
    answers: [
      "Никогда/очень редко", 
      "Раз в день", 
      "2-4 раза в неделю", 
      "Раз в неделю", 
      "2 раза в месяц", 
      "Раз в месяц", 
      "2-4 раза в год"
    ]
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
      } else if (q.type === 2 && savedAnswer && savedWeight) {
        return { id: q.id, answer: savedAnswer, weight: savedWeight };
      }
      return null;
    }).filter(a => a !== null);
    
    setAnswers(loadedAnswers);

    // Переход на последний неотвеченный вопрос
    const lastUnansweredQuestionIndex = quizQuestions.findIndex(q => 
      !loadedAnswers.some(a => a.id === q.id)
    );
    setCurrentQuestionIndex(lastUnansweredQuestionIndex !== -1 ? lastUnansweredQuestionIndex : quizQuestions.length - 1);
  }, []);

  const handleAnswer = (answer) => {
    const updatedAnswers = [...answers];
    const answerIndex = updatedAnswers.findIndex(a => a.id === answer.id);
    if (answerIndex > -1) {
      updatedAnswers[answerIndex] = answer; // Обновляем существующий ответ
    } else {
      updatedAnswers.push(answer); // Добавляем новый ответ
    }
    setAnswers(updatedAnswers);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmit = () => {
    console.log('Submitting answers:', answers);
    localStorage.clear(); // Очистка localStorage
    // Отправка структуры ответов на сервер
  };

  return (
    <div className="quiz-container">
      {currentQuestionIndex < quizQuestions.length ? (
        <>
          {quizQuestions[currentQuestionIndex].type === 1 ? (
            <QuestionType1
              data={quizQuestions[currentQuestionIndex]}
              onAnswer={handleAnswer}
            />
          ) : (
            <QuestionType2
              data={quizQuestions[currentQuestionIndex]}
              onAnswer={handleAnswer}
            />
          )}
          <div className="navigation-buttons">
            {currentQuestionIndex > 0 && (
              <button onClick={handlePrevious}>
                Назад
              </button>
            )}
            {currentQuestionIndex < quizQuestions.length - 1 ? (
              <button onClick={handleNext}>
                Вперед
              </button>
            ) : (
              <button onClick={handleSubmit}>
                Отправить ответы
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="quiz-results">
          <h2>Тест завершен!</h2>
        </div>
      )}
    </div>
  );
}

export default Quiz;
