import {
  collection as staticCollection,
  featuredPieces as staticFeatured,
  ribbonLabels as staticRibbons,
  sidebarFacets as staticFacets,
  type CatalogItem,
  type FeaturedPiece,
} from "@/lib/collection";
import { defaultHomeSections, type HomeSectionRow } from "@/lib/home-sections";
import { prisma } from "@/lib/prisma";

export type RibbonRow = { id: string; label: string; teaserImage?: string };
export type FacetRow = { id: string; label: string };

function mapProduct(p: {
  sku: string;
  title: string;
  histoire: string;
  period: string;
  origin: string;
  medium: string;
  depth: string;
  weight: string;
  image: string;
  width: number;
  height: number;
  ribbonKey: string;
  facetsJson: string;
  priceCad: number;
}): CatalogItem {
  let facets: string[] = [];
  try {
    const parsed = JSON.parse(p.facetsJson) as unknown;
    if (Array.isArray(parsed)) {
      facets = parsed.filter((x): x is string => typeof x === "string");
    }
  } catch {
    facets = [];
  }
  return {
    id: p.sku,
    title: p.title,
    histoire: p.histoire?.trim() ? p.histoire.trim() : undefined,
    period: p.period,
    origin: p.origin,
    medium: p.medium,
    depth: p.depth?.trim() || undefined,
    weight: p.weight?.trim() || undefined,
    image: p.image,
    width: p.width,
    height: p.height,
    ribbon: p.ribbonKey,
    facets,
    priceCad: p.priceCad,
  };
}

async function fromDb(): Promise<{
  ribbons: RibbonRow[];
  facets: FacetRow[];
  products: CatalogItem[];
  featured: FeaturedPiece[];
  settings: Record<string, string>;
  homeSections: HomeSectionRow[];
} | null> {
  const count = await prisma.product.count();
  if (count === 0) return null;

  const [ribbons, facets, products, featured, siteRows, homeRows] = await Promise.all([
    prisma.ribbon.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.facet.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.product.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.featuredPiece.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.siteSetting.findMany(),
    prisma.homeSection.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  const settings: Record<string, string> = {};
  for (const row of siteRows) {
    settings[row.key] = row.value;
  }

  const homeSections: HomeSectionRow[] =
    homeRows.length > 0
      ? homeRows.map((h) => ({
          id: h.id,
          sectionKey: h.sectionKey,
          label: h.label,
          sortOrder: h.sortOrder,
          enabled: h.enabled,
        }))
      : defaultHomeSections();

  return {
    ribbons: ribbons.map((r) => ({
      id: r.id,
      label: r.label,
      teaserImage: r.teaserImage?.trim() || undefined,
    })),
    facets: facets.map((f) => ({ id: f.id, label: f.label })),
    products: products.map(mapProduct),
    featured: featured.map((f) => ({
      id: f.id,
      catalogRef: f.catalogRef,
      title: f.title,
      description: f.description,
      meta: f.meta,
      image: f.image,
      width: f.width,
      height: f.height,
    })),
    settings,
    homeSections,
  };
}

/** Public home payload: DB when seeded, else static `collection.ts`. */
export async function getHomeData() {
  try {
    const db = await fromDb();
    if (db) {
      return {
        ribbonLabels: db.ribbons,
        sidebarFacets: db.facets,
        collection: db.products,
        featuredPieces: db.featured,
        settings: db.settings,
        homeSections: db.homeSections,
        source: "db" as const,
      };
    }
  } catch {
    /* SQLite missing / first boot */
  }

  const settings: Record<string, string> = {};
  return {
    ribbonLabels: staticRibbons.map((r) => ({ id: r.id, label: r.label })),
    sidebarFacets: staticFacets.map((f) => ({ id: f.id, label: f.label })),
    collection: staticCollection,
    featuredPieces: staticFeatured.slice() as FeaturedPiece[],
    settings,
    homeSections: defaultHomeSections(),
    source: "static" as const,
  };
}

export function ribbonIdsForNormalize(ribbons: RibbonRow[]): string[] {
  return ribbons.map((r) => r.id);
}

export function facetIdsForNormalize(facets: FacetRow[]): string[] {
  return facets.map((f) => f.id);
}
