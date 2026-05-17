import Link from "next/link";
import { ProductEditForm } from "@/components/admin/ProductEditForm";
import { prisma } from "@/lib/prisma";

export default async function NewProductPage() {
  const [ribbons, facets] = await Promise.all([
    prisma.ribbon.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.facet.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  return (
    <div>
      <Link
        href="/admin/products"
        className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-cirta-brown/50 hover:text-cirta-brown"
      >
        ← Produits
      </Link>
      <h1 className="admin-page-title mt-4">Nouveau produit</h1>
      <div className="mt-8">
        <ProductEditForm
          ribbons={ribbons.map((r) => ({ id: r.id, label: r.label }))}
          facets={facets.map((f) => ({ id: f.id, label: f.label }))}
        />
      </div>
    </div>
  );
}
