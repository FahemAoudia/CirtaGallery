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

export function ProductCardClient({ item }: { item: CatalogItem }) {
  const { addItem } = useCart();
  const { open } = useProductInspect();
  const { locale } = useLocale();
  const t = productCardCopy[locale];
  const inspect = productInspectCopy[locale];
  const display = useMemo(() => localizeCatalogItem(locale, item), [locale, item]);

  const canBuy = display.priceCad > 0;

  return (
    <article className="product-card group relative flex flex-col">
      <div className="relative overflow-hidden rounded-sm border border-cirta-brown/12 bg-gradient-to-b from-cirta-sand to-cirta-sand/90 shadow-[0_24px_48px_-32px_rgba(15,15,15,0.5)] transition duration-500 group-hover:border-cirta-gold/40 group-hover:shadow-[0_32px_64px_-28px_rgba(15,15,15,0.55)]">
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
            sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 88vw"
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
      <div className="mt-5 flex flex-1 flex-col gap-3 px-0.5">
        <div className="flex items-start justify-between gap-3">
          <button
            type="button"
            onClick={() => open(item)}
            className="rounded-sm text-left font-serif text-lg font-medium leading-snug tracking-tight text-cirta-brown transition hover:text-cirta-gold-dim focus:outline-none focus-visible:ring-2 focus-visible:ring-cirta-gold/50 md:text-[1.25rem]"
          >
            {display.title}
          </button>
          <span className="shrink-0 font-mono text-[0.6rem] uppercase tracking-widest text-cirta-gold-dim">
            {display.id}
          </span>
        </div>
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-cirta-brown/42">
          {display.period}
          <span className="mx-2 text-cirta-gold/55">·</span>
          {display.origin}
        </p>
        <p className="text-sm leading-relaxed text-cirta-brown/65">{display.medium}</p>
        {display.depth?.trim() ? (
          <p className="text-sm leading-relaxed text-cirta-brown/65">
            <span className="font-semibold text-cirta-brown/55">{t.depthLabel}</span>{" "}
            {display.depth.trim()}
          </p>
        ) : null}
        {display.weight?.trim() ? (
          <p className="text-sm leading-relaxed text-cirta-brown/65">
            <span className="font-semibold text-cirta-brown/55">{t.weightLabel}</span>{" "}
            {display.weight.trim()}
          </p>
        ) : null}
        {display.histoire?.trim() ? (
          <ProductHistoireBlurb
            text={display.histoire.trim()}
            label={t.descriptionLabel}
            voirPlus={t.voirPlus}
            voirMoins={t.voirMoins}
          />
        ) : null}
        <div className="mt-auto flex flex-col gap-3 border-t border-cirta-brown/10 pt-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-cirta-brown/45">
              {t.priceCad}
            </p>
            <p className="font-serif text-xl font-medium tabular-nums text-cirta-brown">
              {canBuy ? formatCad(display.priceCad) : t.onRequest}
            </p>
          </div>
          {canBuy ? (
            <button
              type="button"
              onClick={() => addItem(display, 1)}
              className="min-h-11 w-full border border-cirta-gold/50 bg-cirta-gold/12 px-4 py-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cirta-brown transition hover:bg-cirta-gold/22 sm:w-auto sm:min-w-[11rem]"
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
