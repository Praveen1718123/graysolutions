import { pgTable, text, serial, timestamp, boolean, uniqueIndex } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// ── Unified inbound hub ──────────────────────────────────────────────────────
// Every inbound record (contact query, newsletter/waitlist signup) is tagged
// with the brand ("source") it came from, so one dashboard serves all brands.
export const BRAND_SOURCES = ["gray-solutions", "gva", "magic-trucks", "gray-neo"] as const;
export type BrandSource = (typeof BRAND_SOURCES)[number];
export const sourceSchema = z.enum(BRAND_SOURCES);
export const SIGNUP_KINDS = ["newsletter", "waitlist"] as const;
export const kindSchema = z.enum(SIGNUP_KINDS);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").notNull().default(false),
  // Timestamp of the last time this admin opened the notification feed.
  // Anything created after this counts as "unread".
  notificationsSeenAt: timestamp("notifications_seen_at").defaultNow(),
});

export const newsletterSubscribers = pgTable(
  "newsletter_subscribers",
  {
    id: serial("id").primaryKey(),
    email: text("email").notNull(),
    // Which brand the signup came from + whether it's a newsletter or waitlist.
    source: text("source").notNull().default("gray-solutions"),
    kind: text("kind").notNull().default("newsletter"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => ({
    // Same email may subscribe to different brands/lists — uniqueness is per (email, source, kind).
    uniqEmailSourceKind: uniqueIndex("newsletter_email_source_kind_idx").on(t.email, t.source, t.kind),
  }),
);

export const contactQueries = pgTable("contact_queries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  // Which brand the inquiry came from.
  source: text("source").notNull().default("gray-solutions"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const caseStudies = pgTable("case_studies", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url"),
  slug: text("slug").notNull().unique(),
});

// Blog posts — owned in our own DB so they're managed from the unified
// dashboard (replaces the external Sanity CMS).
export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull().default(""),
  body: text("body").notNull().default(""), // HTML produced by the editor
  coverImage: text("cover_image"),
  category: text("category").notNull().default("General"),
  author: text("author").notNull().default("Gray Solutions"),
  readTime: text("read_time"), // e.g. "5 min read" (optional, auto-estimated)
  status: text("status").notNull().default("draft"), // "draft" | "published"
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Zod schemas for validation
export const insertUserSchema = createInsertSchema(users);
export const insertNewsletterSchema = z.object({
  email: z.string().email(),
  source: sourceSchema.default("gray-solutions"),
  kind: kindSchema.default("newsletter"),
});
export const insertQuerySchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email(),
  message: z.string().min(1, "Message is required"),
  source: sourceSchema.default("gray-solutions"),
});

export const insertCaseStudySchema = createInsertSchema(caseStudies).pick({
  title: true,
  description: true,
  category: true,
  imageUrl: true,
  slug: true,
});

// Posts — what the editor sends when creating/updating a blog post.
export const upsertPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase words separated by hyphens"),
  excerpt: z.string().default(""),
  body: z.string().default(""),
  coverImage: z.string().url().nullable().optional(),
  category: z.string().default("General"),
  author: z.string().default("Gray Solutions"),
  readTime: z.string().nullable().optional(),
  status: z.enum(["draft", "published"]).default("draft"),
});
export type UpsertPost = z.infer<typeof upsertPostSchema>;

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;
export type ContactQuery = typeof contactQueries.$inferSelect;
export type InsertQuery = z.infer<typeof insertQuerySchema>;
export type CaseStudy = typeof caseStudies.$inferSelect;
export type InsertCaseStudy = z.infer<typeof insertCaseStudySchema>;
export type Post = typeof posts.$inferSelect;
