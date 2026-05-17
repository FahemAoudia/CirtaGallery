"use client";

import { useLocale } from "@/context/LocaleContext";
import {
  LOCALE_MENU,
  heroCopy,
  languageMenuLabel,
  type SiteLocale,
} from "@/lib/site-i18n";

type HeroLocaleProps = {
  compact?: boolean;
};

export function HeroLocale({ compact = false }: HeroLocaleProps) {
  const { locale, setLocale } = useLocale();
  const t = heroCopy[locale];

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center gap-3 sm:mb-6">
        <label
          htmlFor="site-locale"
          className="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-cirta-sand/40"
        >
          {languageMenuLabel[locale]}
        </label>
        <select
          id="site-locale"
          value={locale}
          onChange={(e) => setLocale(e.target.value as SiteLocale)}
          className="touch-target max-w-[16rem] cursor-pointer border border-cirta-sand/25 bg-cirta-black/40 px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-cirta-sand outline-none transition hover:border-cirta-sand/35 focus:border-cirta-gold/50 focus:ring-1 focus:ring-cirta-gold/30 sm:tracking-[0.16em]"
        >
          {LOCALE_MENU.map((opt) => (
            <option key={opt.id} value={opt.id} className="bg-cirta-ink text-cirta-sand">
              {opt.short} — {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div lang={locale === "zh" ? "zh-Hans" : locale}>
        <p className="animate-fade-rise mb-4 text-[0.68rem] font-semibold uppercase tracking-[0.36em] text-cirta-gold/95 delay-1 sm:mb-5">
          {t.kicker}
        </p>
        <div className="ornament-rule mb-5 max-w-[14rem] opacity-85 sm:mb-6" />
        <h1 className="animate-fade-rise delay-1 font-serif text-[clamp(2rem,8vw,4.35rem)] font-semibold leading-[1.02] tracking-tight text-cirta-sand engraved-title">
          {t.titleA}
          <span className="mt-1 block text-cirta-gold">{t.titleB}</span>
        </h1>
        {locale === "zh" ? (
          <p className="animate-fade-rise delay-2 mt-5 font-serif text-lg text-cirta-sand/75 sm:mt-6 md:text-2xl">
            「{t.tag}」
          </p>
        ) : (
          <p className="animate-fade-rise delay-2 mt-5 font-serif text-lg italic text-cirta-sand/75 sm:mt-6 md:text-2xl">
            « {t.tag} »
          </p>
        )}
        <p className="animate-fade-rise delay-2 mt-6 max-w-xl text-pretty text-base leading-[1.75] text-cirta-sand/72 sm:mt-8 md:text-lg">
          {t.lead}
        </p>
        <div
          className={`animate-fade-rise delay-3 mt-8 sm:mt-10 ${
            compact
              ? "flex flex-col gap-3"
              : "flex flex-wrap items-center gap-4"
          }`}
        >
          <a
            href="#collection"
            className={`btn-luxury-primary bg-cirta-gold text-cirta-brown hover:bg-transparent hover:text-cirta-gold ${
              compact ? "w-full" : ""
            }`}
          >
            {t.ctaPrimary}
          </a>
          <a
            href="#featured"
            className={`text-center text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-cirta-sand/80 underline-offset-4 transition hover:text-cirta-gold hover:underline ${
              compact ? "py-2" : ""
            }`}
          >
            {t.ctaSecondary}
          </a>
        </div>
      </div>
    </div>
  );
}
