import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const items = await prisma.faqChatEntry.findMany({
      where: { enabled: true },
      orderBy: { sortOrder: "asc" },
      select: { id: true, question: true, answer: true },
    });
    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ items: [] as { id: string; question: string; answer: string }[] });
  }
}
