import {
  parseSiteTextI18n,
  siteI18nStorageKey,
  type SiteTextI18n,
} from "@/lib/content-i18n";
import type { SiteLocale } from "@/lib/site-i18n";

/** Texte CMS : FR depuis settings, autres langues depuis traductions DB puis repli statique. */
export function resolveSiteText(
  settings: Record<string, string>,
  key: string,
  locale: SiteLocale,
  mirrorFallback: string,
): string {
  if (locale === "fr") {
    return settings[key]?.trim() || mirrorFallback;
  }
  const fromDb = parseSiteTextI18n(settings[siteI18nStorageKey(key)])?.[locale]?.trim();
  if (fromDb) return fromDb;
  return mirrorFallback;
}

/** Texte CMS sans repli statique (admin vide = rien sur la vitrine). */
export function resolveSiteTextStrict(
  settings: Record<string, string>,
  key: string,
  locale: SiteLocale,
): string {
  if (locale === "fr") {
    return settings[key]?.trim() ?? "";
  }
  return parseSiteTextI18n(settings[siteI18nStorageKey(key)])?.[locale]?.trim() ?? "";
}

export function resolveLabel(
  locale: SiteLocale,
  labelFr: string,
  labelI18n: SiteTextI18n | undefined,
  staticFallback: string | undefined,
): string {
  if (locale === "fr") return labelFr;
  const fromDb = labelI18n?.[locale]?.trim();
  if (fromDb) return fromDb;
  if (staticFallback?.trim()) return staticFallback.trim();
  return labelFr;
}
