import {
  isTranslatableSiteKey,
  siteI18nStorageKey,
  type EntityI18n,
  type NonFrLocale,
  type SiteTextI18n,
} from "@/lib/content-i18n";
import { prisma } from "@/lib/prisma";

const TARGET_LOCALES: NonFrLocale[] = ["en", "es", "zh"];

const DEEPL_TARGET: Record<NonFrLocale, string> = {
  en: "EN",
  es: "ES",
  zh: "ZH",
};

function deeplConfig(): { host: string; authKey: string } | null {
  const authKey = process.env.DEEPL_API_KEY?.trim();
  if (!authKey) return null;
  const host = authKey.endsWith(":fx") ? "https://api-free.deepl.com" : "https://api.deepl.com";
  return { host, authKey };
}

async function deeplTranslateBatch(
  texts: string[],
  targetLang: string,
): Promise<string[] | null> {
  const cfg = deeplConfig();
  if (!cfg || texts.length === 0) return null;

  const params = new URLSearchParams();
  params.set("source_lang", "FR");
  params.set("target_lang", targetLang);
  for (const t of texts) params.append("text", t);

  try {
    const res = await fetch(`${cfg.host}/v2/translate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `DeepL-Auth-Key ${cfg.authKey}`,
      },
      body: params.toString(),
      signal: AbortSignal.timeout(45_000),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { translations?: { text: string }[] };
    const out = data.translations?.map((row) => row.text ?? "") ?? [];
    return out.length === texts.length ? out : null;
  } catch {
    return null;
  }
}

/** Traduit des champs français vers EN / ES / ZH. Retourne {} si pas de clé API ou erreur. */
export async function translateFrenchFields(
  fields: Record<string, string>,
): Promise<EntityI18n> {
  const keys = Object.keys(fields).filter((k) => fields[k]?.trim());
  if (keys.length === 0 || !deeplConfig()) return {};

  const values = keys.map((k) => fields[k].trim());
  const pack: EntityI18n = {};

  for (const locale of TARGET_LOCALES) {
    const translated = await deeplTranslateBatch(values, DEEPL_TARGET[locale]);
    if (!translated) continue;
    const localeFields: Record<string, string> = {};
    keys.forEach((k, i) => {
      const v = translated[i]?.trim();
      if (v) localeFields[k] = v;
    });
    if (Object.keys(localeFields).length > 0) pack[locale] = localeFields;
  }

  return pack;
}

export async function translateFrenchToSiteText(frValue: string): Promise<SiteTextI18n> {
  const trimmed = frValue.trim();
  if (!trimmed) return {};
  const entity = await translateFrenchFields({ value: trimmed });
  const out: SiteTextI18n = {};
  for (const locale of TARGET_LOCALES) {
    const v = entity[locale]?.value?.trim();
    if (v) out[locale] = v;
  }
  return out;
}

export function translationSucceeded(pack: EntityI18n | SiteTextI18n): boolean {
  return Object.keys(pack).length > 0;
}

export async function persistSiteSettingI18n(
  baseKey: string,
  frValue: string,
): Promise<boolean> {
  if (!isTranslatableSiteKey(baseKey)) return false;
  const storageKey = siteI18nStorageKey(baseKey);
  const trimmed = frValue.trim();

  if (!trimmed) {
    await prisma.siteSetting.deleteMany({ where: { key: storageKey } });
    return false;
  }

  const pack = await translateFrenchToSiteText(trimmed);
  if (!translationSucceeded(pack)) return false;

  await prisma.siteSetting.upsert({
    where: { key: storageKey },
    create: { key: storageKey, value: JSON.stringify(pack) },
    update: { value: JSON.stringify(pack) },
  });
  return true;
}

export async function persistSiteSettingsI18nBatch(
  entries: { key: string; value: string }[],
): Promise<boolean> {
  let any = false;
  for (const { key, value } of entries) {
    if (!isTranslatableSiteKey(key)) continue;
    const ok = await persistSiteSettingI18n(key, value);
    if (ok) any = true;
    if (!value.trim()) {
      await prisma.siteSetting.deleteMany({ where: { key: siteI18nStorageKey(key) } });
    }
  }
  return any;
}
