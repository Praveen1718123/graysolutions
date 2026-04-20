import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { 
  type User, type InsertUser, users,
  type NewsletterSubscriber, type InsertNewsletter, newsletterSubscribers,
  type ContactQuery, type InsertQuery, contactQueries,
  type CaseStudy, type InsertCaseStudy, caseStudies 
} from "@shared/schema";

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
  
  // Session
  sessionStore: session.Store;
}

export class DatabaseStorage implements IStorage {
  private db: ReturnType<typeof drizzle>;
  public sessionStore: session.Store;

  constructor() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
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
}

export const storage = new DatabaseStorage();
