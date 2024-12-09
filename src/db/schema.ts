import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const Forms = pgTable("forms", {
  id: text("id").primaryKey().notNull(),
  title: text("title").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export const Questions = pgTable("questions", {
  id: text("id").primaryKey().notNull(),
  formId: text("formId").notNull(),
  title: text("title").notNull(),
  helpText: text("helpText"),
  type: text("type").notNull(),
  options: text("options").array(),
});

export const Answers = pgTable("answers", {
  id: text("id").primaryKey().notNull(),
  formId: text("formId").notNull(),
  questionId: text("questionId").notNull(),
  answer: text("answer").notNull(),
  type: text("type").notNull(),
});
