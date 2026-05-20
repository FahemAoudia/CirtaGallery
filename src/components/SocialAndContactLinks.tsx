"use client";

import type { SiteLocale } from "@/lib/site-i18n";
import {
  resolveSiteContact,
  mailtoHref,
  telHref,
  whatsAppHref,
  SITE_CONTACT,
  type ResolvedSiteContact,
} from "@/lib/site-contact";
import { socialContactAria } from "@/lib/public-ui-i18n";

function iconFrame(tone: "sand" | "ink") {
  if (tone === "ink") {
    return "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-cirta-sand/30 text-cirta-sand/85 transition hover:border-cirta-gold/50 hover:bg-cirta-gold/12 hover:text-cirta-sand";
  }
  return "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-cirta-brown/18 text-cirta-brown/78 transition hover:border-cirta-gold/45 hover:bg-cirta-gold/10 hover:text-cirta-brown";
}

function SvgMailPhone({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.65}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  );
}

function IconMail() {
  return (
    <SvgMailPhone>
      <path d="M4 6h16v12H4z" />
      <path d="m4 7 8 6 8-6" />
    </SvgMailPhone>
  );
}

function IconPhone() {
  return (
    <SvgMailPhone>
      <path d="M6.5 3h4l2 5-2.5 1.5a12 12 0 0 0 5.5 5.5L17 12l5 2v4a2 2 0 0 1-2 2h-1C8.6 20 4 15.4 4 9.5V8a2 2 0 0 1 2-2z" />
    </SvgMailPhone>
  );
}

function IconWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M12.04 2a9.94 9.94 0 0 0-8.46 15.14L2 22l4.99-1.31A9.94 9.94 0 1 0 12.04 2zm5.44 14.24c-.24.67-1.42 1.28-1.98 1.35-.5.06-1.15.09-1.85-.17-.43-.14-.98-.35-1.69-.69-2.98-1.28-4.91-4.27-5.06-4.47-.15-.2-1.2-1.6-1.2-3.05s.76-2.17 1.03-2.47c.27-.3.6-.38.8-.38h.65c.21 0 .5-.08.78.6.27.67.93 2.31 1 2.48.08.17.01.4-.12.53-.13.14-.24.22-.46.38-.22.15-.42.27-.63.43-.2.15-.42.31-.18.6.24.3 1.05 1.55 2.26 2.5 1.56 1.24 2.87 1.6 3.28 1.78.4.18.64.15.88-.09.24-.24 1-1.12 1.27-1.5.27-.4.45-.33.76-.2.31.13 1.98.94 2.33 1.11.35.18.58.27.67.42.09.15.09.88-.15 1.55z" />
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M13.5 22v-8.2h2.7l.4-3.2h-3.1V8.9c0-.9.3-1.5 1.6-1.5h1.7V4.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.2v2.3H7v3.2h2.4V22h4.1z" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.65}
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconPinterest() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M12 2C6.5 2 2 6.5 2 12c0 4.1 2.4 7.6 5.8 9.2-.1-.8-.1-2 0-2.9.1-1.1.9-6.5.9-6.5s-.2-.5-.2-1.2c0-1.1.6-2 1.4-2 .7 0 1 .5 1 1.1 0 .7-.4 1.7-.7 2.6-.2.8.4 1.4 1.2 1.4 2.4 0 4.3-2.6 4.3-5.8 0-3-2-5.2-5.1-5.2-3.5 0-5.5 2.6-5.5 5.4 0 1.1.4 2.2 1 2.8.1.1.1.2.1.4l-.4 1.7c-.1.3-.2.4-.5.2-1.8-.9-3-3.6-3-5.8 0-4.7 3.4-8.5 9.5-8.5 5 0 8.9 3.6 8.9 8.3 0 4.9-3.1 8.9-7.4 8.9-1.5 0-2.8-.8-3.3-1.7l-.9 3.4c-.3 1.2-1.1 2.7-1.7 3.6 1.3.4 2.7.6 4.1.6 5.5 0 10-4.5 10-10C22 6.5 17.5 2 12 2z" />
    </svg>
  );
}

