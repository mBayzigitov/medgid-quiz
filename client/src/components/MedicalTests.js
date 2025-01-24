import React, { useEffect, useState } from 'react';
import '../styles/MedicalTests.css';

import { generatePDF } from "./PdfGenerator";

const ACCEPTED_FILE_TYPES = '.pdf,image/jpeg,image/png';

const ACTIVITY_LEVEL_1 = "Не занимаюсь спортом";
const ACTIVITY_LEVEL_2 = "Легкий спорт 1-2 раза в неделю";
const ACTIVITY_LEVEL_3 = "Регулярный спорт 2-3 раза в неделю";
const ACTIVITY_LEVEL_4 = "Активный спорт, ежедневные тренировки";

function MedicalTests({ medicalTestsDone, quizQuestions, finalAnswers }) {
    const [hmsTest, setHmsTest] = useState(null);
    const [coprogram, setCoprogram] = useState(null);
    const [bloodTest, setBloodTest] = useState(null);

    const [hmsTestFilename, setHmsTestFilename] = useState('');
    const [coprogramFilename, setCoprogramFilename] = useState('');
    const [bloodTestFilename, setBloodTestFilename] = useState('');

    const handleLoadHmsTest = (f) => {
        setHmsTest(f);
        setHmsTestFilename(f.name);
    }

    const handleLoadCoprogramTest = (f) => {
        setCoprogram(f);
        setCoprogramFilename(f.name);
    }

    const handleLoadBloodTest = (f) => {
        setBloodTest(f);
        setBloodTestFilename(f.name);
    }

    const handleSubmit = () => {
        const data = JSON.parse(localStorage.getItem(`aform`));
        const activityLevel = localStorage.getItem(`answer-7`);

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
        let activityMultiplier = 1.2;
        switch (activityLevel) {
            case ACTIVITY_LEVEL_1:
                activityMultiplier = 1.2;
                break;
            case ACTIVITY_LEVEL_2, ACTIVITY_LEVEL_3:
                activityMultiplier = 1.55;
                break;
            case ACTIVITY_LEVEL_4:
                activityMultiplier = 1.9;
                break;
        }

        const calories = (1.1 * bmr * activityMultiplier).toFixed(2);

        // Идеальный вес
        let idealWeight = 0;
        if (data.height <= 165) {
            idealWeight = data.height - 100;
        } else if (data.height > 165 && data.height <= 175) {
            idealWeight = data.height - 105;
        } else {
            idealWeight = data.height - 110;
        }

        // Расчёт БЖУ
        const proteinCalories = (calories * 0.2).toFixed(2); // 30% калорий на белки
        const fatCalories = (calories * 0.3).toFixed(2); // 30% калорий на жиры
        const carbCalories = (calories * 0.5).toFixed(2); // 40% калорий на углеводы

        const macros = {
            protein: (proteinCalories / 4).toFixed(2), // Белки: 1 г = 4 ккал
            fat: (fatCalories / 9).toFixed(2), // Жиры: 1 г = 9 ккал
            carbs: (carbCalories / 4).toFixed(2) // Углеводы: 1 г = 4 ккал
        };

        const dayMealsCalories = {
            breakfast: {
                name: "Завтрак",
                calories: (calories * 0.25).toFixed(2),
                protein: (macros.protein * 0.25).toFixed(2),
                fat: (macros.fat * 0.25).toFixed(2),
                carbs: (macros.carbs * 0.25).toFixed(2)
            },
            snack_1: {
                name: "Перекус",
                calories: (calories * 0.1).toFixed(2),
                protein: (macros.protein * 0.1).toFixed(2),
                fat: (macros.fat * 0.1).toFixed(2),
                carbs: (macros.carbs * 0.1).toFixed(2)
            },
            lunch: {
                name: "Обед",
                calories: (calories * 0.35).toFixed(2),
                protein: (macros.protein * 0.35).toFixed(2),
                fat: (macros.fat * 0.35).toFixed(2),
                carbs: (macros.carbs * 0.35).toFixed(2)
            },
            snack_2: {
                name: "Перекус",
                calories: (calories * 0.1).toFixed(2),
                protein: (macros.protein * 0.1).toFixed(2),
                fat: (macros.fat * 0.1).toFixed(2),
                carbs: (macros.carbs * 0.1).toFixed(2)
            },
            dinner: {
                name: "Ужин",
                calories: (calories * 0.2).toFixed(2),
                protein: (macros.protein * 0.2).toFixed(2),
                fat: (macros.fat * 0.2).toFixed(2),
                carbs: (macros.carbs * 0.2).toFixed(2)
            },
        }

        // Добавляем результаты в data
        const enrichedData = {
            ...data,
            bmi,
            bmiInterpretation,
            idealWeight,
            bmr,
            calories,
            macros,
            dayMealsCalories
        };

        localStorage.clear();

        // Отправить данные на почту
        const files = [];

        if (hmsTest) {
            files.push({ file: hmsTest, filename: hmsTestFilename });
        }
        if (coprogram) {
            files.push({ file: coprogram, filename: coprogramFilename });
        }
        if (bloodTest) {
            files.push({ file: bloodTest, filename: bloodTestFilename });
        }

        // Generate PDF and add it as an attachment
        const genPdf = generatePDF(finalAnswers, quizQuestions, enrichedData);
        const pdfBlob = genPdf.output('blob');
        files.push({ file: pdfBlob, filename: 'quiz-results.pdf' });

        sendJsonToServer(enrichedData);
        sendEmailWithAttachments(files);

        medicalTestsDone();
    }

    const sendEmailWithAttachments = async (files) => {
        const formData = new FormData();
        const filenames = [];

        files.forEach(({ file, filename }) => {
            if (file) {
                formData.append('attachments', file);
                filenames.push(filename);
            }
        });

        formData.append('filenames', JSON.stringify(filenames));

        try {
            const response = await fetch('http://localhost:5000/send-email', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const error = await response.json();
                console.error('Failed to send email:', error);
            } else {
                console.log('Email sent successfully!');
            }
        } catch (err) {
            console.error('Error occurred while sending email:', err);
        }
    };

    const sendJsonToServer = async (jsonObject) => {
        try {
            const response = await fetch('http://localhost:5000/log-json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonObject),
            });

            if (!response.ok) {
                throw new Error(`Failed to log JSON: ${response.statusText}`);
            }

            const result = await response.json();
            console.log(result.message);
        } catch (error) {
            console.error('Error sending JSON to server:', error);
        }
    };


    return (
        <div className='main-container'>
            <form onSubmit={handleSubmit}>
                <h4 id='tests-msg'>Если у вас есть результаты следующих анализов, пожалуйста, прикрепите их</h4>

                <p className='m-test-name'>&#8226; ХМС микробиоты</p>
                <label class="input-file">
                    <span class="input-file-text" type="text">{hmsTestFilename}</span>
                    <input
                        type="file"
                        name="file"
                        onChange={(e) => handleLoadHmsTest(e.target.files[0])}
                        accept={ACCEPTED_FILE_TYPES}
                    />
                    <span class="input-file-btn">Выберите файл</span>
                </label>

                <p className='m-test-name'>&#8226; Копрограмма</p>
                <label class="input-file">
                    <span class="input-file-text" type="text">{coprogramFilename}</span>
                    <input
                        type="file"
                        name="file"
                        onChange={(e) => handleLoadCoprogramTest(e.target.files[0])}
                        accept={ACCEPTED_FILE_TYPES}
                    />
                    <span class="input-file-btn">Выберите файл</span>
                </label>

                <p className='m-test-name'>&#8226; Общий анализ крови</p>
                <label class="input-file">
                    <span class="input-file-text" type="text">{bloodTestFilename}</span>
                    <input
                        type="file"
                        name="file"
                        onChange={(e) => handleLoadBloodTest(e.target.files[0])}
                        accept={ACCEPTED_FILE_TYPES}
                    />
                    <span class="input-file-btn">Выберите файл</span>
                </label>

                <button id='submit-tests'>Отправить</button>
            </form>
        </div>
    );
}

export default MedicalTests;
