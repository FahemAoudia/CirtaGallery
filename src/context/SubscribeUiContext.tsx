"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Sub = {
  openSubscribe: () => void;
  closeSubscribe: () => void;
  subscribeOpen: boolean;
};

const SubCtx = createContext<Sub | null>(null);

export function SubscribeUiProvider({ children }: { children: ReactNode }) {
  const [subscribeOpen, setSubscribeOpen] = useState(false);

  const openSubscribe = useCallback(() => setSubscribeOpen(true), []);
  const closeSubscribe = useCallback(() => setSubscribeOpen(false), []);

  const value = useMemo(
    () => ({
      openSubscribe,
      closeSubscribe,
      subscribeOpen,
    }),
    [openSubscribe, closeSubscribe, subscribeOpen],
  );

  return <SubCtx.Provider value={value}>{children}</SubCtx.Provider>;
}

export function useSubscribeUi() {
  const v = useContext(SubCtx);
  if (!v) throw new Error("SubscribeUiProvider manquant");
  return v;
}
