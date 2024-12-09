import { QuestionType } from "@/typings/enums";
import { Question } from "@/typings/typings";
import React, { ChangeEvent, ReactNode } from "react";

type Props = {
  ques: Question;
  onAnswerChange: (id: string, isFilled: boolean) => void;
};

const AnswerComponent = ({ ques, onAnswerChange }: Props) => {
  let inputArea: ReactNode;

  const handleAnswerChange = (value: string | number | undefined) => {
    onAnswerChange(ques.id, Boolean(value && value.toString().trim() !== ""));
  };

  switch (ques.type) {
    case QuestionType.SHORT_ANS:
      inputArea = (
        <input
          type="text"
          className="outline-none border rounded-lg py-1 px-2 text-sm"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleAnswerChange(e.target.value)
          }
        />
      );
      break;
    case QuestionType.LONG_ANS:
      inputArea = (
        <textarea
          rows={3}
          className="outline-none border rounded-lg resize-none py-1 px-2 text-sm"
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            handleAnswerChange(e.target.value)
          }
        />
      );
      break;
    case QuestionType.NUMBER:
      inputArea = (
        <input
          type="number"
          className="outline-none border rounded-lg py-1 px-2 text-sm"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleAnswerChange(e.target.value)
          }
        />
      );
      break;
    case QuestionType.SINGLE_SELECT:
      inputArea = (
        <div className="flex flex-col gap-4">
          {ques.options?.map((option, index) => (
            <div className="flex items-center gap-1" key={index}>
              <input
                type="radio"
                name={ques.id}
                value={option}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleAnswerChange(e.target.value)
                }
              />
              <label className="text-sm">{option}</label>
            </div>
          ))}
        </div>
      );
      break;
    case QuestionType.URL:
      inputArea = (
        <input
          type="text"
          className="outline-none border rounded-lg py-1 px-2 text-sm"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleAnswerChange(e.target.value)
          }
        />
      );
      break;
    case QuestionType.DATE:
      inputArea = (
        <input
          type="date"
          className="outline-none border rounded-lg py-1 px-2 text-[#959DA5] text-sm"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleAnswerChange(e.target.value)
          }
        />
      );
      break;
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold">{ques.title}</label>

        {ques.helpText && ques.helpText !== "" && (
          <p className="text-xs">{ques.helpText}</p>
        )}
      </div>

      {inputArea}
    </div>
  );
};

export default AnswerComponent;
