"use client";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import PageWrapper from "./PageWrapper";
import Button from "./Button";
import Link from "next/link";
import { ButtonType, QuestionType } from "@/typings/enums";
import TopRightArrow from "./icons/TopRightArrow";
import PlusIcon from "./icons/PlusIcon";
import { Question } from "@/typings/typings";
import AddQuestionDropdown from "./AddQuestionDropdown";
import QuestionComponent from "./QuestionComponent";
import { cn } from "@/lib/utils";
import DraftIcon from "./icons/DraftIcon";
import TickIcon from "./icons/TickIcon";

type Props = {};

const FormBuilder = (props: Props) => {
  const [formTitle, setFormTitle] = useState<string>("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const [dropdownAbove, setDropdownAbove] = useState<boolean>(false);

  const buttonRef = useRef<HTMLDivElement | null>(null);

  const addQuestion = (questionType: QuestionType) => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      { formId: "123", title: "Write a question", type: questionType },
    ]);

    setIsDropdownVisible(false);
  };

  useEffect(() => {
    if (isDropdownVisible && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      setDropdownAbove(buttonRect.bottom > viewportHeight / 1.45);
    }
  }, [isDropdownVisible]);

  return (
    <PageWrapper className="min-h-screen border grid grid-rows-[auto_1fr_auto]">
      <div className="flex items-center justify-between py-4 px-6 border-b">
        <input
          type="text"
          placeholder="Untitled Form"
          value={formTitle}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFormTitle(e.target.value)
          }
          className="outline-none py-1 px-2 font-medium text-lg"
        />

        <Link href="/preview">
          <Button buttonType={ButtonType.ACTIVE} disabled>
            Preview <TopRightArrow />
          </Button>
        </Link>
      </div>

      {/* QUESTIONS */}
      <div
        className="flex flex-col p-6 h-full overflow-y-auto scrollbar"
        style={{ height: "calc(100vh - 140px)" }}
      >
        <div className="flex flex-col gap-4">
          {questions.map((ques, index) => (
            <QuestionComponent key={index} ques={ques} />
          ))}
        </div>

        <div
          className={cn(
            "relative self-center max-w-72 w-full flex flex-col items-center",
            questions.length === 0 ? "" : "mt-8"
          )}
          ref={buttonRef}
        >
          <Button
            buttonType={ButtonType.ACTIVE}
            className="w-fit"
            onClick={() => setIsDropdownVisible((prev) => !prev)}
          >
            <PlusIcon />
            Add Question
          </Button>

          <AddQuestionDropdown
            isDropdownVisible={isDropdownVisible}
            addQuestion={addQuestion}
            isAbove={dropdownAbove}
          />
        </div>
      </div>

      <div className="flex items-center justify-between py-4 px-6 border-t bg-[#F6F8FAE5]">
        <Button buttonType={ButtonType.ACTIVE}>
          <DraftIcon /> Save as Draft
        </Button>
        <Button buttonType={ButtonType.SUBMIT}>
          <TickIcon /> Publish
        </Button>
      </div>
    </PageWrapper>
  );
};

export default FormBuilder;
