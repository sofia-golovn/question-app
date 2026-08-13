import { useSelector } from "react-redux";
import type { RootState } from "./app/store";
import { QuestionCard } from "./features/questionnaire/components/QuestionCard";
import { ResultsView } from "./features/questionnaire/components/ResultsView";

export function App() {
  const isCompleted = useSelector((state: RootState) => state.questionnaire.isCompleted);

  return (
    <div className="min-h-screen w-full bg-[#F9FAFB] text-slate-900 font-sans flex flex-col items-center justify-start py-10 px-4">
      <div className={`w-full ${isCompleted ? "max-w-6xl" : "max-w-xl"}`}>
        {isCompleted ? <ResultsView /> : <QuestionCard />}
      </div>
    </div>
  );
}

export default App;