"use client";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import PageWrapper from "./PageWrapper";
import Button from "./Button";
import Link from "next/link";
import { ButtonType } from "@/typings/enums";
import TopRightArrow from "./icons/TopRightArrow";
import PlusIcon from "./icons/PlusIcon";
import AddQuestionDropdown from "./AddQuestionDropdown";
import QuestionComponent from "./QuestionComponent";
import { cn } from "@/lib/utils";
import DraftIcon from "./icons/DraftIcon";
import TickIcon from "./icons/TickIcon";
import useQuestionStore from "@/store/questionStore";

type Props = {};

const FormBuilder = (props: Props) => {
  const { questions } = useQuestionStore();

  const [formTitle, setFormTitle] = useState<string>("");
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const [dropdownAbove, setDropdownAbove] = useState<boolean>(false);

  const buttonRef = useRef<HTMLDivElement | null>(null);

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
          className="outline-none py-1 px-2 font-medium text-lg w-full"
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
          {questions.map((ques) => (
            <QuestionComponent key={ques.id} ques={ques} />
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
            setIsDropdownVisible={setIsDropdownVisible}
            isAbove={dropdownAbove}
          />
        </div>
      </div>

      <div className="flex items-center justify-between py-4 px-6 border-t bg-[#F6F8FAE5]">
        <Button buttonType={ButtonType.ACTIVE}>
          <DraftIcon /> Save as Draft
        </Button>
        <Button
          buttonType={ButtonType.SUBMIT}
          onClick={() => {
            console.log(questions);
          }}
        >
          <TickIcon /> Publish form
        </Button>
      </div>
    </PageWrapper>
  );
};

export default FormBuilder;
