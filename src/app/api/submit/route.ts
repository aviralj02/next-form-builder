import { db } from "@/db";
import { Answers } from "@/db/schema";
import { Answer } from "@/typings/typings";

export async function POST(req: Request) {
  const { answers }: { answers: Answer[] } = await req.json();

  try {
    const answerPromises = answers.map((ans) =>
      db.insert(Answers).values({
        answer: ans.answer,
        formId: ans.formId,
        id: ans.id,
        questionId: ans.questionId,
        type: ans.type,
      })
    );

    await Promise.all(answerPromises);

    return Response.json(
      { message: "Successfully submitted" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ error });
  }
}
