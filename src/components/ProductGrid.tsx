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
import type { SiteLocale } from "@/lib/site-i18n";

function RibbonActiveBar({
  locale,
  base,
  ribbonLabels,
  ruban,
  facette,
  className = "",
}: {
  locale: SiteLocale;
  base: { q: string; ruban: string; facette: string };
  ribbonLabels: { id: string; label: string }[];
  ruban: string;
  facette: string;
  className?: string;
}) {
  const u = catalogUi[locale];

  return (
    <div
      className={`rounded-sm border border-cirta-brown/10 bg-cirta-black/[0.02] px-3 py-4 ${className}`}
    >
      <p className="text-center text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-cirta-brown/45">
        {u.ribbonActive}
      </p>
      <div className="ornament-rule mx-auto my-3 max-w-[8rem] opacity-60" />
      <nav aria-label={u.ribbonNavAria} className="grid grid-cols-2 gap-2">
        {ribbonLabels.map((r) => {
          const active = r.id === "all" ? ruban === "all" : ruban === r.id;
          const isAll = r.id === "all";
          const href = buildCatalogHref(base, {
            ruban: r.id,
            facette: r.id === "all" ? facette : "tout",
          });
          return (
            <Link
              key={r.id}
              href={href}
              scroll={false}
              className={`flex min-h-11 items-center justify-center border px-2 py-2 text-center text-[0.52rem] font-semibold uppercase leading-snug tracking-[0.06em] transition ${
                isAll ? "col-span-2" : ""
              } ${
                active
                  ? "border-cirta-gold bg-cirta-gold/18 text-cirta-brown"
                  : "border-cirta-brown/15 text-cirta-brown/55 hover:border-cirta-gold/35"
              }`}
            >
              <span className="line-clamp-2">{displayRibbonLabel(locale, r.id, r.label)}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

function CatalogSidebar({
  locale,
  base,
  sidebarFacets,
  ribbonLabels,
  facette,
  ruban,
}: {
  locale: SiteLocale;
  base: { q: string; ruban: string; facette: string };
  sidebarFacets: { id: string; label: string }[];
  ribbonLabels: { id: string; label: string }[];
  facette: string;
  ruban: string;
}) {
  const u = catalogUi[locale];

  const linkClass = (active: boolean) =>
    `flex min-h-9 items-center border-l-2 py-1.5 pl-2 text-[0.58rem] leading-snug transition ${
      active
        ? "border-cirta-gold bg-cirta-gold/10 text-cirta-brown"
        : "border-transparent text-cirta-brown/60 hover:border-cirta-gold/35"
    }`;

  return (
    <aside
      aria-labelledby="facet-heading-mobile"
      className="sticky top-[4.25rem] self-start border border-cirta-brown/10 bg-cirta-black/[0.02] p-2 sm:p-3 lg:top-8 lg:p-5"
    >
      <h3
        id="facet-heading-mobile"
        className="text-[0.52rem] font-semibold uppercase tracking-[0.2em] text-cirta-brown/45"
      >
        {u.facetHeading}
      </h3>
      <nav aria-label={u.refineNavMobileAria} className="mt-2 space-y-0.5">
        {sidebarFacets.map((f) => {
          const active = facette === f.id;
          const href = buildCatalogHref(base, { facette: f.id });
          return (
            <Link key={f.id} href={href} scroll={false} className={linkClass(active)}>
              <span className="line-clamp-2">{displayFacetLabel(locale, f.id, f.label)}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-4 border-t border-cirta-brown/10 pt-3 lg:hidden">
        <p className="text-[0.52rem] font-semibold uppercase tracking-[0.18em] text-cirta-brown/45">
          {u.mobileRibbon}
        </p>
        <nav aria-label={u.ribbonNavAria} className="mt-2 space-y-0.5">
          {ribbonLabels.map((r) => {
            const active = r.id === "all" ? ruban === "all" : ruban === r.id;
            const href = buildCatalogHref(base, {
              ruban: r.id,
              facette: r.id === "all" ? facette : "tout",
            });
            return (
              <Link key={r.id} href={href} scroll={false} className={linkClass(active)}>
                <span className="line-clamp-2">{displayRibbonLabel(locale, r.id, r.label)}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <p className="mt-4 hidden text-[0.65rem] leading-relaxed text-cirta-brown/48 lg:block">
        {u.facetHint}
      </p>
    </aside>
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
      className="relative scroll-mt-[4.5rem] border-t border-cirta-brown/10 bg-cirta-sand paper-wash texture-grain sm:scroll-mt-6"
    >
      <ProductInspectProvider>
        <div className="site-container section-pad">
          <div className="text-center">
            <p className="section-kicker">{u.kicker}</p>
            <div className="ornament-rule mx-auto my-5 max-w-sm opacity-90 sm:my-6" />
            <h2 id="collection-heading" className="section-title">
              {u.heading}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-cirta-brown/68 sm:mt-5 sm:text-base md:text-lg">
              {introText}
            </p>
          </div>

          <CatalogRefineForm q={q} ruban={ruban} facette={facette} />

          <RibbonActiveBar
            locale={locale}
            base={base}
            ribbonLabels={ribbonLabels}
            ruban={ruban}
            facette={facette}
            className="mt-8 lg:hidden"
          />

          <div className="mt-6 grid grid-cols-[minmax(4.75rem,22vw)_1fr] gap-3 sm:mt-8 sm:gap-4 lg:mt-12 lg:grid-cols-[minmax(0,13rem)_1fr] lg:gap-12">
            <CatalogSidebar
              locale={locale}
              base={base}
              sidebarFacets={sidebarFacets}
              ribbonLabels={ribbonLabels}
              facette={facette}
              ruban={ruban}
            />

            <div className="min-w-0 lg:pl-2">
              <RibbonActiveBar
                locale={locale}
                base={base}
                ribbonLabels={ribbonLabels}
                ruban={ruban}
                facette={facette}
                className="mb-6 hidden lg:block"
              />

              <p className="text-xs text-cirta-brown/50 sm:text-sm">
                {catalogCountLine(locale, filtered.length, collection.length)}
              </p>

              {filtered.length === 0 ? (
                <p className="mt-12 text-center font-serif text-lg text-cirta-brown/55 sm:mt-16 sm:text-xl">
                  {u.emptyMessage}
                </p>
              ) : (
                <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-8 sm:mt-8 sm:gap-x-6 sm:gap-y-12 xl:grid-cols-3">
                  {filtered.map((item) => (
                    <ProductCardClient key={item.id} item={item} compact />
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
