import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const eventSchema = pgTable("events", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  date: varchar("date", { length: 256 }).notNull(),
  description: text("description").notNull(),
});

export const atendeeSchema = pgTable("atendees", {
  id: serial("id").primaryKey(),
  eventId: integer("eventId")
    .references(() => eventSchema.id)
    .notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  contactDetails: text("contactDetails").notNull(),
});
