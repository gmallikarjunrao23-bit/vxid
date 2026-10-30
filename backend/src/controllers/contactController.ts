import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { sendContactNotification } from "../lib/mailer";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required.").max(100),
  email: z.string().email("A valid email is required."),
  budget: z
    .string()
    .min(1)
    .refine(
      (v) =>
        ["<$5k", "$5k-$15k", "$15k-$50k", "$50k+"].includes(v),
      "Invalid budget value."
    ),
  projectType: z
    .string()
    .min(1)
    .refine(
      (v) => ["Website", "Mobile App", "Branding", "Other"].includes(v),
      "Invalid project type."
    ),
  message: z.string().min(10, "Message must be at least 10 characters.").max(5000),
});

export async function handleContact(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const parsed = contactSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(422).json({
        error: "Validation failed.",
        details: parsed.error.flatten().fieldErrors,
      });
      return;
    }

    const data = parsed.data;

    const submission = await prisma.contactSubmission.create({
      data,
    });

    // Fire-and-forget email (don't block response on SMTP latency)
    sendContactNotification(data).catch((err: unknown) => {
      console.error("[MAILER] Notification send failed:", err);
    });

    res.status(201).json({
      success: true,
      message: "Your message has been received. We'll be in touch within 24 hours.",
      id: submission.id,
    });
  } catch (err) {
    console.error("[CONTACT] Error:", err);
    res.status(500).json({ error: "Failed to submit message." });
  }
}
