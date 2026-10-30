import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../lib/jwt";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      admin?: { id: string; email: string };
    }
  }
}

/**
 * JWT auth middleware. Validates the Authorization Bearer token and
 * attaches the admin payload to the request. Returns 401 on failure.
 */
export function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    res.status(401).json({ error: "Authentication required." });
    return;
  }

  const token = header.slice(7);
  const payload = verifyToken(token);

  if (!payload) {
    res.status(401).json({ error: "Invalid or expired token." });
    return;
  }

  req.admin = { id: payload.adminId, email: payload.email };
  next();
}
