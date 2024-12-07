// src/App.js
import React, { useState, useEffect } from 'react';
import Quiz from './components/Quiz';
import ApplicationForm from './components/ApplicationForm'
import './styles/App.css';
import './styles/Base.css';
import MedicalTests from './components/MedicalTests';

const QUIZ_STARTED_FLAG_STORAGE_KEY = "quiz-started"
const STEPS_BEFORE_QUIZ = 3;

const ACTIVITY_LEVEL_1 = "Не занимаюсь спортом";
const ACTIVITY_LEVEL_2 = "Легкий спорт 1-2 раза в неделю";
const ACTIVITY_LEVEL_3 = "Регулярный спорт 2-3 раза в неделю";
const ACTIVITY_LEVEL_4 = "Активный спорт, ежедневные тренировки";

const sampleHints = [
  "Нутрилайт (Nutrilite)",
  "Адженис (Agenyz)",
  "4Life Трансфер Фактор"
]

const quizQuestions = [
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
    question: "Принимаете ли какие-то препараты?",
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
      ACTIVITY_LEVEL_1,
      ACTIVITY_LEVEL_2,
      ACTIVITY_LEVEL_3,
      ACTIVITY_LEVEL_4
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
    question: "Сдавали ли за последние полгода биоимпедансометрию",
    answers: [
      "Да",
      "Нет"
    ]
  },
  {
    type: 1,
    question: "Есть ли результат исследования методом ХМС «по Осипову» микробиома кишечника за последние 3 месяца",
    answers: [
      "Да",
      "Нет"
    ]
  },
  {
    type: 1,
    question: "Сдавали ли ОАК (общий анализ крови) в недавнее время?",
    answers: [
      "Да",
      "Нет"
    ]
  },
  {
    type: 4,
    question: "Какие из БАДов принимаете?",
    hints: sampleHints
  }
].map((question, index) => ({ id: index + 1, ...question }));

function App() {
  const [step, setStep] = useState(0)
  const [quizStarted, setQuizStarted] = useState(false)
  const [clicked, setClicked] = useState(false);
  const [quizDone, setQuizDone] = useState(false);
  const [filesAttached, setFilesAttached] = useState(false);

  const [finalAnswers, setFinalAnswers] = useState(null);

  useEffect(() => {
    const startFlag = localStorage.getItem(QUIZ_STARTED_FLAG_STORAGE_KEY)
    if (startFlag) {
      setQuizStarted(true)
    }
  });

  const handleStartQuiz = () => {
    setQuizStarted(true)
    localStorage.setItem(QUIZ_STARTED_FLAG_STORAGE_KEY, true)
  }

  const handleNextStep = () => {
    setStep(step + 1)

    if (step >= STEPS_BEFORE_QUIZ - 1) {
      handleStartQuiz()
    }
  }

  const endQuiz = () => {
    setQuizDone(true);
  }

  const passMedicalTests = () => {
    setFilesAttached(true);
  }

  return (
    <div className="App">
      {(!quizDone && (step >= STEPS_BEFORE_QUIZ || quizStarted)) && (
        <Quiz 
          quizQuestions={quizQuestions}
          endQuiz={endQuiz}
          setFinalAnswers={setFinalAnswers}
        />
      )}
      {quizDone && !filesAttached && (
        <MedicalTests
          medicalTestsDone={passMedicalTests}
          quizQuestions={quizQuestions}
          finalAnswers={finalAnswers}
        />
      )}
      {quizDone && filesAttached && (
        <div>
          <div class="main-container">
            <div className='centered-text'>
              <img id='logo' src='logo.png'></img>
              <h4>Тестирование окончено</h4>
              <p>Спасибо за уделенное время!</p>
            </div>
          </div>
        </div>
      )}
      {!quizDone && step === 0 && !quizStarted && (
        <div>
          <div class="main-container">
            <div className='centered-text'>
              <img id='logo' src='logo.png'></img>
              <h4>Здравствуйте!</h4>
              <p><b>Алла Исаева</b> с исполнением ресурсов сайта <a href="https://medgid.pro" target="_blank">medgid.pro</a> приглашает Вас пройти небольшое тестирование, направленное на общую диагностику</p>
              <p>Результат зависит от точности и честности ваших ответов</p>
              <p id='by-mistake'>Если тестирование было отправлено вам ошибочно, проигнорируйте его</p>
            </div>
            <button onClick={handleNextStep}>Продолжить</button>
          </div>
        </div>
      )}
      {(step === 1 && !quizStarted) && (
        <div className='main-container'>
          <div className='centered-text personal-data'>
            <h4>О персональных данных</h4>
            <p>Проходя опросник, вы соглашаетесь с политикой обработки персональных данных</p>
            <a href="https://medgid.pro/policy/" onClick={() => setClicked(true)} target="_blank">Ознакомиться с политикой обработки данных</a>
            {/* <p>Уважаемый пользователь, в соответствии с ФЗ №152 мы обязаны получить от вас согласие на обработку персональных данных. Полный
              текст согласия ниже.</p>
            <p>В соответствии с требованиями ст. 9 ФЗ от 27.07.2006 г. «О
              персональных данных» № 152-ФЗ, настоящим подтверждаю
              свое согласие на обработку Обществом с ограниченной
              ответственностью «МедГид» (далее - Оператор) моих
              персональных данных, включающих: фамилия, имя, отчество,
              дата рождения, пол, электронная почта, телефон, адрес,
              антропометрия, медицинский анамнез.
            </p>
            <p>Предоставляю Оператору право осуществлять все действия
              (операции) с моими персональными данными, включая сбор,
              систематизацию, накопление, хранение, обновление,
              изменение, использование, обезличивание, блокирование,
              уничтожение. Оператор вправе обрабатывать мои
              персональные данные посредством внесения их в
              электронную базу, включения в списки (реестры) и отчетные
              формы, и специализированные сервисы.</p>
            <p><b>Настоящим подтверждаю, что понимаю и осознаю, что
              полученная в рамках оказания мне услуг информация носит
              рекомендательный характер и не является назначением врача
              или иного медицинского работника.</b></p> */}
            <button className="agreed" onClick={handleNextStep} disabled={!clicked}>Далее</button>
          </div>
        </div>
      )}
      {(step === 2 && !quizStarted) && (
        <ApplicationForm 
            incrementStep={handleNextStep}
        />
      )}
    </div>
  );
}

export default App;
