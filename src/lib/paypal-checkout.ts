import type { SiteLocale } from "@/lib/site-i18n";

/** Pays par défaut — galerie à Montréal */
export const PAYPAL_BUYER_COUNTRY = "CA";

/** Locale PayPal (formulaire carte + adresse de facturation) */
export function paypalScriptLocale(siteLocale: SiteLocale): string {
  switch (siteLocale) {
    case "en":
      return "en_CA";
    case "es":
      return "es_ES";
    case "zh":
      return "en_CA";
    default:
      return "fr_CA";
  }
}

/** Préremplit le pays CA sur le formulaire carte (indicatif +1 via locale fr_CA / buyerCountry). */
export function paypalOrderPayerDefaults() {
  return {
    address: {
      country_code: PAYPAL_BUYER_COUNTRY,
    },
  };
}
