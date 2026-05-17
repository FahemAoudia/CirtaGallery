"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocale } from "@/context/LocaleContext";
import { buildCatalogHref } from "@/lib/filter-catalog";
import { catalogRefineCopy } from "@/lib/public-ui-i18n";

export function CatalogRefineForm({
  q,
  ruban,
  facette,
}: {
  q: string;
  ruban: string;
  facette: string;
}) {
  const router = useRouter();
  const { locale } = useLocale();
  const t = catalogRefineCopy[locale];

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const qn = String(fd.get("q") ?? "").trim();
    const rubanH = fd.get("ruban");
    const facetteH = fd.get("facette");
    const href = buildCatalogHref(
      {
        q: qn,
        ruban: rubanH != null ? String(rubanH) : ruban,
        facette: facetteH != null ? String(facetteH) : facette,
      },
      {},
    );
    router.push(href, { scroll: false });
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto mt-12 flex max-w-xl flex-col gap-3 border border-cirta-brown/10 bg-cirta-black/[0.03] px-4 py-3 md:flex-row md:items-center"
    >
      {facette !== "tout" ? (
        <input type="hidden" name="facette" value={facette} />
      ) : null}
      {ruban !== "all" ? (
        <input type="hidden" name="ruban" value={ruban} />
      ) : null}
      <label htmlFor="catalog-search" className="sr-only">
        {t.refineLabel}
      </label>
      <input
        id="catalog-search"
        name="q"
        defaultValue={q}
        placeholder={t.placeholder}
        className="min-w-0 flex-1 bg-transparent py-2 text-sm text-cirta-brown outline-none placeholder:text-cirta-brown/30"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="border border-cirta-brown/25 px-5 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-cirta-brown transition hover:border-cirta-gold hover:text-cirta-gold-dim"
        >
          {t.update}
        </button>
        {(q || ruban !== "all" || facette !== "tout") && (
          <Link
            href="/"
            scroll={false}
            className="border border-transparent px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-cirta-brown/45 underline-offset-4 hover:text-cirta-brown hover:underline"
          >
            {t.reset}
          </Link>
        )}
      </div>
    </form>
  );
}
