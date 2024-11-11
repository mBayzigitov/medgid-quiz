import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import {QUESTIONS_AMOUNT as questionsAmount} from './QuizConstants';
import '../styles/QType3.css';

const VALID_FIELD = "valid"
const INVALID_FIELD = "invalid"

function QuestionType1({ data, onAnswer }) {
    const { register, formState: { errors }, handleSubmit, setValue } = useForm();
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [numericalAnswer, setNumericalAnswer] = useState(String(data.numAnswer).toLowerCase() === 'true');
    const [calcLink, setCalcLink] = useState(data.link);

    useEffect(() => {
        const savedAnswer = localStorage.getItem(`answer-${data.id}`);
        if (savedAnswer) {
            setSelectedAnswer(savedAnswer);
        }
        console.log(data.numAnswer)
    }, [data.id]);

    const handleAnswer = formData => {
        setSelectedAnswer(formData.rawAnswer);
        console.log(data.id + ": " + formData.rawAnswer)
        localStorage.setItem(`answer-${data.id}`, formData.rawAnswer);
        onAnswer({ id: data.id, answer: formData.rawAnswer, });
    };

    const validatePosNumbers = (num) => {
        return num > 0
    }

    return (
        <div className="raw-answer-container">
            <p className='question-number'>Вопрос {data.id}/{questionsAmount}</p>
            <h2>{data.question}</h2>

            <form onSubmit={handleSubmit(handleAnswer)}>
                {numericalAnswer && (
                    <input
                        className='q3-raw-answer'
                        id='rawAnswer'
                        {...register("rawAnswer", { required: true, validate: validatePosNumbers, })}
                    />
                )}
                {!numericalAnswer && (
                    <input
                        className='q3-raw-answer'
                        id='rawAnswer'
                        {...register("rawAnswer", { required: true, })}
                    />
                )}
                <p className={`${errors.rawAnswer ? INVALID_FIELD : VALID_FIELD} err`}>
                    {numericalAnswer ? (
                        '*Введено неверное число'
                    ) : (
                        '*Это поле обязательно'
                    )}
                </p>
                {data.link != null && (
                    <p className='external-link'>Ссылка на калькулятор: <a href={data.link} target="_blank">перейти</a></p>
                )}
                <input type="submit" value="Далее" />
            </form>
        </div>
    );
}

export default QuestionType1;