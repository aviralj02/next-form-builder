import { QuestionType } from "./enums";

interface Question {
  id: string;
  formId: string;
  title: string;
  helpText: string;
  type: QuestionType;
  options?: string[];
}

interface Answer {
  id: string;
  formId: string;
  questionId: string;
  answer: string;
  type: QuestionType;
}

type ResponseData = {
  question: string;
  answer: string;
};
