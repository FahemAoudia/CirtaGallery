"use client";

import { usePathname } from "next/navigation";
import { SubscribeDialog } from "@/components/SubscribeDialog";
import { SubscribeQuickFab } from "@/components/SubscribeQuickFab";

/** Abonnement newsletter : masqué dans l’espace admin. */
export function SubscribeGate() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) {
    return null;
  }
  return (
    <>
      <SubscribeDialog />
      <SubscribeQuickFab />
    </>
  );
}
