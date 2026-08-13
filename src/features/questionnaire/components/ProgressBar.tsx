import React from "react";

interface ProgressBarProps {
  currentStep: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  return (
    <div className="w-full mb-6">
      <div className="flex justify-between text-sm font-medium text-slate-500 mb-2">
        <span>Крок {currentStep}</span>
        <span>Опитування</span>
      </div>
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-600 transition-all duration-300 ease-out"
          style={{ width: `${Math.min(currentStep * 20, 100)}%` }}
        />
      </div>
    </div>
  );
};
