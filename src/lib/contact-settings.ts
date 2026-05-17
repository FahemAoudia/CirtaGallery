import { parseSiteTextI18n, siteI18nStorageKey } from "@/lib/content-i18n";
import { contactCopy } from "@/lib/public-ui-i18n";
import type { SiteLocale } from "@/lib/site-i18n";

const CONTACT_UI_TO_FIELD: Record<string, keyof (typeof contactCopy)["fr"]> = {
  contact_ui_kicker: "kicker",
  contact_ui_heading: "heading",
  contact_ui_addressLabel: "addressLabel",
  contact_ui_thankYou: "thankYou",
  contact_ui_labelName: "labelName",
  contact_ui_phName: "phName",
  contact_ui_labelEmail: "labelEmail",
  contact_ui_phEmail: "phEmail",
  contact_ui_labelRef: "labelRef",
  contact_ui_phRef: "phRef",
  contact_ui_labelMessage: "labelMessage",
  contact_ui_phMessage: "phMessage",
  contact_ui_submit: "submit",
  contact_ui_submitSending: "submitSending",
  contact_ui_sendError: "sendError",
  contact_ui_footnote: "footnote",
};

/** Textes du formulaire contact : FR depuis CMS, autres langues depuis traductions auto puis repli statique. */
export function getContactCopyMerged(
  locale: SiteLocale,
  settings: Record<string, string>,
): (typeof contactCopy)[SiteLocale] {
  const merged = { ...contactCopy[locale] };
  for (const [settingKey, field] of Object.entries(CONTACT_UI_TO_FIELD)) {
    let v: string | undefined;
    if (locale === "fr") {
      v = settings[settingKey]?.trim();
    } else {
      v = parseSiteTextI18n(settings[siteI18nStorageKey(settingKey)])?.[locale]?.trim();
    }
    if (v) (merged as Record<string, string>)[field] = v;
  }
  return merged;
}

export const CONTACT_CMS_FIELD_META: {
  name: string;
  label: string;
  rows: number;
}[] = [
  { name: "contact_ui_kicker", label: "Ligne d’épingle (kicker)", rows: 2 },
  { name: "contact_ui_heading", label: "Titre principal", rows: 3 },
  { name: "contact_ui_addressLabel", label: "Libellé « Adresse »", rows: 2 },
  { name: "contact_ui_thankYou", label: "Message après envoi réussi", rows: 4 },
  { name: "contact_ui_labelName", label: "Libellé champ nom", rows: 2 },
  { name: "contact_ui_phName", label: "Placeholder nom", rows: 2 },
  { name: "contact_ui_labelEmail", label: "Libellé courriel", rows: 2 },
  { name: "contact_ui_phEmail", label: "Placeholder courriel", rows: 2 },
  { name: "contact_ui_labelRef", label: "Libellé réf. catalogue", rows: 2 },
  { name: "contact_ui_phRef", label: "Placeholder référence", rows: 2 },
  { name: "contact_ui_labelMessage", label: "Libellé message", rows: 2 },
  { name: "contact_ui_phMessage", label: "Placeholder message", rows: 4 },
  { name: "contact_ui_submit", label: "Bouton envoyer", rows: 2 },
  { name: "contact_ui_submitSending", label: "Bouton pendant l’envoi", rows: 2 },
  { name: "contact_ui_sendError", label: "Message d’erreur d’envoi", rows: 3 },
  { name: "contact_ui_footnote", label: "Note sous le bouton", rows: 3 },
];
