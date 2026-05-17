/**
 * Crée ou met à jour le compte admin sur la base distante (Neon / Vercel).
 *
 * Usage (PowerShell) :
 *   $env:DATABASE_URL = "<POSTGRES_PRISMA_URL depuis Vercel Storage>"
 *   $env:ADMIN_EMAIL = "visionaffaire1@gmail.com"
 *   $env:ADMIN_PASSWORD = "votre-mot-de-passe"
 *   npm run admin:sync
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const dbUrl =
  process.env.DATABASE_URL ??
  process.env.STORAGE_POSTGRES_PRISMA_URL ??
  process.env.POSTGRES_PRISMA_URL;

if (!dbUrl || !dbUrl.startsWith("postgres")) {
  console.error(
    "\n❌ DATABASE_URL doit être l’URL PostgreSQL Neon (POSTGRES_PRISMA_URL).\n" +
      "   Vercel → Storage → Neon → copiez POSTGRES_PRISMA_URL dans DATABASE_URL.\n",
  );
  process.exit(1);
}

const adminEmail =
  process.env.ADMIN_EMAIL?.trim().toLowerCase() || "visionaffaire1@gmail.com";
const adminPassword = process.env.ADMIN_PASSWORD?.trim();

if (!adminPassword) {
  console.error("\n❌ ADMIN_PASSWORD est vide. Définissez-le dans .env ou en variable.\n");
  process.exit(1);
}

const prisma = new PrismaClient({ datasources: { db: { url: dbUrl } } });

async function main() {
  const hash = await bcrypt.hash(adminPassword, 12);
  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    create: { email: adminEmail, passwordHash: hash, role: "ADMIN" },
    update: { passwordHash: hash, role: "ADMIN" },
  });
  console.log(`\n✓ Admin synchronisé : ${adminEmail}`);
  console.log("  Utilisez ce courriel et ADMIN_PASSWORD sur https://cirta-gallery.vercel.app/admin/login\n");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
