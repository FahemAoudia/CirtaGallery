import Link from "next/link";
import { deleteFeatured } from "@/app/admin/_actions";
import { ConfirmDeleteForm } from "@/components/admin/ConfirmDeleteForm";
import { prisma } from "@/lib/prisma";

export default async function AdminFeaturedListPage() {
  const items = await prisma.featuredPiece.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div className="max-w-4xl">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Salon — mises en avant</h1>
          <p className="mt-1 text-sm text-cirta-brown/60">
            Les trois grands blocs sous le catalogue sur la page d’accueil.
          </p>
        </div>
        <Link href="/admin/featured/new" className="admin-btn-primary w-full sm:w-auto">
          + Nouvelle fiche
        </Link>
      </div>
      <ul className="mt-10 space-y-4">
        {items.map((f) => (
          <li
            key={f.id}
            className="admin-list-item border border-cirta-brown/10 bg-cirta-black/[0.02]"
          >
            <div>
              <p className="font-mono text-[0.6rem] uppercase tracking-widest text-cirta-gold-dim">
                {f.catalogRef || "—"}
              </p>
              <p className="font-medium text-cirta-brown">{f.title}</p>
            </div>
            <div className="admin-list-actions">
              <Link
                href={`/admin/featured/${f.id}`}
                className="border border-cirta-brown/20 px-3 py-1.5 text-[0.65rem] font-semibold uppercase"
              >
                Modifier
              </Link>
              <ConfirmDeleteForm
                action={deleteFeatured}
                confirmMessage={`Supprimer la fiche salon « ${f.title} » ?`}
              >
                <input type="hidden" name="id" value={f.id} />
                <button
                  type="submit"
                  className="border border-red-900/20 px-3 py-1.5 text-[0.65rem] font-semibold uppercase text-red-900/80"
                >
                  Supprimer
                </button>
              </ConfirmDeleteForm>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
