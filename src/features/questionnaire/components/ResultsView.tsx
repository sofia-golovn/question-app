import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../../app/store";
import { fetchAlgoliaResults, resetQuestionnaire } from "../questionnaireSlice";
import type { AlgoliaHit } from "../types";
import { RotateCcw, PawPrint } from "lucide-react";

export const ResultsView: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { answers, algoliaResults, isLoadingResults } = useSelector((state: RootState) => state.questionnaire);

  const userName = (answers["q_name"] as string) || "друг";

  useEffect(() => {
    dispatch(fetchAlgoliaResults(answers));
  }, [dispatch, answers]);

  return (
    <div className="space-y-8 text-gray-900">
      {/* Header Storefront */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-gray-200">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Каталог підбору</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Рекомендовані хвостики для вас, {userName}:
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Знайдено {algoliaResults.length} варіантів на основі вашого опитування
          </p>
        </div>

        <button
          onClick={() => dispatch(resetQuestionnaire())}
          className="px-4 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-sm"
        >
          <RotateCcw className="w-4 h-4" /> Змінити фільтри
        </button>
      </div>

      {/* Results Grid */}
      {isLoadingResults ? (
        <div className="text-center py-20 space-y-3">
          <div className="animate-spin w-8 h-8 border-3 border-slate-900 border-t-transparent rounded-full mx-auto" />
          <p className="text-sm text-gray-500 font-medium">Шукаємо відповідності в каталозі...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {algoliaResults.map((pet: AlgoliaHit) => {
            return (
              <div
                key={pet.objectID}
                className="group bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Image Wrap */}
                  <div className="relative h-60 w-full overflow-hidden bg-gray-100">
                    {pet.images && pet.images[0] ? (
                      <img
                        src={pet.images[0]}
                        alt={pet.name || "Тваринка"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <PawPrint className="w-12 h-12" />
                      </div>
                    )}

                    {pet.breed && (
                      <span className="absolute bottom-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-semibold text-gray-800 shadow-sm">
                        {pet.breed}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-2">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-slate-700 transition-colors">
                        {pet.name || "Без імені"}
                      </h3>
                      {pet.age_range && <span className="text-xs text-gray-500 font-medium">{pet.age_range}</span>}
                    </div>

                    {pet.description && (
                      <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">{pet.description}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
