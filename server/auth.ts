import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import { storage } from "./storage";
import { type User as SelectUser } from "@shared/schema";
import crypto from "crypto";
import { promisify } from "util";

const scrypt = promisify(crypto.scrypt);

export async function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = (await scrypt(password, salt, 64)) as Buffer;
  return `${derivedKey.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scrypt(supplied, salt, 64)) as Buffer;
  return crypto.timingSafeEqual(hashedBuf, suppliedBuf);
}

export function setupAuth(app: Express) {
  // SESSION_SECRET must be set in production (Vercel env). The fallback only
  // exists so local dev works without a .env — never rely on it live.
  const sessionSecret = process.env.SESSION_SECRET || "gray-solutions-secret-8877";
  if (process.env.NODE_ENV === "production" && !process.env.SESSION_SECRET) {
    console.warn("[auth] SESSION_SECRET is not set — using the insecure dev fallback.");
  }
  const sessionSettings: session.SessionOptions = {
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: storage.sessionStore,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  };

  if (app.get("env") === "production") {
    app.set("trust proxy", 1);
  }

  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user || !(await comparePasswords(password, user.password))) {
          return done(null, false, { message: "Invalid username or password" });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }),
  );

  passport.serializeUser((user, done) => done(null, (user as SelectUser).id));
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  // Auth Routes
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.json(req.user);
  });

  app.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });

  app.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    res.json(req.user);
  });
}

// Helper to seed the initial admin user if not exists
export async function seedAdminUser() {
  // Override via ADMIN_INITIAL_PASSWORD in production, and rotate from the
  // dashboard (/admin → change password) right after the first deploy.
  const adminUsername = "Gray Solutions";
  const adminPassword = process.env.ADMIN_INITIAL_PASSWORD || "Gray@Solutions";
  
  const existing = await storage.getUserByUsername(adminUsername);
  if (!existing) {
    const hashedPassword = await hashPassword(adminPassword);
    await storage.createUser({
      username: adminUsername,
      password: hashedPassword,
      isAdmin: true,
    });
    console.log("Admin user created successfully.");
  }
}
