"use client";

import Image from "next/image";
import Link from "next/link";
import { FooterExtraLinks } from "@/components/FooterExtraLinks";
import {
  MailPhoneLinksRow,
  SiteAddressLines,
  SocialNetworksRow,
} from "@/components/SocialAndContactLinks";
import { useLocale } from "@/context/LocaleContext";
import { footerCopyrightLine, footerCopy } from "@/lib/public-ui-i18n";

export function Footer() {
  const { locale } = useLocale();
  const f = footerCopy[locale];

  const footerNav = [
    { href: "#collection", label: f.navCollection },
    { href: "#featured", label: f.navSalon },
    { href: "#about", label: f.navAbout },
    { href: "#contact", label: f.navContact },
  ];

  const policies = [
    { href: "#", label: f.policyReturn },
    { href: "#", label: f.policyShipping },
    { href: "#", label: f.policyHours },
    { href: "#contact", label: f.policyLegal },
  ];

  return (
    <footer className="border-t border-cirta-brown/12 bg-cirta-sand paper-wash">
      <div className="site-container section-pad-tight md:py-20">
        <div className="grid grid-cols-1 gap-12 md:gap-14 lg:grid-cols-12 lg:gap-x-10 xl:gap-x-14">
          <div className="min-w-0 lg:col-span-4">
            <Link
              href="/"
              className="group inline-block max-w-[10.5rem] focus:outline-none focus-visible:ring-2 focus-visible:ring-cirta-gold/45 focus-visible:ring-offset-2 focus-visible:ring-offset-cirta-sand sm:max-w-[11.5rem]"
            >
              <Image
                src="/cirta-gallery-logo.png"
                alt="Cirta Gallery"
                width={1024}
                height={1024}
                className="h-auto w-full object-contain drop-shadow-[0_4px_18px_rgba(61,48,38,0.18)] transition duration-300 group-hover:brightness-105 group-hover:drop-shadow-[0_6px_22px_rgba(61,48,38,0.24)]"
              />
            </Link>
            <p className="mt-4 text-[0.62rem] font-semibold uppercase tracking-[0.38em] text-cirta-gold-dim">
              {f.brandTagline}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-cirta-brown/60">{f.blurb}</p>
          </div>

          <div className="grid min-w-0 gap-10 sm:grid-cols-2 sm:gap-x-8 lg:col-span-4 lg:gap-x-10 xl:gap-x-12">
            <nav aria-label={f.siteMapAria} className="min-w-0 space-y-3">
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-cirta-brown/40">
                {f.navTitle}
              </p>
              <ul className="space-y-2 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-cirta-brown/55">
                {footerNav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="transition hover:text-cirta-brown">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <FooterExtraLinks cataloguePanierLabel={f.cataloguePanier} />
            </nav>
            <nav
              aria-label={f.serviceTitle}
              className="min-w-0 space-y-3 sm:border-l sm:border-cirta-brown/10 sm:pl-8 lg:pl-10"
            >
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-cirta-brown/40">
                {f.serviceTitle}
              </p>
              <ul className="space-y-2 text-sm text-cirta-brown/60">
                {policies.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="transition hover:text-cirta-gold-dim">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex min-w-0 flex-col gap-10 lg:col-span-4 lg:border-l lg:border-cirta-brown/10 lg:pl-10 xl:pl-12">
            <div className="text-sm text-cirta-brown/65">
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-cirta-brown/42">
                {f.visitsTitle}
              </p>
              <SiteAddressLines className="mt-3 leading-relaxed" />
              <MailPhoneLinksRow locale={locale} />
            </div>

            <div className="border-t border-cirta-brown/10 pt-8">
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-cirta-brown/42">
                {f.socialTitle}
              </p>
              <SocialNetworksRow locale={locale} className="mt-4" />
              <p className="mt-6">
                <Link
                  href="/admin/login"
                  className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-cirta-brown/50 underline-offset-4 transition hover:text-cirta-gold-dim hover:underline"
                >
                  {f.adminFooterLink}
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="ornament-rule mt-12 opacity-45 md:mt-14" />
        <div className="mt-8 flex flex-col gap-2 text-[0.68rem] text-cirta-brown/42 sm:flex-row sm:items-center sm:justify-between">
          <p>{footerCopyrightLine(locale, new Date().getFullYear())}</p>
          <p className="font-mono text-[0.62rem] tracking-wide">{f.legalLine}</p>
        </div>
      </div>
    </footer>
  );
}
