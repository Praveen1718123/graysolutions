import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";
import { type User, type InsertUser, users, type CaseStudy, type InsertCaseStudy, caseStudies } from "@shared/schema";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getCaseStudies(): Promise<CaseStudy[]>;
  getCaseStudiesByCategory(category: string): Promise<CaseStudy[]>;
  createCaseStudy(caseStudy: InsertCaseStudy): Promise<CaseStudy>;
}

export class DatabaseStorage implements IStorage {
  private db;

  constructor() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    this.db = drizzle(pool);
  }

  async getUser(id: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await this.db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async getCaseStudies(): Promise<CaseStudy[]> {
    return await this.db.select().from(caseStudies);
  }

  async getCaseStudiesByCategory(category: string): Promise<CaseStudy[]> {
    return await this.db.select().from(caseStudies).where(eq(caseStudies.category, category));
  }

  async createCaseStudy(caseStudy: InsertCaseStudy): Promise<CaseStudy> {
    const result = await this.db.insert(caseStudies).values(caseStudy).returning();
    return result[0];
  }
}

export const storage = new DatabaseStorage();
