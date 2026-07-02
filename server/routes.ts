import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertCaseStudySchema,
  insertNewsletterSchema,
  insertQuerySchema,
  upsertPostSchema,
  type User,
} from "@shared/schema";
import { hashPassword } from "./auth";

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

// ── Unified inbound hub ──────────────────────────────────────────────────────
// Brand registry. All senders use the verified graysolutions.in domain (Resend),
// varying only the display name per brand.
const BRANDS: Record<string, { label: string; from: string }> = {
  "gray-solutions": { label: "Gray Solutions", from: "Gray Solutions <newsletter@graysolutions.in>" },
  "gva": { label: "Gray Voice Agent", from: "Gray Voice Agent <newsletter@graysolutions.in>" },
  "magic-trucks": { label: "Magic Trucks", from: "Magic Trucks <newsletter@graysolutions.in>" },
  "gray-neo": { label: "Gray Neo", from: "Gray Neo <newsletter@graysolutions.in>" },
};
const brandLabel = (source: string) => BRANDS[source]?.label ?? "Gray Solutions";
// Single inbox for all inbound alerts (tagged by brand in the subject line).
const ALERT_INBOX = "praveenrs15@gmail.com";

// Origins allowed to POST inbound data into the hub (each brand's site + dev).
const ALLOWED_ORIGINS = new Set([
  "https://graysolutions.in",
  "https://www.graysolutions.in",
  "https://gva.graysolutions.in",
  "https://neo.graysolutions.in",
  "https://magictrucks.in",
  "https://www.magictrucks.in",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
]);

