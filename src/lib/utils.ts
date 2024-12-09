import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as XLSX from "xlsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateExcelFile = (
  responses: { question: string; answer: string }[]
) => {
  const workbook = XLSX.utils.book_new();

  const worksheet = XLSX.utils.json_to_sheet(responses);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Responses");

  XLSX.writeFile(workbook, "form_responses.xlsx");
};
