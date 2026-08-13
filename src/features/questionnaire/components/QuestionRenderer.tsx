import React from "react";
import type { Question, AnswerValue } from "../types";

interface QuestionRendererProps {
  question: Question;
  answer: AnswerValue | undefined;
  onAnswerChange: (value: AnswerValue) => void;
}

export const QuestionRenderer: React.FC<QuestionRendererProps> = ({ question, answer, onAnswerChange }) => {
  switch (question.type) {
    case "single":
      return (
        <div className="space-y-3">
          {question.options?.map((option) => (
            <label
              key={option.id}
              className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                answer === option.value
                  ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/20"
                  : "border-slate-200 hover:border-slate-300 dark:border-slate-800"
              }`}
            >
              <input
                type="radio"
                name={question.id}
                value={option.value}
                checked={answer === option.value}
                onChange={() => onAnswerChange(option.value)}
                className="w-4 h-4 text-indigo-600 border-slate-300 focus:ring-indigo-500"
              />
              <span className="ml-3 font-medium text-slate-800 dark:text-slate-200">{option.label}</span>
            </label>
          ))}
        </div>
      );

    case "multiple": {
      const currentArray = Array.isArray(answer) ? answer : [];
      const handleCheckboxChange = (value: string) => {
        if (currentArray.includes(value)) {
          onAnswerChange(currentArray.filter((v) => v !== value));
        } else {
          onAnswerChange([...currentArray, value]);
        }
      };

      return (
        <div className="space-y-3">
          {question.options?.map((option) => (
            <label
              key={option.id}
              className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                currentArray.includes(String(option.value))
                  ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/20"
                  : "border-slate-200 hover:border-slate-300 dark:border-slate-800"
              }`}
            >
              <input
                type="checkbox"
                value={option.value}
                checked={currentArray.includes(String(option.value))}
                onChange={() => handleCheckboxChange(String(option.value))}
                className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
              />
              <span className="ml-3 font-medium text-slate-800 dark:text-slate-200">{option.label}</span>
            </label>
          ))}
        </div>
      );
    }

    case "text":
      return (
        <input
          type="text"
          value={(answer as string) || ""}
          placeholder={question.placeholder || "Введіть відповідь..."}
          onChange={(e) => onAnswerChange(e.target.value)}
          className="w-full p-4 rounded-xl border-2 border-slate-200 dark:border-slate-800 focus:border-indigo-600 focus:outline-none transition-all"
        />
      );

    case "number":
      return (
        <input
          type="number"
          value={answer !== undefined ? Number(answer) : ""}
          placeholder={question.placeholder || "Введіть число..."}
          onChange={(e) => onAnswerChange(e.target.value === "" ? "" : Number(e.target.value))}
          className="w-full p-4 rounded-xl border-2 border-slate-200 dark:border-slate-800 focus:border-indigo-600 focus:outline-none transition-all"
        />
      );

    default:
      return null;
  }
};
