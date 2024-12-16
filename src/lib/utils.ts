import { Question } from "@/typings/typings";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as XLSX from "xlsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateExcelFile = (
  responses: { question: string; answers: string[] }[]
) => {
  const excelData: any = [];

  responses.forEach((item) => {
    const row: Record<string, string> = { Question: item.question };

    item.answers.forEach((answer, index) => {
      row[`User ${index + 1}`] = answer;
    });

    excelData.push(row);
  });

  const workbook = XLSX.utils.book_new();

  const worksheet = XLSX.utils.json_to_sheet(excelData);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Responses");

  XLSX.writeFile(workbook, "form_responses.xlsx");
};

export function arrayMove(
  array: Question[],
  fromIndex: number,
  toIndex: number
) {
  const newArray = [...array];
  const [movedItem] = newArray.splice(fromIndex, 1);
  newArray.splice(toIndex, 0, movedItem);
  return newArray;
}
