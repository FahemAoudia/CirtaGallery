import Link from "next/link";
import { deleteProduct } from "@/app/admin/_actions";
import { ConfirmDeleteForm } from "@/components/admin/ConfirmDeleteForm";
import { prisma } from "@/lib/prisma";

function parseFacetIds(facetsJson: string): string[] {
  try {
    const f = JSON.parse(facetsJson) as unknown;
    if (!Array.isArray(f)) return [];
    return f.filter((x): x is string => typeof x === "string" && x.length > 0);
  } catch {
    return [];
  }
}

function firstString(v: string | string[] | undefined): string {
  if (typeof v === "string") return v;
  if (Array.isArray(v) && v[0]) return v[0];
  return "";
}

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = (await searchParams) ?? {};
  const q = firstString(sp.q).trim().toLowerCase();
  const ruban = firstString(sp.ruban).trim();
  const facet = firstString(sp.facet).trim();
  const statut = firstString(sp.statut).trim();

  const [allProducts, ribbons, facets] = await Promise.all([
    prisma.product.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.ribbon.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.facet.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  const ribbonById = Object.fromEntries(ribbons.map((r) => [r.id, r.label]));
  const facetById = Object.fromEntries(facets.map((f) => [f.id, f.label]));

  const ribbonChoices = ribbons.filter((r) => r.id !== "all");
  const facetChoices = facets.filter((f) => f.id !== "tout");

  let products = allProducts;
  if (ruban) {
    products = products.filter((p) => p.ribbonKey === ruban);
  }
  if (facet) {
    products = products.filter((p) => parseFacetIds(p.facetsJson).includes(facet));
  }
  if (statut === "publie") {
    products = products.filter((p) => p.published);
  } else if (statut === "brouillon") {
    products = products.filter((p) => !p.published);
  }
  if (q) {
    products = products.filter(
      (p) => p.sku.toLowerCase().includes(q) || p.title.toLowerCase().includes(q),
    );
  }

  const hasFilters = Boolean(q || ruban || facet || statut);
  const total = allProducts.length;
  const shown = products.length;

  return (
    <div className="max-w-5xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-medium tracking-tight">Produits</h1>
          <p className="mt-1 text-sm text-cirta-brown/60">
            Référence catalogue (SKU), rayons et catégories pour les filtres du site.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="border border-cirta-gold/50 bg-cirta-gold/10 px-5 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-cirta-brown transition hover:bg-cirta-gold/20"
        >
          + Nouveau
        </Link>
      </div>

      <section
        className="mt-8 rounded-sm border border-cirta-brown/12 bg-white/90 p-4 shadow-sm md:p-5"
        aria-labelledby="admin-products-filter-title"
      >
        <h2
          id="admin-products-filter-title"
          className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-cirta-brown/45"
        >
          Filtrer la liste
        </h2>
        <p className="mt-1 text-[0.72rem] text-cirta-brown/50">
          Recherche rapide par texte, rayon, catégorie ou état de publication. Les filtres s’appliquent
          au clic sur « Appliquer ».
        </p>
        <form method="get" action="/admin/products" className="mt-4 flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:items-end">
          <div className="min-w-0 flex-1 lg:min-w-[12rem]">
            <label htmlFor="f-q" className="block text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-cirta-brown/45">
              Recherche (SKU ou titre)
            </label>
            <input
              id="f-q"
              name="q"
              type="search"
              defaultValue={firstString(sp.q)}
              placeholder="ex. canton, assiette…"
              className="mt-1 w-full border border-cirta-brown/15 bg-white px-3 py-2 text-sm outline-none focus:border-cirta-gold/50"
            />
          </div>
          <div className="w-full sm:w-auto sm:min-w-[11rem]">
            <label htmlFor="f-ruban" className="block text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-cirta-brown/45">
              Rayon
            </label>
            <select
              id="f-ruban"
              name="ruban"
              defaultValue={ruban}
              className="mt-1 w-full border border-cirta-brown/15 bg-white px-3 py-2 text-sm outline-none focus:border-cirta-gold/50"
            >
              <option value="">Tous les rayons</option>
              {ribbonChoices.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full sm:w-auto sm:min-w-[11rem]">
            <label htmlFor="f-facet" className="block text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-cirta-brown/45">
              Catégorie
            </label>
            <select
              id="f-facet"
              name="facet"
              defaultValue={facet}
              className="mt-1 w-full border border-cirta-brown/15 bg-white px-3 py-2 text-sm outline-none focus:border-cirta-gold/50"
            >
              <option value="">Toutes les catégories</option>
              {facetChoices.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full sm:w-auto sm:min-w-[10rem]">
            <label htmlFor="f-statut" className="block text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-cirta-brown/45">
              Publication
            </label>
            <select
              id="f-statut"
              name="statut"
              defaultValue={statut}
              className="mt-1 w-full border border-cirta-brown/15 bg-white px-3 py-2 text-sm outline-none focus:border-cirta-gold/50"
            >
              <option value="">Tous</option>
              <option value="publie">Publié seulement</option>
              <option value="brouillon">Brouillon seulement</option>
            </select>
          </div>
          <div className="flex flex-wrap gap-2 pt-1 lg:pt-0">
            <button
              type="submit"
              className="border border-cirta-gold/50 bg-cirta-gold/15 px-5 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-cirta-brown transition hover:bg-cirta-gold/25"
            >
              Appliquer
            </button>
            {hasFilters ? (
              <Link
                href="/admin/products"
                className="inline-flex items-center border border-cirta-brown/20 px-5 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-cirta-brown/70 transition hover:border-cirta-brown/35"
              >
                Réinitialiser
              </Link>
            ) : null}
          </div>
        </form>
        {hasFilters ? (
          <p className="mt-4 border-t border-cirta-brown/10 pt-3 text-sm text-cirta-brown/65">
            <span className="font-medium text-cirta-brown tabular-nums">{shown}</span> résultat
            {shown !== 1 ? "s" : ""} sur <span className="tabular-nums">{total}</span> produit
            {total !== 1 ? "s" : ""}.
          </p>
        ) : null}
      </section>

      <ul className="mt-8 divide-y divide-cirta-brown/10 border border-cirta-brown/10 bg-cirta-black/[0.02]">
        {products.map((p) => {
          const ribbonLine = ribbonById[p.ribbonKey] ?? p.ribbonKey;
          const facetIds = parseFacetIds(p.facetsJson);
          const facetLine =
            facetIds.length === 0
              ? "Aucune catégorie"
              : facetIds.map((id) => facetById[id] ?? id).join(" · ");

          return (
            <li key={p.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 md:px-5">
              <div className="min-w-0">
                <p className="font-mono text-[0.65rem] uppercase tracking-widest text-cirta-gold-dim">
                  {p.sku}
                </p>
                <p className="truncate font-medium text-cirta-brown">{p.title}</p>
                <p className="text-[0.72rem] text-cirta-brown/50">
                  {p.published ? "Publié" : "Brouillon"}
                </p>
                <p className="mt-1 text-[0.7rem] leading-snug text-cirta-brown/65">
                  <span className="font-semibold text-cirta-brown/50">Rayon :</span> {ribbonLine}{" "}
                  <span className="mx-1 text-cirta-brown/25">|</span>{" "}
                  <span className="font-semibold text-cirta-brown/50">Catégories :</span> {facetLine}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/products/${p.id}`}
                  className="border border-cirta-brown/20 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] hover:border-cirta-gold"
                >
                  Modifier
                </Link>
                <ConfirmDeleteForm
                  action={deleteProduct}
                  confirmMessage={`Supprimer définitivement « ${p.title} » (${p.sku}) ?\nRayon : ${ribbonLine}\nCatégories : ${facetLine}`}
                >
                  <input type="hidden" name="id" value={p.id} />
                  <button
                    type="submit"
                    className="border border-red-900/25 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-red-900/80 hover:bg-red-900/10"
                  >
                    Supprimer
                  </button>
                </ConfirmDeleteForm>
              </div>
            </li>
          );
        })}
      </ul>
      {total === 0 ? (
        <p className="mt-8 text-sm text-cirta-brown/55">
          Aucun produit. Lancez <code className="font-mono text-xs">npx prisma db seed</code> ou
          ajoutez une fiche.
        </p>
      ) : shown === 0 ? (
        <p className="mt-8 text-sm text-cirta-brown/55">
          Aucun produit ne correspond à ces filtres.{" "}
          <Link href="/admin/products" className="font-medium text-cirta-gold-dim underline-offset-2 hover:underline">
            Effacer les filtres
          </Link>
          .
        </p>
      ) : null}
    </div>
  );
}
