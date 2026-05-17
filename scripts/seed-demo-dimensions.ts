import { PrismaClient } from "@prisma/client";

const dbUrl =
  process.env.DATABASE_URL ??
  process.env.STORAGE_POSTGRES_PRISMA_URL ??
  process.env.POSTGRES_PRISMA_URL ??
  process.env.STORAGE_DATABASE_URL ??
  process.env.POSTGRES_URL;

if (!dbUrl?.startsWith("postgresql://") && !dbUrl?.startsWith("postgres://")) {
  console.error(
    "DATABASE_URL invalide ou absente. Définissez une URL PostgreSQL dans .env puis relancez.",
  );
  process.exit(1);
}

const prisma = new PrismaClient({ datasources: { db: { url: dbUrl } } });

/** Valeurs de démonstration pour prévisualiser la grille dimensions. */
const DEMO = [
  { sku: "CG-01", depth: "18 cm", weight: "1,2 kg", hauteur: "32 cm" },
  { sku: "CG-02", depth: "14 cm", weight: "2,8 kg", hauteur: "28 cm" },
  { sku: "CG-03", depth: "22 cm", weight: "4,1 kg", hauteur: "19 cm" },
  { sku: "CG-04", depth: "16 cm", weight: "0,9 kg", hauteur: "24 cm" },
  { sku: "CG-05", depth: "12 cm", weight: "1,6 kg", hauteur: "41 cm" },
  { sku: "CG-06", depth: "20 cm", weight: "3,2 kg", hauteur: "36 cm" },
] as const;

async function main() {
  for (const row of DEMO) {
    const updated = await prisma.product.updateMany({
      where: { sku: row.sku },
      data: {
        depth: row.depth,
        weight: row.weight,
        hauteur: row.hauteur,
      },
    });
    if (updated.count === 0) {
      console.warn(`SKU introuvable: ${row.sku}`);
    } else {
      console.log(`OK ${row.sku} → ${row.depth} | ${row.weight} | ${row.hauteur}`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
