import PublishSuccessComponent from "@/components/PublishSuccessComponent";
import React, { Suspense } from "react";

type Props = {};

const PublishSucessPage = (props: Props) => {
  return (
    <Suspense>
      <PublishSuccessComponent />
    </Suspense>
  );
};

export default PublishSucessPage;
