import { Suspense } from "react";
import { HomePageSections } from "@/components/HomePageSections";
import { ScrollToCollectionOnHash } from "@/components/ScrollToCollectionOnHash";
import { getHomeData } from "@/lib/catalog-db";
import { normalizeFacet, normalizeRibbon } from "@/lib/filter-catalog";

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const data = await getHomeData();
  const sp = (await searchParams) ?? {};
  const rawQ = sp.q;
  const q = typeof rawQ === "string" ? rawQ : Array.isArray(rawQ) ? rawQ[0] ?? "" : "";
  const rawRuban = sp.ruban;
  const rubanParam =
    typeof rawRuban === "string"
      ? rawRuban
      : Array.isArray(rawRuban)
        ? rawRuban[0]
        : undefined;
  const rawFacette = sp.facette;
  const facetteParam =
    typeof rawFacette === "string"
      ? rawFacette
      : Array.isArray(rawFacette)
        ? rawFacette[0]
        : undefined;

  const ribbonIds = data.ribbonLabels.map((r) => r.id);
  const facetIds = data.sidebarFacets.map((f) => f.id);
  const ruban = normalizeRibbon(rubanParam, ribbonIds);
  const facette = normalizeFacet(facetteParam, facetIds);
  const catalogState = { q, ruban, facette };

  const s = data.settings;

  return (
    <>
      <Suspense fallback={null}>
        <ScrollToCollectionOnHash />
      </Suspense>
      <HomePageSections
        homeSections={data.homeSections}
        catalogState={catalogState}
        ribbonLabels={data.ribbonLabels}
        sidebarFacets={data.sidebarFacets}
        collection={data.collection}
        featuredPieces={data.featuredPieces}
        settings={s}
      />
    </>
  );
}
