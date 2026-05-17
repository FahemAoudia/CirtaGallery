"use client";

import { useRef, useState } from "react";
import { AdminConfirmModal } from "@/components/admin/AdminConfirmModal";

export function ConfirmDeleteForm({
  action,
  confirmMessage,
  confirmTitle,
  confirmLabel,
  tone = "danger",
  className,
  children,
}: {
  action: (formData: FormData) => Promise<void>;
  confirmMessage: string;
  /** Titre de la modale (défaut : Confirmer) */
  confirmTitle?: string;
  confirmLabel?: string;
  tone?: "danger" | "neutral";
  className?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const allowSubmitRef = useRef(false);

  return (
    <>
      <form
        ref={formRef}
        className={className}
        action={action}
        onSubmit={(e) => {
          if (allowSubmitRef.current) {
            allowSubmitRef.current = false;
            return;
          }
          e.preventDefault();
          setOpen(true);
        }}
      >
        {children}
      </form>
      {open ? (
        <AdminConfirmModal
          title={confirmTitle ?? (tone === "danger" ? "Confirmer la suppression" : "Confirmer")}
          message={confirmMessage}
          confirmLabel={confirmLabel ?? (tone === "danger" ? "Supprimer" : "Confirmer")}
          tone={tone}
          onCancel={() => setOpen(false)}
          onConfirm={() => {
            allowSubmitRef.current = true;
            setOpen(false);
            queueMicrotask(() => formRef.current?.requestSubmit());
          }}
        />
      ) : null}
    </>
  );
}
