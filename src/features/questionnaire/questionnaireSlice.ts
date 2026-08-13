import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { algoliasearch } from "algoliasearch";
import type { Question, AlgoliaHit } from "./types";
import { questionsData } from "./data/questionsMock";

interface QuestionnaireState {
  questions: Record<string, Question>;
  currentQuestionId: string | null;
  answers: Record<string, any>;
  history: string[];
  isCompleted: boolean;
  algoliaResults: AlgoliaHit[];
  isLoadingResults: boolean;
}

const appId = import.meta.env.VITE_ALGOLIA_APP_ID || "";
const apiKey = import.meta.env.VITE_ALGOLIA_SEARCH_KEY || import.meta.env.VITE_ALGOLIA_API_KEY || "";
const indexName = import.meta.env.VITE_ALGOLIA_INDEX_NAME || "pets";

const searchClient = algoliasearch(appId, apiKey);

const initialState: QuestionnaireState = {
  questions: questionsData,
  currentQuestionId: "q_name",
  answers: {},
  history: [],
  isCompleted: false,
  algoliaResults: [],
  isLoadingResults: false,
};

export const fetchAlgoliaResults = createAsyncThunk(
  "questionnaire/fetchAlgoliaResults",
  async (answers: Record<string, any>) => {
    const facetFilters: any[] = [];

    if (answers["q_species"]) {
      facetFilters.push(`species:${answers["q_species"]}`);
    }

    if (answers["q_dog_size"]) {
      facetFilters.push(`size:${answers["q_dog_size"]}`);
    }

    if (Array.isArray(answers["q_color"]) && answers["q_color"].length > 0) {
      const colorFilters = answers["q_color"].map((color: string) => `color:${color}`);
      facetFilters.push(colorFilters);
    }

    if (answers["q_vaccinated"] === "true" || answers["q_vaccinated"] === true) {
      facetFilters.push(`vaccinated:true`);
    }

    if (Array.isArray(answers["q_home_conditions"])) {
      const conditions = answers["q_home_conditions"];

      if (conditions.includes("good_with_kids")) {
        facetFilters.push("good_with_kids:true");
      }

      if (conditions.includes("good_with_other_pets")) {
        facetFilters.push("good_with_other_pets:true");
      }
    }

    console.log("Final facetFilters:", JSON.stringify(facetFilters, null, 2));

    try {
      const response = await searchClient.search<AlgoliaHit>({
        requests: [
          {
            indexName,
            query: "",
            facetFilters: facetFilters.length > 0 ? facetFilters : undefined,
            hitsPerPage: 20,
          },
        ],
      });

      const firstResult = response.results[0];
      return "hits" in firstResult ? firstResult.hits : [];
    } catch (error) {
      console.error("Algolia Search Error:", error);
      return [];
    }
  }
);

export const questionnaireSlice = createSlice({
  name: "questionnaire",
  initialState,
  reducers: {
    setAnswer: (state, action: PayloadAction<{ questionId: string; answer: any }>) => {
      state.answers[action.payload.questionId] = action.payload.answer;
    },
    goToNextQuestion: (state) => {
      if (!state.currentQuestionId) return;

      const currentQ = state.questions[state.currentQuestionId];
      const currentAns = state.answers[state.currentQuestionId];
      let nextId: string | undefined = undefined;

      if (currentQ.type === "single" && currentQ.options) {
        const selectedOpt = currentQ.options.find((o) => o.value === currentAns);
        if (selectedOpt?.nextQuestionId) {
          nextId = selectedOpt.nextQuestionId;
        }
      }

      if (!nextId) {
        nextId = currentQ.nextQuestionId;
      }

      state.history.push(state.currentQuestionId);

      if (nextId && state.questions[nextId]) {
        state.currentQuestionId = nextId;
      } else {
        state.isCompleted = true;
      }
    },
    goToPreviousQuestion: (state) => {
      const prevId = state.history.pop();
      if (prevId) {
        state.currentQuestionId = prevId;
        state.isCompleted = false;
      }
    },
    resetQuestionnaire: (state) => {
      state.currentQuestionId = "q_name";
      state.answers = {};
      state.history = [];
      state.isCompleted = false;
      state.algoliaResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlgoliaResults.pending, (state) => {
        state.isLoadingResults = true;
      })
      .addCase(fetchAlgoliaResults.fulfilled, (state, action) => {
        state.isLoadingResults = false;
        state.algoliaResults = action.payload;
      })
      .addCase(fetchAlgoliaResults.rejected, (state) => {
        state.isLoadingResults = false;
      });
  },
});

export const { setAnswer, goToNextQuestion, goToPreviousQuestion, resetQuestionnaire } = questionnaireSlice.actions;

export default questionnaireSlice.reducer;
