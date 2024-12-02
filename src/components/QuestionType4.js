import React, { useState, useEffect } from 'react';

function QuestionType4({data, onAnswer, amount}) {
  // Состояние для хранения введенных значений и подсказок
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState([]);

  // Функция для записи в localStorage
  const saveItemsToLocalStorage = (items) => {
    localStorage.setItem(`answer-${data.id}`, JSON.stringify(items));
  };

  // Функция загрузки списка из localStorage
  const loadItemsFromLocalStorage = () => {
    const savedItems = localStorage.getItem(`answer-${data.id}`);
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  };

  // Загружаем список при монтировании компонента
  useEffect(() => {
    loadItemsFromLocalStorage();
  }, [data.id]);

  // Функция добавления элемента
  const handleAddItem = () => {
    if (inputValue.trim() !== '') {
      const updatedItems = [...items, inputValue];
      setItems(updatedItems);
      saveItemsToLocalStorage(updatedItems); // Сохраняем в localStorage
      setInputValue(''); // Очистить поле ввода
    }
  };

  // Функция удаления элемента
  const handleRemoveItem = (itemToRemove) => {
    const updatedItems = items.filter((item) => item !== itemToRemove);
    setItems(updatedItems);
    saveItemsToLocalStorage(updatedItems); // Сохраняем в localStorage
  };

  // Функция добавления элемента по подсказке
  const handleAddHint = (hint) => {
    const updatedItems = [...items, hint];
    setItems(updatedItems);
    saveItemsToLocalStorage(updatedItems); // Сохраняем в localStorage
  };

  const handleAnswer = () => {
    onAnswer({ id: data.id, answer: items});
  }

  return (
    <div className="question-type-4-container">
      <p className='question-number'>Вопрос {data.id}/{amount}</p>

      {/* Вопрос */}
      <p className="question-text">{data.question}</p>

      {/* Форма ввода */}
      <div className="input-wrapper">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Введите элемент"
          className="input-field"
        />
        <button
          onClick={handleAddItem}
          className="add-button"
          disabled={!inputValue.trim()}
        >
          Добавить
        </button>
      </div>

      {/* Список добавленных элементов */}
      <div className="items-list">
        {items.length > 0 && (
          <ul>
            {items.map((item, index) => (
              <li key={index} className="list-item">
                <p className='list-item-name'>{item}</p>
                <button
                  onClick={() => handleRemoveItem(item)}
                  className="remove-button"
                >
                  Удалить
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Список подсказок */}
      <div className="hints">
        <p className="hints-title">Возможные варианты:</p>
        <div className="hints-list">
          {data.hints?.map((hint, index) => (
            <button
              key={index}
              onClick={() => handleAddHint(hint)}
              className="hint-button"
            >
              {hint}
            </button>
          ))}
        </div>
      </div>
      <button onClick={handleAnswer} className="q4-submit-button">
        Подтвердить
      </button>
    </div>
  );
};

export default QuestionType4;
