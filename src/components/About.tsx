"use client";

import Image from "next/image";
import { useLocale } from "@/context/LocaleContext";
import { aboutQuote } from "@/lib/site-i18n";
import { aboutSectionUi, cmsMirror } from "@/lib/public-ui-i18n";
import { ANTIQUE_IMG } from "@/lib/antique-images";

export function About({
  kicker,
  heading,
  p1,
  p2,
}: {
  kicker?: string;
  heading?: string;
  p1?: string;
  p2?: string;
}) {
  const { locale } = useLocale();
  const mirror = cmsMirror[locale];
  const ui = aboutSectionUi[locale];
  const quote = aboutQuote[locale];
  const quoteLang = locale === "zh" ? "zh-Hans" : locale;

  const showFrCms = locale === "fr";
  const kickerT = showFrCms ? (kicker ?? mirror.aboutKicker) : mirror.aboutKicker;
  const headingT = showFrCms ? (heading ?? mirror.aboutHeading) : mirror.aboutHeading;
  const p1T = showFrCms ? (p1 ?? mirror.aboutP1) : mirror.aboutP1;
  const p2T = showFrCms ? (p2 ?? mirror.aboutP2) : mirror.aboutP2;

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative overflow-hidden border-t border-cirta-brown/10 bg-cirta-sand paper-wash texture-grain"
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:px-10 md:py-28 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.36em] text-cirta-gold-dim">
              {kickerT}
            </p>
            <div className="ornament-rule my-7 max-w-[12rem]" />
            <h2
              id="about-heading"
              className="font-serif text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.1] tracking-tight text-cirta-brown"
            >
              {headingT}
            </h2>
            <p className="mt-8 text-pretty text-base leading-relaxed text-cirta-brown/72 md:text-lg">
              {p1T}
            </p>
            <p className="mt-5 text-pretty text-base leading-relaxed text-cirta-brown/72 md:text-lg">
              {p2T}
            </p>
            <blockquote
              className="mt-10 border-l-4 border-cirta-gold/45 pl-5 text-left font-serif text-lg italic leading-relaxed text-cirta-brown/85 md:text-xl"
              cite="#about"
              lang={quoteLang}
            >
              {quote}
            </blockquote>
            <dl className="mt-12 space-y-5 border-l border-cirta-gold/40 pl-6">
              <div>
                <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-cirta-brown/45">
                  {ui.promiseDt}
                </dt>
                <dd className="mt-1 font-serif text-lg text-cirta-brown">{ui.promiseDd}</dd>
              </div>
              <div>
                <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-cirta-brown/45">
                  {ui.rendezvousDt}
                </dt>
                <dd className="mt-1 text-cirta-brown/78">{ui.rendezvousDd}</dd>
              </div>
            </dl>
          </div>

          <div className="relative lg:col-span-6 lg:col-start-7">
            <div className="grid gap-6 sm:grid-cols-2">
              <figure className="relative sm:row-span-2">
                <div className="absolute -inset-2 border border-cirta-brown/10" />
                <div className="relative overflow-hidden shadow-[0_32px_64px_-36px_rgba(15,15,15,0.48)]">
                  <Image
                    src={ANTIQUE_IMG.aboutShelves}
                    alt={ui.figShelves}
                    width={900}
                    height={1200}
                    className="h-full min-h-[320px] w-full object-cover sm:min-h-[480px]"
                    sizes="(min-width: 1024px) 28vw, 45vw"
                  />
                </div>
                <figcaption className="mt-3 text-[0.62rem] uppercase tracking-[0.2em] text-cirta-brown/45">
                  {ui.figShelves}
                </figcaption>
              </figure>
              <figure className="relative sm:mt-16">
                <div className="relative overflow-hidden border border-cirta-brown/10 shadow-[0_26px_52px_-32px_rgba(15,15,15,0.42)]">
                  <Image
                    src={ANTIQUE_IMG.aboutDragonBronze}
                    alt={ui.figDragons}
                    width={700}
                    height={900}
                    className="h-56 w-full object-cover sm:h-72"
                    sizes="(min-width: 1024px) 22vw, 40vw"
                  />
                </div>
                <figcaption className="mt-3 text-[0.62rem] uppercase tracking-[0.2em] text-cirta-brown/45">
                  {ui.figDragons}
                </figcaption>
              </figure>
              <figure className="relative sm:-mt-8">
                <div className="relative overflow-hidden border border-cirta-brown/10 shadow-[0_26px_52px_-32px_rgba(15,15,15,0.42)]">
                  <Image
                    src={ANTIQUE_IMG.aboutMask}
                    alt={ui.figBronze}
                    width={700}
                    height={560}
                    className="h-48 w-full object-cover sm:h-56"
                    sizes="(min-width: 1024px) 22vw, 40vw"
                  />
                </div>
                <figcaption className="mt-3 text-[0.62rem] uppercase tracking-[0.2em] text-cirta-brown/45">
                  {ui.figBronze}
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
