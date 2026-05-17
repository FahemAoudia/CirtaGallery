import { NextResponse } from "next/server";
import { fetchPayPalOrder } from "@/lib/paypal";
import { prisma } from "@/lib/prisma";

/**
 * Après capture côté client (PayPal JS SDK).
 * Vérifie le statut COMPLETED et enregistre l’abonné PayPal.
 * Les fonds vont sur le compte PayPal lié au Client ID / Secret (idéalement visionaffaire1@gmail.com).
 */
export async function POST(req: Request) {
  let body: { orderID?: string; email?: string; name?: string };
  try {
    body = (await req.json()) as { orderID?: string; email?: string; name?: string };
  } catch {
    return NextResponse.json({ error: "Corps invalide" }, { status: 400 });
  }
  const orderID = body.orderID?.trim();
  if (!orderID) {
    return NextResponse.json({ error: "orderID manquant" }, { status: 400 });
  }

  let order: { status: string; payerEmail?: string };
  try {
    order = await fetchPayPalOrder(orderID);
    if (order.status !== "COMPLETED") {
      return NextResponse.json(
        { error: `Commande non finalisée (${order.status})` },
        { status: 400 },
      );
    }
  } catch (e) {
    const msg = e instanceof Error ? e.message : "PayPal indisponible";
    return NextResponse.json({ error: msg }, { status: 502 });
  }

  const payerEmail = order.payerEmail;
  const email = (body.email?.trim().toLowerCase() || payerEmail || "").trim();
  if (!email) {
    return NextResponse.json({ error: "Impossible de déterminer l’email" }, { status: 400 });
  }

  const name = body.name?.trim() || null;

  await prisma.subscriber.upsert({
    where: { email },
    create: {
      email,
      name,
      source: "paypal",
      paypalOrderId: orderID,
    },
    update: {
      name: name ?? undefined,
      source: "paypal",
      paypalOrderId: orderID,
    },
  });

  return NextResponse.json({ ok: true });
}
