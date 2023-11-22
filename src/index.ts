import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { atendeeSchema, eventSchema } from "./schema";

const connectionString = process.env.DB_URL;

if (connectionString === undefined) throw new Error("error with db_url");
const client = postgres(connectionString);
export const db = drizzle(client);

export type SelectEvents = typeof eventSchema.$inferSelect;
export type SelectAtendees = typeof atendeeSchema.$inferSelect;
