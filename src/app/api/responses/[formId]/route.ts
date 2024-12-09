import { db } from "@/db";
import { Answers, Questions } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ formId: string }> }
) {
  const { formId } = await params;

  try {
    const questions = await db
      .select()
      .from(Questions)
      .where(eq(Questions.formId, formId));

    const answers = await db
      .select()
      .from(Answers)
      .where(eq(Answers.formId, formId));

    const data = questions.map((question) => {
      const answer =
        answers.find((ans) => ans.questionId === question.id)?.answer ||
        "No Response";

      return {
        question: question.title,
        answer,
      };
    });

    return Response.json({ data }, { status: 200 });
  } catch (error) {
    return Response.json({ error });
  }
}