// src/components/Quiz.js
import React, { useState, useEffect } from 'react';
import QuestionType1 from './QuestionType1';
import QuestionType2 from './QuestionType2';
import QuestionType3 from './QuestionType3';

import '../styles/Quiz.css';

const sampleAnswers = [
  "Никогда/очень редко",
  "Раз в день",
  "2-4 раза в неделю",
  "Раз в неделю",
  "2 раза в месяц",
  "Раз в месяц",
  "2-4 раза в год"
]

const quizQuestions = [
  {
    id: 1,
    type: 1,
    question: "Опишите свою жизненную активность",
    answers: [
      "Работник преимущественно умственного труда",
      "Работник, занятый легким физическим трудом",
      "Работник среднего по тяжести труда",
      "Работник тяжелого физического труда"
    ]
  },
  {
    id: 2,
    type: 3,
    question: "Введите свой возраст",
    numAnswer: true,
    link: "http://google.com"
  },
  {
    id: 3,
    type: 3,
    question: "Введите имя питомца",
    numAnswer: false
  },
  // {
  //   id: 2,
  //   type: 1,
  //   question: "Опишите свою спортивную активность",
  //   answers: [
  //     "Не занимаюсь спортом",
  //     "Легкий спорт 1-2 раза в неделю",
  //     "Регулярный спорт 2-3 раза в неделю",
  //     "Активный спорт, ежедневные тренировки"
  //   ]
  // },
  // {
  //   id: 3,
  //   type: 1,
  //   question: "Следуете ли вы этим видам питания?",
  //   answers: [
  //     "Обычный, ем почти все",
  //     "Не ем только мясо",
  //     "Не ем только молочку",
  //     "Не ем сахара, молочку, глютен",
  //     "Вегетарианство",
  //     "Кошер (иудаизм)",
  //     "Сыроедение",
  //     "Халяль (ислам)"
  //   ]
  // },
  // {
  //   id: 4,
  //   type: 2,
  //   question: "Как часто едите мясные продукты: колбасы, сосиски?",
  //   image: "https://via.placeholder.com/150",
  //   answers: sampleAnswers,
  //   hints: [50, 75, 100, 150]
  // },
  // {
  //   id: 5,
  //   type: 2,
  //   question: "Нежирное мясо: говядина, конина, кролик?",
  //   image: "https://via.placeholder.com/150",
  //   answers: sampleAnswers,
  //   hints: [50, 75, 100, 150]
  // },
  // {
  //   id: 6,
  //   type: 2,
  //   question: "Фастфуд и полуфабрикаты: бутерброды, пельмени и др.",
  //   image: "https://via.placeholder.com/150",
  //   answers: sampleAnswers,
  //   hints: [110, 300, 315, 500]
  // },
  // {
  //   id: 7,
  //   type: 2,
  //   question: "Жирное мясо: свинина, баранина",
  //   image: "https://via.placeholder.com/150",
  //   answers: sampleAnswers,
  //   hints: [100, 150, 200, 250]
  // },
  // {
  //   id: 8,
  //   type: 2,
  //   question: "Птица: курица, утка, гусь и др.",
  //   image: "https://via.placeholder.com/150",
  //   answers: sampleAnswers,
  //   hints: [80, 120, 145, 200]
  // },
  // {
  //   id: 9,
  //   type: 2,
  //   question: "Рыба морская и речная в любом виде",
  //   image: "https://via.placeholder.com/150",
  //   answers: sampleAnswers,
  //   hints: [50, 105, 140]
  // },
  // {
  //   id: 10,
  //   type: 2,
  //   question: "Суши, роллы",
  //   image: "https://via.placeholder.com/150",
  //   answers: sampleAnswers,
  //   hints: [70, 155, 200, 300]
  // },
  // {
  //   id: 11,
  //   type: 2,
  //   question: "Морепродукты: креветки, кальмар и др.",
  //   image: "https://via.placeholder.com/150",
  //   answers: sampleAnswers,
  //   hints: [50, 100, 150, 200]
  // },
  // {
  //   id: 12,
  //   type: 2,
  //   question: "Морские водоросли: морская капуста, чука и др.",
  //   image: "https://via.placeholder.com/150",
  //   answers: sampleAnswers,
  //   hints: [25, 50, 75, 100]
  // },
  // {
  //   id: 13,
  //   type: 2,
  //   question: "Икра рыб",
  //   image: "https://via.placeholder.com/150",
  //   answers: sampleAnswers,
  //   hints: [10, 30, 50]
  // },
  // {
  //   id: 14,
  //   type: 2,
  //   question: "Молоко и кисломолочные продукты",
  //   image: "https://via.placeholder.com/150",
  //   answers: sampleAnswers,
  //   hints: [100, 200, 250, 300]
  // },
  // {
  //   id: 15,
  //   type: 2,
  //   question: "Творог и творожные блюда",
  //   image: "https://via.placeholder.com/150",
  //   answers: sampleAnswers,
  //   hints: [50, 75, 100, 150]
  // },
  // {
  //   id: 16,
  //   type: 2,
  //   question: "Сметана и сливки",
  //   image: "https://via.placeholder.com/150",
  //   answers: sampleAnswers,
  //   hints: [10, 20, 30, 50]
  // },
  // {
  //   id: 17,
  //   type: 2,
  //   question: "Сыры",
  //   image: "https://via.placeholder.com/150",
  //   answers: sampleAnswers,
  //   hints: [10, 20, 30, 50]
  // },
  // {
  //   id: 18,
  //   type: 2,
  //   question: "Яйца: вареные, омлет, яичница",
  //   image: "https://via.placeholder.com/150",
  //   answers: sampleAnswers,
  //   hints: [60, 100, 150]
  // },
  // {
  //   id: 19,
  //   type: 2,
  //   question: "Хлеб белый, черный и др.",
  //   image: "https://via.placeholder.com/150",
  //   answers: sampleAnswers,
  //   hints: [20, 30, 50, 100]
  // },
  // {
  //   id: 20,
  //   type: 2,
  //   question: "Макароны, паста",
  //   image: "https://via.placeholder.com/150",
  //   answers: sampleAnswers,
  //   hints: [100, 200, 250]
  // },
  // {
  //   id: 21,
  //   type: 2,
  //   question: "Картофель и блюда из картофеля",
  //   image: "https://via.placeholder.com/150",
  //   answers: sampleAnswers,
  //   hints: [200, 300]
  // },
  // {
  //   id: 22,
  //   type: 2,
  //   question: "Крупы (на гарнир)",
  //   image: "https://via.placeholder.com/150",
  //   answers: sampleAnswers,
  //   hints: [100, 200]
  // },
  // {
  //   id: 23,
  //   type: 2,
  //   question: "Шоколад и шоколадные конфеты",
  //   image: "https://via.placeholder.com/150",
  //   answers: sampleAnswers,
  //   hints: [50, 85]
  // },
  // {
  //   id: 24,
  //   type: 2,
  //   question: "Изделия из теста: блины, булки и др.",
  //   image: "https://via.placeholder.com/150",
  //   answers: sampleAnswers,
  //   hints: [30, 70, 125]
  // },
  // {
  //   id: 25,
  //   type: 2,
  //   question: "Пирожные, торты, печенье и др.",
  //   image: "https://via.placeholder.com/150",
  //   answers: sampleAnswers,
  //   hints: [100, 130, 200]
  // },
  // {
  //   id: 26,
  //   type: 2,
  //   question: "Зефир, мармелад, варенье и др.",
  //   image: "https://via.placeholder.com/150",
  //   answers: sampleAnswers,
  //   hints: [20, 30, 50]
  // },
  // {
  //   id: 27,
  //   type: 2,
  //   question: "Любые свежие фрукты",
  //   image: "https://via.placeholder.com/150",
  //   answers: sampleAnswers,
  //   hints: [115, 155, 260, 350]
  // },
  // {
  //   id: 28,
  //   type: 2,
  //   question: "Грибы",
  //   image: "https://via.placeholder.com/150",
  //   answers: sampleAnswers,
  //   hints: [17, 33, 50]
  // },
  // {
  //   id: 29,
  //   type: 2,
  //   question: "Любые свежие овощи и зелень",
  //   image: "https://via.placeholder.com/150",
  //   answers: sampleAnswers,
  //   hints: [40, 60, 150, 200]
  // },
  // {
  //   id: 30,
  //   type: 2,
  //   question: "Орехи, семена любые",
  //   image: "https://via.placeholder.com/150",
  //   answers: sampleAnswers,
  //   hints: [50, 100, 150]
  // },
  // {
  //   id: 31,
  //   type: 2,
  //   question: "Сухофрукты",
  //   image: "https://via.placeholder.com/150",
  //   answers: sampleAnswers,
  //   hints: [50, 100]
  // },
  // {
  //   id: 32,
  //   type: 2,
  //   question: "Любые свежие овощи и зелень",
  //   image: "https://via.placeholder.com/150",
  //   answers: sampleAnswers,
  //   hints: [40, 60, 150, 200]
  // },
  // {
  //   id: 33,
  //   type: 2,
  //   question: "Чай, кофе",
  //   image: "https://via.placeholder.com/150",
  //   answers: sampleAnswers,
  //   hints: [80, 180, 300]
  // },
  // {
  //   id: 34,
  //   type: 2,
  //   question: "Сладкие напитки б/а, сок",
  //   image: "https://via.placeholder.com/150",
  //   answers: sampleAnswers,
  //   hints: [150, 250]
  // },
  // {
  //   id: 35,
  //   type: 2,
  //   question: "Пиво",
  //   image: "https://via.placeholder.com/150",
  //   answers: sampleAnswers,
  //   hints: [200, 250, 500]
  // },
  // {
  //   id: 36,
  //   type: 2,
  //   question: "Вины любых сортов",
  //   image: "https://via.placeholder.com/150",
  //   answers: sampleAnswers,
  //   hints: [100, 200, 250]
  // },
  // {
  //   id: 37,
  //   type: 2,
  //   question: "Водка, коньяк, настойки",
  //   image: "https://via.placeholder.com/150",
  //   answers: sampleAnswers,
  //   hints: [20, 40]
  // },
  // {
  //   id: 38,
  //   type: 2,
  //   question: "Масло растительное",
  //   image: "https://via.placeholder.com/150",
  //   answers: sampleAnswers,
  //   hints: [0.5, 1.5]
  // },
  // {
  //   id: 39,
  //   type: 2,
  //   question: "Масло сливочное",
  //   image: "https://via.placeholder.com/150",
  //   answers: sampleAnswers,
  //   hints: [5, 10, 15]
  // },
  // {
  //   id: 40,
  //   type: 2,
  //   question: "Соусы: майонез, сливочный, сырный и др.",
  //   image: "https://via.placeholder.com/150",
  //   answers: sampleAnswers,
  //   hints: [8, 15, 25]
  // },
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
      } else if (q.type === 3 && savedAnswer) {
        return { id: q.id, answer: savedAnswer, }
      }
      return null;
    }).filter(a => a !== null);

    setAnswers(loadedAnswers);
    console.log(loadedAnswers)

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
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const currentAnswer = answers.find(a => a.id === currentQuestion.id);

  return (
    <div className="main-container">
      {currentQuestion.type === 1 && (
        <QuestionType1
          data={currentQuestion}
          onAnswer={handleAnswer}
        />
      )} 
      {currentQuestion.type === 2 && (
        <QuestionType2
          data={currentQuestion}
          onAnswer={handleAnswer}
          savedAnswer={currentAnswer}
        />
      )}
      {currentQuestion.type === 3 && (
        <QuestionType3
          data={currentQuestion}
          onAnswer={handleAnswer}
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
