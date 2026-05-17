import type { AdminRole } from "@/lib/auth";

export type AdminNavItem = { href: string; label: string; desc?: string };
export type AdminNavGroup = { title: string; items: AdminNavItem[] };

const allGroups: AdminNavGroup[] = [
  {
    title: "Vue d’ensemble",
    items: [{ href: "/admin", label: "Tableau de bord", desc: "Statistiques rapides" }],
  },
  {
    title: "Contenu & textes",
    items: [
      {
        href: "/admin/settings",
        label: "Contenu du site",
        desc: "Textes, contact, bandeau collection",
      },
    ],
  },
  {
    title: "Catalogue",
    items: [
      { href: "/admin/products", label: "Produits", desc: "Fiches, prix, publication" },
      { href: "/admin/ribbons", label: "Rayons", desc: "Libellés & photo bandeau accueil" },
      { href: "/admin/facets", label: "Catégories", desc: "Facettes catalogue" },
    ],
  },
  {
    title: "Page d’accueil",
    items: [
      { href: "/admin/sections", label: "Blocs & ordre", desc: "Afficher, ordonner" },
      { href: "/admin/featured", label: "Salon (vedettes)", desc: "Grandes mises en avant" },
    ],
  },
  {
    title: "Visiteurs",
    items: [{ href: "/admin/faq", label: "FAQ (chat)", desc: "Questions / réponses du widget" }],
  },
  {
    title: "Audience",
    items: [{ href: "/admin/subscribers", label: "Abonnés", desc: "Newsletter & PayPal" }],
  },
];

const adminAccessGroup: AdminNavGroup = {
  title: "Accès & équipe",
  items: [
    {
      href: "/admin/moderators",
      label: "Équipe & accès",
      desc: "Admins, modérateurs, mots de passe",
    },
  ],
};

export function getAdminNavGroups(role: AdminRole): AdminNavGroup[] {
  if (role === "ADMIN") {
    const [first, ...rest] = allGroups;
    return [first, adminAccessGroup, ...rest];
  }
  const withoutContent = allGroups.filter((g) => g.title !== "Contenu & textes");
  const accountGroup: AdminNavGroup = {
    title: "Accès & équipe",
    items: [
      {
        href: "/admin/moderators",
        label: "Équipe & accès",
        desc: "Mot de passe, comptes",
      },
    ],
  };
  const [first, ...rest] = withoutContent;
  return [first, accountGroup, ...rest];
}

export function isAdminNavActive(pathname: string, href: string): boolean {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function getAdminPageLabel(pathname: string, groups: AdminNavGroup[]): string {
  for (const g of groups) {
    for (const item of g.items) {
      if (isAdminNavActive(pathname, item.href)) return item.label;
    }
  }
  return "Administration";
}
