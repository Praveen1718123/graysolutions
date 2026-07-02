/**
 * Vercel Serverless entry — the Express API.
 *
 * This file is bundled by esbuild into `api/index.js` (a single self-contained
 * file) so the Vercel function has no unresolved relative/alias imports at
 * runtime. Do NOT place this in /api directly — Vercel would compile it per-file
 * and the extensionless ESM imports (`./routes`) would fail at runtime.
 */
import "dotenv/config";
import { createServer } from "http";
import express from "express";
import helmet from "helmet";
import compression from "compression";
import ws from "ws";
import { registerRoutes } from "./routes";
import { setupAuth, seedAdminUser } from "./auth";

// Configure WebSocket for the Neon serverless driver
if (!globalThis.WebSocket) {
  globalThis.WebSocket = ws as any;
}

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Auth (sessions + passport)
setupAuth(app);

// Seed admin on cold start (idempotent)
seedAdminUser().catch(() => {});

// API routes — pass an http.Server wrapping our app (routes.ts just returns it)
const httpServer = createServer(app);
registerRoutes(httpServer, app).catch(() => {});

export default app;
