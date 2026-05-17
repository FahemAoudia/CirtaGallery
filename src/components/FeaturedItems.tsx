"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import type { FeaturedPiece } from "@/lib/collection";
import { cmsMirror, featuredUi } from "@/lib/public-ui-i18n";
import { localizeFeaturedPiece } from "@/lib/catalog-locale";

type FeaturedItemsProps = {
  pieces: FeaturedPiece[];
  kicker?: string;
  title?: string;
  aside?: string;
};

export function FeaturedItems({ pieces, kicker, title, aside }: FeaturedItemsProps) {
  const { locale } = useLocale();
  const mirror = cmsMirror[locale];
  const fu = featuredUi[locale];
  const showFr = locale === "fr";
  const kickerT = showFr ? (kicker ?? mirror.featuredKicker) : mirror.featuredKicker;
  const titleT = showFr ? (title ?? mirror.featuredTitle) : mirror.featuredTitle;
  const asideT = showFr ? (aside ?? mirror.featuredAside) : mirror.featuredAside;

  return (
    <section
      id="featured"
      aria-labelledby="featured-heading"
      className="relative bg-cirta-brown text-cirta-sand"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.14] texture-grain" />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 md:px-10 md:py-20">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.38em] text-cirta-gold">
              {kickerT}
            </p>
            <div className="ornament-rule my-4 max-w-[16rem] opacity-65" />
            <h2
              id="featured-heading"
              className="font-serif text-[clamp(1.65rem,3.4vw,2.45rem)] font-medium leading-[1.15] tracking-tight"
            >
              {titleT}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-snug text-cirta-sand/62 lg:text-right">{asideT}</p>
        </div>

        <div className="mt-10 flex flex-col gap-12 lg:gap-16">
          {pieces.map((piece, index) => {
            const p = localizeFeaturedPiece(locale, piece);
            const reverse = index % 2 === 1;
            return (
              <article
                key={p.id}
                className={`grid items-center gap-6 lg:grid-cols-12 lg:gap-8 ${
                  reverse ? "lg:grid-flow-dense" : ""
                }`}
              >
                <div
                  className={`lg:col-span-7 ${
                    reverse ? "lg:col-start-6" : "lg:col-start-1"
                  }`}
                >
                  <div className="relative">
                    <div className="absolute -inset-px border border-cirta-gold/22" />
                    <div className="relative h-[min(30vh,260px)] w-full overflow-hidden shadow-[0_44px_92px_-42px_rgba(0,0,0,0.78)] sm:h-[min(34vh,300px)] lg:h-[min(36vh,320px)]">
                      <Image
                        src={p.image}
                        alt={`${p.title} — ${p.meta}`}
                        fill
                        className="object-cover object-center"
                        sizes="(min-width: 1024px) 55vw, 100vw"
                      />
                      <div
                        className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-cirta-black/38 via-transparent to-transparent"
                        aria-hidden
                      />
                    </div>
                  </div>
                </div>
                <div
                  className={`flex flex-col justify-center lg:col-span-5 ${
                    reverse ? "lg:col-start-1 lg:row-start-1" : ""
                  }`}
                >
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-cirta-gold/88">
                    {p.catalogRef}
                  </p>
                  <h3 className="mt-3 font-serif text-[clamp(1.35rem,2.6vw,1.85rem)] font-medium leading-snug tracking-tight">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-[0.78rem] italic text-cirta-sand/52">{p.meta}</p>
                  <p className="mt-4 text-pretty text-sm leading-relaxed text-cirta-sand/72 md:text-base">
                    {p.description}
                  </p>
                  <div className="ornament-rule my-6 max-w-[10rem] opacity-35" />
                  <Link
                    href="#contact"
                    className="inline-flex w-fit items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-cirta-gold transition hover:gap-3"
                  >
                    {fu.requestCondition}
                    <span aria-hidden className="text-lg leading-none">
                      ↗
                    </span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
