// src/components/QuestionType2.js
import React, { useEffect, useState } from 'react';

function QuestionType2({ data, onAnswer }) {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [portionWeight, setPortionWeight] = useState('');

  useEffect(() => {
    const savedAnswer = localStorage.getItem(`answer-${data.id}`);
    const savedWeight = localStorage.getItem(`weight-${data.id}`);
    if (savedAnswer) {
      setSelectedAnswer(savedAnswer);
    }
    if (savedWeight) {
      setPortionWeight(savedWeight);
    }
  }, [data.id]);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    localStorage.setItem(`answer-${data.id}`, answer); 
  };

  const handlePortionWeightSubmit = () => {
    localStorage.setItem(`weight-${data.id}`, portionWeight);
    onAnswer({ id: data.id, answer: selectedAnswer, weight: portionWeight });
  };

  return (
    <div className="question-container">
      <h2>{data.question}</h2>
      <div className="image-container">
        <img src={data.image} alt="Product" className="product-image" />
      </div>
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
      {selectedAnswer && (
        <div className="portion-weight-container">
          <label>Сколько граммов весит порция?</label>
          <input
            type="number"
            value={portionWeight}
            onChange={(e) => setPortionWeight(e.target.value)}
            className="portion-weight-input"
          />
          <button onClick={handlePortionWeightSubmit} className="submit-button">
            Подтвердить
          </button>
        </div>
      )}
    </div>
  );
}

export default QuestionType2;
