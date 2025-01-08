import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import '../styles/QType3.css';

const VALID_FIELD = "valid"
const INVALID_FIELD = "invalid"

function QuestionType3({ data, onAnswer, amount }) {
    const [rawAnswer, setRawAnswer] = useState("");
    const { handleSubmit } = useForm();

    useEffect(() => {
        const savedAnswer = localStorage.getItem(`answer-${data.id}`);
        setRawAnswer(savedAnswer ? savedAnswer : "");
    }, [data.id]);

    const handleAnswer = () => {
        if (data.isNecessary && rawAnswer === "") {
            return;
        }

        localStorage.setItem(`answer-${data.id}`, (rawAnswer ? rawAnswer : " "));
        setRawAnswer("");
        onAnswer({ id: data.id, answer: rawAnswer, });
    };

    const validatePosNumbers = (num) => {
        return num > 0
    }

    return (
        <div className="raw-answer-container">
            <p className='question-number'>Вопрос {data.id}/{amount}</p>
            <h2>{data.question}</h2>
            {data.desc != null && (
                <p className='desc'>{data.desc}</p>
            )}

            <form onSubmit={handleSubmit(handleAnswer)}>
                <input
                    className='q3-raw-answer'
                    id='rawAnswer'
                    value={rawAnswer}
                    onChange={(e) => setRawAnswer(e.target.value)}
                />

                {data.isNecessary && (
                    <p className={`${rawAnswer === "" ? INVALID_FIELD : VALID_FIELD} err`}>
                        *Поле обязательно
                    </p>
                )}
                
                {data.link != null && (
                    <p className='external-link'>Ссылка{data.linkDesc != null ? " на " + data.linkDesc : ""}: <br></br> <a href={data.link} target="_blank">перейти</a></p>
                )}
                <input id='qt3-submit' type="submit" value="Далее" />
            </form>
        </div>
    );
}

export default QuestionType3;