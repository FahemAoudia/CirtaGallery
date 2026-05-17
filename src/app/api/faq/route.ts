import { NextResponse } from "next/server";
import { localizeFaqEntry } from "@/lib/faq-i18n";
import { prisma } from "@/lib/prisma";
import { isSiteLocale } from "@/lib/site-i18n";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const rawLocale = searchParams.get("locale") ?? "fr";
  const locale = isSiteLocale(rawLocale) ? rawLocale : "fr";

  try {
    const rows = await prisma.faqChatEntry.findMany({
      where: { enabled: true },
      orderBy: { sortOrder: "asc" },
      select: { id: true, question: true, answer: true, translationsJson: true },
    });
    const items = rows.map((row) => {
      const text = localizeFaqEntry(locale, row);
      return { id: row.id, question: text.question, answer: text.answer };
    });
    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ items: [] as { id: string; question: string; answer: string }[] });
  }
}
