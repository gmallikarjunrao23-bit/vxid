import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main(): Promise<void> {
  const email = process.env.ADMIN_SEED_EMAIL || "admin@vxid.studio";
  const password = process.env.ADMIN_SEED_PASSWORD || "change-this-password";

  const hashed = await bcrypt.hash(password, 12);

  const admin = await prisma.admin.upsert({
    where: { email },
    update: { password: hashed },
    create: { email, password: hashed },
  });

  console.log(`✓ Admin seeded: ${admin.email}`);
}

main()
  .catch((err: unknown) => {
    console.error("Seed failed:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
