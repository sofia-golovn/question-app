import type { Question, AnswerValue } from "../types";

export const getNextQuestionId = (currentQuestion: Question, currentAnswer: AnswerValue): string | undefined => {
  if (currentQuestion.options && currentAnswer) {
    if (typeof currentAnswer === "string") {
      const selectedOption = currentQuestion.options.find(
        (opt) => opt.value === currentAnswer || opt.id === currentAnswer
      );
      if (selectedOption?.nextQuestionId) {
        return selectedOption.nextQuestionId;
      }
    }
  }

  return currentQuestion.nextQuestionId;
};