import "dotenv/config";
import { eq, desc, gt, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import {
  type User, type InsertUser, users,
  type NewsletterSubscriber, type InsertNewsletter, newsletterSubscribers,
  type ContactQuery, type InsertQuery, contactQueries,
  type CaseStudy, type InsertCaseStudy, caseStudies,
  type Post, type UpsertPost, posts
} from "@shared/schema";

export type OverviewStats = {
  submissions: number;
  subscribers: number;
  posts: number;
  drafts: number;
};

export type ActivityItem = {
  id: string;
  type: "submission" | "subscriber";
  title: string;
  subtitle: string;
  source: string;
  createdAt: Date | null;
};

const PostgresSessionStore = connectPgSimple(session);

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Newsletter
  subscribeToNewsletter(subscriber: InsertNewsletter): Promise<NewsletterSubscriber>;
  getAllSubscribers(): Promise<NewsletterSubscriber[]>;
  
  // Queries
  submitQuery(query: InsertQuery): Promise<ContactQuery>;
  getAllQueries(): Promise<ContactQuery[]>;
  
  // Case Studies
  getCaseStudies(): Promise<CaseStudy[]>;
  getCaseStudiesByCategory(category: string): Promise<CaseStudy[]>;
  createCaseStudy(caseStudy: InsertCaseStudy): Promise<CaseStudy>;

  // Blog posts
  getPublishedPosts(): Promise<Post[]>;
  getPublishedPostBySlug(slug: string): Promise<Post | undefined>;
  getAllPosts(): Promise<Post[]>;
  getPostById(id: number): Promise<Post | undefined>;
  createPost(post: UpsertPost): Promise<Post>;
  updatePost(id: number, post: UpsertPost): Promise<Post | undefined>;
  deletePost(id: number): Promise<void>;

  // Dashboard
  getOverviewStats(): Promise<OverviewStats>;
  getRecentActivity(limit?: number): Promise<ActivityItem[]>;
  getUnreadCount(since: Date | null | undefined): Promise<number>;
  markNotificationsSeen(userId: number): Promise<void>;
  updateUserPassword(userId: number, hashedPassword: string): Promise<void>;

  // Session
  sessionStore: session.Store;
}

export class DatabaseStorage implements IStorage {
  private db: ReturnType<typeof drizzle>;
  public sessionStore: session.Store;

