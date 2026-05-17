import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Noto_Sans_Arabic } from "next/font/google";
import { SiteShell } from "@/components/SiteShell";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto-arabic",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
};

export const metadata: Metadata = {
  title: "Cirta Gallery Antiquités — Voyage dans le temps ancien",
  description:
    "Galerie de prestige : porcelaines chinoises, bronzes bouddhiques, iberique et novohispano, monnaies, manuscrits, lampes et mobilier de collection.",
  openGraph: {
    title: "Cirta Gallery Antiquités",
    description:
      "Une chambre forte numérique pour œuvres authentiques venues des quatre continents.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${cormorant.variable} ${dmSans.variable} ${notoArabic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-cirta-brown">
        <SiteShell paypalClientId={process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}>
          {children}
        </SiteShell>
      </body>
    </html>
  );
}
