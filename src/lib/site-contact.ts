/** Coordonnées par défaut — repli si l’admin n’a pas encore enregistré de valeurs. */
export const SITE_CONTACT = {
  email: "cirtagallery@gmail.com",
  phoneDisplay: "514 594 4467",
  /** E.164 sans espaces pour tel: et wa.me */
  phoneE164Digits: "15145944467",
  addressLines: [
    "7707, rue Shelley",
    "Coin Saint-Michel et Crémazie",
    "Marché aux puces · Antiquités",
    "Kiosque no. 202",
  ],
  social: {
    facebook: "https://www.facebook.com/marketplace/profile/61554565271105/",
    instagram:
      "https://www.instagram.com/cirta.art?igsh=MXZzbHR2cW5laTJkdg%3D%3D",
    pinterest: "https://www.pinterest.com/visionaffaire/",
    ebay: "https://www.ebay.com/usr/cirta_gallery",
    whatnot: "https://www.whatnot.com/fr-FR/user/cirtagallery",
  },
} as const;

export type ResolvedSiteContact = {
  email: string;
  phoneDisplay: string;
  phoneE164Digits: string;
  addressLines: string[];
};

/** Coordonnées vitrine : uniquement ce qui est enregistré dans l’admin (vide = masqué). */
export function resolveSiteContact(
  settings: Record<string, string> = {},
): ResolvedSiteContact {
  const email = settings.contact_email?.trim() ?? "";
  const phoneDisplay = settings.contact_phone_display?.trim() ?? "";
  const phoneE164Digits =
    settings.contact_phone_e164?.trim().replace(/\D/g, "") ?? "";
  const addressRaw = settings.contact_address?.trim() ?? "";
  const addressLines = addressRaw
    ? addressRaw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean)
    : [];

  return { email, phoneDisplay, phoneE164Digits, addressLines };
}

export function hasPublicContactCoordinates(c: ResolvedSiteContact): boolean {
  return Boolean(
    c.email || c.phoneDisplay || c.phoneE164Digits || c.addressLines.length > 0,
  );
}

export function mailtoHref(contact?: ResolvedSiteContact) {
  const c = contact ?? resolveSiteContact({});
  return `mailto:${c.email}`;
}

export function telHref(contact?: ResolvedSiteContact) {
  const c = contact ?? resolveSiteContact({});
  return `tel:+${c.phoneE164Digits}`;
}

export function whatsAppHref(contact?: ResolvedSiteContact) {
  const c = contact ?? resolveSiteContact({});
  return `https://wa.me/${c.phoneE164Digits}`;
}

/** @deprecated Préférer mailtoHref(resolveSiteContact(settings)) */
export function siteMailtoHref() {
  return mailtoHref();
}

/** @deprecated Préférer telHref(resolveSiteContact(settings)) */
export function siteTelHref() {
  return telHref();
}

/** @deprecated Préférer whatsAppHref(resolveSiteContact(settings)) */
export function siteWhatsAppHref() {
  return whatsAppHref();
}

export const DEFAULT_CONTACT_EMAIL_SUBJECT = "[Cirta Gallery — Contact] {name}";

export function resolveContactEmailSubject(
  settings: Record<string, string>,
  name: string,
): string {
  const template =
    settings.contact_email_subject?.trim() || DEFAULT_CONTACT_EMAIL_SUBJECT;
  return template.replace(/\{name\}/g, name);
}
