import type { Config } from "drizzle-kit";

if (!process.env.DB_URL) throw new Error("db_url error");
export default {
  schema: "./src/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DB_URL,
  },
} satisfies Config;
