"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { type SiteLocale, isSiteLocale } from "@/lib/site-i18n";

const STORAGE_KEY = "cirta-site-locale";
const DEFAULT_LOCALE: SiteLocale = "fr";

function readStoredLocale(): SiteLocale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  const v = window.localStorage.getItem(STORAGE_KEY);
  if (v && isSiteLocale(v)) return v;
  return DEFAULT_LOCALE;
}

function documentLang(locale: SiteLocale): string {
  return locale === "zh" ? "zh-Hans" : locale;
}

type LocaleContextValue = {
  locale: SiteLocale;
  setLocale: (locale: SiteLocale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<SiteLocale>(DEFAULT_LOCALE);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setLocaleState(readStoredLocale());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = documentLang(locale);
  }, [locale, ready]);

  const setLocale = useCallback((next: SiteLocale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = documentLang(next);
  }, []);

  const value = useMemo(() => ({ locale, setLocale }), [locale, setLocale]);

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}
