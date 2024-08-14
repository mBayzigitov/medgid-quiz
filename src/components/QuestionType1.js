// src/components/QuestionType1.js
import React, { useEffect, useState } from 'react';

function QuestionType1({ data, onAnswer }) {
  const [selectedAnswer, setSelectedAnswer] = useState('');

  useEffect(() => {
    // Загружаем ответ из localStorage, если он есть
    const savedAnswer = localStorage.getItem(`answer-${data.id}`);
    if (savedAnswer) {
      setSelectedAnswer(savedAnswer);
    }
  }, [data.id]);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    localStorage.setItem(`answer-${data.id}`, answer); // Сохраняем ответ в localStorage
    onAnswer({ id: data.id, answer });
  };

  return (
    <div className="question-container">
      <h2>{data.question}</h2>
      <div className="answers-container">
        {data.answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(answer)}
            className={`answer-button ${selectedAnswer === answer ? 'selected' : ''}`}
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuestionType1;
