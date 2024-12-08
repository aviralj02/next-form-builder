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
};

const AddQuestionDropdown = ({ isDropdownVisible }: Props) => {
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
        "absolute top-8 transition-transform duration-300 origin-top border p-2 mt-2 shadow-lg rounded-lg w-full text-sm",
        isDropdownVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"
      )}
    >
      {questionTypes.map((option) => (
        <li
          className="p-2 hover:bg-gray-100 rounded capitalize flex items-center gap-2 cursor-pointer"
          key={option.label}
        >
          {option.icon}
          {option.label}
        </li>
      ))}
    </ul>
  );
};

export default AddQuestionDropdown;
