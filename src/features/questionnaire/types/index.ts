export type QuestionType = "single" | "multiple" | "text" | "number";

export type AnswerValue = string | string[] | number | boolean | null | undefined;

export interface Option {
  id: string;
  label: string;
  value: string;
  nextQuestionId?: string;
}

export interface Question {
  id: string;
  title: string;
  description?: string;
  type: QuestionType;
  required?: boolean;
  placeholder?: string;
  options?: Option[];
  nextQuestionId?: string;
}

export interface AlgoliaHit {
  objectID: string;
  name?: string;
  species?: string;
  breed?: string;
  age_range?: string;
  description?: string;
  shelter_name?: string;
  shelter_city?: string;
  shelter_state?: string;
  color?: string;
  gender?: string;
  size?: string;
  good_with_kids?: boolean;
  good_with_other_pets?: boolean;
  vaccinated?: boolean;
  spayed_neutered?: boolean;
  adoption_status?: string;
  adoption_status_priority?: number;
  tags?: string[];
  images?: string[];
  [key: string]: any;
}
