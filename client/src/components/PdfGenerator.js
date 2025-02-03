import jsPDF from "jspdf";
import "./IBMPlexMono-Medium-normal.js";

let yOffset = 40; // Initial Y position

export const generatePDF = (questionsAnswers, questions, applicationFormData) => {
  const stylePage = () => {
    doc.setTextColor(255, 255, 255);
    doc.setFillColor(8, 25, 64);
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight() * 2, 'F'); // Прямоугольник с заливкой
  }

  const writeTitle = (title, off) => {
    doc.setTextColor(138, 173, 255);
    doc.text(title, 10, off);
    doc.setTextColor(255, 255, 255);
  }

  const addLine = () => {
    doc.setFillColor(255, 255, 255);
    doc.rect(10, yOffset, 190, 1, 'F');
    yOffset += 10;
  }

  const doc = new jsPDF();

  // Title
  stylePage();

  doc.setFontSize(16);
  doc.setFont("IBMPlexMono-Medium");
  doc.setFontSize(16);
  doc.text("Опросник пользователя", 73, 10);

  doc.setFontSize(13);
  doc.text("Создано: " + new Date().toLocaleString(), 68, 20);

  // Section 1: Application Form Data
  doc.setFontSize(14);
  writeTitle("1. Анкета", 30);
  doc.setFontSize(12);

  const appData = [
    `Фамилия: ${applicationFormData.surname}`,
    `Имя: ${applicationFormData.firstName}`,
    `Отчество: ${applicationFormData.patronymic}`,
    `Пол: ${(applicationFormData.gender === "male") ? "мужской" : "женский"}`,
    `Рост: ${applicationFormData.height} см`,
    `Вес: ${applicationFormData.weight} кг`,
    `Возраст: ${applicationFormData.age}`,
    `Город проживания: ${applicationFormData.city}`,
    `ИМТ: ${applicationFormData.bmi} - ${applicationFormData.bmiInterpretation}`,
    `Идеальный вес (ИВ): ${applicationFormData.idealWeight} кг`,
    `БОО (базовый обмен веществ): ${applicationFormData.bmr}`,
    `Сут. потребность в калориях: ${applicationFormData.calories}`,
    `Макроэлементы (сут. кол-во): Белки ${applicationFormData.macros.protein}г, Жиры ${applicationFormData.macros.fat}г, Углеводы ${applicationFormData.macros.carbs}г`
  ];

  appData.forEach((line) => {
    doc.text(line, 10, yOffset);
    yOffset += 10;
  });

  addLine(yOffset);

  // Section 2: Day Meals Calories
  doc.setFontSize(14);
  writeTitle("2. Распределение сут. калорийности по приемам пищи", yOffset);
  yOffset += 10;
  doc.setFontSize(12);

  const meals = applicationFormData.dayMealsCalories;
  Object.keys(meals).forEach((key) => {
    const meal = meals[key];
    const mealText = `${meal.name}: ${meal.calories} Ккал (Белки: ${meal.protein}, Жиры: ${meal.fat}, Углеводы: ${meal.carbs})`;
    doc.text(mealText, 10, yOffset);
    yOffset += 8;
  });

  addLine(yOffset);

  // Section 3: Questions and Answers
  doc.setFontSize(14);
  writeTitle("3. Опросник", yOffset);
  yOffset += 10;
  doc.setFontSize(12);

  questionsAnswers.forEach((qa) => {
    const question = questions[qa.id - 1].question;
    const answer = (qa.answer != null && qa.answer !== ' ') ? qa.answer : null;
    let qText = `Вопрос ${qa.id}: ${question}`;
    let aText = `Ответ: ${answer || "Нет ответа"}`

    if (qText.length > 60) {
      qText = qText.substring(0, 61) + "...";
    }

    if (question.includes('БАД')) {
      aText = aText.replaceAll(/[\[\]\"]/g, '');
      const bads = aText.split(',');

      doc.text(qText, 10, yOffset);
      yOffset += 5;
      bads.forEach(bad => {
        doc.text(bad, 10, yOffset);
        yOffset += 5;
      });
    } else {
      doc.text(qText, 10, yOffset);
      doc.text(aText, 10, yOffset + 5);
    }

    yOffset += 15;
    if (yOffset > 280) {
      doc.addPage();
      stylePage();
      yOffset = 10;
    }
  });

  // Save the PDF
  return doc;
};
