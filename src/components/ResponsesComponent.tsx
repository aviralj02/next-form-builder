"use client";

import React, { ChangeEvent, useState } from "react";
import PageWrapper from "./PageWrapper";
import { ResponseData } from "@/typings/typings";
import DownloadIcon from "./icons/DownloadIcon";
import Button from "./Button";
import { ButtonType } from "@/typings/enums";
import { generateExcelFile } from "@/lib/utils";

type Props = {};

const ResponsesComponent = (props: Props) => {
  const [formId, setFormId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFetchAndDownload = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/responses/${formId}`);

      const result = await response.json();

      generateExcelFile(result?.data);
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <PageWrapper className="flex flex-col gap-8 justify-center items-center min-h-screen">
      <h1 className="text-2xl font-semibold">Download your responses</h1>

      <div className="w-full flex flex-col items-center gap-3">
        <input
          type="text"
          value={formId}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFormId(e.target.value)
          }
          className="outline-none border rounded-lg py-1 px-2 text-sm max-w-80 w-full"
          placeholder="Enter Your Form ID"
        />

        <Button buttonType={ButtonType.SUBMIT} onClick={handleFetchAndDownload}>
          {isLoading ? (
            "Downloading..."
          ) : (
            <>
              <DownloadIcon className="w-4" /> Download
            </>
          )}
        </Button>
      </div>
    </PageWrapper>
  );
};

export default ResponsesComponent;
