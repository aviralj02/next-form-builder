import DateIcon from "@/components/icons/DateIcon";
import LongAnswerIcon from "@/components/icons/LongAnswerIcon";
import NumberIcon from "@/components/icons/NumberIcon";
import SelectIcon from "@/components/icons/SelectIcon";
import ShortAnswerIcon from "@/components/icons/ShortAnswerIcon";
import UrlIcon from "@/components/icons/UrlIcon";
import { QuestionType } from "@/typings/enums";
import { ReactNode } from "react";

export const questionTypes: {
  label: string;
  type: QuestionType;
  icon: ReactNode;
}[] = [
  {
    label: "Short Answer",
    icon: <ShortAnswerIcon />,
    type: QuestionType.SHORT_ANS,
  },
  {
    label: "Long Answer",
    icon: <LongAnswerIcon />,
    type: QuestionType.LONG_ANS,
  },
  {
    label: "Number",
    icon: <NumberIcon />,
    type: QuestionType.NUMBER,
  },
  {
    label: "Single select",
    icon: <SelectIcon />,
    type: QuestionType.SINGLE_SELECT,
  },
  {
    label: "URL",
    icon: <UrlIcon />,
    type: QuestionType.URL,
  },
  {
    label: "Date",
    icon: <DateIcon />,
    type: QuestionType.DATE,
  },
];
