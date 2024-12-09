import PageWrapper from "@/components/PageWrapper";
import React from "react";

type Props = {};

const SuccessPage = (props: Props) => {
  return (
    <PageWrapper className="flex flex-col gap-1 justify-center items-center min-h-screen">
      <h1 className="text-2xl font-semibold text-green-500">
        Submissions Recorded!
      </h1>
      <p>Thank you for filling up your responses.</p>
    </PageWrapper>
  );
};

export default SuccessPage;
