import { pgTable, text, serial, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").notNull().default(false),
});

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const contactQueries = pgTable("contact_queries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
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

// Zod schemas for validation
export const insertUserSchema = createInsertSchema(users);
export const insertNewsletterSchema = createInsertSchema(newsletterSubscribers).pick({
  email: true,
});
export const insertQuerySchema = createInsertSchema(contactQueries).pick({
  name: true,
  email: true,
  message: true,
});

export const insertCaseStudySchema = createInsertSchema(caseStudies).pick({
  title: true,
  description: true,
  category: true,
  imageUrl: true,
  slug: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;
export type ContactQuery = typeof contactQueries.$inferSelect;
export type InsertQuery = z.infer<typeof insertQuerySchema>;
export type CaseStudy = typeof caseStudies.$inferSelect;
export type InsertCaseStudy = z.infer<typeof insertCaseStudySchema>;
