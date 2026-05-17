"use client";

import { usePathname } from "next/navigation";
import { FaqChatDock } from "@/components/FaqChatDock";

export function FaqChatGate() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) {
    return null;
  }
  return <FaqChatDock />;
}
