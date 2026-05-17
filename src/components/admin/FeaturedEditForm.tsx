import Link from "next/link";
import type { FeaturedPiece } from "@prisma/client";
import { createFeatured, saveFeatured } from "@/app/admin/_actions";
import { AdminImageField } from "@/components/admin/AdminImageField";

export function FeaturedEditForm({ piece }: { piece?: FeaturedPiece }) {
  const isNew = !piece;

  if (isNew) {
    return (
      <form action={createFeatured} className="max-w-xl space-y-4">
        <div className="space-y-1">
          <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cirta-brown/50">
            Réf. planche
          </label>
          <input name="catalogRef" className="w-full border border-cirta-brown/15 bg-white px-3 py-2 text-sm" />
        </div>
        <div className="space-y-1">
          <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cirta-brown/50">
            Titre
          </label>
          <input name="title" required className="w-full border border-cirta-brown/15 bg-white px-3 py-2 text-sm" />
        </div>
        <div className="space-y-1">
          <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cirta-brown/50">
            Sous-titre / matière
          </label>
          <input name="meta" className="w-full border border-cirta-brown/15 bg-white px-3 py-2 text-sm" />
        </div>
        <div className="space-y-1">
          <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cirta-brown/50">
            Description
          </label>
          <textarea
            name="description"
            rows={5}
            className="w-full border border-cirta-brown/15 bg-white px-3 py-2 text-sm"
          />
        </div>
        <AdminImageField initialUrl="" />
        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-1">
            <label className="block text-[0.65rem] font-semibold uppercase text-cirta-brown/50">Largeur</label>
            <input name="width" type="number" defaultValue={1200} className="w-full border px-2 py-1.5 text-sm" />
          </div>
          <div className="space-y-1">
            <label className="block text-[0.65rem] font-semibold uppercase text-cirta-brown/50">Hauteur</label>
            <input name="height" type="number" defaultValue={1500} className="w-full border px-2 py-1.5 text-sm" />
          </div>
          <div className="space-y-1">
            <label className="block text-[0.65rem] font-semibold uppercase text-cirta-brown/50">Ordre</label>
            <input name="sortOrder" type="number" defaultValue={0} className="w-full border px-2 py-1.5 text-sm" />
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="border border-cirta-gold/50 bg-cirta-gold/15 px-5 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.12em]"
          >
            Créer
          </button>
          <Link href="/admin/featured" className="border border-cirta-brown/15 px-5 py-2 text-[0.65rem] uppercase">
            Retour
          </Link>
        </div>
      </form>
    );
  }

  return (
    <form action={saveFeatured} className="max-w-xl space-y-4">
      <input type="hidden" name="id" value={piece.id} />
      <div className="space-y-1">
        <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cirta-brown/50">
          Réf. planche
        </label>
        <input
          name="catalogRef"
          defaultValue={piece.catalogRef}
          className="w-full border border-cirta-brown/15 bg-white px-3 py-2 text-sm"
        />
      </div>
      <div className="space-y-1">
        <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cirta-brown/50">
          Titre
        </label>
        <input
          name="title"
          required
          defaultValue={piece.title}
          className="w-full border border-cirta-brown/15 bg-white px-3 py-2 text-sm"
        />
      </div>
      <div className="space-y-1">
        <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cirta-brown/50">
          Sous-titre / matière
        </label>
        <input name="meta" defaultValue={piece.meta} className="w-full border border-cirta-brown/15 bg-white px-3 py-2 text-sm" />
      </div>
      <div className="space-y-1">
        <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cirta-brown/50">
          Description
        </label>
        <textarea
          name="description"
          rows={5}
          defaultValue={piece.description}
          className="w-full border border-cirta-brown/15 bg-white px-3 py-2 text-sm"
        />
      </div>
      <AdminImageField initialUrl={piece.image} />
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className="block text-[0.65rem] font-semibold uppercase text-cirta-brown/50">Largeur</label>
          <input
            name="width"
            type="number"
            defaultValue={piece.width}
            className="w-full border px-2 py-1.5 text-sm"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-[0.65rem] font-semibold uppercase text-cirta-brown/50">Hauteur</label>
          <input
            name="height"
            type="number"
            defaultValue={piece.height}
            className="w-full border px-2 py-1.5 text-sm"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-[0.65rem] font-semibold uppercase text-cirta-brown/50">Ordre</label>
          <input
            name="sortOrder"
            type="number"
            defaultValue={piece.sortOrder}
            className="w-full border px-2 py-1.5 text-sm"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="submit"
          className="border border-cirta-gold/50 bg-cirta-gold/15 px-5 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.12em]"
        >
          Enregistrer
        </button>
        <Link href="/admin/featured" className="border border-cirta-brown/15 px-5 py-2 text-[0.65rem] uppercase">
          Retour
        </Link>
      </div>
    </form>
  );
}
