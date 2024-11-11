import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import '../styles/Base.css';
import '../styles/ApplicationForm.css';

const VALIDATION_REQUIRED_FIELD_TEXT = "* Это поле обязательно"

const VALID_FIELD = "validation-ok"
const INVALID_FIELD = "validation-fail"

function ApplicationForm({ incrementStep }) {
    const { register, formState: { errors }, handleSubmit, setValue } = useForm();
    const onSubmit = data => {
        localStorage.setItem(`aform`, JSON.stringify(data));
        console.log(data);
        incrementStep();
    }

    useEffect(() => {
        let storedStruct = localStorage.getItem(`aform`);

        if (storedStruct) {
            const filledForm = JSON.parse(storedStruct);
            
            Object.keys(filledForm).forEach(key => {
                setValue(key, filledForm[key]);
            });
        }
    }, [setValue]);

    // Custom date validation function
    const validateDate = (value) => {
        const datePattern = /^(0?[1-9]|[12][0-9]|3[01])\.(0?[1-9]|1[0-2])\.(\d{4})$/;
        if (!datePattern.test(value)) {
            return false;
        }

        const [day, month, year] = value.split('.').map(Number);
        const date = new Date(year, month - 1, day);

        return (
            date.getFullYear() === year &&
            date.getMonth() + 1 === month &&
            date.getDate() === day
        );
    };

    // Validate height and weight
    const validatePosNumbers = (num) => {
        return num > 0 && num <= 250
    }

    return (
        <div className='main-container'>
            <h4 id='input-data'>Пожалуйста, заполните данные</h4>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="name-container">
                    {/* Фамилия */}
                    <input
                        id='surname'
                        placeholder='Фамилия'
                        {...register("surname", { required: true })}
                    />

                    {/* Имя */}
                    <input
                        id='name'
                        placeholder='Имя'
                        {...register("firstName", { required: true })}
                    />
                </div>
                <div className='errs-container'>
                    <p className={`${errors.surname ? INVALID_FIELD : VALID_FIELD}`}>{VALIDATION_REQUIRED_FIELD_TEXT}</p>
                    <p className={`${errors.firstName ? INVALID_FIELD : VALID_FIELD}`}>{VALIDATION_REQUIRED_FIELD_TEXT}</p>
                </div>

                <div className="anthropometry-container">
                    {/* Рост */}
                    <input
                        id='height'
                        placeholder='Рост'
                        {...register("height", { required: true, validate: validatePosNumbers, })}
                    />

                    {/* Вес */}
                    <input
                        id='weight'
                        placeholder='Вес'
                        {...register("weight", { required: true, validate: validatePosNumbers, })}
                    />
                </div>
                <div className='errs-container'>
                    <p id='height-err' className={`${errors.height ? INVALID_FIELD : VALID_FIELD}`}>* Введите корректный рост</p>
                    <p className={`${errors.weight ? INVALID_FIELD : VALID_FIELD}`}>* Введите корректный вес</p>
                </div>

                {/* Дата рождения */}
                <input
                    className='plain-input'
                    placeholder='Дата рождения'
                    {...register("birthDate", {
                        required: true,
                        validate: validateDate,
                    })}
                />
                <p className={`${errors.birthDate ? INVALID_FIELD : VALID_FIELD} plain-error`}>* Введите корректную дату</p>

                {/* Пол */}
                <select className='plain-input' {...register("gender", { required: true })}>
                    <option value="">Выберите пол</option>
                    <option value="male">Мужской</option>
                    <option value="female">Женский</option>
                </select>
                <p className={`${errors.gender ? INVALID_FIELD : VALID_FIELD} plain-error`}>* Выберите один из вариантов</p>

                {/* Электронная почта */}
                <input
                    className='plain-input'
                    type="email"
                    placeholder='Электронная почта'
                    {...register("email", {
                        required: true,
                        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    })}
                />
                <p className={`${errors.email ? INVALID_FIELD : VALID_FIELD} plain-error`}>* Введите корректную почту</p>

                {/* Телефонный номер */}
                <input
                    className='plain-input'
                    type="tel"
                    placeholder='Телефонный номер'
                    {...register("phone", {
                        required: true,
                        pattern: /^\+?[1-9]\d{10}$/,
                    })}
                />
                <p className={`${errors.phone ? INVALID_FIELD : VALID_FIELD} plain-error`}>* Введите корректный номер телефона</p>

                {/* Отправить */}
                <input type="submit" />
            </form>

        </div>
    );
}

export default ApplicationForm;
