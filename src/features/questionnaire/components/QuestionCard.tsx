import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../../app/store";
import { setAnswer, goToNextQuestion, goToPreviousQuestion } from "../questionnaireSlice";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";

export const QuestionCard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { questions, currentQuestionId, history, answers } = useSelector((state: RootState) => state.questionnaire);

  const currentQuestion = currentQuestionId ? questions[currentQuestionId] : null;
  const currentAnswer = currentQuestionId ? answers[currentQuestionId] : undefined;

  const [localInput, setLocalInput] = useState<string>("");

  useEffect(() => {
    if (currentAnswer !== undefined && !Array.isArray(currentAnswer)) {
      setLocalInput(String(currentAnswer));
    } else {
      setLocalInput("");
    }
  }, [currentQuestionId, currentAnswer]);

  if (!currentQuestion) return null;

  const totalQuestions = Object.keys(questions).length;
  const currentStep = history.length + 1;
  const progressPercent = Math.min((currentStep / totalQuestions) * 100, 100);

  const isOptionSelected = (val: string | number) => {
    if (Array.isArray(currentAnswer)) {
      return currentAnswer.includes(String(val));
    }
    return currentAnswer === val;
  };

  const handleOptionClick = (val: string | number) => {
    if (currentQuestion.type === "multiple") {
      const currentArr = Array.isArray(currentAnswer) ? [...currentAnswer] : [];
      const stringVal = String(val);
      const exists = currentArr.indexOf(stringVal);

      if (exists > -1) {
        currentArr.splice(exists, 1);
      } else {
        currentArr.push(stringVal);
      }
      dispatch(setAnswer({ questionId: currentQuestion.id, answer: currentArr }));
    } else {
      dispatch(setAnswer({ questionId: currentQuestion.id, answer: val }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalInput(val);
    dispatch(setAnswer({ questionId: currentQuestion.id, answer: val }));
  };

  const isNextDisabled = () => {
    if (!currentQuestion.required) return false;
    if (currentAnswer === undefined || currentAnswer === "") return true;
    if (Array.isArray(currentAnswer) && currentAnswer.length === 0) return true;
    return false;
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 sm:p-8 space-y-6">
      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-gray-500">
          <span>
            Крок {currentStep} з {totalQuestions}
          </span>
          <span>Опитування</span>
        </div>
        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-slate-900 transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Title */}
      <div className="space-y-1">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{currentQuestion.title}</h2>
        {currentQuestion.description && <p className="text-sm text-gray-500">{currentQuestion.description}</p>}
      </div>

      {/* Form & Options */}
      <div className="space-y-3">
        {(currentQuestion.type === "text" || currentQuestion.type === "number") && (
          <input
            type={currentQuestion.type}
            placeholder={currentQuestion.placeholder || "Введіть відповідь..."}
            value={localInput}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent text-sm transition-all"
          />
        )}

        {(currentQuestion.type === "single" || currentQuestion.type === "multiple") && (
          <div className="grid grid-cols-1 gap-2.5">
            {currentQuestion.options?.map((opt) => {
              const selected = isOptionSelected(opt.value);
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleOptionClick(opt.value)}
                  className={`w-full p-3.5 rounded-xl border text-left text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                    selected
                      ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                      : "bg-white border-gray-200 text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <span>{opt.label}</span>
                  {selected && <Check className="w-4 h-4 text-white" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        {history.length > 0 ? (
          <button
            type="button"
            onClick={() => dispatch(goToPreviousQuestion())}
            className="px-4 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-100 text-gray-700 font-medium text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Назад
          </button>
        ) : (
          <div />
        )}

        <button
          type="button"
          disabled={isNextDisabled()}
          onClick={() => dispatch(goToNextQuestion())}
          className={`px-6 py-2.5 rounded-xl font-medium text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer ${
            isNextDisabled()
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-slate-900 hover:bg-slate-800 text-white shadow-sm"
          }`}
        >
          Далі <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
