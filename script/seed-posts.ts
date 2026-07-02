/**
 * Seed the blog with the three launch posts.
 *
 * Run this ONCE after the database is provisioned and `npm run db:push` has
 * created the tables:
 *
 *   tsx --env-file=.env script/seed-posts.ts
 *
 * It is idempotent — posts are matched by slug, so re-running won't duplicate.
 * After this, manage everything from the dashboard at /admin → Blog.
 */
import "dotenv/config";
import ws from "ws";
import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";
import { posts } from "../shared/schema";

if (!globalThis.WebSocket) {
  globalThis.WebSocket = ws as any;
}

const SEED = [
  {
    title: "Building brands that stand the test of time",
    slug: "building-brands-that-stand-the-test-of-time",
    excerpt:
      "Why strong foundations, thoughtful systems, and clarity of message never go out of style.",
    category: "Brand & Identity",
    coverImage:
      "https://images.unsplash.com/photo-1554034483-04fda0d3507b?w=1600&auto=format&fit=crop&q=75",
    body: `<p>Trends come and go. The brands that endure are the ones built on a clear idea, a consistent system, and the discipline to apply it everywhere.</p>
<h2>Foundations first</h2>
<p>Before a single colour or typeface is chosen, the work is strategic: who is this for, what do we stand for, and what do we want people to feel? Everything visual flows from those answers.</p>
<h2>Systems, not one-offs</h2>
<p>A logo is not a brand. A brand is a repeatable system — type, colour, layout, voice — that a team can apply without it falling apart. That's what makes it feel like one company across every touchpoint.</p>
<blockquote>Consistency compounds. The brands you trust are the ones that show up the same way, every time.</blockquote>
<p>Build the foundation, document the system, and apply it with discipline. That's how a brand stands the test of time.</p>`,
  },
  {
    title: "The real impact of AI in modern workflows",
    slug: "the-real-impact-of-ai-in-modern-workflows",
    excerpt:
      "AI isn't about replacing people. It's about removing friction and creating more room for what matters.",
    category: "AI & Automation",
    coverImage:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1600&auto=format&fit=crop&q=75",
    body: `<p>The most useful AI in a business rarely looks dramatic. It quietly removes the repetitive work that drains a team's time and attention.</p>
<h2>Remove friction, not judgment</h2>
<p>The goal isn't to automate decisions — it's to automate the busywork around them, so people are free to apply judgment where it actually counts.</p>
<h2>Start small, measure, expand</h2>
<p>Pick one painful, repetitive workflow. Automate it. Measure the time saved and the errors avoided. Then expand to the next one. Compounding beats big-bang rollouts.</p>
<p>Done well, AI gives a small team the leverage of a much larger one — without losing the human touch.</p>`,
  },
  {
    title: "Content strategies that drive compounding growth",
    slug: "content-strategies-that-drive-compounding-growth",
    excerpt:
      "A practical look at how consistent, valuable content builds momentum that lasts.",
    category: "Digital Marketing",
    coverImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&auto=format&fit=crop&q=75",
    body: `<p>Content doesn't pay off on day one. It pays off on day three hundred — if you stay consistent and keep the quality bar high.</p>
<h2>Pick a lane and own it</h2>
<p>Trying to talk to everyone says nothing to anyone. Choose the topics you can speak about with genuine authority and go deep.</p>
<h2>Consistency is the strategy</h2>
<p>One brilliant post a quarter loses to a useful post every week. Momentum comes from showing up, learning what resonates, and doubling down.</p>
<blockquote>The best time to start was a year ago. The second best time is today.</blockquote>
<p>Build the habit, measure what works, and let the compounding do the heavy lifting.</p>`,
  },
];

async function run() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL is not set. Add it to .env first.");

  const pool = new Pool({ connectionString });
  const db = drizzle(pool);
  const now = new Date();

  for (const p of SEED) {
    const [existing] = await db.select().from(posts).where(eq(posts.slug, p.slug));
    if (existing) {
      console.log(`• skip (already exists): ${p.slug}`);
      continue;
    }
    await db.insert(posts).values({
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      body: p.body,
      coverImage: p.coverImage,
      category: p.category,
      author: "Gray Solutions",
      readTime: `${Math.max(1, Math.round(p.body.replace(/<[^>]+>/g, " ").split(/\s+/).length / 200))} min read`,
      status: "published",
      publishedAt: now,
      createdAt: now,
      updatedAt: now,
    });
    console.log(`✓ inserted: ${p.slug}`);
  }

  console.log("Done. Manage posts at /admin → Blog.");
  await pool.end();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
