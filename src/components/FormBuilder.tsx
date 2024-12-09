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
import { useRouter } from "next/navigation";

type Props = {};

const FormBuilder = (props: Props) => {
  const { questions, formId, setFormId } = useQuestionStore();

  const [formTitle, setFormTitle] = useState<string>("");
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const [dropdownAbove, setDropdownAbove] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const buttonRef = useRef<HTMLDivElement | null>(null);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormTitle(title);

    if (title && !formId) {
      setFormId(crypto.randomUUID());
    }
  };

  const handlePublishForm = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/publish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          form: {
            id: formId,
            title: formTitle,
          },
          questions,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        router.replace(`/builder/publish-success?formId=${formId}`);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
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
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleTitleChange(e)}
          className="outline-none py-1 px-2 font-medium text-lg w-full"
        />

        <Link
          target="_blank"
          href={{
            pathname: "/preview",
            query: {
              title: formTitle,
              questions: JSON.stringify(questions),
            },
          }}
        >
          <Button
            buttonType={ButtonType.ACTIVE}
            disabled={questions.length === 0 || !formTitle}
          >
            Preview <TopRightArrow />
          </Button>
        </Link>
      </div>

      {/* QUESTIONS */}
      <main
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
      </main>

      <div className="flex items-center justify-between py-4 px-6 border-t bg-[#F6F8FAE5]">
        <Button buttonType={ButtonType.ACTIVE}>
          <DraftIcon /> Save as Draft
        </Button>
        <Button
          buttonType={ButtonType.SUBMIT}
          onClick={handlePublishForm}
          disabled={questions.length === 0 || !formTitle}
        >
          {isLoading ? (
            <>Publishing...</>
          ) : (
            <>
              <TickIcon /> Publish form
            </>
          )}
        </Button>
      </div>
    </PageWrapper>
  );
};

export default FormBuilder;
