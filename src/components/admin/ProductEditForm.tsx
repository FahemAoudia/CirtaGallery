import Link from "next/link";
import { saveProduct } from "@/app/admin/_actions";
import { AdminImageField } from "@/components/admin/AdminImageField";
import type { Product } from "@prisma/client";

type RibbonOpt = { id: string; label: string };
type FacetOpt = { id: string; label: string };

function selectedFacetIds(product: Product | undefined): Set<string> {
  if (!product?.facetsJson) return new Set();
  try {
    const f = JSON.parse(product.facetsJson) as unknown;
    if (!Array.isArray(f)) return new Set();
    return new Set(f.filter((x): x is string => typeof x === "string" && x.length > 0));
  } catch {
    return new Set();
  }
}

export function ProductEditForm({
  product,
  ribbons,
  facets,
}: {
  product?: Product;
  ribbons: RibbonOpt[];
  facets: FacetOpt[];
}) {
  const selected = selectedFacetIds(product);
  const facetChoices = facets.filter((f) => f.id !== "tout");
  const ribbonChoices = ribbons.filter((r) => r.id !== "all");

  return (
    <form action={saveProduct} className="w-full max-w-xl space-y-5">
      {product ? <input type="hidden" name="id" value={product.id} /> : null}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cirta-brown/50">
            SKU (réf. vitrine)
          </label>
          <input
            name="sku"
            required
            defaultValue={product?.sku}
            className="w-full border border-cirta-brown/15 bg-white px-3 py-2 text-sm outline-none focus:border-cirta-gold/50"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cirta-brown/50">
            Ordre d’affichage
          </label>
          <input
            name="sortOrder"
            type="number"
            defaultValue={product?.sortOrder ?? 0}
            className="w-full border border-cirta-brown/15 bg-white px-3 py-2 text-sm outline-none focus:border-cirta-gold/50"
          />
        </div>
      </div>
      <div className="space-y-1">
        <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cirta-brown/50">
          Titre
        </label>
        <input
          name="title"
          required
          defaultValue={product?.title}
          className="w-full border border-cirta-brown/15 bg-white px-3 py-2 text-sm outline-none focus:border-cirta-gold/50"
        />
      </div>
      <div className="space-y-1">
        <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cirta-brown/50">
          Description <span className="font-normal normal-case text-cirta-brown/40">(aperçu + « voir plus »)</span>
        </label>
        <textarea
          name="histoire"
          rows={5}
          defaultValue={product?.histoire ?? ""}
          placeholder="Court récit de provenance, contexte historique ou anecdote de vitrine…"
          className="w-full resize-y border border-cirta-brown/15 bg-white px-3 py-2 text-sm leading-relaxed outline-none focus:border-cirta-gold/50"
        />
        <p className="text-[0.68rem] text-cirta-brown/45">
          Texte court affiché sur la carte ; les visiteurs voient un extrait puis peuvent déplier.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cirta-brown/50">
            Période
          </label>
          <input
            name="period"
            defaultValue={product?.period}
            className="w-full border border-cirta-brown/15 bg-white px-3 py-2 text-sm outline-none focus:border-cirta-gold/50"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cirta-brown/50">
            Provenance
          </label>
          <input
            name="origin"
            defaultValue={product?.origin}
            className="w-full border border-cirta-brown/15 bg-white px-3 py-2 text-sm outline-none focus:border-cirta-gold/50"
          />
        </div>
      </div>
      <div className="space-y-1">
        <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cirta-brown/50">
          Matière / technique
        </label>
        <input
          name="medium"
          defaultValue={product?.medium}
          className="w-full border border-cirta-brown/15 bg-white px-3 py-2 text-sm outline-none focus:border-cirta-gold/50"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cirta-brown/50">
            Profondeur <span className="font-normal normal-case text-cirta-brown/40">(facultatif)</span>
          </label>
          <input
            name="depth"
            defaultValue={product?.depth ?? ""}
            placeholder="ex. 12 cm"
            className="w-full border border-cirta-brown/15 bg-white px-3 py-2 text-sm outline-none focus:border-cirta-gold/50"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cirta-brown/50">
            Poids <span className="font-normal normal-case text-cirta-brown/40">(facultatif)</span>
          </label>
          <input
            name="weight"
            defaultValue={product?.weight ?? ""}
            placeholder="ex. 2,3 kg"
            className="w-full border border-cirta-brown/15 bg-white px-3 py-2 text-sm outline-none focus:border-cirta-gold/50"
          />
        </div>

        <div className="col-span-2 space-y-1 sm:col-span-1">
          <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cirta-brown/50">
            Hauteur <span className="font-normal normal-case text-cirta-brown/40">(facultatif)</span>
          </label>
          <input
            name="hauteur"
            defaultValue={product?.hauteur ?? ""}
            placeholder="ex. 28 cm"
            className="w-full border border-cirta-brown/15 bg-white px-3 py-2 text-sm outline-none focus:border-cirta-gold/50"
          />
        </div>
      </div>
      <div className="space-y-1">
        <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cirta-brown/50">
          Prix (CAD)
        </label>
        <input
          name="priceCad"
          type="number"
          min={0}
          step={0.01}
          defaultValue={product?.priceCad ?? 0}
          className="w-full border border-cirta-brown/15 bg-white px-3 py-2 text-sm outline-none focus:border-cirta-gold/50"
        />
        <p className="text-[0.68rem] text-cirta-brown/45">
          0 = « Sur demande » (pas d’achat en ligne).
        </p>
      </div>
      <AdminImageField initialUrl={product?.image ?? ""} />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cirta-brown/50">
            Largeur
          </label>
          <input
            name="width"
            type="number"
            defaultValue={product?.width ?? 880}
            className="w-full border border-cirta-brown/15 bg-white px-3 py-2 text-sm outline-none focus:border-cirta-gold/50"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cirta-brown/50">
            Hauteur
          </label>
          <input
            name="height"
            type="number"
            defaultValue={product?.height ?? 1100}
            className="w-full border border-cirta-brown/15 bg-white px-3 py-2 text-sm outline-none focus:border-cirta-gold/50"
          />
        </div>
      </div>

      <div className="space-y-2 border border-cirta-brown/12 bg-white/80 p-4">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cirta-brown/50">
          Rayon (filtre catalogue)
        </p>
        <select
          name="ribbonKey"
          required
          defaultValue={product?.ribbonKey ?? ribbonChoices[0]?.id}
          className="w-full border border-cirta-brown/15 bg-white px-3 py-2 text-sm outline-none focus:border-cirta-gold/50"
        >
          {ribbonChoices.map((r) => (
            <option key={r.id} value={r.id}>
              {r.label} — id : {r.id}
            </option>
          ))}
        </select>
        <p className="text-[0.68rem] text-cirta-brown/45">
          Choisissez le rayon affiché sur la fiche ; l’identifiant technique sert aux URLs de filtre.
        </p>
      </div>

      <div className="space-y-3 border border-cirta-brown/12 bg-white/80 p-4">
        <div>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cirta-brown/50">
            Catégories (facettes)
          </p>
          <p className="mt-1 text-[0.68rem] text-cirta-brown/45">
            Cochez une ou plusieurs catégories ; les libellés correspondent à l’admin « Catégories ».
          </p>
        </div>
        <ul className="max-h-64 space-y-2 overflow-y-auto pr-1">
          {facetChoices.map((f) => (
            <li key={f.id}>
              <label className="flex cursor-pointer items-start gap-3 rounded-sm border border-transparent px-1 py-1.5 hover:border-cirta-brown/10 hover:bg-cirta-sand/40">
                <input
                  type="checkbox"
                  name="facetIds"
                  value={f.id}
                  defaultChecked={selected.has(f.id)}
                  className="mt-1 h-4 w-4 shrink-0 border-cirta-brown/30 accent-cirta-gold"
                />
                <span className="text-sm leading-snug text-cirta-brown">
                  <span className="font-medium">{f.label}</span>
                  <span className="ml-2 font-mono text-[0.68rem] text-cirta-brown/45">({f.id})</span>
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <label className="flex items-center gap-2 text-sm text-cirta-brown/80">
        <input
          type="checkbox"
          name="published"
          value="true"
          defaultChecked={product?.published !== false}
        />
        Publié sur le site
      </label>
      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="submit"
          className="border border-cirta-gold/50 bg-cirta-gold/15 px-6 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em]"
        >
          Enregistrer
        </button>
        <Link
          href="/admin/products"
          className="border border-cirta-brown/15 px-6 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-cirta-brown/65"
        >
          Annuler
        </Link>
      </div>
    </form>
  );
}
