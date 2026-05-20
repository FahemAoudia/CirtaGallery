/** Anciennes clés formulaire contact (à purger en base). */
export const LEGACY_CONTACT_SETTING_PREFIXES = [
  "contact_ui_",
  "__i18n__contact_ui",
] as const;

/** Clés Contact éditables dans l’admin (paramètres du site). */
export const CONTACT_INFO_KEYS = [
  "contact_intro",
  "contact_heading",
  "contact_email",
  "contact_phone_display",
  "contact_phone_e164",
  "contact_address",
  "contact_email_subject",
] as const;
