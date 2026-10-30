import { Request, Response } from "express";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";
import { signToken } from "../lib/jwt";

const loginSchema = z.object({
  email: z.string().email("A valid email is required."),
  password: z.string().min(1, "Password is required."),
});

export async function handleLogin(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const parsed = loginSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(422).json({ error: "Invalid credentials." });
      return;
    }

    const { email, password } = parsed.data;

    const admin = await prisma.admin.findUnique({ where: { email } });

    if (!admin) {
      // Same message to avoid user enumeration
      res.status(401).json({ error: "Invalid email or password." });
      return;
    }

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) {
      res.status(401).json({ error: "Invalid email or password." });
      return;
    }

    const token = signToken({ adminId: admin.id, email: admin.email });

    res.status(200).json({
      token,
      admin: { id: admin.id, email: admin.email },
    });
  } catch (err) {
    console.error("[AUTH] Login error:", err);
    res.status(500).json({ error: "Login failed." });
  }
}
