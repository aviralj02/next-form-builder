import { QuestionType } from "./enums";

interface Question {
  formId: string;
  title: string;
  helpText?: string;
  type: QuestionType;
}
