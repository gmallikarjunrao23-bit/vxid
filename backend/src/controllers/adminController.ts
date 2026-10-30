import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

/** List submissions with pagination, search, and ordering. */
export async function listSubmissions(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const page = Math.max(1, parseInt(req.query.page as string, 10) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit as string, 10) || 10));
    const search = (req.query.search as string || "").trim();
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" as const } },
            { email: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {};

    const [data, total] = await Promise.all([
      prisma.contactSubmission.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.contactSubmission.count({ where }),
    ]);

    res.status(200).json({
      data,
      total,
      page,
      limit,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    });
  } catch (err) {
    console.error("[ADMIN] List error:", err);
    res.status(500).json({ error: "Failed to load submissions." });
  }
}

/** Fetch a single submission. */
export async function getSubmission(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { id } = req.params;
    const submission = await prisma.contactSubmission.findUnique({ where: { id } });

    if (!submission) {
      res.status(404).json({ error: "Submission not found." });
      return;
    }

    res.status(200).json(submission);
  } catch (err) {
    console.error("[ADMIN] Get error:", err);
    res.status(500).json({ error: "Failed to load submission." });
  }
}

/** Mark a submission as read. */
export async function markAsRead(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { id } = req.params;
    const updated = await prisma.contactSubmission.update({
      where: { id },
      data: { isRead: true },
    });

    res.status(200).json(updated);
  } catch (err) {
    console.error("[ADMIN] Mark-read error:", err);
    const isNotFound =
      err && typeof err === "object" && "code" in err && (err as { code: string }).code === "P2025";
    res.status(isNotFound ? 404 : 500).json({
      error: isNotFound ? "Submission not found." : "Failed to update submission."
    });
  }
}

/** Delete a submission. */
export async function deleteSubmission(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { id } = req.params;
    await prisma.contactSubmission.delete({ where: { id } });
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("[ADMIN] Delete error:", err);
    const isNotFound =
      err && typeof err === "object" && "code" in err && (err as { code: string }).code === "P2025";
    res.status(isNotFound ? 404 : 500).json({
      error: isNotFound ? "Submission not found." : "Failed to delete submission."
    });
  }
}

/** Aggregate stats for the dashboard. */
export async function getStats(req: Request, res: Response): Promise<void> {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [total, unread, thisMonth] = await Promise.all([
      prisma.contactSubmission.count(),
      prisma.contactSubmission.count({ where: { isRead: false } }),
      prisma.contactSubmission.count({ where: { createdAt: { gte: startOfMonth } } }),
    ]);

    res.status(200).json({ total, unread, thisMonth });
  } catch (err) {
    console.error("[ADMIN] Stats error:", err);
    res.status(500).json({ error: "Failed to load stats." });
  }
}
