"use client";

import { ButtonType, QuestionType } from "@/typings/enums";
import React, { useEffect, useState } from "react";
import PageWrapper from "./PageWrapper";
import AnswerComponent from "./AnswerComponent";
import { Question } from "@/typings/typings";
import Button from "./Button";
import useQuestionStore from "@/store/questionStore";
import { useRouter } from "next/navigation";

type Props = {
  form: Record<string, string | Date>;
  questions: Record<string, string | QuestionType | null | string[]>[];
};

const ClientForm = ({ form, questions }: Props) => {
  const { addAnswer, updateAnswer, answers } = useQuestionStore();
  const [answersCompleteness, setAnswersCompleteness] = useState<
    Record<string, boolean>
  >({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleAnswerCheck = (
    quesId: string,
    isFilled: boolean,
    value: string | number | undefined
  ) => {
    setAnswersCompleteness((prev) => ({ ...prev, [quesId]: isFilled }));

    const existingAnswer = answers.find(
      (answer) => answer.questionId === quesId
    );

    updateAnswer(existingAnswer?.id as string, { answer: value?.toString() });
  };

  const totalQuestions = questions?.length;
  const filledAnswers = Object.values(answersCompleteness).filter(
    (filled: boolean) => filled
  ).length;
  const progress = Math.round((filledAnswers / totalQuestions!) * 100);

  const handleSubmitForm = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answers,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        router.replace(`/success`);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    questions.forEach((question) => {
      const existingAnswer = answers.find(
        (answer) => answer.questionId === question.id
      );
      if (!existingAnswer) {
        addAnswer({
          id: crypto.randomUUID(),
          formId: form.id as string,
          questionId: question.id as string,
          answer: "",
          type: question.type as QuestionType,
        });
      }
    });
  }, []);

  return (
    <PageWrapper className="min-h-screen border grid grid-rows-[auto_1fr_auto]">
      <div className="flex items-center justify-between gap-4 py-4 px-6 border-b">
        <h1 className="outline-none font-medium text-lg w-full">
          {form.title as string}
        </h1>

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
            key={ques.id as string}
            ques={ques as unknown as Question}
            onAnswerChange={handleAnswerCheck}
          />
        ))}
      </main>

      <div className="flex items-center justify-end py-4 px-6 border-t bg-[#F6F8FAE5]">
        <Button buttonType={ButtonType.SUBMIT} onClick={handleSubmitForm}>
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </PageWrapper>
  );
};

export default ClientForm;
