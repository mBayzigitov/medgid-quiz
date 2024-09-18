// src/App.js
import React, { useState, useEffect } from 'react';
import Quiz from './components/Quiz';
import ApplicationForm from './components/ApplicationForm'
import './styles/App.css';
import './styles/Base.css';

const QUIZ_STARTED_FLAG_STORAGE_KEY = "quiz-started"
const STEPS_BEFORE_QUIZ = 3;

function App() {
  const [step, setStep] = useState(0)
  // const [quizStarted, setQuizStarted] = useState(false)

  // useEffect(() => {
  //   const startFlag = localStorage.getItem(QUIZ_STARTED_FLAG_STORAGE_KEY)
  //   if (startFlag) {
  //     setQuizStarted(true)
  //   }
  // });

  // const handleStartQuiz = () => {
  //   setQuizStarted(true)
  //   localStorage.setItem(QUIZ_STARTED_FLAG_STORAGE_KEY, true)
  // }

  const handleNextStep = () => {
    setStep(step + 1)
  }

  return (
    <div className="App">
      {step === 0 && (
        <div>
          <div class="main-container">
            <div className='centered-text'>
              <img id='logo' src='logo.png'></img>
              <h4>Здравствуйте!</h4>
              <p><b>Алла Исаева</b> приглашает Вас оценить сбалансированность вашего питания и микробный состав кишечника</p>
              <p>Результат зависит от точности и честности ваших ответов</p>
              <p id='by-mistake'>Если тестирование было отправлено вам ошибочно, проигнорируйте его</p>
            </div>
            <button onClick={handleNextStep}>Продолжить</button>
          </div>
        </div>
      )}
      {step === 1 && (
        <div className='main-container'>
          <div className='centered-text personal-data'>
            <h4>О персональных данных</h4>
            <p>Уважаемый пользователь, в соответствии с ФЗ №152 мы обязаны получить от вас согласие на обработку персональных данных. Полный
              текст согласия ниже.</p>
            <p>В соответствии с требованиями ст. 9 ФЗ от 27.07.2006 г. «О
              персональных данных» № 152-ФЗ, настоящим подтверждаю
              свое согласие на обработку Обществом с ограниченной
              ответственностью «Нутрилоджик» (далее - Оператор) моих
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
              или иного медицинского работника.</b></p>
            <button onClick={handleNextStep}>Подтверждаю</button>
          </div>
        </div>
      )}
      {step === 2 && (
        <ApplicationForm 
            incrementStep={handleNextStep}
        />
      )}
      {step === 3 && (
        <Quiz />
      )}
    </div>
  );
}

export default App;
