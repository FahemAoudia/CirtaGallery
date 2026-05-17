import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { FeaturedItems } from "@/components/FeaturedItems";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import type { RibbonRow, FacetRow } from "@/lib/catalog-db";
import type { CatalogItem, FeaturedPiece } from "@/lib/collection";
import type { HomeSectionRow } from "@/lib/home-sections";

type CatalogState = { q: string; ruban: string; facette: string };

type HomePageSectionsProps = {
  homeSections: HomeSectionRow[];
  catalogState: CatalogState;
  ribbonLabels: RibbonRow[];
  sidebarFacets: FacetRow[];
  collection: CatalogItem[];
  featuredPieces: FeaturedPiece[];
  settings: Record<string, string>;
};

export function HomePageSections({
  homeSections,
  catalogState,
  ribbonLabels,
  sidebarFacets,
  collection,
  featuredPieces,
  settings,
}: HomePageSectionsProps) {
  const ordered = [...homeSections]
    .filter((s) => s.enabled)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <main id="main">
      {ordered.map((s) => {
        const k = s.sectionKey;
        if (k === "hero") {
          return (
            <Hero
              key={s.id}
              catalogState={catalogState}
              ribbonLabels={ribbonLabels}
              showCollectionTeaserImages={(settings.collection_teasers_visible ?? "1") !== "0"}
            />
          );
        }
        if (k === "catalog") {
          return (
            <ProductGrid
              key={s.id}
              collection={collection}
              ribbonLabels={ribbonLabels}
              sidebarFacets={sidebarFacets}
              catalogIntro={settings.catalog_intro}
              q={catalogState.q}
              ruban={catalogState.ruban}
              facette={catalogState.facette}
            />
          );
        }
        if (k === "featured") {
          return (
            <FeaturedItems
              key={s.id}
              pieces={featuredPieces}
              kicker={settings.featured_kicker}
              title={settings.featured_title}
              aside={settings.featured_aside}
            />
          );
        }
        if (k === "about") {
          return (
            <About
              key={s.id}
              kicker={settings.about_kicker}
              heading={settings.about_heading}
              p1={settings.about_p1}
              p2={settings.about_p2}
            />
          );
        }
        if (k === "contact") {
          return <Contact key={s.id} intro={settings.contact_intro} settings={settings} />;
        }
        if (k === "footer") {
          return <Footer key={s.id} />;
        }
        return null;
      })}
    </main>
  );
}
