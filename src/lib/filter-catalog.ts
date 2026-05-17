import type { CatalogItem } from "@/lib/collection";

/** Valide le ruban URL contre la liste courante (BD ou statique). */
export function normalizeRibbon(value: string | undefined, validRibbonIds: string[]): string {
  const fallback = validRibbonIds.includes("all") ? "all" : (validRibbonIds[0] ?? "all");
  if (value && validRibbonIds.includes(value)) {
    return value;
  }
  return fallback;
}

export function normalizeFacet(value: string | undefined, validFacetIds: string[]): string {
  const fallback = validFacetIds.includes("tout") ? "tout" : (validFacetIds[0] ?? "tout");
  if (value && validFacetIds.includes(value)) {
    return value;
  }
  return fallback;
}

export function filterCatalog(
  items: CatalogItem[],
  opts: { q: string; ruban: string; facette: string },
): CatalogItem[] {
  const needle = opts.q.trim().toLowerCase();
  return items.filter((item) => {
    if (opts.ruban !== "all" && item.ribbon !== opts.ruban) {
      return false;
    }
    if (opts.facette !== "tout" && !item.facets.includes(opts.facette)) {
      return false;
    }
    if (!needle) {
      return true;
    }
    const hay = `${item.title} ${item.origin} ${item.medium} ${item.period} ${item.id}`.toLowerCase();
    return hay.includes(needle);
  });
}

export function buildCatalogHref(
  current: { q: string; ruban: string; facette: string },
  patch: Partial<{ q: string; ruban: string; facette: string }>,
): string {
  const q = patch.q !== undefined ? patch.q : current.q;
  const ruban = patch.ruban !== undefined ? patch.ruban : current.ruban;
  const facette = patch.facette !== undefined ? patch.facette : current.facette;
  const p = new URLSearchParams();
  if (q.trim()) {
    p.set("q", q.trim());
  }
  if (ruban !== "all") {
    p.set("ruban", ruban);
  }
  if (facette !== "tout") {
    p.set("facette", facette);
  }
  const qs = p.toString();
  return qs ? `/?${qs}` : "/";
}