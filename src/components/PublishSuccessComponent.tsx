"use client";

import React from "react";
import PageWrapper from "./PageWrapper";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type Props = {};

const IS_PROD = process.env.NODE_ENV === "production";
const URL = IS_PROD
  ? "https://next-form-builder.vercel.app"
  : "http://localhost:3000";

const PublishSuccessComponent = (props: Props) => {
  const searchParams = useSearchParams();

  const formId = searchParams.get("formId");
  return (
    <PageWrapper className="flex flex-col gap-1 justify-center items-center min-h-screen">
      <h1 className="text-2xl font-semibold text-green-500">
        Congratulations!
      </h1>
      <p>
        {" "}
        Your form is now live with ID: <em>{formId}</em>
      </p>

      <p className="mt-4 text-center">
        <span className="font-bold">Accessible at: </span>
        <code>
          <Link href={URL + "/" + formId} className="hover:underline">
            {URL + "/" + formId}
          </Link>
        </code>
      </p>

      <p className="mt-2">
        <span className="font-bold">Access your responses here: </span>
        <code>
          <Link href="/responses" className="hover:underline">
            {URL + "/responses"}
          </Link>
        </code>
      </p>
    </PageWrapper>
  );
};

export default PublishSuccessComponent;
