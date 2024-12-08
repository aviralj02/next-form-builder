import { QuestionType } from "@/typings/enums";
import { Question } from "@/typings/typings";
import React, { ReactNode } from "react";
import ShortAnswerIcon from "./icons/ShortAnswerIcon";
import LongAnswerIcon from "./icons/LongAnswerIcon";
import NumberIcon from "./icons/NumberIcon";
import SelectIcon from "./icons/SelectIcon";
import UrlIcon from "./icons/UrlIcon";
import DateIcon from "./icons/DateIcon";
import DropdownIcon from "./icons/DropdownIcon";
import DragIcon from "./icons/DragIcon";

type Props = {
  ques: Question;
};

const QuestionComponent = ({ ques }: Props) => {
  let icon: ReactNode;
  let inputArea: ReactNode;

  switch (ques.type) {
    case QuestionType.SHORT_ANS:
      icon = <ShortAnswerIcon />;
      inputArea = (
        <input
          type="text"
          className="outline-none border rounded-lg py-1 px-3"
          disabled
        />
      );
      break;
    case QuestionType.LONG_ANS:
      icon = <LongAnswerIcon />;
      inputArea = (
        <textarea
          rows={3}
          className="outline-none border rounded-lg resize-none py-1 px-3"
          disabled
        />
      );
      break;
    case QuestionType.NUMBER:
      icon = <NumberIcon />;
      inputArea = (
        <input
          type="number"
          className="outline-none border rounded-lg py-1 px-3"
          disabled
        />
      );
      break;
    case QuestionType.SINGLE_SELECT:
      icon = <SelectIcon />;
      inputArea = (
        <input
          type="text"
          className="outline-none border rounded-lg py-1 px-3"
          disabled
        />
      );
      break;
    case QuestionType.URL:
      icon = <UrlIcon />;
      inputArea = (
        <input
          type="text"
          className="outline-none border rounded-lg py-1 px-3"
          disabled
        />
      );
      break;
    case QuestionType.DATE:
      icon = <DateIcon />;
      inputArea = (
        <input
          type="date"
          className="outline-none border rounded-lg py-1 px-3"
          disabled
        />
      );
      break;
    default:
      icon = null;
      inputArea = null;
  }

  return (
    <div className="p-4 border rounded-2xl flex flex-col gap-2 hover:bg-[#FAFBFC]">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">{ques.title}</h3>

        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {icon}
            <DropdownIcon />
          </div>

          <DragIcon />
        </div>
      </div>

      {inputArea}
    </div>
  );
};

export default QuestionComponent;
