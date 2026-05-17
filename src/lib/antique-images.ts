/**
 * روابط صور تحف أثرية — معرّفات Unsplash كاملة (متحقق من استجابة 200).
 * قوالب الصور: مزهريات، برونز، تنين، تماثيل صغيرة، عملات، ثريا، مخطوطات، مجوهرات.
 */
export const ANTIQUE_IMG = {
  cg01: "https://images.unsplash.com/photo-1723779232054-6f6be572c0e8?w=880&q=85",
  cg02: "https://images.unsplash.com/photo-1625888593861-8c7493a26025?w=880&q=85",
  cg03: "https://images.unsplash.com/photo-1771775751146-d212a34fbca3?w=880&q=85",
  cg04: "https://images.unsplash.com/photo-1695902047073-796e00ccd35f?w=880&q=85",
  cg05: "https://images.unsplash.com/photo-1636828061084-980a20322278?w=880&q=85",
  cg06: "https://images.unsplash.com/photo-1673707180677-6e3605339daa?w=880&q=85",
  cg07: "https://images.unsplash.com/photo-1672945690877-5307346cde57?w=880&q=85",
  cg08: "https://images.unsplash.com/photo-1559032567-22480305e243?w=880&q=85",
  cg09: "https://images.unsplash.com/photo-1746897785355-dc4dc612bd66?w=880&q=85",
  cg10: "https://images.unsplash.com/photo-1763225037262-75d0cb46f9c2?w=880&q=85",
  cg11: "https://images.unsplash.com/photo-1719862056472-1e4d4c10d50c?w=880&q=85",
  cg12: "https://images.unsplash.com/photo-1770354227580-1d354a258575?w=880&q=85",
  featVasesShelf: "https://images.unsplash.com/photo-1761472012793-ecf26c1c7396?w=1200&q=85",
  featBuddha: "https://images.unsplash.com/photo-1544592218-b546f7b9ddb4?w=1200&q=85",
  featCoin: "https://images.unsplash.com/photo-1718140245037-8d02a29e425e?w=1200&q=85",
  heroBuddha: "https://images.unsplash.com/photo-1625888593861-8c7493a26025?w=1400&q=85",
  heroJar: "https://images.unsplash.com/photo-1723779232101-19167d4b6e00?w=640&q=85",
  heroCoins: "https://images.unsplash.com/photo-1718140245037-8d02a29e425e?w=640&q=85",
  aboutShelves: "https://images.unsplash.com/photo-1761472012793-ecf26c1c7396?w=900&q=85",
  aboutDragonBronze: "https://images.unsplash.com/photo-1758092320154-d6c61f322e17?w=700&q=85",
  aboutMask: "https://images.unsplash.com/photo-1612531759929-def82504c0ca?w=700&q=85",
} as const;

/**
 * Vignettes hero « Notre collection » — mêmes domaines Unsplash que le reste du site
 * (évite les images cassées) ; choix thématiques par rayon.
 */
const RIBBON_TEASER_FALLBACK = [
  ANTIQUE_IMG.cg04,
  ANTIQUE_IMG.cg06,
  ANTIQUE_IMG.cg09,
  ANTIQUE_IMG.cg11,
] as const;

const RIBBON_TEASER_BY_ID: Record<string, string> = {
  "sculptures-mobilier": ANTIQUE_IMG.cg03,
  tableaux: ANTIQUE_IMG.cg12,
  "porcelaine-cristal": ANTIQUE_IMG.cg01,
  "lampes-vases": ANTIQUE_IMG.cg08,
  "bijoux-montres-monnaie": ANTIQUE_IMG.featCoin,
};

export function imageUrlForRibbonTeaser(ribbonId: string, index: number): string {
  const mapped = RIBBON_TEASER_BY_ID[ribbonId];
  if (mapped) return mapped;
  const i = index % RIBBON_TEASER_FALLBACK.length;
  return RIBBON_TEASER_FALLBACK[i]!;
}
