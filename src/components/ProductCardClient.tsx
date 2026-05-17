"use client";

import Image from "next/image";
import { useMemo } from "react";
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
    <article className="product-card group relative flex flex-col">
      <div className="relative overflow-hidden rounded-sm border border-cirta-brown/12 bg-gradient-to-b from-cirta-sand to-cirta-sand/90 shadow-[0_16px_32px_-24px_rgba(15,15,15,0.45)] transition duration-500 group-hover:border-cirta-gold/40 sm:shadow-[0_24px_48px_-32px_rgba(15,15,15,0.5)]">
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
      <div className={`flex flex-1 flex-col px-0.5 ${compact ? "mt-2.5 gap-1.5" : "mt-5 gap-3"}`}>
        <div className={compact ? "space-y-1" : "flex items-start justify-between gap-2"}>
          <button
            type="button"
            onClick={() => open(item)}
            className={`w-full rounded-sm text-left font-serif font-medium tracking-tight text-cirta-brown transition hover:text-cirta-gold-dim focus:outline-none focus-visible:ring-2 focus-visible:ring-cirta-gold/50 ${
              compact
                ? "text-[0.88rem] leading-[1.35] [overflow-wrap:anywhere]"
                : "text-lg leading-snug md:text-[1.25rem]"
            }`}
          >
            {display.title}
          </button>
          <span
            className={
              compact
                ? "font-mono text-[0.5rem] uppercase tracking-[0.18em] text-cirta-gold-dim/90"
                : "shrink-0 font-mono text-[0.52rem] uppercase tracking-widest text-cirta-gold-dim sm:text-[0.6rem]"
            }
          >
            {display.id}
          </span>
        </div>
        <p
          className={`font-semibold uppercase tracking-[0.12em] text-cirta-brown/42 ${
            compact ? "text-[0.58rem] leading-snug" : "text-[0.68rem] tracking-[0.14em]"
          }`}
        >
          {display.period}
          <span className="mx-1.5 text-cirta-gold/55">·</span>
          {display.origin}
        </p>
        <p className={`text-sm leading-relaxed text-cirta-brown/65 ${compact ? "hidden lg:block" : ""}`}>
          {display.medium}
        </p>
        {display.depth?.trim() ? (
          <p className={`text-sm leading-relaxed text-cirta-brown/65 ${compact ? "hidden lg:block" : ""}`}>
            <span className="font-semibold text-cirta-brown/55">{t.depthLabel}</span>{" "}
            {display.depth.trim()}
          </p>
        ) : null}
        {display.weight?.trim() ? (
          <p className={`text-sm leading-relaxed text-cirta-brown/65 ${compact ? "hidden lg:block" : ""}`}>
            <span className="font-semibold text-cirta-brown/55">{t.weightLabel}</span>{" "}
            {display.weight.trim()}
          </p>
        ) : null}
        {histoire ? (
          <ProductHistoireBlurb
            text={histoire}
            label={t.descriptionLabel}
            voirPlus={t.voirPlus}
            voirMoins={t.voirMoins}
            compact={compact}
          />
        ) : null}
        <div
          className={`mt-auto flex flex-col gap-1.5 border-t border-cirta-brown/10 pt-2 sm:flex-row sm:items-end sm:justify-between sm:gap-3 sm:pt-3`}
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
