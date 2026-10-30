import { PrismaClient } from "@prisma/client";

/**
 * Singleton Prisma client to avoid exhausting connections during hot reload.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // Railway managed Postgres auto-injects POSTGRES_URL into every service;
    // use it directly so we never depend on a literal "$POSTGRES_URL" string.
    datasourceUrl: process.env.POSTGRES_URL || process.env.DATABASE_URL,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
