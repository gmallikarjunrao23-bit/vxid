import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error(
    "JWT_SECRET is not set. Generate one with: openssl rand -base64 48"
  );
}

export interface JwtPayload {
  adminId: string;
  email: string;
}

/**
 * Sign a JWT. The secret is guaranteed to exist at runtime because the
 * module throws during load if it is missing (see guard above); the non-null
 * assertion is therefore safe.
 */
export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET as string, { expiresIn: "7d" });
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET as string);
    if (typeof decoded === "string") return null;
    return decoded as JwtPayload;
  } catch {
    return null;
  }
}
