import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [products, ribbons, facets, featured, subscribers] = await Promise.all([
    prisma.product.count(),
    prisma.ribbon.count(),
    prisma.facet.count(),
    prisma.featuredPiece.count(),
    prisma.subscriber.count(),
  ]);

  const cards = [
    { label: "Produits publiés", value: products, href: "/admin/products" },
    { label: "Rayons", value: ribbons, href: "/admin/ribbons" },
    { label: "Catégories (facettes)", value: facets, href: "/admin/facets" },
    { label: "Mises en avant (salon)", value: featured, href: "/admin/featured" },
    { label: "Abonnés", value: subscribers, href: "/admin/subscribers" },
  ];

  return (
    <div className="max-w-5xl">
      <h1 className="font-serif text-3xl font-medium tracking-tight text-cirta-brown">
        Tableau de bord
      </h1>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-cirta-brown/65">
        Gérez le catalogue, les filtres, les textes et consultez les inscriptions newsletter / PayPal.
        Les modifications sont visibles sur la page d’accueil après enregistrement.
      </p>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <li key={c.href}>
            <Link
              href={c.href}
              className="block rounded-sm border border-cirta-brown/10 bg-cirta-black/[0.02] p-6 transition hover:border-cirta-gold/35 hover:shadow-[0_16px_40px_-28px_rgba(0,0,0,0.35)]"
            >
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-cirta-brown/45">
                {c.label}
              </p>
              <p className="mt-2 font-serif text-3xl text-cirta-brown tabular-nums">{c.value}</p>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/admin/sections"
          className="inline-flex border border-cirta-gold/35 bg-cirta-gold/10 px-5 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-cirta-brown transition hover:bg-cirta-gold/20"
        >
          Blocs page d’accueil
        </Link>
        <Link
          href="/admin/settings"
          className="inline-flex border border-cirta-brown/20 px-5 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-cirta-brown transition hover:border-cirta-gold hover:text-cirta-gold-dim"
        >
          Contenu du site
        </Link>
      </div>
    </div>
  );
}
