"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * Hero ribbon links use `/?ruban=…#collection` with `scroll={false}` so Next
 * does not jump to the top. This scrolls to `#collection` after the route updates.
 */
export function ScrollToCollectionOnHash() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname !== "/") return;
    const run = () => {
      if (typeof window === "undefined") return;
      if (window.location.hash !== "#collection") return;
      document.getElementById("collection")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    };
    const id = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(run);
    });
    return () => window.cancelAnimationFrame(id);
  }, [pathname, searchParams]);

  return null;
}
