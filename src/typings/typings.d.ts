import { QuestionType } from "./enums";

interface Question {
  id: string;
  formId: string;
  title: string;
  helpText: string;
  type: QuestionType;
  options?: string[];
}
