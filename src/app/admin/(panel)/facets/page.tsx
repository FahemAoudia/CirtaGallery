import { deleteFacet, saveFacet } from "@/app/admin/_actions";
import { ConfirmDeleteForm } from "@/components/admin/ConfirmDeleteForm";
import { prisma } from "@/lib/prisma";

export default async function AdminFacetsPage() {
  const facets = await prisma.facet.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div className="max-w-3xl">
      <h1 className="font-serif text-3xl font-medium tracking-tight">Catégories (colonne gauche)</h1>
      <p className="mt-2 text-sm text-cirta-brown/60">
        Ces identifiants doivent correspondre aux valeurs saisies sur chaque produit (liste séparée par
        des virgules).
      </p>
      <ul className="mt-8 space-y-6">
        {facets.map((f) => (
          <li
            key={f.id}
            className="border border-cirta-brown/10 bg-cirta-black/[0.02] p-5 md:flex md:items-start md:justify-between md:gap-6"
          >
            <form action={saveFacet} className="min-w-0 flex-1 space-y-3 md:space-y-0 md:grid md:grid-cols-[1fr_1fr_auto] md:gap-3 md:items-end">
              <div className="space-y-1">
                <label className="block text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-cirta-brown/45">
                  Id
                </label>
                <input
                  name="id"
                  readOnly
                  defaultValue={f.id}
                  className="w-full border border-cirta-brown/10 bg-cirta-sand/50 px-2 py-1.5 font-mono text-xs text-cirta-brown/70"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-cirta-brown/45">
                  Libellé
                </label>
                <input
                  name="label"
                  defaultValue={f.label}
                  required
                  className="w-full border border-cirta-brown/15 bg-white px-2 py-1.5 text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-cirta-brown/45">
                  Ordre
                </label>
                <input
                  name="sortOrder"
                  type="number"
                  defaultValue={f.sortOrder}
                  className="w-24 border border-cirta-brown/15 bg-white px-2 py-1.5 text-sm"
                />
              </div>
              <div className="md:col-span-3 pt-1">
                <button
                  type="submit"
                  className="border border-cirta-gold/40 bg-cirta-gold/10 px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.1em]"
                >
                  Mettre à jour
                </button>
              </div>
            </form>
            {f.id !== "tout" ? (
              <ConfirmDeleteForm
                className="mt-4 shrink-0 md:mt-0"
                action={deleteFacet}
                confirmMessage={`Supprimer la catégorie « ${f.label} » (${f.id}) ?`}
              >
                <input type="hidden" name="id" value={f.id} />
                <button
                  type="submit"
                  className="border border-red-900/20 px-3 py-1.5 text-[0.62rem] font-semibold uppercase text-red-900/80"
                >
                  Supprimer
                </button>
              </ConfirmDeleteForm>
            ) : null}
          </li>
        ))}
      </ul>

      <div className="mt-10 border-t border-cirta-brown/10 pt-8">
        <h2 className="font-serif text-xl">Ajouter une catégorie</h2>
        <form action={saveFacet} className="mt-4 max-w-lg space-y-3">
          <input
            name="id"
            required
            placeholder="identifiant (ex. porcelaines)"
            className="w-full border border-cirta-brown/15 bg-white px-3 py-2 text-sm font-mono"
          />
          <input
            name="label"
            required
            placeholder="Libellé affiché"
            className="w-full border border-cirta-brown/15 bg-white px-3 py-2 text-sm"
          />
          <input
            name="sortOrder"
            type="number"
            defaultValue={facets.length}
            className="w-32 border border-cirta-brown/15 bg-white px-3 py-2 text-sm"
          />
          <button
            type="submit"
            className="border border-cirta-brown/20 px-5 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.12em]"
          >
            Créer
          </button>
        </form>
      </div>
    </div>
  );
}
