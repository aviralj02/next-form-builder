"use client";

import { useSearchParams } from "next/navigation";
import React, { Suspense, useState } from "react";
import PageWrapper from "./PageWrapper";
import { ButtonType } from "@/typings/enums";
import Button from "./Button";
import { Question } from "@/typings/typings";
import AnswerComponent from "./AnswerComponent";

type Props = {};

const Preview = (props: Props) => {
  const [answersCompleteness, setAnswersCompleteness] = useState<
    Record<string, boolean>
  >({});

  const searchParams = useSearchParams();

  const title = searchParams.get("title");
  const questions: Question[] | null = JSON.parse(
    searchParams.get("questions")!
  );

  console.log(questions);

  const handleAnswerCheck = (
    id: string,
    isFilled: boolean,
    value: string | number | undefined
  ) => {
    setAnswersCompleteness((prev) => ({ ...prev, [id]: isFilled }));
  };

  const totalQuestions = questions?.length;
  const filledAnswers = Object.values(answersCompleteness).filter(
    (filled: boolean) => filled
  ).length;
  const progress = Math.round((filledAnswers / totalQuestions!) * 100);

  return (
    <Suspense>
      <PageWrapper className="min-h-screen border grid grid-rows-[auto_1fr_auto]">
        <div className="flex items-center justify-between gap-4 py-4 px-6 border-b">
          <h1 className="outline-none font-medium text-lg w-full">{title}</h1>

          <div className="flex flex-col w-full items-end gap-2">
            <span className="text-sm">Form Completeness — {progress}%</span>

            <div className="w-full bg-[#E1E4E8] rounded-full h-1">
              <div
                className="bg-[#00AA45] h-1 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <main
          className="flex flex-col gap-4 p-6 h-full overflow-y-auto scrollbar"
          style={{ height: "calc(100vh - 140px)" }}
        >
          {questions?.map((ques) => (
            <AnswerComponent
              key={ques.id}
              ques={ques}
              onAnswerChange={handleAnswerCheck}
            />
          ))}
        </main>

        <div className="flex items-center justify-end py-4 px-6 border-t bg-[#F6F8FAE5]">
          <Button buttonType={ButtonType.SUBMIT} disabled>
            Submit
          </Button>
        </div>
      </PageWrapper>
    </Suspense>
  );
};

export default Preview;
