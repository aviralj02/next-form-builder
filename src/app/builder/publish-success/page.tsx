"use client";

import PageWrapper from "@/components/PageWrapper";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

type Props = {};

const IS_PROD = process.env.NODE_ENV === "production";
const URL = IS_PROD
  ? "https://next-form-builder.vercel.app"
  : "http://localhost:3000";

const PublishSucessPage = (props: Props) => {
  const searchParams = useSearchParams();

  const formId = searchParams.get("formId");

  return (
    <Suspense>
      <PageWrapper className="flex flex-col gap-1 justify-center items-center min-h-screen">
        <h1 className="text-2xl font-semibold text-green-500">
          Congratulations!
        </h1>
        <p>
          {" "}
          Your form is now live with ID: <em>{formId}</em>
        </p>
        <p className="mt-4">
          Accessible at:{" "}
          <code>
            <a href={URL + "/" + formId}>{URL + "/" + formId}</a>
          </code>
        </p>
      </PageWrapper>
    </Suspense>
  );
};

export default PublishSucessPage;
