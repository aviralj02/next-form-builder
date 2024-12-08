import { QuestionType } from "./enums";

interface Question {
  title: string;
  helpText?: string;
  type: QuestionType;
}
