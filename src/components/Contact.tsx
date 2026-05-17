"use client";

import { useState } from "react";
import {
  MailPhoneLinksRow,
  SiteAddressLines,
  SocialNetworksRow,
} from "@/components/SocialAndContactLinks";
import { useLocale } from "@/context/LocaleContext";
import { getContactCopyMerged } from "@/lib/contact-settings";
import { cmsMirror, footerCopy } from "@/lib/public-ui-i18n";

export function Contact({
  intro = cmsMirror.fr.contactIntro,
  settings = {},
}: {
  intro?: string;
  settings?: Record<string, string>;
}) {
  const { locale } = useLocale();
  const mirror = cmsMirror[locale];
  const t = getContactCopyMerged(locale, settings);
  const introT = locale === "fr" ? (intro ?? mirror.contactIntro) : mirror.contactIntro;

  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative border-t border-cirta-brown/15 bg-cirta-ink text-cirta-sand"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.1] texture-grain" />
      <div
        className="pointer-events-none absolute inset-0 opacity-28 texture-silk"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 md:px-10 md:py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.36em] text-cirta-gold">
              {t.kicker}
            </p>
            <div className="ornament-rule my-7 max-w-[10rem] opacity-55" />
            <h2
              id="contact-heading"
              className="font-serif text-[clamp(1.85rem,3.5vw,2.6rem)] font-medium leading-tight tracking-tight"
            >
              {t.heading}
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-cirta-sand/62">{introT}</p>
            <address className="mt-10 not-italic text-sm leading-relaxed text-cirta-sand/58">
              <p className="font-semibold uppercase tracking-[0.18em] text-cirta-sand/78">
                {t.addressLabel}
              </p>
              <SiteAddressLines className="mt-2" />
              <MailPhoneLinksRow locale={locale} tone="ink" />
              <div className="mt-6">
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-cirta-sand/55">
                  {footerCopy[locale].socialTitle}
                </p>
                <SocialNetworksRow locale={locale} className="mt-3" tone="ink" />
              </div>
            </address>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <div className="relative rounded-sm border border-cirta-gold/50 bg-cirta-sand p-[1px] shadow-[0_28px_56px_-24px_rgba(15,15,15,0.45)]">
              <div className="bg-gradient-to-b from-cirta-sand via-cirta-sand to-[color-mix(in_srgb,var(--cirta-sand)_88%,var(--cirta-brown)_12%)] px-6 py-10 text-cirta-brown md:px-10 md:py-12">
                {sent ? (
                  <p className="font-serif text-xl font-medium leading-snug text-cirta-brown">
                    {t.thankYou}
                  </p>
                ) : (
                  <form
                    className="space-y-7"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setError(null);
                      const fd = new FormData(e.currentTarget);
                      const name = String(fd.get("name") ?? "").trim();
                      const email = String(fd.get("email") ?? "").trim();
                      const reference = String(fd.get("reference") ?? "").trim();
                      const message = String(fd.get("message") ?? "").trim();
                      setBusy(true);
                      try {
                        const res = await fetch("/api/contact", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ name, email, reference, message }),
                        });
                        if (!res.ok) {
                          setError(t.sendError);
                          return;
                        }
                        setSent(true);
                      } catch {
                        setError(t.sendError);
                      } finally {
                        setBusy(false);
                      }
                    }}
                  >
                    {error ? (
                      <p className="text-sm text-red-800" role="alert">
                        {error}
                      </p>
                    ) : null}
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label
                          htmlFor="name"
                          className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-cirta-brown"
                        >
                          {t.labelName}
                        </label>
                        <input
                          id="name"
                          name="name"
                          required
                          disabled={busy}
                          autoComplete="name"
                          className="w-full border border-cirta-brown/20 bg-white/70 px-4 py-3 text-base text-cirta-brown outline-none ring-cirta-gold/35 transition placeholder:text-cirta-brown/40 focus:border-cirta-gold focus:ring-2 focus:ring-cirta-gold/30 disabled:opacity-60"
                          placeholder={t.phName}
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-cirta-brown"
                        >
                          {t.labelEmail}
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          disabled={busy}
                          autoComplete="email"
                          className="w-full border border-cirta-brown/20 bg-white/70 px-4 py-3 text-base text-cirta-brown outline-none ring-cirta-gold/35 transition placeholder:text-cirta-brown/40 focus:border-cirta-gold focus:ring-2 focus:ring-cirta-gold/30 disabled:opacity-60"
                          placeholder={t.phEmail}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="reference"
                        className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-cirta-brown"
                      >
                        {t.labelRef}
                      </label>
                      <input
                        id="reference"
                        name="reference"
                        disabled={busy}
                        className="w-full border border-cirta-brown/20 bg-white/70 px-4 py-3 text-base text-cirta-brown outline-none ring-cirta-gold/35 transition placeholder:text-cirta-brown/40 focus:border-cirta-gold focus:ring-2 focus:ring-cirta-gold/30 disabled:opacity-60"
                        placeholder={t.phRef}
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="message"
                        className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-cirta-brown"
                      >
                        {t.labelMessage}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        disabled={busy}
                        rows={5}
                        className="w-full resize-y border border-cirta-brown/20 bg-white/70 px-4 py-3 text-base leading-relaxed text-cirta-brown outline-none ring-cirta-gold/35 transition placeholder:text-cirta-brown/40 focus:border-cirta-gold focus:ring-2 focus:ring-cirta-gold/30 disabled:opacity-60"
                        placeholder={t.phMessage}
                      />
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <button
                        type="submit"
                        disabled={busy}
                        className="inline-flex items-center justify-center border border-cirta-gold bg-cirta-gold px-10 py-3.5 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-cirta-brown transition hover:bg-cirta-brown hover:text-cirta-sand disabled:opacity-50"
                      >
                        {busy ? t.submitSending : t.submit}
                      </button>
                      <p className="max-w-sm text-[0.72rem] font-medium leading-relaxed text-cirta-brown/72">
                        {t.footnote}
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
