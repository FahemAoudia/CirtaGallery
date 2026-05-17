export const HOME_SECTION_DEFINITIONS = [
  { key: "hero", label: "En-tête & recherche" },
  { key: "catalog", label: "Grille catalogue" },
  { key: "featured", label: "Salon (vedettes)" },
  { key: "about", label: "À propos" },
  { key: "contact", label: "Contact" },
  { key: "footer", label: "Pied de page" },
] as const;

export type HomeSectionKey = (typeof HOME_SECTION_DEFINITIONS)[number]["key"];

export type HomeSectionRow = {
  id: string;
  sectionKey: string;
  label: string;
  sortOrder: number;
  enabled: boolean;
};

export function homeSectionLabelForKey(sectionKey: string): string {
  const def = HOME_SECTION_DEFINITIONS.find((d) => d.key === sectionKey);
  return def?.label ?? sectionKey;
}

export function defaultHomeSections(): HomeSectionRow[] {
  return HOME_SECTION_DEFINITIONS.map((d, i) => ({
    id: `__default_${d.key}`,
    sectionKey: d.key,
    label: d.label,
    sortOrder: i,
    enabled: true,
  }));
}
