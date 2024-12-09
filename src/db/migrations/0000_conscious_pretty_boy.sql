CREATE TABLE IF NOT EXISTS "answers" (
	"id" text PRIMARY KEY NOT NULL,
	"formId" text NOT NULL,
	"questionId" text NOT NULL,
	"answer" text NOT NULL,
	"type" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "forms" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "questions" (
	"id" text PRIMARY KEY NOT NULL,
	"formId" text NOT NULL,
	"title" text NOT NULL,
	"helpText" text,
	"type" text NOT NULL,
	"options" text[]
);