// Best-effort spam guard for public write endpoints. The honeypot catches most
// bots; the in-memory limiter is a soft backstop (serverless is mostly stateless).
const rlHits = new Map<string, { count: number; ts: number }>();
function publicGuard(req: Request, res: Response): boolean {
  // Honeypot field name is deliberately neutral (hp_token) so browser autofill /
  // password managers never fill it — a field named "company_website" was getting
  // autofilled and silently dropping real leads.
  if (typeof req.body?.hp_token === "string" && req.body.hp_token.trim() !== "") {
    // Hidden honeypot field was filled → bot. Pretend success, drop silently.
    res.status(200).json({ ok: true });
    return false;
  }
  const ip =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || req.ip || "unknown";
  const now = Date.now();
  const rec = rlHits.get(ip);
  if (!rec || now - rec.ts > 60_000) {
    rlHits.set(ip, { count: 1, ts: now });
  } else {
    rec.count += 1;
    if (rec.count > 8) {
      res.status(429).json({ error: "Too many requests. Please try again shortly." });
      return false;
    }
  }
  return true;
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // CORS — allow each brand's site to POST inbound data into the hub.
  app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (origin && ALLOWED_ORIGINS.has(origin)) {
      res.header("Access-Control-Allow-Origin", origin);
      res.header("Vary", "Origin");
      res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
      res.header("Access-Control-Allow-Headers", "Content-Type");
      res.header("Access-Control-Allow-Credentials", "true");
    }
    if (req.method === "OPTIONS") return res.sendStatus(204);
    next();
  });

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

  // Newsletter / Waitlist Subscription (any brand)
  app.post("/api/newsletter/subscribe", async (req, res) => {
    if (!publicGuard(req, res)) return;
    try {
      const data = insertNewsletterSchema.parse(req.body);

      let subscriber;
      try {
        subscriber = await storage.subscribeToNewsletter(data);
      } catch (e: any) {
        // Composite-unique violation → already on this brand's list. Treat as success.
        if (String(e?.code) === "23505" || /unique|duplicate/i.test(String(e?.message))) {
          return res.status(200).json({ ok: true, alreadySubscribed: true });
        }
        throw e;
      }

      // Send a brand-appropriate welcome email
      if (resend) {
        const brand = BRANDS[data.source] ?? BRANDS["gray-solutions"];
        const listLabel = data.kind === "waitlist" ? "waitlist" : "newsletter";
        await resend.emails.send({
          from: brand.from,
          to: [subscriber.email],
          subject: `Welcome to ${brand.label}`,
          html: `<h1>Welcome!</h1><p>Thanks for joining the ${brand.label} ${listLabel}. We'll keep you updated.</p>`,
        }).catch(err => console.error("Email failed:", err));
      }

      res.status(201).json(subscriber);
    } catch (error) {
      res.status(400).json({ error: "Invalid email" });
    }
  });

  // Contact Query Submission (any brand)
  app.post("/api/contact/submit", async (req, res) => {
    if (!publicGuard(req, res)) return;
    try {
      const data = insertQuerySchema.parse(req.body);
      const query = await storage.submitQuery(data);

      // Notify admin — one inbox, tagged by brand
      if (resend) {
        const label = brandLabel(data.source);
        await resend.emails.send({
          from: "Gray Solutions <alerts@graysolutions.in>",
          to: [ALERT_INBOX],
          replyTo: query.email,
          subject: `[${label}] New inquiry from ${query.name}`,
          html: `
            <h3>New Contact Submission — ${label}</h3>
            <p><strong>Brand:</strong> ${label}</p>
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

  // ── Public Blog (reads from our own DB; replaces Sanity) ──────────────────
  app.get("/api/posts", async (_req, res) => {
    try {
      const published = await storage.getPublishedPosts();
      res.json(published);
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  });

  app.get("/api/posts/:slug", async (req, res) => {
    try {
      const post = await storage.getPublishedPostBySlug(req.params.slug);
      if (!post) return res.status(404).json({ error: "Post not found" });
      res.json(post);
    } catch (error) {
      console.error("Error fetching post:", error);
      res.status(500).json({ error: "Failed to fetch post" });
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

  // ── Dashboard: overview + notifications ───────────────────────────────────
  app.get("/api/admin/overview", isAdmin, async (_req, res) => {
    try {
      const [stats, activity] = await Promise.all([
        storage.getOverviewStats(),
        storage.getRecentActivity(12),
      ]);
      res.json({ stats, activity });
    } catch (error) {
      console.error("Overview failed:", error);
      res.status(500).json({ error: "Failed to load overview" });
    }
  });

  app.get("/api/admin/notifications/unread", isAdmin, async (req, res) => {
    try {
      const seenAt = (req.user as User).notificationsSeenAt ?? null;
      const count = await storage.getUnreadCount(seenAt);
      res.json({ count });
    } catch {
      res.json({ count: 0 });
    }
  });

  app.post("/api/admin/notifications/seen", isAdmin, async (req, res) => {
    await storage.markNotificationsSeen((req.user as User).id);
    res.json({ ok: true });
  });

  // ── Admin: Blog CRUD ──────────────────────────────────────────────────────
  app.get("/api/admin/posts", isAdmin, async (_req, res) => {
    const posts = await storage.getAllPosts();
    res.json(posts);
  });

  app.get("/api/admin/posts/:id", isAdmin, async (req, res) => {
    const post = await storage.getPostById(Number(req.params.id));
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  });

  app.post("/api/admin/posts", isAdmin, async (req, res) => {
    try {
      const data = upsertPostSchema.parse(req.body);
      const created = await storage.createPost(data);
      res.status(201).json(created);
    } catch (error: any) {
      if (error?.code === "23505") {
        return res.status(409).json({ error: "A post with that slug already exists" });
      }
      console.error("Create post failed:", error);
      res.status(400).json({ error: "Invalid post data" });
    }
  });

  app.put("/api/admin/posts/:id", isAdmin, async (req, res) => {
    try {
      const data = upsertPostSchema.parse(req.body);
      const updated = await storage.updatePost(Number(req.params.id), data);
      if (!updated) return res.status(404).json({ error: "Post not found" });
      res.json(updated);
    } catch (error: any) {
      if (error?.code === "23505") {
        return res.status(409).json({ error: "A post with that slug already exists" });
      }
      console.error("Update post failed:", error);
      res.status(400).json({ error: "Invalid post data" });
    }
  });

  app.delete("/api/admin/posts/:id", isAdmin, async (req, res) => {
    await storage.deletePost(Number(req.params.id));
    res.json({ ok: true });
  });

  // ── Admin: image upload (Vercel Blob; degrades gracefully) ────────────────
  app.post("/api/admin/upload", isAdmin, async (req, res) => {
    try {
      const filename = (req.query.filename as string) || `upload-${Date.now()}`;
      if (!process.env.BLOB_READ_WRITE_TOKEN) {
        return res.status(501).json({
          error: "Image upload isn't configured. Add a BLOB_READ_WRITE_TOKEN, or paste an image URL instead.",
        });
      }
      // Buffer the raw request body (binary upload).
      const chunks: Buffer[] = [];
      for await (const chunk of req) chunks.push(chunk as Buffer);
      const buffer = Buffer.concat(chunks);
      if (buffer.length === 0) return res.status(400).json({ error: "Empty file" });

      const { put } = await import("@vercel/blob");
      const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, "-");
      const blob = await put(`blog/${Date.now()}-${safeName}`, buffer, {
        access: "public",
        token: process.env.BLOB_READ_WRITE_TOKEN,
        contentType: (req.headers["content-type"] as string) || "application/octet-stream",
      });
      res.json({ url: blob.url });
    } catch (error) {
      console.error("Upload failed:", error);
      res.status(500).json({ error: "Upload failed. You can paste an image URL instead." });
    }
  });

  // ── Admin: change password ────────────────────────────────────────────────
  app.post("/api/admin/change-password", isAdmin, async (req, res) => {
    try {
      const { newPassword } = req.body ?? {};
      if (!newPassword || typeof newPassword !== "string" || newPassword.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters" });
      }
      const hashed = await hashPassword(newPassword);
      await storage.updateUserPassword((req.user as User).id, hashed);
      res.json({ ok: true });
    } catch (error) {
      console.error("Change password failed:", error);
      res.status(500).json({ error: "Failed to change password" });
    }
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
      const { subject, content, source } = req.body;
      if (!subject || !content) {
        return res.status(400).json({ error: "Subject and content are required" });
      }

      const targetBrand = source && BRANDS[source] ? BRANDS[source] : null;
      console.log(`[Newsletter] Starting broadcast: "${subject}" → ${targetBrand ? targetBrand.label : "ALL brands"}`);

      const allSubscribers = await storage.getAllSubscribers();
      const subscribers = targetBrand ? allSubscribers.filter(s => s.source === source) : allSubscribers;
      const emails = subscribers.map(s => s.email);

      console.log(`[Newsletter] Found ${emails.length} subscribers`);

      if (emails.length === 0) {
        return res.status(200).json({ message: "No subscribers to send to" });
      }

      if (!resend) {
        console.error("[Newsletter] Resend not configured. Check RESEND_API_KEY in .env");
        return res.status(500).json({ error: "Newsletter service not configured on server" });
      }

      const brandName = targetBrand ? targetBrand.label : "Gray Solutions";
      const fromAddress = targetBrand ? targetBrand.from : BRANDS["gray-solutions"].from;

      // Wrap content in a simple professional template
      const htmlTemplate = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a; line-height: 1.6;">
          <div style="padding: 40px 0; border-bottom: 1px solid #f0f0f0;">
            <h2 style="margin: 0; font-size: 24px; font-weight: bold;">${brandName}</h2>
          </div>
          <div style="padding: 40px 0;">
            ${content.replace(/\n/g, '<br/>')}
          </div>
          <div style="padding: 40px 0; border-top: 1px solid #f0f0f0; font-size: 12px; color: #999;">
            <p>© ${new Date().getFullYear()} ${brandName}. All rights reserved.</p>
            <p>You are receiving this because you subscribed to our newsletter.</p>
          </div>
        </div>
      `;

      console.log("[Newsletter] Sending via Resend...");
      const result = await resend.emails.send({
        from: fromAddress,
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
