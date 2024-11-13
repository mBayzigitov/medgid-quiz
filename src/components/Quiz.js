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
    type: 3,
    question: "Введите свой индекс массы тела",
    desc: null,
    link: "https://diet.neolove.ru/calc/ideal_ves_imt/",
    linkDesc: "калькулятор",
    isNecessary: false
  },
  {
    id: 2,
    type: 3,
    question: "Сколько Ккал потребляете в день?",
    desc: "Выбрать среднее значение за 3-5 дней",
    linkDesc: "дневник питания с подсчетом калорий",
    link: "https://health-diet.ru/diary/foodDiary",
    isNecessary: false
  },
  {
    id: 3,
    type: 3,
    question: "Требуемое количество Ккал в день",
    desc: null,
    linkDesc: "калькулятор",
    link: "https://diet.neolove.ru/calc/calc_global_pohudenie/",
    isNecessary: false
  },
  {
    id: 4,
    type: 3,
    question: "Качество БЖУ в сутки",
    desc: null,
    linkDesc: "калькулятор",
    link: "https://zozhnik.ru/calc_pfc/",
    isNecessary: false
  },
  {
    id: 5,
    type: 3,
    question: "Количество БЖУ в сутки",
    desc: null,
    linkDesc: "калькулятор",
    link: "https://zozhnik.ru/calc_pfc/",
    isNecessary: false
  },
  {
    id: 6,
    type: 3,
    question: "Заболевания, операции",
    desc: "Перечислите хронические заболевания, операции",
    linkDesc: null,
    link: null,
    isNecessary: true
  },
  {
    id: 7,
    type: 3,
    question: "Заболевания на данный момент",
    desc: "Болеете ли чем-то на данный момент? Например, ОРЗ",
    linkDesc: null,
    link: null,
    isNecessary: false
  },
  {
    id: 8,
    type: 3,
    question: "Жалобы",
    desc: "Опишите жалобы подробнее",
    linkDesc: null,
    link: null,
    isNecessary: false
  },
  {
    id: 9,
    type: 3,
    question: "Принимаете ли препараты, БАДы?",
    desc: "Укажите какие, если принимаете",
    linkDesc: null,
    link: null,
    isNecessary: false
  },
  {
    id: 10,
    type: 3,
    question: "Исключенные продукты",
    desc: "Перечислите продукты, которые исключаете, если такие есть",
    linkDesc: null,
    link: null,
    isNecessary: false
  },
  {
    id: 11,
    type: 1,
    question: "Опишите свою спортивную активность",
    answers: [
      "Не занимаюсь спортом",
      "Легкий спорт 1-2 раза в неделю",
      "Регулярный спорт 2-3 раза в неделю",
      "Активный спорт, ежедневные тренировки"
    ]
  },
  {
    id: 12,
    type: 3,
    question: "Сон",
    desc: "С ... до ... , также напишите, если есть проблемы со сном",
    linkDesc: null,
    link: null,
    isNecessary: true
  },
  {
    id: 13,
    type: 1,
    question: "Сдавали анализ ХМС по диагностике микробиоты (по Осипову)?",
    answers: [
      "Да, недавно",
      "Да, довольно давно",
      "Нет"
    ]
  },
  {
    id: 14,
    type: 1,
    question: "Сдавали ли ОАК и др. анализы в недавнее время?",
    answers: [
      "Да",
      "Нет"
    ]
  },
  {
    id: 15,
    type: 1,
    question: "Проходили ли Биоимпедансный анализ?",
    answers: [
      "Да",
      "Нет"
    ]
  },
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
