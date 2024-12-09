import Preview from "@/components/Preview";
import React, { Suspense } from "react";

type Props = {};

const PreviewPage = (props: Props) => {
  return (
    <Suspense>
      <Preview />
    </Suspense>
  );
};

export default PreviewPage;
