import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCaseStudySchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Get all case studies or filter by category
  app.get("/api/case-studies", async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      
      if (category && category !== "Show All") {
        const studies = await storage.getCaseStudiesByCategory(category);
        return res.json(studies);
      }
      
      const studies = await storage.getCaseStudies();
      return res.json(studies);
    } catch (error) {
      console.error("Error fetching case studies:", error);
      return res.status(500).json({ error: "Failed to fetch case studies" });
    }
  });

  // Create a new case study (for seeding/admin purposes)
  app.post("/api/case-studies", async (req, res) => {
    try {
      const validatedData = insertCaseStudySchema.parse(req.body);
      const newStudy = await storage.createCaseStudy(validatedData);
      return res.status(201).json(newStudy);
    } catch (error) {
      console.error("Error creating case study:", error);
      return res.status(400).json({ error: "Invalid case study data" });
    }
  });

  return httpServer;
}
