import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import '../styles/Base.css';
import '../styles/Questionnaire.css';

// Regex for DD.MM.YYYY format
const VALIDATION_REQUIRED_FIELD_TEXT = "* Это поле обязательно"

function Questionnaire() {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);

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

    return (
        <div className='main-container'>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Фамилия */}
                <input
                    placeholder='Фамилия'
                    {...register("surname", { required: true })}
                />
                {errors.surname && <p className="validation-msg">{VALIDATION_REQUIRED_FIELD_TEXT}</p>}

                {/* Имя */}
                <input
                    placeholder='Имя'
                    {...register("firstName", { required: true })}
                    aria-invalid={errors.firstName ? "true" : "false"}
                />
                {errors.firstName?.type === 'required' && <p className="validation-msg">{VALIDATION_REQUIRED_FIELD_TEXT}</p>}

                {/* Дата рождения */}
                <input
                    placeholder='Дата рождения'
                    {...register("birthDate", {
                        required: true,
                        validate: validateDate,
                    })}
                />
                {errors.birthDate && <p className="validation-msg">* Введите корректную дату</p>}

                {/* Пол */}
                <select {...register("gender", { required: true })}>
                    <option value="">Выберите пол</option>
                    <option value="male">Мужской</option>
                    <option value="female">Женский</option>
                </select>
                {errors.gender && <p className="validation-msg">* Выберите один из вариантов</p>}

                {/* Электронная почта */}
                <input
                    type="email"
                    placeholder='Электронная почта'
                    {...register("email", {
                        required: true,
                        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    })}
                />
                {errors.email && <p className="validation-msg">{VALIDATION_REQUIRED_FIELD_TEXT}</p>}

                {/* Телефонный номер */}
                <input
                    type="tel"
                    placeholder='Телефонный номер'
                    {...register("phone", {
                        required: true,
                        pattern: /^\+?[1-9]\d{1,14}$/,
                    })}
                />
                {errors.phone && <p className="validation-msg">{VALIDATION_REQUIRED_FIELD_TEXT}</p>}

                {/* Отправить */}
                <input type="submit" />
            </form>

        </div>
    );
}

export default Questionnaire;
