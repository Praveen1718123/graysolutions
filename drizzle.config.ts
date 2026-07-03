import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL, ensure the database is provisioned");
}

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  // The sessions table belongs to connect-pg-simple (see server/storage.ts),
  // not to shared/schema.ts — without this filter, `db:push` tries to DROP it.
  tablesFilter: ["!sessions"],
});
