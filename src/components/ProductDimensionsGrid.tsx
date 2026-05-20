type DimensionLabels = {
  depthLabel: string;
  weightLabel: string;
  hauteurLabel: string;
};

type ProductDimensionsGridProps = {
  depth?: string;
  weight?: string;
  hauteur?: string;
  labels: DimensionLabels;
  /** Cartes catalogue 2 colonnes (mobile). */
  compact?: boolean;
  /** Fiche zoom. */
  inspect?: boolean;
};

function DimensionItem({
  label,
  value,
  textClass,
  labelClass,
  className = "",
  nowrap = false,
}: {
  label: string;
  value: string;
  textClass: string;
  labelClass: string;
  className?: string;
  nowrap?: boolean;
}) {
  return (
    <p
      className={`min-w-0 ${nowrap ? "whitespace-nowrap" : ""} ${textClass} ${className}`.trim()}
    >
      <span className={labelClass}>{label}</span>
      <span>{"\u202f"}{value}</span>
    </p>
  );
}

export function ProductDimensionsGrid({
  depth,
  weight,
  hauteur,
  labels,
  compact = false,
  inspect = false,
}: ProductDimensionsGridProps) {
  const depthVal = depth?.trim();
  const weightVal = weight?.trim();
  const hauteurVal = hauteur?.trim();

  const items = [
    depthVal ? { label: labels.depthLabel, value: depthVal } : null,
    weightVal ? { label: labels.weightLabel, value: weightVal } : null,
    hauteurVal ? { label: labels.hauteurLabel, value: hauteurVal } : null,
  ].filter((x): x is { label: string; value: string } => x !== null);

  if (items.length === 0) return null;

  const textClass = inspect
    ? "text-[0.85rem] leading-relaxed text-cirta-brown/82 sm:text-[0.9rem]"
    : compact
      ? "text-[0.68rem] leading-relaxed text-cirta-brown/76 sm:text-[0.7rem]"
      : "text-[0.8rem] leading-relaxed text-cirta-brown/76 sm:text-[0.82rem]";

  const labelClass = "font-semibold uppercase tracking-[0.1em] text-cirta-gold-dim";

  if (compact && !inspect) {
    return (
      <div className="grid grid-cols-2 gap-x-1.5 gap-y-1 sm:gap-x-2">
        {items.map((item, i) => (
          <DimensionItem
            key={item.label}
            label={item.label}
            value={item.value}
            textClass="text-[0.6rem] leading-tight text-cirta-brown/76 sm:text-[0.62rem]"
            labelClass="font-semibold uppercase tracking-[0.06em] text-cirta-gold-dim"
            nowrap
            className={i === 2 && items.length === 3 ? "col-span-2" : ""}
          />
        ))}
      </div>
    );
  }

  if (inspect) {
    return (
      <>
        <div className={`grid min-w-0 grid-cols-2 gap-x-2 gap-y-1.5 sm:hidden ${textClass}`}>
          {items.map((item, i) => (
            <DimensionItem
              key={item.label}
              label={item.label}
              value={item.value}
              textClass={textClass}
              labelClass={labelClass}
              className={i === 2 && items.length === 3 ? "col-span-2" : ""}
            />
          ))}
        </div>
        <p className={`hidden min-w-0 sm:block ${textClass}`}>
          {items.map((item, i) => (
            <span key={item.label} className="inline whitespace-nowrap">
              {i > 0 ? (
                <span className="mx-1.5 text-cirta-gold/50" aria-hidden>
                  ·
                </span>
              ) : null}
              <span className={labelClass}>{item.label}</span>
              <span>{"\u202f"}{item.value}</span>
            </span>
          ))}
        </p>
      </>
    );
  }

  return (
    <p className={textClass}>
      {items.map((item, i) => (
        <span key={item.label} className="inline whitespace-nowrap">
          {i > 0 ? (
            <span className="mx-1 text-cirta-gold/50 sm:mx-1.5" aria-hidden>
              ·
            </span>
          ) : null}
          <span className={labelClass}>{item.label}</span>
          <span>{"\u202f"}{item.value}</span>
        </span>
      ))}
    </p>
  );
}
