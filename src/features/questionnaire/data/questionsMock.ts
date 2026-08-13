import type { Question } from "../types";

export const questionsData: Record<string, Question> = {
  q_name: {
    id: "q_name",
    title: "Як до вас звертатися?",
    description: "Вкажіть ваше ім'я для персоналізованого підбору.",
    type: "text",
    required: true,
    placeholder: "Ваше ім'я...",
    nextQuestionId: "q_species",
  },

  q_species: {
    id: "q_species",
    title: "Кого ви шукаєте?",
    description: "Оберіть вид тваринки.",
    type: "single",
    required: true,
    options: [
      { id: "cat", label: "Котика", value: "Cat", nextQuestionId: "q_color" },
      { id: "dog", label: "Собачку", value: "Dog", nextQuestionId: "q_dog_size" },
    ],
  },

  q_dog_size: {
    id: "q_dog_size",
    title: "Якого розміру собаку ви шукаєте?",
    type: "single",
    required: false,
    options: [
      { id: "s_small", label: "Маленька (Small)", value: "Small" },
      { id: "s_medium", label: "Середня (Medium)", value: "Medium" },
      { id: "s_large", label: "Велика (Large)", value: "Large" },
    ],
    nextQuestionId: "q_color",
  },

  q_color: {
    id: "q_color",
    title: "Які кольори шерсті вам подобаються?",
    description: "Можна обрати декілька варіантів.",
    type: "multiple",
    required: false,
    options: [
      { id: "c_snow", label: "Білий / Snow", value: "Snow" },
      { id: "c_black", label: "Чорний / Black", value: "Black" },
      { id: "c_brown", label: "Коричневий / Brown", value: "Brown" },
      { id: "c_tabby", label: "Смугастий / Tabby", value: "Tabby" },
    ],
    nextQuestionId: "q_max_age_months",
  },

  q_max_age_months: {
    id: "q_max_age_months",
    title: "До скількох місяців розглядати вік тваринки?",
    description: "Вкажіть числом (наприклад, 12 = 1 рік, 36 = 3 роки).",
    type: "number",
    required: false,
    placeholder: "Наприклад: 24",
    nextQuestionId: "q_vaccinated",
  },

  q_vaccinated: {
    id: "q_vaccinated",
    title: "Чи обов’язкова наявність вакцинації?",
    type: "single",
    required: false,
    options: [
      { id: "v_yes", label: "Так, тільки вакциновані", value: "true" },
      { id: "v_any", label: "Не має значення", value: "all" },
    ],
    nextQuestionId: "q_home_conditions",
  },

  q_home_conditions: {
    id: "q_home_conditions",
    title: "Хто проживатиме разом із тваринкою?",
    description: "Оберіть усі відповідні варіанти.",
    type: "multiple",
    required: false,
    options: [
      { id: "kids", label: "Є діти", value: "good_with_kids" },
      { id: "other_pets", label: "Є інші тварини", value: "good_with_other_pets" },
      { id: "none", label: "Ніхто (проживаю самостійно)", value: "none" },
    ],
  },
};
