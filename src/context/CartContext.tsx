"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CatalogItem } from "@/lib/collection";

export type CartLine = {
  sku: string;
  title: string;
  image: string;
  priceCad: number;
  qty: number;
};

const STORAGE = "cirta-cart-v1";

type CartState = {
  lines: CartLine[];
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  addItem: (item: CatalogItem, qty?: number) => void;
  setLineQty: (sku: string, qty: number) => void;
  removeLine: (sku: string) => void;
  clearCart: () => void;
  totalCad: number;
  lineCount: number;
  paypalClientId: string | undefined;
};

const CartCtx = createContext<CartState | null>(null);

function loadLines(): CartLine[] {
  try {
    if (typeof window === "undefined") return [];
    const raw = localStorage.getItem(STORAGE);
    if (!raw) return [];
    const data = JSON.parse(raw) as unknown;
    if (!Array.isArray(data)) return [];
    return data.filter(
      (row): row is CartLine =>
        row &&
        typeof row === "object" &&
        typeof (row as CartLine).sku === "string" &&
        typeof (row as CartLine).qty === "number" &&
        typeof (row as CartLine).priceCad === "number",
    );
  } catch {
    return [];
  }
}

export function CartProvider({
  children,
  paypalClientId,
}: {
  children: ReactNode;
  paypalClientId: string | undefined;
}) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    setLines(loadLines());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines, hydrated]);

  const addItem = useCallback((item: CatalogItem, qty = 1) => {
    if (item.priceCad <= 0) return;
    const q = Math.max(1, Math.min(99, Math.floor(qty)));
    setLines((prev) => {
      const i = prev.findIndex((l) => l.sku === item.id);
      if (i === -1) {
        return [
          ...prev,
          {
            sku: item.id,
            title: item.title,
            image: item.image,
            priceCad: item.priceCad,
            qty: q,
          },
        ];
      }
      const next = [...prev];
      const row = next[i]!;
      next[i] = {
        ...row,
        priceCad: item.priceCad,
        qty: Math.min(99, row.qty + q),
      };
      return next;
    });
    setCartOpen(true);
  }, []);

  const setLineQty = useCallback((sku: string, qty: number) => {
    const q = Math.max(0, Math.min(99, Math.floor(qty)));
    setLines((prev) => {
      if (q === 0) return prev.filter((l) => l.sku !== sku);
      return prev.map((l) => (l.sku === sku ? { ...l, qty: q } : l));
    });
  }, []);

  const removeLine = useCallback((sku: string) => {
    setLines((prev) => prev.filter((l) => l.sku !== sku));
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const totalCad = useMemo(
    () => lines.reduce((s, l) => s + l.priceCad * l.qty, 0),
    [lines],
  );

  const lineCount = useMemo(() => lines.reduce((s, l) => s + l.qty, 0), [lines]);

  const value = useMemo(
    () => ({
      lines,
      cartOpen,
      setCartOpen,
      addItem,
      setLineQty,
      removeLine,
      clearCart,
      totalCad,
      lineCount,
      paypalClientId,
    }),
    [
      lines,
      cartOpen,
      addItem,
      setLineQty,
      removeLine,
      clearCart,
      totalCad,
      lineCount,
      paypalClientId,
    ],
  );

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const v = useContext(CartCtx);
  if (!v) throw new Error("CartProvider manquant");
  return v;
}
