/** Coordonnées réelles — affichées dans le pied de page et la section Contact */
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

export function siteTelHref() {
  return `tel:+${SITE_CONTACT.phoneE164Digits}`;
}

export function siteWhatsAppHref() {
  return `https://wa.me/${SITE_CONTACT.phoneE164Digits}`;
}

export function siteMailtoHref() {
  return `mailto:${SITE_CONTACT.email}`;
}