/** Wordmark path (monochrome); geometry from Simple Icons (CC0). */
function IconEbay() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M6.056 12.132v-4.92h1.2v3.026c.59-.703 1.402-.906 2.202-.906 1.34 0 2.828.904 2.828 2.855 0 .233-.015.457-.06.668.24-.953 1.274-1.305 2.896-1.344.51-.018 1.095-.018 1.56-.018v-.135c0-.885-.556-1.244-1.53-1.244-.72 0-1.245.3-1.305.81h-1.275c.136-1.29 1.5-1.62 2.686-1.62 1.064 0 1.995.27 2.415 1.02l-.436-.84h1.41l2.055 4.125 2.055-4.126H24l-3.72 7.305h-1.346l1.07-2.04-2.33-4.38c.13.255.2.555.2.93v2.46c0 .346.01.69.04 1.005H16.8a6.543 6.543 0 0 1-.046-.765c-.603.734-1.32.96-2.32.96-1.48 0-2.272-.78-2.272-1.695 0-.15.015-.284.037-.405-.3 1.246-1.36 2.086-2.767 2.086-.87 0-1.694-.315-2.2-.93 0 .24-.015.494-.04.734h-1.18c.02-.39.04-.855.04-1.245v-1.05h-4.83c.065 1.095.818 1.74 1.853 1.74.718 0 1.355-.3 1.568-.93h1.24c-.24 1.29-1.61 1.725-2.79 1.725C.95 15.009 0 13.822 0 12.232c0-1.754.982-2.91 3.116-2.91 1.688 0 2.93.886 2.94 2.806v.005zm9.137.183c-1.095.034-1.77.233-1.77.95 0 .465.36.97 1.305.97 1.26 0 1.935-.69 1.935-1.814v-.13c-.45 0-.99.006-1.484.022h.012zm-6.06 1.875c1.11 0 1.876-.806 1.876-2.02s-.768-2.02-1.893-2.02c-1.11 0-1.89.806-1.89 2.02s.765 2.02 1.875 2.02h.03zm-4.35-2.514c-.044-1.125-.854-1.546-1.725-1.546-.944 0-1.694.474-1.815 1.546z" />
    </svg>
  );
}

/** Monogramme « W » (Whatnot n’a pas d’icône officielle dans Simple Icons). */
function IconWhatnot() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.05}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 7l3.2 10.5L12 8.2l3.8 9.3L19 7" />
    </svg>
  );
}

type SocialNetworksRowProps = {
  locale: SiteLocale;
  className?: string;
  tone?: "sand" | "ink";
};

/** Facebook, Instagram, Pinterest, eBay, Whatnot, WhatsApp — icônes seules */
export function SocialNetworksRow({
  locale,
  className = "",
  tone = "sand",
}: SocialNetworksRowProps) {
  const a = socialContactAria[locale];
  const { facebook, instagram, pinterest, ebay, whatnot } = SITE_CONTACT.social;
  const wa = whatsAppHref();
  const ic = iconFrame(tone);

  return (
    <ul className={`flex flex-wrap items-center gap-2 ${className}`}>
      <li>
        <a
          href={facebook}
          target="_blank"
          rel="noopener noreferrer"
          className={ic}
          aria-label={a.facebook}
        >
          <IconFacebook />
        </a>
      </li>
      <li>
        <a
          href={instagram}
          target="_blank"
          rel="noopener noreferrer"
          className={ic}
          aria-label={a.instagram}
        >
          <IconInstagram />
        </a>
      </li>
      <li>
        <a
          href={pinterest}
          target="_blank"
          rel="noopener noreferrer"
          className={ic}
          aria-label={a.pinterest}
        >
          <IconPinterest />
        </a>
      </li>
      <li>
        <a
          href={ebay}
          target="_blank"
          rel="noopener noreferrer"
          className={ic}
          aria-label={a.ebay}
        >
          <IconEbay />
        </a>
      </li>
      <li>
        <a
          href={whatnot}
          target="_blank"
          rel="noopener noreferrer"
          className={ic}
          aria-label={a.whatnot}
        >
          <IconWhatnot />
        </a>
      </li>
      <li>
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className={ic}
          aria-label={a.whatsapp}
        >
          <IconWhatsApp />
        </a>
      </li>
    </ul>
  );
}

type MailPhoneRowProps = {
  locale: SiteLocale;
  linkClassName?: string;
  tone?: "sand" | "ink";
};

/** Courriel + téléphone avec icône */
export function MailPhoneLinksRow({
  locale,
  linkClassName,
  tone = "sand",
  contact,
}: MailPhoneRowProps & { contact?: ResolvedSiteContact }) {
  const c = contact ?? resolveSiteContact({});
  const a = socialContactAria[locale];
  const ic = iconFrame(tone);
  const defaultSand =
    "group inline-flex items-center gap-2.5 text-sm text-cirta-brown/70 underline-offset-4 transition hover:text-cirta-gold-dim hover:underline";
  const defaultInk =
    "group inline-flex items-center gap-2.5 text-sm text-cirta-sand/72 underline-offset-4 transition hover:text-cirta-gold";
  const base = linkClassName ?? (tone === "ink" ? defaultInk : defaultSand);

  return (
    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
      <a href={mailtoHref(c)} className={base} title={a.mail}>
        <span className={ic}>
          <IconMail />
        </span>
        <span>{c.email}</span>
      </a>
      <a href={telHref(c)} className={base} title={a.phone}>
        <span className={ic}>
          <IconPhone />
        </span>
        <span>{c.phoneDisplay}</span>
      </a>
    </div>
  );
}

export function SiteAddressLines({
  className = "",
  contact,
}: {
  className?: string;
  contact?: ResolvedSiteContact;
}) {
  const lines = (contact ?? resolveSiteContact({})).addressLines;
  return (
    <p className={className}>
      {lines.map((line, i) => (
        <span key={line}>
          {i > 0 ? <br /> : null}
          {line}
        </span>
      ))}
    </p>
  );
}
