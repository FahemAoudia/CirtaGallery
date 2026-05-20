/** Emplacement / vue de la pièce (7 vues max). */
export type ProductImageSlot =
  | "front"
  | "right"
  | "left"
  | "top"
  | "bottom"
  | "back"
  | "default";

export type ProductImageEntry = {
  slot: ProductImageSlot;
  url: string;
  width: number;
  height: number;
  /** Légende française affichée sous l’image (fiche zoom). */
  caption: string;
};

export const PRODUCT_IMAGE_SLOTS: readonly {
  slot: ProductImageSlot;
  labelFr: string;
}[] = [
  { slot: "front", labelFr: "Face avant" },
  { slot: "right", labelFr: "Côté droit" },
  { slot: "left", labelFr: "Côté gauche" },
  { slot: "top", labelFr: "Vue de dessus" },
  { slot: "bottom", labelFr: "Vue de dessous" },
  { slot: "back", labelFr: "Face arrière" },
  { slot: "default", labelFr: "Vue par défaut" },
] as const;

const SLOT_ORDER = PRODUCT_IMAGE_SLOTS.map((s) => s.slot);

export function slotLabelFr(slot: ProductImageSlot): string {
  return PRODUCT_IMAGE_SLOTS.find((s) => s.slot === slot)?.labelFr ?? slot;
}

export function displayCaption(entry: ProductImageEntry): string {
  const c = entry.caption.trim();
  return c || slotLabelFr(entry.slot);
}

function isSlot(v: unknown): v is ProductImageSlot {
  return (
    typeof v === "string" &&
    (PRODUCT_IMAGE_SLOTS as readonly { slot: string }[]).some((s) => s.slot === v)
  );
}

function normalizeEntry(raw: unknown): ProductImageEntry | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  if (!isSlot(o.slot) || typeof o.url !== "string") return null;
  const url = o.url.trim();
  if (!url) return null;
  const width = typeof o.width === "number" && o.width > 0 ? o.width : 880;
  const height = typeof o.height === "number" && o.height > 0 ? o.height : 1100;
  const caption = typeof o.caption === "string" ? o.caption.trim() : "";
  return { slot: o.slot, url, width, height, caption };
}

/** Parse JSON stocké en base ; repli sur l’image principale legacy. */
export function parseProductImages(
  imagesJson: string | null | undefined,
  legacy?: { image: string; width: number; height: number },
): ProductImageEntry[] {
  const bySlot = new Map<ProductImageSlot, ProductImageEntry>();

  if (imagesJson?.trim()) {
    try {
      const parsed = JSON.parse(imagesJson) as unknown;
      if (Array.isArray(parsed)) {
        for (const raw of parsed) {
          const e = normalizeEntry(raw);
          if (e) bySlot.set(e.slot, e);
        }
      }
    } catch {
      /* ignore */
    }
  }

  if (legacy?.image?.trim() && !bySlot.has("front")) {
    bySlot.set("front", {
      slot: "front",
      url: legacy.image.trim(),
      width: legacy.width || 880,
      height: legacy.height || 1100,
      caption: "",
    });
  }

  return SLOT_ORDER.filter((s) => bySlot.has(s)).map((s) => bySlot.get(s)!);
}

export function serializeProductImages(entries: ProductImageEntry[]): string {
  const ordered = SLOT_ORDER.map((slot) => entries.find((e) => e.slot === slot)).filter(
    (e): e is ProductImageEntry => e != null && e.url.trim().length > 0,
  );
  return JSON.stringify(ordered);
}

/** Image vitrine (carte catalogue) : face avant, sinon première vue, sinon legacy. */
export function primaryCatalogImage(
  images: ProductImageEntry[],
  legacy?: { image: string; width: number; height: number },
): { image: string; width: number; height: number } {
  const front = images.find((e) => e.slot === "front");
  const first = images[0];
  const pick = front ?? first;
  if (pick) {
    return { image: pick.url, width: pick.width, height: pick.height };
  }
  return {
    image: legacy?.image?.trim() || "",
    width: legacy?.width || 880,
    height: legacy?.height || 1100,
  };
}

export function galleryFromJson(
  imagesJson: string | null | undefined,
  legacy: { image: string; width: number; height: number },
): ProductImageEntry[] {
  const list = parseProductImages(imagesJson, legacy);
  return list.length > 0 ? list : [];
}

/** Lit le formulaire admin (champs par emplacement). */
export function parseProductImagesFromForm(
  formData: FormData,
  fallbackWidth: number,
  fallbackHeight: number,
): ProductImageEntry[] {
  const entries: ProductImageEntry[] = [];
  for (const { slot } of PRODUCT_IMAGE_SLOTS) {
    const url = String(formData.get(`image_${slot}_url`) ?? "").trim();
    if (!url) continue;
    const caption = String(formData.get(`image_${slot}_caption`) ?? "").trim();
    const width = Number(formData.get(`image_${slot}_width`)) || fallbackWidth;
    const height = Number(formData.get(`image_${slot}_height`)) || fallbackHeight;
    entries.push({ slot, url, width, height, caption });
  }
  return entries;
}

export function emptySlotState(
  initial?: ProductImageEntry[],
): Record<ProductImageSlot, { url: string; caption: string; width: number; height: number }> {
  const map = Object.fromEntries(
    PRODUCT_IMAGE_SLOTS.map(({ slot }) => [
      slot,
      { url: "", caption: "", width: 880, height: 1100 },
    ]),
  ) as Record<ProductImageSlot, { url: string; caption: string; width: number; height: number }>;

  for (const e of initial ?? []) {
    map[e.slot] = {
      url: e.url,
      caption: e.caption,
      width: e.width,
      height: e.height,
    };
  }
  return map;
}
