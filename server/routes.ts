import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCaseStudySchema, insertNewsletterSchema, insertQuerySchema, type User } from "@shared/schema";

// Middleware to check if user is admin
function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated() && (req.user as User).isAdmin) {
    return next();
  }
  res.status(403).json({ message: "Admin access required" });
}

import { Resend } from "resend";

// Initialize Resend
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Redirects for old URLs
  app.get("/about-us", (_req, res) => res.redirect(301, "/about"));
  app.get("/contact-us", (_req, res) => res.redirect(301, "/contact"));
  
  // Public Case Studies
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

  // Newsletter Subscription
  app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      const data = insertNewsletterSchema.parse(req.body);
      const subscriber = await storage.subscribeToNewsletter(data);
      
      // Send Welcome Email
      if (resend) {
        await resend.emails.send({
          from: "Gray Solutions <newsletter@graysolutions.in>",
          to: [subscriber.email],
          subject: "Welcome to Gray Solutions",
          html: `<h1>Welcome!</h1><p>Thanks for joining the Gray Solutions newsletter. We'll keep you updated with the latest in performance marketing and design.</p>`,
        }).catch(err => console.error("Email failed:", err));
      }

      res.status(201).json(subscriber);
    } catch (error) {
      res.status(400).json({ error: "Invalid email" });
    }
  });

  // Contact Query Submission
  app.post("/api/contact/submit", async (req, res) => {
    try {
      const data = insertQuerySchema.parse(req.body);
      const query = await storage.submitQuery(data);

      // Notify Admin
      if (resend) {
        await resend.emails.send({
          from: "Gray Solutions <alerts@graysolutions.in>",
          to: ["praveenrs15@gmail.com"], // Admin email
          subject: `New Inquiry from ${query.name}`,
          html: `
            <h3>New Contact Submission</h3>
            <p><strong>Name:</strong> ${query.name}</p>
            <p><strong>Email:</strong> ${query.email}</p>
            <p><strong>Message:</strong> ${query.message}</p>
          `,
        }).catch(err => console.error("Admin notification failed:", err));
      }

      res.status(201).json(query);
    } catch (error) {
      res.status(400).json({ error: "Invalid query data" });
    }
  });

  // Protected Admin Routes
  app.get("/api/admin/queries", isAdmin, async (_req, res) => {
    const queries = await storage.getAllQueries();
    res.json(queries);
  });

  app.get("/api/admin/subscribers", isAdmin, async (_req, res) => {
    const subscribers = await storage.getAllSubscribers();
    res.json(subscribers);
  });

  // Create a new case study (Admin only)
  app.post("/api/case-studies", isAdmin, async (req, res) => {
    try {
      const validatedData = insertCaseStudySchema.parse(req.body);
      const newStudy = await storage.createCaseStudy(validatedData);
      return res.status(201).json(newStudy);
    } catch (error) {
      console.error("Error creating case study:", error);
      return res.status(400).json({ error: "Invalid case study data" });
    }
  });

  // Broadcast Newsletter (Admin only)
  app.post("/api/admin/newsletter/broadcast", isAdmin, async (req, res) => {
    try {
      const { subject, content } = req.body;
      if (!subject || !content) {
        return res.status(400).json({ error: "Subject and content are required" });
      }

      console.log(`[Newsletter] Starting broadcast: "${subject}"`);

      const subscribers = await storage.getAllSubscribers();
      const emails = subscribers.map(s => s.email);

      console.log(`[Newsletter] Found ${emails.length} subscribers:`, emails);

      if (emails.length === 0) {
        return res.status(200).json({ message: "No subscribers to send to" });
      }

      if (!resend) {
        console.error("[Newsletter] Resend not configured. Check RESEND_API_KEY in .env");
        return res.status(500).json({ error: "Newsletter service not configured on server" });
      }

      // Wrap content in a simple professional template
      const htmlTemplate = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a; line-height: 1.6;">
          <div style="padding: 40px 0; border-bottom: 1px solid #f0f0f0;">
            <h2 style="margin: 0; font-size: 24px; font-weight: bold;">Gray Solutions</h2>
          </div>
          <div style="padding: 40px 0;">
            ${content.replace(/\n/g, '<br/>')}
          </div>
          <div style="padding: 40px 0; border-top: 1px solid #f0f0f0; font-size: 12px; color: #999;">
            <p>© ${new Date().getFullYear()} Gray Solutions. All rights reserved.</p>
            <p>You are receiving this because you subscribed to our newsletter.</p>
          </div>
        </div>
      `;

      console.log("[Newsletter] Sending via Resend...");
      const result = await resend.emails.send({
        from: "Gray Solutions <newsletter@graysolutions.in>",
        to: ["newsletter@graysolutions.in"], // Sent to self
        bcc: emails, // Actual subscribers in BCC for privacy
        subject: subject,
        html: htmlTemplate,
      });


      console.log("[Newsletter] Resend API Full Response:", JSON.stringify(result, null, 2));

      if (result.error) {
        console.error("[Newsletter] Resend Error:", result.error);
        return res.status(500).json({ 
          error: result.error.message,
          code: (result.error as any).name || "RESEND_ERROR"
        });
      }

      res.json({ 
        message: `Successfully sent to ${emails.length} subscribers`,
        resendId: result.data?.id
      });
    } catch (error) {
      console.error("Broadcast failed:", error);
      res.status(500).json({ error: "Failed to broadcast newsletter" });
    }
  });

  return httpServer;
}
