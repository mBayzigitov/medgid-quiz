import jsPDF from "jspdf";
import "./Roboto-Medium-normal.js";

export const generatePDF = (questionsAnswers, questions, applicationFormData) => {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(16);
  doc.setFont("Roboto-Medium");
  doc.text("Набросок отчета пользователя", 10, 10);
  doc.setFontSize(12);
  doc.text("Создано: " + new Date().toLocaleString(), 10, 20);

  // Section 1: Application Form Data
  doc.setFontSize(14);
  doc.text("1. Анкета", 10, 30);
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
    `Макроэлементы: Белки ${applicationFormData.macros.protein}г, Жиры ${applicationFormData.macros.fat}г, Углеводы ${applicationFormData.macros.carbs}г`
  ];

  let yOffset = 40; // Initial Y position
  appData.forEach((line) => {
    doc.text(line, 10, yOffset);
    yOffset += 10;
  });

  // Section 2: Day Meals Calories
  doc.setFontSize(14);
  doc.text("2. Распределение сут. калорийности по приемам пищи", 10, yOffset);
  yOffset += 10;
  doc.setFontSize(12);

  const meals = applicationFormData.dayMealsCalories;
  Object.keys(meals).forEach((key) => {
    const meal = meals[key];
    const mealText = `${meal.name}: ${meal.calories} Ккал (Белки: ${meal.protein}, Жиры: ${meal.fat}, Углеводы: ${meal.carbs})`;
    doc.text(mealText, 10, yOffset);
    yOffset += 10;
  });

  // Section 3: Questions and Answers
  doc.setFontSize(14);
  doc.text("3. Опросник", 10, yOffset);
  yOffset += 10;
  doc.setFontSize(12);

  questionsAnswers.forEach((qa) => {
    const answer = (qa.answer != null && qa.answer !== ' ') ? qa.answer : null;
    const qText = `Вопрос ${qa.id}: ${questions[qa.id - 1].question}`;
    const aText = `Ответ: ${answer || "Нет ответа"}`
    doc.text(qText, 10, yOffset);
    doc.text(aText, 10, yOffset + 5);

    yOffset += 15;
    if (yOffset > 280) {
      doc.addPage();
      yOffset = 10;
    }
  });

  // Save the PDF
  doc.save("User_Report.pdf");
};
