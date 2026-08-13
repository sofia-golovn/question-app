import React from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

interface NavigationControlsProps {
  canGoBack: boolean;
  canGoNext: boolean;
  isLastQuestion: boolean;
  onBack: () => void;
  onNext: () => void;
}

export const NavigationControls: React.FC<NavigationControlsProps> = ({
  canGoBack,
  canGoNext,
  isLastQuestion,
  onBack,
  onNext,
}) => {
  return (
    <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
      <button
        onClick={onBack}
        disabled={!canGoBack}
        className={`flex items-center px-5 py-2.5 rounded-xl font-medium transition-all ${
          canGoBack
            ? "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer"
            : "opacity-0 cursor-default"
        }`}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Назад
      </button>

      <button
        onClick={onNext}
        disabled={!canGoNext}
        className={`flex items-center px-6 py-2.5 rounded-xl font-medium text-white transition-all ${
          canGoNext
            ? "bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 dark:shadow-none cursor-pointer"
            : "bg-slate-300 dark:bg-slate-800 cursor-not-allowed"
        }`}
      >
        {isLastQuestion ? (
          <>
            Завершити <Check className="w-4 h-4 ml-2" />
          </>
        ) : (
          <>
            Далі <ArrowRight className="w-4 h-4 ml-2" />
          </>
        )}
      </button>
    </div>
  );
};
