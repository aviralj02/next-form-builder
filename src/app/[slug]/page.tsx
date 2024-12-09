import ClientForm from "@/components/ClientForm";
import { db } from "@/db";
import { Forms, Questions } from "@/db/schema";
import { eq } from "drizzle-orm";
import React from "react";

type Props = {
  params: Promise<{ slug: string }>;
};

const ClientFormPage = async ({ params }: Props) => {
  const { slug } = await params;

  const form = await db.select().from(Forms).where(eq(Forms.id, slug)).limit(1);

  if (form.length === 0) {
    throw new Error("Form not found");
  }

  const questions = await db
    .select()
    .from(Questions)
    .where(eq(Questions.formId, slug));

  return <ClientForm form={form[0]} questions={questions} />;
};

export default ClientFormPage;
