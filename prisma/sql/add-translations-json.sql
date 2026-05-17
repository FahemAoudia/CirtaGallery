-- Colonnes traduction auto (EN/ES/ZH). Exécuter une fois sur Neon (SQL Editor) si `prisma db push` n’a pas accès à la DB.
ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS "translationsJson" TEXT NOT NULL DEFAULT '{}';
ALTER TABLE "Facet" ADD COLUMN IF NOT EXISTS "translationsJson" TEXT NOT NULL DEFAULT '{}';
ALTER TABLE "Ribbon" ADD COLUMN IF NOT EXISTS "translationsJson" TEXT NOT NULL DEFAULT '{}';
ALTER TABLE "FeaturedPiece" ADD COLUMN IF NOT EXISTS "translationsJson" TEXT NOT NULL DEFAULT '{}';
ALTER TABLE "FaqChatEntry" ADD COLUMN IF NOT EXISTS "translationsJson" TEXT NOT NULL DEFAULT '{}';
