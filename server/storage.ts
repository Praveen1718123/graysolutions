import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";
import { type CaseStudy, type InsertCaseStudy, caseStudies } from "@shared/schema";

export interface IStorage {
  getCaseStudies(): Promise<CaseStudy[]>;
  getCaseStudiesByCategory(category: string): Promise<CaseStudy[]>;
  createCaseStudy(caseStudy: InsertCaseStudy): Promise<CaseStudy>;
}

export class DatabaseStorage implements IStorage {
  private db: ReturnType<typeof drizzle>;

  constructor() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    this.db = drizzle(pool);
  }

  async getCaseStudies(): Promise<CaseStudy[]> {
    return await this.db.select().from(caseStudies);
  }

  async getCaseStudiesByCategory(category: string): Promise<CaseStudy[]> {
    return await this.db.select().from(caseStudies).where(eq(caseStudies.category, category));
  }

  async createCaseStudy(insertCaseStudy: InsertCaseStudy): Promise<CaseStudy> {
    const result = await this.db.insert(caseStudies).values(insertCaseStudy).returning();
    return result[0];
  }
}

export const storage = new DatabaseStorage();
