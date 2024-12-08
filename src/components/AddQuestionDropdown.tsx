import { cn } from "@/lib/utils";
import React from "react";
import ShortAnswerIcon from "./icons/ShortAnswerIcon";
import LongAnswerIcon from "./icons/LongAnswerIcon";
import SelectIcon from "./icons/SelectIcon";
import UrlIcon from "./icons/UrlIcon";
import DateIcon from "./icons/DateIcon";
import NumberIcon from "./icons/NumberIcon";
import { QuestionType } from "@/typings/enums";
import useQuestionStore from "@/store/questionStore";
import { questionTypes } from "@/lib/constants";

type Props = {
  isDropdownVisible: boolean;
  setIsDropdownVisible: (value: boolean) => void;
  isAbove: boolean;
};

const AddQuestionDropdown = ({
  isDropdownVisible,
  setIsDropdownVisible,
  isAbove,
}: Props) => {
  const { addQuestion } = useQuestionStore();

  const handleAddQuestion = (quesType: QuestionType) => {
    addQuestion({
      id: crypto.randomUUID(),
      formId: "123",
      title: "",
      helpText: "",
      type: quesType,
      options:
        quesType === QuestionType.SINGLE_SELECT ? ["Option 1"] : undefined,
    });

    setIsDropdownVisible(false);
  };

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
          onClick={() => handleAddQuestion(option.type)}
        >
          {option.icon}
          {option.label}
        </li>
      ))}
    </ul>
  );
};

export default AddQuestionDropdown;
