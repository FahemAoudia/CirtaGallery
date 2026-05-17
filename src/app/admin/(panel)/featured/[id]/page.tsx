import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteFeatured } from "@/app/admin/_actions";
import { FeaturedEditForm } from "@/components/admin/FeaturedEditForm";
import { prisma } from "@/lib/prisma";

export default async function EditFeaturedPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const piece = await prisma.featuredPiece.findUnique({ where: { id } });
  if (!piece) notFound();

  return (
    <div>
      <Link href="/admin/featured" className="text-[0.7rem] font-semibold uppercase text-cirta-brown/50">
        ← Salon
      </Link>
      <h1 className="admin-page-title mt-4">Modifier · {piece.title}</h1>
      <div className="mt-8">
        <FeaturedEditForm piece={piece} />
      </div>
      <form action={deleteFeatured} className="mt-6">
        <input type="hidden" name="id" value={piece.id} />
        <button
          type="submit"
          className="border border-red-900/25 px-4 py-2 text-[0.65rem] font-semibold uppercase text-red-900/80"
        >
          Supprimer définitivement
        </button>
      </form>
    </div>
  );
}
