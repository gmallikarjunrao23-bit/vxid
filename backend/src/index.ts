import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import contactRoutes from "./routes/contact";
import authRoutes from "./routes/auth";
import adminRoutes from "./routes/admin";
import { prisma } from "./lib/prisma";

// Railway managed Postgres auto-injects POSTGRES_URL into every service.
// Alias it to DATABASE_URL so any code (and the Prisma CLI) that reads
// DATABASE_URL gets a valid postgresql:// connection string.
if (process.env.POSTGRES_URL) {
  process.env.DATABASE_URL = process.env.POSTGRES_URL;
}

const app = express();
const PORT = Number(process.env.PORT) || 8080;
const NODE_ENV = process.env.NODE_ENV || "development";
const FRONTEND_URL = process.env.FRONTEND_URL;

/* ---------------- Security & body parsing ---------------- */
app.use(helmet());

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow same-origin (Railway health checks, server-to-server)
      if (!origin) return callback(null, true);
      if (NODE_ENV === "production") {
        if (!FRONTEND_URL) {
          console.warn("[CORS] FRONTEND_URL not set — allowing all origins in dev fallback.");
          return callback(null, true);
        }
        const allowed = FRONTEND_URL.split(",").map((o) => o.trim().replace(/\/$/, ""));
        if (allowed.includes(origin)) return callback(null, true);
        return callback(new Error("Not allowed by CORS"));
      }
      // Dev: allow all
      callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

/* ---------------- Health ---------------- */
app.get("/api/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok", service: "vxid-backend" });
});

/* ---------------- Routes ---------------- */
app.use("/api/contact", contactRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

/* ---------------- 404 ---------------- */
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found." });
});

/* ---------------- Global error handler ---------------- */
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error("[UNHANDLED]", err);
  const message =
    err instanceof Error ? err.message : "Internal server error.";
  const corsError =
    err instanceof Error && err.message === "Not allowed by CORS";
  res.status(corsError ? 403 : 500).json({
    error: corsError ? "Origin not allowed." : message,
  });
});

/* ---------------- Start ---------------- */
async function start(): Promise<void> {
  try {
    await prisma.$connect();
    console.log("✓ Prisma connected");
  } catch (err) {
    // Don't crash — Prisma connects lazily on first query, and the health
    // endpoint must stay available for Railway even before the DB is ready.
    console.warn("⚠ Prisma initial connect failed (will retry lazily):", err);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`✓ VXID backend running on port ${PORT} (${NODE_ENV})`);
  });
}

start();

/* Graceful shutdown */
process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

export default app;
