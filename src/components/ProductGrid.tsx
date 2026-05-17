"use client";

import Link from "next/link";
import type { CatalogItem } from "@/lib/collection";
import { CatalogRefineForm } from "@/components/CatalogRefineForm";
import { ProductCardClient } from "@/components/ProductCardClient";
import { ProductInspectProvider } from "@/components/ProductInspectDialog";
import { useLocale } from "@/context/LocaleContext";
import { buildCatalogHref, filterCatalog } from "@/lib/filter-catalog";
import { displayFacetLabel, displayRibbonLabel } from "@/lib/catalog-locale";
import { catalogCountLine, catalogUi, cmsMirror } from "@/lib/public-ui-i18n";

function MobileCatalogFilters({
  base,
  sidebarFacets,
  facette,
  ribbonLabels,
  ruban,
}: {
  base: { q: string; ruban: string; facette: string };
  sidebarFacets: { id: string; label: string }[];
  facette: string;
  ribbonLabels: { id: string; label: string }[];
  ruban: string;
}) {
  const { locale } = useLocale();
  const u = catalogUi[locale];

  return (
    <details className="group mb-10 rounded-sm border border-cirta-brown/12 bg-cirta-black/[0.02] lg:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-cirta-brown marker:content-none [&::-webkit-details-marker]:hidden">
        <span>{u.mobileFiltersSummary}</span>
        <span
          className="text-cirta-gold transition duration-200 group-open:rotate-180"
          aria-hidden
        >
          ▼
        </span>
      </summary>
      <div className="space-y-6 border-t border-cirta-brown/10 px-4 py-5">
        <div>
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-cirta-brown/45">
            {u.mobileCategories}
          </p>
          <nav
            aria-label={u.refineNavMobileAria}
            className="mt-3 space-y-1"
          >
            {sidebarFacets.map((f) => {
              const active = facette === f.id;
              const href = buildCatalogHref(base, { facette: f.id });
              return (
                <Link
                  key={f.id}
                  href={href}
                  scroll={false}
                  className={`flex border-l-2 py-2 pl-3 text-sm transition ${
                    active
                      ? "border-cirta-gold bg-cirta-gold/10 text-cirta-brown"
                      : "border-transparent text-cirta-brown/65 hover:border-cirta-gold/35"
                  }`}
                >
                  {displayFacetLabel(locale, f.id, f.label)}
                </Link>
              );
            })}
          </nav>
        </div>
        <div>
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-cirta-brown/45">
            {u.mobileRibbon}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {ribbonLabels.map((r) => {
              const active = r.id === "all" ? ruban === "all" : ruban === r.id;
              const href = buildCatalogHref(base, {
                ruban: r.id,
                facette: r.id === "all" ? facette : "tout",
              });
              return (
                <Link
                  key={r.id}
                  href={href}
                  scroll={false}
                  className={`border px-3 py-2 text-[0.58rem] font-semibold uppercase tracking-[0.08em] transition ${
                    active
                      ? "border-cirta-gold bg-cirta-gold/15 text-cirta-brown"
                      : "border-cirta-brown/15 text-cirta-brown/55"
                  }`}
                >
                  {displayRibbonLabel(locale, r.id, r.label)}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </details>
  );
}

type ProductGridProps = {
  collection: CatalogItem[];
  ribbonLabels: { id: string; label: string }[];
  sidebarFacets: { id: string; label: string }[];
  catalogIntro?: string;
  q: string;
  ruban: string;
  facette: string;
};

export function ProductGrid({
  collection,
  ribbonLabels,
  sidebarFacets,
  catalogIntro,
  q,
  ruban,
  facette,
}: ProductGridProps) {
  const { locale } = useLocale();
  const u = catalogUi[locale];
  const mirror = cmsMirror[locale];
  const base = { q, ruban, facette };
  const filtered = filterCatalog(collection, { q, ruban, facette });
  const introText =
    locale === "fr" ? (catalogIntro ?? mirror.catalogIntro) : mirror.catalogIntro;

  return (
    <section
      id="collection"
      aria-labelledby="collection-heading"
      className="relative scroll-mt-6 border-t border-cirta-brown/10 bg-cirta-sand paper-wash texture-grain"
    >
      <ProductInspectProvider>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 md:px-10 md:py-28">
        <div className="text-center">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-cirta-gold-dim">
            {u.kicker}
          </p>
          <div className="ornament-rule mx-auto my-6 max-w-sm opacity-90" />
          <h2
            id="collection-heading"
            className="font-serif text-[clamp(2rem,4vw,3rem)] font-medium tracking-tight text-cirta-brown"
          >
            {u.heading}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-cirta-brown/68 md:text-lg">
            {introText}
          </p>
        </div>

        <CatalogRefineForm q={q} ruban={ruban} facette={facette} />

        <MobileCatalogFilters
          base={base}
          sidebarFacets={sidebarFacets}
          facette={facette}
          ribbonLabels={ribbonLabels}
          ruban={ruban}
        />

        <div className="mt-8 grid gap-10 lg:mt-14 lg:grid-cols-[minmax(0,13rem)_1fr] lg:gap-12">
          <aside
            aria-labelledby="facet-heading"
            className="hidden border border-cirta-brown/10 bg-cirta-black/[0.02] p-5 lg:block lg:sticky lg:top-8 lg:self-start lg:p-6"
          >
            <h3
              id="facet-heading"
              className="flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.26em] text-cirta-brown/50"
            >
              <span className="text-cirta-gold" aria-hidden>
                ❖
              </span>
              {u.facetHeading}
            </h3>
            <nav aria-label={u.refineNavAria} className="mt-5 space-y-1">
              {sidebarFacets.map((f) => {
                const active = facette === f.id;
                const href = buildCatalogHref(base, { facette: f.id });
                return (
                  <Link
                    key={f.id}
                    href={href}
                    scroll={false}
                    className={`flex items-center justify-between border-l-2 py-2 pl-3 text-sm transition ${
                      active
                        ? "border-cirta-gold bg-cirta-gold/10 text-cirta-brown"
                        : "border-transparent text-cirta-brown/60 hover:border-cirta-gold/35 hover:text-cirta-brown"
                    }`}
                  >
                    <span>{displayFacetLabel(locale, f.id, f.label)}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="ornament-rule mt-8 opacity-40" />
            <p className="mt-6 text-[0.72rem] leading-relaxed text-cirta-brown/48">
              {u.facetHint}
            </p>
          </aside>

          <div className="pl-3 sm:pl-3.5 md:pl-4 lg:pl-8">
            <div className="flex flex-wrap items-center gap-3 border-b border-cirta-brown/10 pb-5">
              <span className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-cirta-brown/40">
                {u.ribbonActive}
              </span>
              <nav aria-label={u.ribbonNavAria} className="flex flex-wrap gap-2">
                {ribbonLabels.map((r) => {
                  const active =
                    r.id === "all" ? ruban === "all" : ruban === r.id;
                  const href = buildCatalogHref(base, {
                    ruban: r.id,
                    facette: r.id === "all" ? facette : "tout",
                  });
                  return (
                    <Link
                      key={r.id}
                      href={href}
                      scroll={false}
                      className={`border px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.1em] transition ${
                        active
                          ? "border-cirta-gold bg-cirta-gold/15 text-cirta-brown"
                          : "border-cirta-brown/15 text-cirta-brown/55 hover:border-cirta-gold/40"
                      }`}
                    >
                      {displayRibbonLabel(locale, r.id, r.label)}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <p className="mt-5 text-sm text-cirta-brown/50">
              {catalogCountLine(locale, filtered.length, collection.length)}
            </p>

            {filtered.length === 0 ? (
              <p className="mt-16 text-center font-serif text-xl text-cirta-brown/55">
                {u.emptyMessage}
              </p>
            ) : (
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-14 xl:grid-cols-3">
                {filtered.map((item) => (
                  <ProductCardClient key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      </ProductInspectProvider>
    </section>
  );
}
