// src/components/QuestionType2.js
import React, { useEffect, useState } from 'react';

const MAX_PORTION_WEIGHT = 500

function QuestionType2({ data, onAnswer, savedAnswer, amount }) {
  const [selectedAnswer, setSelectedAnswer] = useState(savedAnswer ? savedAnswer.answer : '');
  const [portionWeight, setPortionWeight] = useState(
    savedAnswer && savedAnswer.answer !== 'Никогда/очень редко' ? savedAnswer.weight : 0
  );
  const [grammageHint, setGrammageHint] = useState(data ? data.hints : [])

  useEffect(() => {
    const savedAnswer = localStorage.getItem(`answer-${data.id}`);
    const savedWeight = localStorage.getItem(`weight-${data.id}`);
    if (savedAnswer) {
      setSelectedAnswer(savedAnswer);
    }
    if (savedWeight && savedAnswer !== 'Никогда/очень редко') {
      setPortionWeight(savedWeight);
    }
  }, [data.id]);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    if (answer === 'Никогда/очень редко') {
      setPortionWeight(0); // Устанавливаем вес в 0
      localStorage.setItem(`weight-${data.id}`, 0);
      onAnswer({ id: data.id, answer: answer, weight: 0 }); // Отправляем ответ с весом 0
    } else {
      setPortionWeight(''); // Очищаем поле для нового ввода
    }
    localStorage.setItem(`answer-${data.id}`, answer);
  };

  const handlePortionWeightSubmit = () => {
    localStorage.setItem(`weight-${data.id}`, portionWeight);
    onAnswer({ id: data.id, answer: selectedAnswer, weight: portionWeight });
    setSelectedAnswer('');
  };

  return (
    <div className="question-container">
            <p className='question-number'>Вопрос {data.id}/{amount}</p>
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
      {selectedAnswer && selectedAnswer !== 'Никогда/очень редко' && (
        <div className="portion-weight-container">
          <p id='portionWeightQuestion'>Сколько граммов весит порция?</p>
          <div className='portion-input-container'>
            <input
              type="number"
              value={portionWeight}
              onChange={(e) => setPortionWeight(e.target.value)}
              className="portion-weight-input"
            />
            <button onClick={handlePortionWeightSubmit} className="submit-button" disabled={portionWeight <= 0 || portionWeight > MAX_PORTION_WEIGHT}>
              Подтвердить
            </button>
          </div>
          <div className="grammage-hints">
          {grammageHint.map((hint) => (
            <button onClick={(e) => setPortionWeight(e.target.innerHTML)} className="gram-hints">{hint}</button>
          ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default QuestionType2;
