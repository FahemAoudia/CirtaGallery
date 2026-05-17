"use client";

import Image from "next/image";
import Link from "next/link";
import { HeroActions } from "@/components/HeroActions";
import { HeroLocale } from "@/components/HeroLocale";
import { useLocale } from "@/context/LocaleContext";
import { buildCatalogHref } from "@/lib/filter-catalog";
import { displayRibbonLabel } from "@/lib/catalog-locale";
import { heroChromeCopy } from "@/lib/public-ui-i18n";
import { ANTIQUE_IMG, imageUrlForRibbonTeaser } from "@/lib/antique-images";

type HeroProps = {
  catalogState: { q: string; ruban: string; facette: string };
  ribbonLabels: { id: string; label: string; teaserImage?: string }[];
  showCollectionTeaserImages?: boolean;
};

export function Hero({
  catalogState,
  ribbonLabels,
  showCollectionTeaserImages = true,
}: HeroProps) {
  const { locale } = useLocale();
  const h = heroChromeCopy[locale];
  const base = catalogState;
  const ribbonOnly = (ruban: string) =>
    buildCatalogHref(base, { ruban, facette: "tout" });

  const collectionRibbonItems = ribbonLabels.filter((r) => r.id !== "all");

  const nav = [
    { href: "#collection", label: h.navCollection },
    { href: "#featured", label: h.navSalon },
    { href: "#about", label: h.navAbout },
    { href: "#contact", label: h.navContact },
  ];

  return (
    <header className="relative isolate min-h-[100svh] overflow-hidden bg-cirta-ink text-cirta-sand">
      <div className="pointer-events-none absolute inset-0 texture-silk" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.16] texture-grain"
        style={{ mixBlendMode: "overlay" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 85% 65% at 75% 12%, rgba(200,169,106,0.22), transparent 52%), radial-gradient(ellipse 55% 45% at 5% 95%, rgba(61,24,24,0.45), transparent)",
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 corner-ornament" aria-hidden />

      <div className="relative z-20 mx-auto w-full max-w-7xl px-4 pt-5 sm:px-6 md:px-10 md:pt-8">
        <div className="flex flex-col gap-4 md:gap-5">
          <div className="flex flex-wrap items-start justify-between gap-3 md:items-center">
            <Link
              href="/"
              className="group flex shrink-0 items-center gap-3 sm:gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-cirta-gold/60"
            >
              <Image
                src="/cirta-gallery-logo.png"
                alt="Cirta Gallery"
                width={1024}
                height={1024}
                priority
                className="h-[3.75rem] w-auto object-contain drop-shadow-[0_2px_14px_rgba(0,0,0,0.45)] transition-[filter] duration-300 group-hover:brightness-110 sm:h-[4.25rem] md:h-[5.875rem] lg:h-[6.5rem] xl:h-[7rem]"
              />
              <span className="font-serif text-[clamp(1.05rem,2.4vw,1.55rem)] leading-none tracking-[0.08em] text-cirta-gold/95 [text-shadow:0_1px_18px_rgba(200,169,106,0.22)] transition-colors duration-300 group-hover:text-cirta-sand">
                {h.brandSubtitle}
              </span>
            </Link>
            <HeroActions />
          </div>

          <form
            action="/"
            method="get"
            className="relative flex w-full max-w-none items-center border border-cirta-sand/18 bg-cirta-black/35 px-3 backdrop-blur-[2px] md:max-w-xl xl:mx-auto xl:max-w-lg"
          >
            {base.facette !== "tout" ? (
              <input type="hidden" name="facette" value={base.facette} />
            ) : null}
            {base.ruban !== "all" ? (
              <input type="hidden" name="ruban" value={base.ruban} />
            ) : null}
            <label htmlFor="hero-search" className="sr-only">
              {h.searchCatalogLabel}
            </label>
            <input
              id="hero-search"
              name="q"
              defaultValue={base.q}
              placeholder={h.searchPlaceholder}
              autoComplete="off"
              className="w-full bg-transparent py-2.5 pl-2 pr-10 text-sm text-cirta-sand outline-none placeholder:text-cirta-sand/28"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-cirta-gold transition hover:text-cirta-sand"
              aria-label={h.searchSubmitAria}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                aria-hidden
              >
                <circle cx="10.5" cy="10.5" r="6.5" />
                <path d="M15.5 15.5 21 21" strokeLinecap="round" />
              </svg>
            </button>
          </form>

          <nav
            aria-label={h.navMainAria}
            className="hidden flex-wrap items-center justify-center gap-5 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-cirta-sand/68 sm:gap-6 sm:text-[0.66rem] md:justify-center xl:flex xl:gap-7"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-cirta-gold focus:outline-none focus-visible:text-cirta-gold"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <nav
            aria-label={h.navMobileAria}
            className="flex gap-3 overflow-x-auto pb-1 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-cirta-sand/62 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-5 sm:text-[0.6rem] xl:hidden [&::-webkit-scrollbar]:hidden"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="shrink-0 border-b border-transparent pb-1 text-cirta-sand/80 transition hover:border-cirta-gold/45 hover:text-cirta-gold"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl flex-1 items-center gap-12 px-4 pb-10 pt-8 sm:px-6 md:grid-cols-12 md:gap-10 md:px-10 md:pb-20 md:pt-12">
        <div className="relative md:col-span-5">
          <HeroLocale />
          <dl className="animate-fade-rise delay-4 mt-14 grid max-w-md gap-4 border-t border-white/10 pt-8 text-sm text-cirta-sand/58">
            <div className="flex justify-between gap-6">
              <dt className="font-medium uppercase tracking-[0.15em] text-cirta-sand/38">
                {h.expertise}
              </dt>
              <dd className="text-right font-serif text-cirta-sand/90">
                1998 · Paris · Constantine
              </dd>
            </div>
            <div className="flex justify-between gap-6">
              <dt className="font-medium uppercase tracking-[0.15em] text-cirta-sand/38">
                {h.specialties}
              </dt>
              <dd className="max-w-[11rem] text-right text-cirta-sand/82">{h.regionsLine}</dd>
            </div>
          </dl>
        </div>

        <div className="relative md:col-span-6 md:col-start-7">
          <div
            className="pointer-events-none absolute -left-6 top-1/2 hidden h-[108%] w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-cirta-gold/40 to-transparent md:block"
            aria-hidden
          />
          <div className="relative mx-auto max-w-lg md:max-w-none">
            <div className="relative">
              <div className="animate-hero-drift relative z-10 overflow-hidden gold-ring">
                <Image
                  src={ANTIQUE_IMG.heroBuddha}
                  alt={h.heroBuddhaAlt}
                  width={1100}
                  height={1400}
                  priority
                  className="h-[min(58vh,520px)] w-full object-cover md:h-[min(62vh,600px)]"
                  sizes="(min-width: 768px) 44vw, 100vw"
                />
              </div>
              <div
                className="animate-float-soft absolute -bottom-8 -left-6 z-20 w-[42%] max-w-[220px] border border-cirta-gold/35 bg-cirta-black/55 p-1 shadow-[0_28px_60px_-28px_rgba(0,0,0,0.9)] md:-left-10"
                style={{ animationDelay: "0.6s" }}
              >
                <Image
                  src={ANTIQUE_IMG.heroJar}
                  alt={h.heroJarAlt}
                  width={480}
                  height={560}
                  className="h-32 w-full object-cover md:h-40"
                />
                <p className="px-2 py-2 text-[0.58rem] uppercase leading-snug tracking-[0.16em] text-cirta-sand/55">
                  {h.heroJarCaption}
                </p>
              </div>
              <div
                className="animate-float-soft absolute -right-4 top-10 z-20 w-[38%] max-w-[200px] border border-cirta-gold/30 bg-cirta-black/50 p-1 shadow-[0_24px_50px_-24px_rgba(0,0,0,0.85)] md:-right-8 md:top-14"
                style={{ animationDelay: "1.1s" }}
              >
                <Image
                  src={ANTIQUE_IMG.heroCoins}
                  alt={h.heroCoinsAlt}
                  width={440}
                  height={360}
                  className="h-28 w-full object-cover md:h-32"
                />
                <p className="px-2 py-2 text-[0.58rem] uppercase tracking-[0.16em] text-cirta-sand/50">
                  {h.heroCoinsCaption}
                </p>
              </div>
            </div>
            <p className="mt-12 max-w-md text-[0.72rem] leading-relaxed text-cirta-sand/45">
              {h.heroAsideParagraph}
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-20 border-y border-cirta-gold/35 bg-cirta-sand/95 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.35)]">
        <div className="mx-auto max-w-7xl px-6 py-5 md:px-10 md:py-6">
          <p className="text-center text-[0.68rem] font-bold uppercase tracking-[0.38em] text-cirta-brown">
            {h.collectionBarTitle}
          </p>
          <div className="ornament-rule mx-auto my-4 max-w-md opacity-70" />
          <nav aria-label={h.collectionCardsNavAria} className="mt-5 md:mt-6">
            <ul className="mx-auto flex max-w-6xl flex-wrap justify-center gap-x-0 gap-y-10 md:gap-y-9 lg:flex-nowrap lg:justify-between lg:gap-y-0">
              {collectionRibbonItems.map((r, index) => {
                const label = displayRibbonLabel(locale, r.id, r.label);
                const href = `${ribbonOnly(r.id)}#collection`;
                const src =
                  r.teaserImage?.trim() || imageUrlForRibbonTeaser(r.id, index);
                const isLast = index === collectionRibbonItems.length - 1;
                return (
                  <li
                    key={r.id}
                    className="relative flex w-[48%] flex-col sm:w-[32%] md:w-[31%] md:max-w-[13.5rem] lg:max-w-none lg:basis-0 lg:flex-1"
                  >
                    <Link
                      href={href}
                      scroll={false}
                      className="group mx-auto flex w-full max-w-[12.5rem] flex-col items-center gap-3.5 sm:max-w-[13rem] md:gap-4 lg:max-w-[14rem]"
                      aria-label={`${label} — ${h.collectionCardJumpSuffix}`}
                    >
                      <span className="w-full px-0.5 text-center text-[0.62rem] font-bold uppercase leading-snug tracking-[0.1em] text-cirta-brown underline-offset-[0.2em] transition group-hover:text-cirta-gold-dim group-hover:underline sm:text-[0.66rem] sm:tracking-[0.11em] md:text-[0.68rem] md:tracking-[0.12em]">
                        {label}
                      </span>
                      {showCollectionTeaserImages ? (
                        <span className="relative aspect-[3/4] w-full overflow-hidden rounded-md border border-cirta-brown/12 bg-cirta-brown/[0.05] shadow-[0_14px_36px_-20px_rgba(45,32,24,0.5)] transition duration-300 group-hover:border-cirta-gold/42 group-hover:shadow-[0_18px_44px_-18px_rgba(45,32,24,0.58)]">
                          <Image
                            src={src}
                            alt=""
                            fill
                            sizes="(min-width: 1024px) 200px, (min-width: 640px) 30vw, 46vw"
                            className="object-cover transition duration-500 group-hover:scale-[1.04]"
                          />
                          <span
                            className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-cirta-gold/0 transition group-hover:ring-cirta-gold/28"
                            aria-hidden
                          />
                        </span>
                      ) : null}
                    </Link>
                    {!isLast ? (
                      <span
                        className="pointer-events-none absolute right-0 top-2 hidden h-[9rem] w-px bg-gradient-to-b from-transparent via-cirta-gold-dim/40 to-transparent lg:block"
                        aria-hidden
                      />
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-cirta-sand via-cirta-sand/80 to-transparent"
        aria-hidden
      />
    </header>
  );
}
