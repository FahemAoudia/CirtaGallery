/** Langues du site public (défaut : français). */
export type SiteLocale = "fr" | "en" | "es" | "zh";

export const LOCALE_MENU: {
  id: SiteLocale;
  label: string;
  /** Libellé court dans le sélecteur */
  short: string;
}[] = [
  { id: "fr", label: "Français", short: "FR" },
  { id: "en", label: "English", short: "EN" },
  { id: "es", label: "Español", short: "ES" },
  { id: "zh", label: "中文", short: "中文" },
];

export function isSiteLocale(v: string): v is SiteLocale {
  return v === "fr" || v === "en" || v === "es" || v === "zh";
}

export const heroCopy: Record<
  SiteLocale,
  {
    kicker: string;
    titleA: string;
    titleB: string;
    tag: string;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
  }
> = {
  fr: {
    kicker: "Galerie marchande · Expertise & provenance",
    titleA: "Cirta Gallery",
    titleB: "Antiquités",
    tag: "Voyage dans le temps ancien",
    lead:
      "Porcelaine de Canton, dragons laqués, refuges de bronze bouddhique, trésors mexicains et espagnols, monnaies patinées : un seul salon pour les civilisations qui se sont écrites dans la matière.",
    ctaPrimary: "Parcourir le catalogue",
    ctaSecondary: "Œuvres remarquables",
  },
  en: {
    kicker: "Trading gallery · Expertise & provenance",
    titleA: "Cirta Gallery",
    titleB: "Antiques",
    tag: "A journey through deep time",
    lead:
      "Canton porcelain, lacquered dragons, Buddhist bronze, Mexican and Spanish treasures, weathered coins: one room for civilizations written in matter.",
    ctaPrimary: "Browse the catalogue",
    ctaSecondary: "Featured works",
  },
  es: {
    kicker: "Galería comercial · Pericia y procedencia",
    titleA: "Cirta Gallery",
    titleB: "Antigüedades",
    tag: "Un viaje en el tiempo profundo",
    lead:
      "Porcelana de Cantón, dragones lacados, bronces budistas, tesoros mexicanos y españoles, monedas con pátina: un solo salón para civilizaciones escritas en la materia.",
    ctaPrimary: "Ver el catálogo",
    ctaSecondary: "Obras destacadas",
  },
  zh: {
    kicker: "画廊 · 鉴定与来源",
    titleA: "Cirta Gallery",
    titleB: "古董",
    tag: "穿越古老时光的旅程",
    lead:
      "广彩与青花、漆龙、佛教铜器、墨西哥与西班牙珍品、带着岁月痕迹的钱币：一个空间，承载写在物质里的文明。",
    ctaPrimary: "浏览目录",
    ctaSecondary: "精选作品",
  },
};

/** Citation sous « Qui nous sommes » — jamais d’arabe en mode français. */
export const aboutQuote: Record<SiteLocale, string> = {
  fr: "« Nous choisissons les pièces comme on choisit un vieil ami : lentement, avec amour du détail, et le respect de chaque terre qu’elles ont traversée. »",
  en: "« We choose pieces as one chooses an old friend: slowly, with love for detail, and respect for every land they have crossed. »",
  es: "« Elegimos las piezas como se elige a un viejo amigo: despacio, con amor al detalle, y con respeto por cada tierra que han atravesado. »",
  zh: "「我们挑选藏品，如同选择一位老友：从容不迫，珍视细节，亦敬重它们途经的每一片土地。」",
};

export const subscribeDialogCopy: Record<
  SiteLocale,
  { kicker: string; title: string; blurb: string; close: string }
> = {
  fr: {
    kicker: "Abonner",
    title: "−10 % sur votre premier achat",
    blurb: "Renseignez vos coordonnées pour l’offre −10 % sur votre premier achat.",
    close: "Fermer",
  },
  en: {
    kicker: "Subscribe",
    title: "−10 % on your first purchase",
    blurb: "Enter your details to claim the −10 % offer on your first purchase.",
    close: "Close",
  },
  es: {
    kicker: "Suscripción",
    title: "−10 % en su primera compra",
    blurb: "Indique sus datos para la oferta −10 % en su primera compra.",
    close: "Cerrar",
  },
  zh: {
    kicker: "订阅",
    title: "首次购买享九折",
    blurb: "填写信息即可享首次购买九折优惠。",
    close: "关闭",
  },
};

export const abonnerFormCopy: Record<
  SiteLocale,
  {
    subscribeSuccess: string;
    errSubscribe: string;
    labelEmail: string;
    labelName: string;
    labelPhone: string;
    submitSubscribe: string;
    close: string;
    homeLink: string;
  }
> = {
  fr: {
    subscribeSuccess:
      "Inscription enregistrée.\n\nVous êtes admissible à la réduction de 10 %. Contactez l’administrateur pour finaliser votre avantage.",
    errSubscribe: "Erreur d’inscription",
    labelEmail: "Email",
    labelName: "Nom",
    labelPhone: "Téléphone",
    submitSubscribe: "S’abonner",
    close: "Fermer",
    homeLink: "Retour à l’accueil",
  },
  en: {
    subscribeSuccess:
      "Your subscription has been saved.\n\nYou are eligible for the 10% discount. Contact the administrator to finalize your benefit.",
    errSubscribe: "Subscription error",
    labelEmail: "Email",
    labelName: "Name",
    labelPhone: "Phone",
    submitSubscribe: "Subscribe",
    close: "Close",
    homeLink: "Back to home",
  },
  es: {
    subscribeSuccess:
      "Inscripción registrada.\n\nUsted es admisible al descuento del 10 %. Contacte al administrador para finalizar su ventaja.",
    errSubscribe: "Error de inscripción",
    labelEmail: "Correo",
    labelName: "Nombre",
    labelPhone: "Teléfono",
    submitSubscribe: "Suscribirse",
    close: "Cerrar",
    homeLink: "Volver al inicio",
  },
  zh: {
    subscribeSuccess: "订阅已登记。\n\n您符合 10% 折扣条件。请联系管理员完成优惠。",
    errSubscribe: "订阅失败",
    labelEmail: "电子邮箱",
    labelName: "姓名",
    labelPhone: "电话",
    submitSubscribe: "订阅",
    close: "关闭",
    homeLink: "返回首页",
  },
};

export const ctaAbonnerShort: Record<SiteLocale, string> = {
  fr: "Abonner",
  en: "Subscribe",
  es: "Suscribirse",
  zh: "订阅",
};

export const ctaAbonnerFooter: Record<SiteLocale, string> = {
  fr: "Abonner (−10 %)",
  en: "Subscribe (−10 %)",
  es: "Suscribirse (−10 %)",
  zh: "订阅（减 10%）",
};

export const ctaAbonnerFab: Record<SiteLocale, string> = {
  fr: "Abonner · −10 %",
  en: "Subscribe · −10 %",
  es: "Suscribirse · −10 %",
  zh: "订阅 · 九折",
};

export const languageMenuLabel: Record<SiteLocale, string> = {
  fr: "Langue",
  en: "Language",
  es: "Idioma",
  zh: "语言",
};
