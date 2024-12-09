import { QuestionType } from "@/typings/enums";
import { Question } from "@/typings/typings";
import React, { ChangeEvent, ReactNode, useState } from "react";
import ShortAnswerIcon from "./icons/ShortAnswerIcon";
import LongAnswerIcon from "./icons/LongAnswerIcon";
import NumberIcon from "./icons/NumberIcon";
import SelectIcon from "./icons/SelectIcon";
import UrlIcon from "./icons/UrlIcon";
import DateIcon from "./icons/DateIcon";
import DropdownIcon from "./icons/DropdownIcon";
import DragIcon from "./icons/DragIcon";
import useQuestionStore from "@/store/questionStore";
import PlusIcon from "./icons/PlusIcon";
import { cn } from "@/lib/utils";
import { questionTypes } from "@/lib/constants";

type Props = {
  ques: Question;
};

const QuestionComponent = ({ ques }: Props) => {
  const { updateQuestion, removeQuestion } = useQuestionStore();
  const [isTypeDropdownVisible, setIsTypeDropdownVisible] =
    useState<boolean>(false);

  let icon: ReactNode;
  let inputArea: ReactNode;

  switch (ques.type) {
    case QuestionType.SHORT_ANS:
      icon = <ShortAnswerIcon />;
      inputArea = (
        <input
          type="text"
          className="outline-none border rounded-lg py-1 px-2 text-sm"
          disabled
        />
      );
      break;
    case QuestionType.LONG_ANS:
      icon = <LongAnswerIcon />;
      inputArea = (
        <textarea
          rows={3}
          className="outline-none border rounded-lg resize-none py-1 px-2 text-sm"
          disabled
        />
      );
      break;
    case QuestionType.NUMBER:
      icon = <NumberIcon />;
      inputArea = (
        <input
          type="number"
          className="outline-none border rounded-lg py-1 px-2 text-sm"
          disabled
        />
      );
      break;
    case QuestionType.SINGLE_SELECT:
      icon = <SelectIcon />;
      inputArea = (
        <div className="flex flex-col gap-2">
          {ques.options?.map((option, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="radio"
                name={`single-select-${ques.id}`}
                disabled
                className="h-4 w-4"
              />

              <input
                type="text"
                value={option}
                onChange={(e) => {
                  const newOptions = [...(ques.options || [])];
                  newOptions[index] = e.target.value;
                  updateQuestion(ques.id, { options: newOptions });
                }}
                className="flex-grow outline-none border px-2 py-1 rounded-lg text-sm"
                placeholder={`Option ${index + 1}`}
              />

              {/* DELETE */}
              <button
                onClick={() => {
                  const newOptions = ques.options?.filter(
                    (_, i) => i !== index
                  );
                  updateQuestion(ques.id, { options: newOptions });
                }}
                className="text-red-500 hover:text-red-700"
              >
                &times;
              </button>
            </div>
          ))}

          {/* ADD */}
          <div className="flex items-center gap-2">
            <input type="radio" disabled className="h-4 w-4" />

            <input
              type="text"
              className="flex-grow outline-none border px-2 py-1 rounded-lg text-sm mr-2"
              placeholder={`Option ${
                ques.options !== undefined ? ques.options?.length + 1 : 1
              }`}
              disabled
            />
            <button
              onClick={() => {
                const newOptions = [...(ques.options || []), ""];
                updateQuestion(ques.id, { options: newOptions });
              }}
            >
              <PlusIcon />
            </button>
          </div>
        </div>
      );
      break;
    case QuestionType.URL:
      icon = <UrlIcon />;
      inputArea = (
        <input
          type="text"
          className="outline-none border rounded-lg py-1 px-2 text-sm"
          disabled
        />
      );
      break;
    case QuestionType.DATE:
      icon = <DateIcon />;
      inputArea = (
        <input
          type="date"
          className="outline-none border rounded-lg py-1 px-2 text-[#959DA5] text-sm"
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
        <div className="flex flex-col gap-1 w-full mr-5">
          <input
            type="text"
            className="text-sm font-semibold outline-none bg-transparent"
            placeholder={
              ques.type === QuestionType.URL
                ? "Link to your best work"
                : "Write a question"
            }
            value={ques.title}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              updateQuestion(ques.id, { title: e.target.value })
            }
          />
          <input
            type="text"
            className="text-xs outline-none bg-transparent"
            placeholder="Write a help text or caption (leave empty if not needed)."
            value={ques.helpText}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              updateQuestion(ques.id, { helpText: e.target.value })
            }
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              className="flex items-center gap-1 opacity-50"
              onClick={() => setIsTypeDropdownVisible((prev) => !prev)}
            >
              {icon}
              <DropdownIcon />
            </button>

            {/* Dropdown Menu */}
            <ul
              className={cn(
                "absolute top-full transition-transform duration-300 right-0 mt-2 w-max origin-top-right bg-white border rounded-lg shadow-lg z-10",
                isTypeDropdownVisible
                  ? "scale-100 opacity-100"
                  : "scale-0 opacity-0"
              )}
            >
              {questionTypes.map((option) => (
                <li
                  key={option.type}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer text-xs font-medium"
                  onClick={() => {
                    updateQuestion(ques.id, { type: option.type });
                    setIsTypeDropdownVisible(false);
                  }}
                >
                  {option.icon}
                  {option.label}
                </li>
              ))}

              <li
                className="flex items-center gap-2 p-2 hover:bg-gray-100 text-red-500 cursor-pointer text-xs font-medium"
                onClick={() => removeQuestion(ques.id)}
              >
                <PlusIcon className="transform rotate-45" danger />
                Remove
              </li>
            </ul>
          </div>

          <div className="opacity-50">
            <DragIcon />
          </div>
        </div>
      </div>

      {inputArea}
    </div>
  );
};

export default QuestionComponent;
