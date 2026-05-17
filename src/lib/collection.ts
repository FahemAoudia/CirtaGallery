import { ANTIQUE_IMG } from "@/lib/antique-images";

export type CatalogItem = {
  id: string;
  title: string;
  /** Petit récit (aperçu + « voir plus ») — optionnel si catalogue statique. */
  histoire?: string;
  period: string;
  origin: string;
  medium: string;
  /** Profondeur (texte vitrine), optionnel. */
  depth?: string;
  /** Poids (texte vitrine), optionnel. */
  weight?: string;
  image: string;
  width: number;
  height: number;
  ribbon: string;
  facets: string[];
  /** Prix catalogue en CAD (dollar canadien) */
  priceCad: number;
};

export const ribbonLabels: { id: string; label: string }[] = [
  { id: "all", label: "Tout voir" },
  { id: "sculptures-mobilier", label: "Sculptures & mobilier" },
  { id: "tableaux", label: "Tableaux & peinture" },
  { id: "porcelaine-cristal", label: "Porcelaine & cristal" },
  { id: "lampes-vases", label: "Lampes & vases" },
  { id: "bijoux-montres-monnaie", label: "Bijoux, montres & monnaies" },
];

export const sidebarFacets: { id: string; label: string }[] = [
  { id: "tout", label: "Toutes les familles" },
  { id: "bronze", label: "Bronze" },
  { id: "peintures", label: "Peintures" },
  { id: "porcelaines", label: "Porcelaines" },
  { id: "cristal", label: "Cristal" },
  { id: "bijoux-montres", label: "Bijoux & montres" },
  { id: "monnaie", label: "Monnaie ancienne" },
  { id: "figurine", label: "Figurines" },
  { id: "art-manuscrits", label: "Art & manuscrits" },
];

