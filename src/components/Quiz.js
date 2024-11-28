// src/components/Quiz.js
import React, { useState, useEffect } from 'react';
import QuestionType1 from './QuestionType1';
import QuestionType2 from './QuestionType2';
import QuestionType3 from './QuestionType3';

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

const quizQuestions = [
  {
    type: 3,
    question: "Сколько Ккал потребляете в день?",
    desc: "Выбрать среднее значение за 3-5 дней",
    linkDesc: "дневник питания с подсчетом калорий",
    link: "https://health-diet.ru/diary/foodDiary",
    isNecessary: false
  },
  {
    type: 3,
    question: "Заболевания, операции",
    desc: "Перечислите хронические заболевания, операции",
    linkDesc: null,
    link: null,
    isNecessary: true
  },
  {
    type: 3,
    question: "Заболевания на данный момент",
    desc: "Болеете ли чем-то на данный момент? Например, ОРЗ",
    linkDesc: null,
    link: null,
    isNecessary: false
  },
  {
    type: 3,
    question: "Жалобы",
    desc: "Опишите жалобы подробнее",
    linkDesc: null,
    link: null,
    isNecessary: false
  },
  {
    type: 3,
    question: "Принимаете ли препараты, БАДы?",
    desc: "Укажите какие, если принимаете",
    linkDesc: null,
    link: null,
    isNecessary: false
  },
  {
    type: 3,
    question: "Исключенные продукты",
    desc: "Перечислите продукты, которые исключаете, если такие есть",
    linkDesc: null,
    link: null,
    isNecessary: false
  },
  {
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
    type: 3,
    question: "Сон",
    desc: "С ... до ... , также напишите, если есть проблемы со сном",
    linkDesc: null,
    link: null,
    isNecessary: true
  },
  {
    type: 1,
    question: "Сдавали анализ ХМС по диагностике микробиоты (по Осипову)?",
    answers: [
      "Да, недавно",
      "Да, довольно давно",
      "Нет"
    ]
  },
  {
    type: 1,
    question: "Сдавали ли ОАК и др. анализы в недавнее время?",
    answers: [
      "Да",
      "Нет"
    ]
  },
  {
    type: 1,
    question: "Проходили ли Биоимпедансный анализ?",
    answers: [
      "Да",
      "Нет"
    ]
  },
].map((question, index) => ({ id: index + 1, ...question }));

function Quiz({ endQuiz }) {
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

    const data = JSON.parse(localStorage.getItem(`aform`));

    // Расчёт ИМТ
    const bmi = (data.weight / ((data.height / 100) ** 2)).toFixed(2); // Преобразуем рост из см в метры

    // Интерпретация ИМТ
    let bmiInterpretation = "";
    if (bmi <= 16) {
        bmiInterpretation = "Выраженный дефицит массы тела";
    } else if (bmi > 16 && bmi <= 18.5) {
        bmiInterpretation = "Недостаточная (дефицит) масса тела";
    } else if (bmi > 18.5 && bmi <= 25) {
        bmiInterpretation = "Норма";
    } else if (bmi > 25 && bmi <= 30) {
        bmiInterpretation = "Избыточная масса тела (предожирение)";
    } else if (bmi > 30 && bmi <= 35) {
        bmiInterpretation = "Ожирение 1 степени";
    } else if (bmi > 35 && bmi <= 40) {
        bmiInterpretation = "Ожирение 2 степени";
    } else if (bmi > 40) {
        bmiInterpretation = "Ожирение 3 степени";
    }

    // Расчёт базового метаболизма (BMR) по формуле Миффлина-Сан Жеора
    const isMale = data.gender === "male"; // Предполагается, что в data есть поле gender с значением "male" или "female"
    const bmr = (
        10 * data.weight +
        6.25 * data.height -
        5 * data.age +
        (isMale ? 5 : -161)
    );

    // Учёт коэффициента активности
    const activityMultiplier = data.activityLevel || 1.2; // Предполагается, что в data есть поле activityLevel
    const calories = (bmr * activityMultiplier).toFixed(2);

    // Расчёт БЖУ
    const proteinCalories = calories * 0.3; // 30% калорий на белки
    const fatCalories = calories * 0.3; // 30% калорий на жиры
    const carbCalories = calories * 0.4; // 40% калорий на углеводы

    const macros = {
        protein: (proteinCalories / 4).toFixed(2), // Белки: 1 г = 4 ккал
        fat: (fatCalories / 9).toFixed(2), // Жиры: 1 г = 9 ккал
        carbs: (carbCalories / 4).toFixed(2) // Углеводы: 1 г = 4 ккал
    };

    // Добавляем результаты в data
    const enrichedData = {
        ...data,
        bmi,
        bmiInterpretation,
        calories,
        macros
    };

    console.log("Application form data: ", enrichedData);

    localStorage.clear();

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
