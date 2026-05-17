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

/** Préremplit pays CA et indicatif téléphonique +1 sur le formulaire carte */
export function paypalOrderPayerDefaults() {
  return {
    address: {
      country_code: PAYPAL_BUYER_COUNTRY,
    },
    phone: {
      phone_type: "MOBILE" as const,
      phone_number: {
        country_code: "1",
      },
    },
  };
}