export const collection: CatalogItem[] = [
  {
    id: "CG-01",
    title: "Vase en porcelaine bleu et blanc — paysage lacustre",
    period: "Fin XIXᵉ siècle (style Ming)",
    origin: "Export chinois · Canton",
    medium: "Porcelaine, cobalt sous couverte",
    image: ANTIQUE_IMG.cg01,
    width: 880,
    height: 1100,
    ribbon: "porcelaine-cristal",
    facets: ["porcelaines"],
    priceCad: 1180,
  },
  {
    id: "CG-02",
    title: "Statuette de Maitreya en bronze doré",
    period: "XVIIIᵉ – XIXᵉ siècle",
    origin: "Atelier himalayen",
    medium: "Bronze doré, polychromie minérale",
    image: ANTIQUE_IMG.cg02,
    width: 880,
    height: 1100,
    ribbon: "sculptures-mobilier",
    facets: ["bronze", "figurine"],
    priceCad: 2495,
  },
  {
    id: "CG-03",
    title: "Détail sculpté — serres de dragon sur base ouvragée",
    period: "Époque République",
    origin: "Chine du Sud",
    medium: "Pierre et bronze à patine verte",
    image: ANTIQUE_IMG.cg03,
    width: 880,
    height: 990,
    ribbon: "sculptures-mobilier",
    facets: ["bronze", "figurine"],
    priceCad: 920,
  },
  {
    id: "CG-04",
    title: "Vase à décor équin — céramique de cabinet",
    period: "Collection ancienne",
    origin: "Réseau marchand Pékin · Shanghai",
    medium: "Glaçure, cobalt, dessin au trait",
    image: ANTIQUE_IMG.cg04,
    width: 880,
    height: 880,
    ribbon: "porcelaine-cristal",
    facets: ["porcelaines", "figurine"],
    priceCad: 865,
  },
  {
    id: "CG-05",
    title: "Santo en bois polychrome — art populaire novohispano",
    period: "XVIIIᵉ siècle",
    origin: "Mexique central",
    medium: "Bois de sapin doré, estofado",
    image: ANTIQUE_IMG.cg05,
    width: 880,
    height: 1100,
    ribbon: "sculptures-mobilier",
    facets: ["figurine", "peintures"],
    priceCad: 1320,
  },
  {
    id: "CG-06",
    title: "Buste d’accent espagnol — l’âge d’or ibérique",
    period: "XVIIᵉ siècle (atelier)",
    origin: "Tolède · Valence",
    medium: "Bois sculpté, rehauts métalliques",
    image: ANTIQUE_IMG.cg06,
    width: 880,
    height: 1100,
    ribbon: "sculptures-mobilier",
    facets: ["figurine"],
    priceCad: 1780,
  },
  {
    id: "CG-07",
    title: "Lot de plus de vingt monnaies classiques",
    period: "Iᵉʳ – IVᵉ siècle ap. J.-C.",
    origin: "Proximité Méditerranée",
    medium: "Argent, bronze",
    image: ANTIQUE_IMG.cg07,
    width: 880,
    height: 990,
    ribbon: "bijoux-montres-monnaie",
    facets: ["monnaie"],
    priceCad: 445,
  },
  {
    id: "CG-08",
    title: "Lustre à pampilles — bronze et verre taillé",
    period: "circa 1895",
    origin: "Bohême · monture parisienne",
    medium: "Laiton, pendeloques — esprit Second Empire",
    image: ANTIQUE_IMG.cg08,
    width: 880,
    height: 1100,
    ribbon: "lampes-vases",
    facets: ["cristal"],
    priceCad: 2890,
  },
  {
    id: "CG-09",
    title: "Huile sur panneau — cabinet de voyage",
    period: "Première moitié du XVIIIᵉ siècle",
    origin: "École espagnole",
    medium: "Huile, bois de chêne",
    image: ANTIQUE_IMG.cg09,
    width: 880,
    height: 700,
    ribbon: "tableaux",
    facets: ["peintures"],
    priceCad: 3250,
  },
  {
    id: "CG-10",
    title: "Coran de cabinet — marges enluminées",
    period: "XVIIIᵉ siècle",
    origin: "Maghreb",
    medium: "Encre, or végétal, papier à la main",
    image: ANTIQUE_IMG.cg10,
    width: 880,
    height: 1100,
    ribbon: "tableaux",
    facets: ["art-manuscrits"],
    priceCad: 2100,
  },
  {
    id: "CG-11",
    title: "Parure de mariage — argent et corail méditerranéen",
    period: "Premier tiers du XXᵉ siècle",
    origin: "Kabylie · Constantine",
    medium: "Argent, corail, émail",
    image: ANTIQUE_IMG.cg11,
    width: 880,
    height: 990,
    ribbon: "bijoux-montres-monnaie",
    facets: ["bijoux-montres"],
    priceCad: 795,
  },
  {
    id: "CG-12",
    title: "Vase irisé — glaçure flammée Art nouveau",
    period: "circa 1900",
    origin: "École de Loire",
    medium: "Grès émaillé, lustre métallique",
    image: ANTIQUE_IMG.cg12,
    width: 880,
    height: 1100,
    ribbon: "lampes-vases",
    facets: ["porcelaines"],
    priceCad: 675,
  },
];

export type FeaturedPiece = {
  id: string;
  catalogRef: string;
  title: string;
  description: string;
  meta: string;
  image: string;
  width: number;
  height: number;
};

export const featuredPieces: FeaturedPiece[] = [
  {
    id: "sf-1",
    catalogRef: "Planche I — Route de la soie",
    title: "Ensemble de jarres — porcelaine bleu et couleur",
    description:
      "Des rangées de jarres où le bleu de cobalt dialogue avec les couleurs d’export : chaque pièce accuse son feu, son vide, la répétition hypnotique du décor.",
    image: ANTIQUE_IMG.featVasesShelf,
    width: 1200,
    height: 1500,
    meta: "Porcelaine · Chine du Sud · XIXᵉ siècle",
  },
  {
    id: "sf-2",
    catalogRef: "Planche II — Asile de bronze",
    title: "Bouddha en méditation (bhumisparsha)",
    description:
      "Les doigts effleurent la terre en témoignage. La patine, sombre et onctueuse, révèle des siècles de fumée d’encens et de mains pieuses — une présence silencieuse digne d’un mur de musée.",
    image: ANTIQUE_IMG.featBuddha,
    width: 1200,
    height: 1350,
    meta: "Alliage doré, fonte · figurine de dévotion",
  },
  {
    id: "sf-3",
    catalogRef: "Planche III — Numismatique",
    title: "Monnaie argentée — portrait et légende",
    description:
      "Un portrait frappé dans le métal : l’iconographie impériale, la patine des fouilles, le contour usé par des siècles de mains. La monnaie devient miniature d’histoire.",
    image: ANTIQUE_IMG.featCoin,
    width: 1200,
    height: 900,
    meta: "Argent · atelier méditerranéen · antiquité classique",
  },
];
