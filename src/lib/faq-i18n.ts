import { parseEntityI18n } from "@/lib/content-i18n";
import type { SiteLocale } from "@/lib/site-i18n";

export type FaqI18nFields = { question?: string; answer?: string };

export function localizeFaqEntry(
  locale: SiteLocale,
  entry: { question: string; answer: string; translationsJson?: string | null },
): { question: string; answer: string } {
  if (locale === "fr") {
    return { question: entry.question, answer: entry.answer };
  }
  const fromDb = parseEntityI18n<FaqI18nFields>(entry.translationsJson ?? undefined)?.[locale];
  if (fromDb?.question?.trim() && fromDb?.answer?.trim()) {
    return {
      question: fromDb.question.trim(),
      answer: fromDb.answer.trim(),
    };
  }
  return { question: entry.question, answer: entry.answer };
}
