import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

/** Neon sur Vercel expose souvent STORAGE_POSTGRES_PRISMA_URL ; Prisma lit DATABASE_URL. */
function databaseUrl(): string | undefined {
  return (
    process.env.DATABASE_URL ??
    process.env.STORAGE_POSTGRES_PRISMA_URL ??
    process.env.POSTGRES_PRISMA_URL ??
    process.env.STORAGE_DATABASE_URL ??
    process.env.POSTGRES_URL
  );
}

const url = databaseUrl();

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient(
    url
      ? {
          datasources: {
            db: { url },
          },
        }
      : undefined,
  );

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
