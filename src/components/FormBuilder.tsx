"use client";

import React, { ChangeEvent, useState } from "react";
import PageWrapper from "./PageWrapper";
import Button from "./Button";
import Link from "next/link";
import { ButtonType, QuestionType } from "@/typings/enums";
import TopRightArrow from "./icons/TopRightArrow";
import PlusIcon from "./icons/PlusIcon";
import { Question } from "@/typings/typings";
import AddQuestionDropdown from "./AddQuestionDropdown";
import { cn } from "@/lib/utils";

type Props = {};

const FormBuilder = (props: Props) => {
  const [formTitle, setFormTitle] = useState<string>("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

  return (
    <PageWrapper className="min-h-screen border">
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

      <div className="flex flex-col m-6">
        {/* Map all questions here  */}

        <div className="relative self-center max-w-72 w-full flex flex-col items-center">
          <Button
            buttonType={ButtonType.ACTIVE}
            className="w-fit"
            onClick={() => setIsDropdownVisible((prev) => !prev)}
          >
            <PlusIcon />
            Add Question
          </Button>

          <AddQuestionDropdown isDropdownVisible={isDropdownVisible} />
        </div>
      </div>
    </PageWrapper>
  );
};

export default FormBuilder;