  constructor() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      console.error("FATAL ERROR: DATABASE_URL is not set in environment.");
      throw new Error("DATABASE_URL is missing. Connection aborted.");
    }
    
    // Log configuration status (redacted for security)
    console.log("Database Storage: Initializing Pool...");
    
    const pool = new Pool({ connectionString });
    this.db = drizzle(pool);
    this.sessionStore = new PostgresSessionStore({
      pool,
      tableName: 'sessions', // Ensure this table exists or will be created by drizzle
      createTableIfMissing: true,
    });
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await this.db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await this.db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await this.db.insert(users).values(insertUser).returning();
    return user;
  }

  // Newsletter
  async subscribeToNewsletter(insertNewsletter: InsertNewsletter): Promise<NewsletterSubscriber> {
    const [subscriber] = await this.db.insert(newsletterSubscribers).values(insertNewsletter).returning();
    return subscriber;
  }

  async getAllSubscribers(): Promise<NewsletterSubscriber[]> {
    return await this.db.select().from(newsletterSubscribers);
  }

  // Queries
  async submitQuery(insertQuery: InsertQuery): Promise<ContactQuery> {
    const [query] = await this.db.insert(contactQueries).values(insertQuery).returning();
    return query;
  }

  async getAllQueries(): Promise<ContactQuery[]> {
    return await this.db.select().from(contactQueries);
  }

  // Case Studies
  async getCaseStudies(): Promise<CaseStudy[]> {
    return await this.db.select().from(caseStudies);
  }

  async getCaseStudiesByCategory(category: string): Promise<CaseStudy[]> {
    return await this.db.select().from(caseStudies).where(eq(caseStudies.category, category));
  }

  async createCaseStudy(insertCaseStudy: InsertCaseStudy): Promise<CaseStudy> {
    const [caseStudy] = await this.db.insert(caseStudies).values(insertCaseStudy).returning();
    return caseStudy;
  }

  // ── Blog posts ──────────────────────────────────────────────────────────
  async getPublishedPosts(): Promise<Post[]> {
    return await this.db
      .select()
      .from(posts)
      .where(eq(posts.status, "published"))
      .orderBy(desc(posts.publishedAt));
  }

  async getPublishedPostBySlug(slug: string): Promise<Post | undefined> {
    const [post] = await this.db
      .select()
      .from(posts)
      .where(eq(posts.slug, slug));
    if (!post || post.status !== "published") return undefined;
    return post;
  }

  async getAllPosts(): Promise<Post[]> {
    return await this.db.select().from(posts).orderBy(desc(posts.updatedAt));
  }

  async getPostById(id: number): Promise<Post | undefined> {
    const [post] = await this.db.select().from(posts).where(eq(posts.id, id));
    return post;
  }

  async createPost(post: UpsertPost): Promise<Post> {
    const now = new Date();
    const [created] = await this.db
      .insert(posts)
      .values({
        ...post,
        coverImage: post.coverImage ?? null,
        readTime: post.readTime ?? null,
        publishedAt: post.status === "published" ? now : null,
        createdAt: now,
        updatedAt: now,
      })
      .returning();
    return created;
  }

  async updatePost(id: number, post: UpsertPost): Promise<Post | undefined> {
    const existing = await this.getPostById(id);
    if (!existing) return undefined;
    // Set publishedAt the first time it transitions to published; keep it after.
    let publishedAt = existing.publishedAt;
    if (post.status === "published" && !publishedAt) publishedAt = new Date();
    if (post.status === "draft") publishedAt = null;
    const [updated] = await this.db
      .update(posts)
      .set({
        ...post,
        coverImage: post.coverImage ?? null,
        readTime: post.readTime ?? null,
        publishedAt,
        updatedAt: new Date(),
      })
      .where(eq(posts.id, id))
      .returning();
    return updated;
  }

  async deletePost(id: number): Promise<void> {
    await this.db.delete(posts).where(eq(posts.id, id));
  }

  // ── Dashboard: overview + notifications ─────────────────────────────────
  async getOverviewStats(): Promise<OverviewStats> {
    const [[q], [s], [p], [d]] = await Promise.all([
      this.db.select({ n: sql<number>`count(*)` }).from(contactQueries),
      this.db.select({ n: sql<number>`count(*)` }).from(newsletterSubscribers),
      this.db.select({ n: sql<number>`count(*)` }).from(posts),
      this.db
        .select({ n: sql<number>`count(*)` })
        .from(posts)
        .where(eq(posts.status, "draft")),
    ]);
    return {
      submissions: Number(q?.n ?? 0),
      subscribers: Number(s?.n ?? 0),
      posts: Number(p?.n ?? 0),
      drafts: Number(d?.n ?? 0),
    };
  }

  async getRecentActivity(limit = 12): Promise<ActivityItem[]> {
    const [queries, subs] = await Promise.all([
      this.db.select().from(contactQueries).orderBy(desc(contactQueries.createdAt)).limit(limit),
      this.db.select().from(newsletterSubscribers).orderBy(desc(newsletterSubscribers.createdAt)).limit(limit),
    ]);
    const items: ActivityItem[] = [
      ...queries.map((q) => ({
        id: `q-${q.id}`,
        type: "submission" as const,
        title: q.name,
        subtitle: q.email,
        source: q.source,
        createdAt: q.createdAt,
      })),
      ...subs.map((s) => ({
        id: `s-${s.id}`,
        type: "subscriber" as const,
        title: s.kind === "waitlist" ? "Waitlist signup" : "New subscriber",
        subtitle: s.email,
        source: s.source,
        createdAt: s.createdAt,
      })),
    ];
    items.sort((a, b) => (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0));
    return items.slice(0, limit);
  }

  async getUnreadCount(since: Date | null | undefined): Promise<number> {
    if (!since) {
      const [[q], [s]] = await Promise.all([
        this.db.select({ n: sql<number>`count(*)` }).from(contactQueries),
        this.db.select({ n: sql<number>`count(*)` }).from(newsletterSubscribers),
      ]);
      return Number(q?.n ?? 0) + Number(s?.n ?? 0);
    }
    const [[q], [s]] = await Promise.all([
      this.db.select({ n: sql<number>`count(*)` }).from(contactQueries).where(gt(contactQueries.createdAt, since)),
      this.db.select({ n: sql<number>`count(*)` }).from(newsletterSubscribers).where(gt(newsletterSubscribers.createdAt, since)),
    ]);
    return Number(q?.n ?? 0) + Number(s?.n ?? 0);
  }

  async markNotificationsSeen(userId: number): Promise<void> {
    await this.db.update(users).set({ notificationsSeenAt: new Date() }).where(eq(users.id, userId));
  }

  async updateUserPassword(userId: number, hashedPassword: string): Promise<void> {
    await this.db.update(users).set({ password: hashedPassword }).where(eq(users.id, userId));
  }
}

export const storage = new DatabaseStorage();
