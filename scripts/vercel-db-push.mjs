import { execSync } from "node:child_process";

const url =
  process.env.DATABASE_URL ??
  process.env.STORAGE_POSTGRES_PRISMA_URL ??
  process.env.POSTGRES_PRISMA_URL ??
  process.env.STORAGE_DATABASE_URL ??
  process.env.POSTGRES_URL;

if (!url?.startsWith("postgres")) {
  console.log("[vercel-db-push] Pas d’URL PostgreSQL — colonnes i18n déjà à jour ou DB liée au runtime.");
  process.exit(0);
}

process.env.DATABASE_URL = url;
console.log("[vercel-db-push] Application du schéma Prisma sur Neon…");
execSync("npx prisma db push --skip-generate", { stdio: "inherit" });
