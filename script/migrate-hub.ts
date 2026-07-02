/**
 * One-off, idempotent migration for the unified inbound hub.
 * Adds source/kind columns + swaps the email-unique for a per-(email,source,kind)
 * unique index. Safe to re-run. Run with: npx tsx script/migrate-hub.ts
 */
import "dotenv/config";
import { neon } from "@neondatabase/serverless";

const statements = [
  `ALTER TABLE "newsletter_subscribers" ADD COLUMN IF NOT EXISTS "source" text NOT NULL DEFAULT 'gray-solutions'`,
  `ALTER TABLE "newsletter_subscribers" ADD COLUMN IF NOT EXISTS "kind" text NOT NULL DEFAULT 'newsletter'`,
  `ALTER TABLE "contact_queries" ADD COLUMN IF NOT EXISTS "source" text NOT NULL DEFAULT 'gray-solutions'`,
  `ALTER TABLE "newsletter_subscribers" DROP CONSTRAINT IF EXISTS "newsletter_subscribers_email_unique"`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "newsletter_email_source_kind_idx" ON "newsletter_subscribers" ("email","source","kind")`,
];

async function main() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL not set");
  const sql = neon(process.env.DATABASE_URL);
  for (const st of statements) {
    console.log("→", st.slice(0, 72));
    await sql.query(st);
  }
  const rows = await sql.query(
    `select table_name, column_name from information_schema.columns
     where table_name in ('newsletter_subscribers','contact_queries')
       and column_name in ('source','kind')
     order by table_name, column_name`,
  );
  console.log("verified columns:", JSON.stringify(rows));
  console.log("MIGRATION DONE");
}

main().catch((e) => {
  console.error("MIGRATION FAILED:", e?.message || e);
  process.exit(1);
});
