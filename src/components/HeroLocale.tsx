"use client";

import { useLocale } from "@/context/LocaleContext";
import {
  LOCALE_MENU,
  heroCopy,
  languageMenuLabel,
  type SiteLocale,
} from "@/lib/site-i18n";

export function HeroLocale() {
  const { locale, setLocale } = useLocale();
  const t = heroCopy[locale];

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-3">
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
          className="min-h-10 max-w-[16rem] cursor-pointer border border-cirta-sand/25 bg-cirta-black/40 px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-cirta-sand outline-none transition hover:border-cirta-sand/35 focus:border-cirta-gold/50 focus:ring-1 focus:ring-cirta-gold/30 sm:tracking-[0.16em]"
        >
          {LOCALE_MENU.map((opt) => (
            <option key={opt.id} value={opt.id} className="bg-cirta-ink text-cirta-sand">
              {opt.short} — {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div lang={locale === "zh" ? "zh-Hans" : locale}>
        <p className="animate-fade-rise mb-5 text-[0.68rem] font-semibold uppercase tracking-[0.36em] text-cirta-gold/95 delay-1">
          {t.kicker}
        </p>
        <div className="ornament-rule mb-6 max-w-[14rem] opacity-85" />
        <h1 className="animate-fade-rise delay-1 font-serif text-[clamp(2.35rem,6.2vw,4.35rem)] font-semibold leading-[1.02] tracking-tight text-cirta-sand engraved-title">
          {t.titleA}
          <span className="mt-1 block text-cirta-gold">{t.titleB}</span>
        </h1>
        {locale === "zh" ? (
          <p className="animate-fade-rise delay-2 mt-6 font-serif text-xl text-cirta-sand/75 md:text-2xl">
            「{t.tag}」
          </p>
        ) : (
          <p className="animate-fade-rise delay-2 mt-6 font-serif text-xl italic text-cirta-sand/75 md:text-2xl">
            « {t.tag} »
          </p>
        )}
        <p className="animate-fade-rise delay-2 mt-8 max-w-xl text-pretty text-base leading-[1.75] text-cirta-sand/72 md:text-lg">
          {t.lead}
        </p>
        <div className="animate-fade-rise delay-3 mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#collection"
            className="inline-flex items-center justify-center border border-cirta-gold bg-cirta-gold px-8 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-cirta-brown transition hover:bg-transparent hover:text-cirta-gold"
          >
            {t.ctaPrimary}
          </a>
          <a
            href="#featured"
            className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-cirta-sand/80 underline-offset-4 transition hover:text-cirta-gold hover:underline"
          >
            {t.ctaSecondary}
          </a>
        </div>
      </div>
    </div>
  );
}
