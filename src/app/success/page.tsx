"use client";

import PageWrapper from "@/components/PageWrapper";
import Link from "next/link";
import React from "react";

type Props = {};

const IS_PROD = process.env.NODE_ENV === "production";
const URL = IS_PROD
  ? "https://next-form-builder.vercel.app"
  : "http://localhost:3000";

const SuccessPage = (props: Props) => {
  return (
    <PageWrapper className="flex flex-col gap-1 justify-center items-center min-h-screen">
      <h1 className="text-2xl font-semibold text-green-500">
        Submissions Recorded!
      </h1>
      <p>Thank you for filling up your responses.</p>
      <p className="mt-2">
        <span className="font-semibold">Access your responses here: </span>
        <Link href="/responses" className="hover:underline">
          {URL + "/responses"}
        </Link>
      </p>
    </PageWrapper>
  );
};

export default SuccessPage;
