import { cn } from "@/lib/utils";
import React from "react";
import ShortAnswerIcon from "./icons/ShortAnswerIcon";
import LongAnswerIcon from "./icons/LongAnswerIcon";
import SelectIcon from "./icons/SelectIcon";
import UrlIcon from "./icons/UrlIcon";
import DateIcon from "./icons/DateIcon";
import NumberIcon from "./icons/NumberIcon";
import { QuestionType } from "@/typings/enums";

type Props = {
  isDropdownVisible: boolean;
  addQuestion: (questionType: QuestionType) => void;
  isAbove: boolean;
};

const AddQuestionDropdown = ({
  isDropdownVisible,
  addQuestion,
  isAbove,
}: Props) => {
  const questionTypes = [
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

  return (
    <ul
      className={cn(
        "absolute transition-transform duration-300 border p-2 mt-2 shadow-lg rounded-2xl w-full text-sm bg-white",
        isAbove ? "bottom-full mb-2 origin-bottom" : "top-full mt-2 origin-top",
        isDropdownVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"
      )}
    >
      {questionTypes.map((option) => (
        <li
          className="p-2 hover:bg-gray-100 rounded capitalize flex items-center gap-2 cursor-pointer"
          key={option.label}
          onClick={() => addQuestion(option.type)}
        >
          {option.icon}
          {option.label}
        </li>
      ))}
    </ul>
  );
};

export default AddQuestionDropdown;
