import { db } from "@/db";
import { Forms, Questions } from "@/db/schema";
import { Question } from "@/typings/typings";

export async function POST(req: Request) {
  const {
    form,
    questions,
  }: { form: Record<string, string>; questions: Question[] } = await req.json();

  try {
    await db.insert(Forms).values({
      id: form.id,
      title: form.title,
    });

    const questionPromises = questions.map((question) =>
      db.insert(Questions).values({
        id: question.id,
        formId: form.id,
        title: question.title,
        type: question.type,
        helpText: question.helpText,
        options: question.options,
      })
    );

    await Promise.all(questionPromises);

    return Response.json(
      { message: "Successfully published" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ error });
  }
}
