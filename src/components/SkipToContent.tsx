"use client";

import { useLocale } from "@/context/LocaleContext";
import { shellCopy } from "@/lib/public-ui-i18n";

export function SkipToContent() {
  const { locale } = useLocale();
  const t = shellCopy[locale];
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-cirta-sand focus:px-3 focus:py-2 focus:text-cirta-brown"
    >
      {t.skipToContent}
    </a>
  );
}
