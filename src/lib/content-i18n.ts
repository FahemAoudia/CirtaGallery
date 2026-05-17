import { CONTACT_CMS_FIELD_META } from "@/lib/contact-settings";
import type { SiteLocale } from "@/lib/site-i18n";

/** Clés SiteSetting pour les traductions auto (JSON { en, es, zh }). */
export const SITE_I18N_PREFIX = "__i18n__";

export type NonFrLocale = Exclude<SiteLocale, "fr">;

export type SiteTextI18n = Partial<Record<NonFrLocale, string>>;

export type EntityI18n<T extends Record<string, string> = Record<string, string>> = Partial<
  Record<NonFrLocale, Partial<T>>
>;

export const TRANSLATABLE_SITE_KEYS = [
  "catalog_intro",
  "featured_kicker",
  "featured_title",
  "featured_aside",
  "about_kicker",
  "about_heading",
  "about_p1",
  "about_p2",
  "contact_intro",
] as const;

export type TranslatableSiteKey = (typeof TRANSLATABLE_SITE_KEYS)[number];

const TRANSLATABLE_SITE_SET = new Set<string>(TRANSLATABLE_SITE_KEYS);

export const TRANSLATABLE_CONTACT_KEYS = CONTACT_CMS_FIELD_META.map((f) => f.name);

const TRANSLATABLE_CONTACT_SET = new Set<string>(TRANSLATABLE_CONTACT_KEYS);

export function isTranslatableSiteKey(key: string): boolean {
  return TRANSLATABLE_SITE_SET.has(key) || TRANSLATABLE_CONTACT_SET.has(key);
}

export function siteI18nStorageKey(baseKey: string): string {
  return `${SITE_I18N_PREFIX}${baseKey}`;
}

export function parseSiteTextI18n(raw: string | undefined): SiteTextI18n | undefined {
  if (!raw?.trim()) return undefined;
  try {
    const p = JSON.parse(raw) as unknown;
    if (!p || typeof p !== "object") return undefined;
    const out: SiteTextI18n = {};
    for (const loc of ["en", "es", "zh"] as const) {
      const v = (p as Record<string, unknown>)[loc];
      if (typeof v === "string" && v.trim()) out[loc] = v.trim();
    }
    return Object.keys(out).length > 0 ? out : undefined;
  } catch {
    return undefined;
  }
}

export function parseEntityI18n<T extends Record<string, string>>(
  raw: string | null | undefined,
): EntityI18n<T> | undefined {
  if (!raw?.trim() || raw.trim() === "{}") return undefined;
  try {
    const p = JSON.parse(raw) as unknown;
    if (!p || typeof p !== "object") return undefined;
    return p as EntityI18n<T>;
  } catch {
    return undefined;
  }
}

export function serializeEntityI18n<T extends Record<string, string>>(
  pack: EntityI18n<T>,
): string {
  return JSON.stringify(pack);
}

export function parseLabelI18n(raw: string | null | undefined): SiteTextI18n | undefined {
  const entity = parseEntityI18n<{ label: string }>(raw);
  if (!entity) return undefined;
  const out: SiteTextI18n = {};
  for (const loc of ["en", "es", "zh"] as const) {
    const label = entity[loc]?.label?.trim();
    if (label) out[loc] = label;
  }
  return Object.keys(out).length > 0 ? out : undefined;
}

export function labelI18nFromEntityPack(pack: EntityI18n<{ label: string }>): SiteTextI18n {
  const out: SiteTextI18n = {};
  for (const loc of ["en", "es", "zh"] as const) {
    const label = pack[loc]?.label?.trim();
    if (label) out[loc] = label;
  }
  return out;
}
