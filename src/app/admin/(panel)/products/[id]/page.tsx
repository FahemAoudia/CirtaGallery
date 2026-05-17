import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductEditForm } from "@/components/admin/ProductEditForm";
import { prisma } from "@/lib/prisma";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [product, ribbons, facets] = await Promise.all([
    prisma.product.findUnique({ where: { id } }),
    prisma.ribbon.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.facet.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);
  if (!product) notFound();

  return (
    <div>
      <Link
        href="/admin/products"
        className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-cirta-brown/50 hover:text-cirta-brown"
      >
        ← Produits
      </Link>
      <h1 className="mt-4 font-serif text-3xl font-medium tracking-tight">Modifier · {product.sku}</h1>
      <div className="mt-8">
        <ProductEditForm
          product={product}
          ribbons={ribbons.map((r) => ({ id: r.id, label: r.label }))}
          facets={facets.map((f) => ({ id: f.id, label: f.label }))}
        />
      </div>
    </div>
  );
}
