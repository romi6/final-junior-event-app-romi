CREATE TABLE IF NOT EXISTS "atendees" (
	"id" serial PRIMARY KEY NOT NULL,
	"eventId" integer NOT NULL,
	"name" varchar(256) NOT NULL,
	"contactDetails" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "events" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256) NOT NULL,
	"date" varchar(256) NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "atendees" ADD CONSTRAINT "atendees_eventId_events_id_fk" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
