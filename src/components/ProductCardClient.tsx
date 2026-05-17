"use client";

import Image from "next/image";
import { useMemo } from "react";
import { ProductDimensionsGrid } from "@/components/ProductDimensionsGrid";
import { ProductHistoireBlurb } from "@/components/ProductHistoireBlurb";
import type { CatalogItem } from "@/lib/collection";
import { useLocale } from "@/context/LocaleContext";
import { useCart } from "@/context/CartContext";
import { localizeCatalogItem } from "@/lib/catalog-locale";
import { formatCad } from "@/lib/format-cad";
import { useProductInspect } from "@/components/ProductInspectDialog";
import { productCardCopy, productInspectCopy } from "@/lib/public-ui-i18n";

type ProductCardClientProps = {
  item: CatalogItem;
  compact?: boolean;
};

/** Espacement vertical uniforme entre blocs texte (mobile + bureau). */
const CARD_BODY_GAP = "gap-2.5 sm:gap-3";

export function ProductCardClient({ item, compact = false }: ProductCardClientProps) {
  const { addItem } = useCart();
  const { open } = useProductInspect();
  const { locale } = useLocale();
  const t = productCardCopy[locale];
  const inspect = productInspectCopy[locale];
  const display = useMemo(() => localizeCatalogItem(locale, item), [locale, item]);
  const histoire = display.histoire?.trim() ?? "";

  const canBuy = display.priceCad > 0;

  return (
    <article className="product-card group relative flex h-full flex-col">
      <div className="relative shrink-0 overflow-hidden rounded-sm border border-cirta-brown/12 bg-gradient-to-b from-cirta-sand to-cirta-sand/90 shadow-[0_16px_32px_-24px_rgba(15,15,15,0.45)] transition duration-500 group-hover:border-cirta-gold/40 sm:shadow-[0_24px_48px_-32px_rgba(15,15,15,0.5)]">
        <div className="pointer-events-none absolute inset-0 z-10 opacity-0 transition group-hover:opacity-100">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cirta-gold/75 to-transparent" />
        </div>
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={display.image}
            alt={`${display.title}, ${display.period}, ${display.origin}`}
            width={display.width}
            height={display.height}
            className="h-full w-full object-cover transition duration-[1.1s] group-hover:scale-[1.04]"
            sizes={
              compact
                ? "(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 46vw"
                : "(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 88vw"
            }
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cirta-brown/30 via-transparent to-transparent opacity-70"
            aria-hidden
          />
          <button
            type="button"
            onClick={() => open(item)}
            className="absolute inset-0 z-[6] cursor-zoom-in bg-transparent transition hover:bg-cirta-black/[0.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cirta-gold/55"
            aria-label={inspect.openDetailsAria}
          />
        </div>
      </div>

      <div
        className={`flex min-h-0 flex-1 flex-col px-0.5 ${compact ? "mt-2.5" : "mt-5"} ${CARD_BODY_GAP}`}
      >
        <header className="flex min-h-[2.65rem] shrink-0 items-start justify-between gap-1.5 sm:min-h-[2.85rem] lg:min-h-[3.15rem]">
          <button
            type="button"
            onClick={() => open(item)}
            className={`line-clamp-2 min-w-0 flex-1 rounded-sm text-left font-serif font-medium tracking-tight text-cirta-brown transition hover:text-cirta-gold-dim focus:outline-none focus-visible:ring-2 focus-visible:ring-cirta-gold/50 ${
              compact
                ? "text-[0.88rem] leading-[1.35]"
                : "text-lg leading-snug md:text-[1.25rem]"
            }`}
          >
            {display.title}
          </button>
          <span
            className={`shrink-0 font-mono uppercase text-cirta-gold-dim/90 ${
              compact
                ? "text-[0.5rem] tracking-[0.18em]"
                : "text-[0.52rem] tracking-widest sm:text-[0.6rem]"
            }`}
          >
            {display.id}
          </span>
        </header>

        <p
          className={`line-clamp-2 min-h-[2.35rem] shrink-0 font-semibold uppercase leading-snug tracking-[0.12em] text-cirta-brown/42 sm:min-h-[2.5rem] ${
            compact ? "text-[0.58rem]" : "text-[0.68rem] tracking-[0.14em]"
          }`}
        >
          {display.period}
          <span className="mx-1.5 text-cirta-gold/55">·</span>
          {display.origin}
        </p>

        <p
          className={`line-clamp-2 shrink-0 leading-relaxed text-cirta-brown/65 ${
            compact
              ? "hidden min-h-0 lg:block lg:min-h-[1.35rem] lg:text-sm"
              : "min-h-[1.35rem] text-sm"
          }`}
        >
          {display.medium}
        </p>

        <div
          className={`shrink-0 ${compact ? "min-h-[2.15rem]" : "min-h-[1.3rem]"}`}
        >
          <ProductDimensionsGrid
            depth={display.depth}
            weight={display.weight}
            hauteur={display.hauteur}
            compact={compact}
            labels={{
              depthLabel: t.depthLabelShort,
              weightLabel: t.weightLabelShort,
              hauteurLabel: t.hauteurLabelShort,
            }}
          />
        </div>

        <div
          className={`flex min-h-[5.25rem] flex-1 flex-col sm:min-h-[5.75rem] ${
            compact ? "lg:min-h-[6.25rem]" : "lg:min-h-[6.75rem]"
          }`}
        >
          {histoire ? (
            <ProductHistoireBlurb
              text={histoire}
              label={t.descriptionLabel}
              voirPlus={t.voirPlus}
              voirMoins={t.voirMoins}
              compact={compact}
              className="h-full"
            />
          ) : null}
        </div>

        <div
          className={`mt-auto flex shrink-0 flex-col gap-1.5 border-t border-cirta-brown/10 pt-2.5 sm:flex-row sm:items-end sm:justify-between sm:gap-3 sm:pt-3`}
        >
          <div>
            <p className="text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-cirta-brown/45 sm:text-[0.6rem] sm:tracking-[0.18em]">
              {t.priceCad}
            </p>
            <p
              className={`font-serif font-medium tabular-nums text-cirta-brown ${
                compact ? "text-[0.95rem] sm:text-lg" : "text-xl"
              }`}
            >
              {canBuy ? formatCad(display.priceCad) : t.onRequest}
            </p>
          </div>
          {canBuy ? (
            <button
              type="button"
              onClick={() => addItem(display, 1)}
              className={`btn-luxury-primary text-cirta-brown ${
                compact
                  ? "w-full !min-h-9 !px-2.5 !py-1.5 !text-[0.52rem] !tracking-[0.08em] sm:w-auto sm:!min-h-11 sm:!px-3 sm:!py-2 sm:!text-[0.58rem]"
                  : "w-full sm:w-auto sm:min-w-[11rem]"
              }`}
            >
              {t.addToCart}
            </button>
          ) : (
            <p className="text-xs text-cirta-brown/50">{t.contactOffer}</p>
          )}
        </div>
      </div>
    </article>
  );
}
