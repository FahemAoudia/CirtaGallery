import type { CatalogItem, FeaturedPiece } from "@/lib/collection";
import type { SiteLocale } from "@/lib/site-i18n";

const RIBBON: Record<string, Record<Exclude<SiteLocale, "fr">, string>> = {
  all: { en: "View all", es: "Ver todo", zh: "查看全部" },
  "sculptures-mobilier": {
    en: "Sculptures & furniture",
    es: "Esculturas y mobiliario",
    zh: "雕塑与家具",
  },
  tableaux: { en: "Paintings", es: "Pinturas", zh: "绘画" },
  "porcelaine-cristal": {
    en: "Porcelain & crystal",
    es: "Porcelana y cristal",
    zh: "瓷器与水晶",
  },
  "lampes-vases": {
    en: "Lamps & vases",
    es: "Lámparas y jarrones",
    zh: "灯具与花瓶",
  },
  "bijoux-montres-monnaie": {
    en: "Jewelry, watches & coins",
    es: "Joyas, relojes y monedas",
    zh: "珠宝、腕表与钱币",
  },
};

const FACET: Record<string, Record<Exclude<SiteLocale, "fr">, string>> = {
  tout: { en: "All families", es: "Todas las familias", zh: "全部类别" },
  bronze: { en: "Bronze", es: "Bronce", zh: "青铜" },
  peintures: { en: "Paintings", es: "Pinturas", zh: "绘画" },
  porcelaines: { en: "Porcelain", es: "Porcelana", zh: "瓷器" },
  cristal: { en: "Crystal", es: "Cristal", zh: "水晶" },
  "bijoux-montres": {
    en: "Jewelry & watches",
    es: "Joyas y relojes",
    zh: "珠宝与腕表",
  },
  monnaie: {
    en: "Ancient coinage",
    es: "Moneda antigua",
    zh: "古代钱币",
  },
  figurine: { en: "Figures", es: "Figuras", zh: "造像" },
  "art-manuscrits": {
    en: "Art & manuscripts",
    es: "Arte y manuscritos",
    zh: "艺术与手稿",
  },
};

type ProductI18n = Pick<CatalogItem, "title" | "period" | "origin" | "medium">;

const PRODUCTS: Record<string, Partial<Record<Exclude<SiteLocale, "fr">, ProductI18n>>> = {
  "CG-01": {
    en: {
      title: "Blue-and-white porcelain vase — lacustrine landscape",
      period: "Late 19th century (Ming style)",
      origin: "Chinese export · Canton",
      medium: "Porcelain, underglaze cobalt",
    },
    es: {
      title: "Jarrón de porcelana blanca y azul — paisaje lacustre",
      period: "Finales del siglo XIX (estilo Ming)",
      origin: "Exportación china · Cantón",
      medium: "Porcelana, cobalto bajo cubierta",
    },
    zh: {
      title: "青花瓷器花瓶 — 湖光山水纹",
      period: "19 世纪末（仿明风格）",
      origin: "中国外销 · 广州",
      medium: "瓷，釉下钴蓝",
    },
  },
  "CG-02": {
    en: {
      title: "Gilt-bronze Maitreya figure",
      period: "18th – 19th century",
      origin: "Himalayan workshop",
      medium: "Gilt bronze, mineral polychromy",
    },
    es: {
      title: "Figura de Maitreya en bronce dorado",
      period: "Siglos XVIII – XIX",
      origin: "Taller himalayo",
      medium: "Bronce dorado, policromía mineral",
    },
    zh: {
      title: "鎏金弥勒菩萨像",
      period: "18–19 世纪",
      origin: "喜马拉雅工坊",
      medium: "鎏金铜，矿物彩绘",
    },
  },
  "CG-03": {
    en: {
      title: "Carved detail — dragon claws on an ornate base",
      period: "Republic period",
      origin: "South China",
      medium: "Stone and bronze with green patina",
    },
    es: {
      title: "Detalle esculpido — garras de dragón sobre base labrada",
      period: "Época republicana",
      origin: "Sur de China",
      medium: "Piedra y bronce con pátina verde",
    },
    zh: {
      title: "雕刻构件 — 龙爪与花式底座",
      period: "民国",
      origin: "华南",
      medium: "石与青铜绿锈",
    },
  },
  "CG-04": {
    en: {
      title: "Cabinet vase with equine decor",
      period: "From an old collection",
      origin: "Peking · Shanghai trade network",
      medium: "Glaze, cobalt, line drawing",
    },
    es: {
      title: "Jarrón de cabinet con decoración equina",
      period: "De antigua colección",
      origin: "Red mercantil Pekín · Shanghái",
      medium: "Esmalte, cobalto, dibujo al trazo",
    },
    zh: {
      title: "陈设瓷瓶 — 马纹装饰",
      period: "旧藏出处",
      origin: "京沪商贸网络",
      medium: "釉、钴料、线描",
    },
  },
  "CG-05": {
    en: {
      title: "Polychrome wood santo — novohispano folk art",
      period: "18th century",
      origin: "Central Mexico",
      medium: "Gilded pine, estofado",
    },
    es: {
      title: "Santo en madera policroma — arte popular novohispano",
      period: "Siglo XVIII",
      origin: "México central",
      medium: "Pino dorado, estofado",
    },
    zh: {
      title: "彩绘木雕圣像 — 新西班牙民间艺术",
      period: "18 世纪",
      origin: "墨西哥中部",
      medium: "贴金松木，彩绘贴金",
    },
  },
  "CG-06": {
    en: {
      title: "Spanish bust — Iberian golden age",
      period: "17th century (workshop)",
      origin: "Toledo · Valencia",
      medium: "Carved wood, metal highlights",
    },
    es: {
      title: "Busto de acento español — edad de oro ibérica",
      period: "Siglo XVII (taller)",
      origin: "Toledo · Valencia",
      medium: "Madera tallada, realces metálicos",
    },
    zh: {
      title: "西班牙风格胸像 — 伊比利亚黄金时代",
      period: "17 世纪（作坊）",
      origin: "托莱多 · 瓦伦西亚",
      medium: "木雕，金属点缀",
    },
  },
  "CG-07": {
    en: {
      title: "Lot of over twenty classical coins",
      period: "1st – 4th century CE",
      origin: "Mediterranean vicinity",
      medium: "Silver, bronze",
    },
    es: {
      title: "Lote de más de veinte monedas clásicas",
      period: "Siglos I – IV d. C.",
      origin: "Proximidad mediterránea",
      medium: "Plata, bronce",
    },
    zh: {
      title: "古典钱币一组（二十余枚）",
      period: "公元 1–4 世纪",
      origin: "地中海一带",
      medium: "银、铜",
    },
  },
  "CG-08": {
    en: {
      title: "Chandelier with drops — bronze and cut glass",
      period: "circa 1895",
      origin: "Bohemia · Paris mounting",
      medium: "Brass, drops — Second Empire spirit",
    },
    es: {
      title: "Lámpara de araña con pampillas — bronce y vidrio tallado",
      period: "hacia 1895",
      origin: "Bohemia · montura parisina",
      medium: "Latón, pampillas — espíritu Segundo Imperio",
    },
    zh: {
      title: "枝形吊灯 — 青铜与切割玻璃",
      period: "约 1895 年",
      origin: "波希米亚 · 巴黎装配",
      medium: "黄铜、垂饰 — 第二帝国风格",
    },
  },
  "CG-09": {
    en: {
      title: "Oil on panel — travelling cabinet",
      period: "First half of the 18th century",
      origin: "Spanish school",
      medium: "Oil, oak panel",
    },
    es: {
      title: "Óleo sobre panel — cabinet de viaje",
      period: "Primera mitad del siglo XVIII",
      origin: "Escuela española",
      medium: "Óleo, roble",
    },
    zh: {
      title: "木板油画 — 行囊式画柜",
      period: "18 世纪上半叶",
      origin: "西班牙画派",
      medium: "油画，橡木板",
    },
  },
  "CG-10": {
    en: {
      title: "Cabinet Qur’an — illuminated margins",
      period: "18th century",
      origin: "Maghreb",
      medium: "Ink, botanical gold, handmade paper",
    },
    es: {
      title: "Corán de cabinet — márgenes iluminados",
      period: "Siglo XVIII",
      origin: "Magreb",
      medium: "Tinta, oro vegetal, papel hecho a mano",
    },
    zh: {
      title: "陈列用《古兰经》— 描金边饰",
      period: "18 世纪",
      origin: "马格里布",
      medium: "墨、植物金、手工纸",
    },
  },
  "CG-11": {
    en: {
      title: "Wedding parure — silver and Mediterranean coral",
      period: "First third of the 20th century",
      origin: "Kabylia · Constantine",
      medium: "Silver, coral, enamel",
    },
    es: {
      title: "Adorno nupcial — plata y coral mediterráneo",
      period: "Primer tercio del siglo XX",
      origin: "Cabilia · Constantina",
      medium: "Plata, coral, esmalte",
    },
    zh: {
      title: "婚饰套件 — 银与地中海珊瑚",
      period: "20 世纪最初三十年",
      origin: "卡比利亚 · 君士坦丁",
      medium: "银、珊瑚、珐琅",
    },
  },
  "CG-12": {
    en: {
      title: "Iridescent vase — flambé glaze Art Nouveau",
      period: "circa 1900",
      origin: "Loire school",
      medium: "Glazed stoneware, metallic lustre",
    },
    es: {
      title: "Jarrón irisado — gres flamé Art Nouveau",
      period: "hacia 1900",
      origin: "Escuela del Loira",
      medium: "Gres esmaltado, lustre metálico",
    },
    zh: {
      title: "虹彩花瓶 — 新艺术窑变釉",
      period: "约 1900 年",
      origin: "卢瓦尔流派",
      medium: "釉陶，金属光泽",
    },
  },
};

const FEATURED: Record<
  string,
  Partial<
    Record<
      Exclude<SiteLocale, "fr">,
      Pick<FeaturedPiece, "catalogRef" | "title" | "description" | "meta">
    >
  >
> = {
  "sf-1": {
    en: {
      catalogRef: "Plate I — Silk Road",
      title: "Group of jars — blue-and-color porcelain",
      meta: "Porcelain · South China · 19th century",
      description:
        "Rows of jars where cobalt blue meets export enamels: each piece shows its firing, its void, the hypnotic repeat of pattern.",
    },
    es: {
      catalogRef: "Lámina I — Ruta de la seda",
      title: "Conjunto de jarrones — porcelana azul y color",
      meta: "Porcelana · Sur de China · siglo XIX",
      description:
        "Hileras de jarrones donde el azul cobalto dialoga con los esmaltes de exportación: cada pieza muestra su cocción, su vacío, la repetición hipnótica del decorado.",
    },
    zh: {
      catalogRef: "图版 I — 丝绸之路",
      title: "瓷罐组合 — 青花与彩瓷",
      meta: "瓷器 · 华南 · 19 世纪",
      description:
        "成排瓷罐上，钴蓝与外销彩釉交相呼应：每一件都显露窑火、留白与纹饰令人沉醉的重复。",
    },
  },
  "sf-2": {
    en: {
      catalogRef: "Plate II — Bronze sanctuary",
      title: "Seated Buddha (bhumisparsha mudra)",
      meta: "Gilt alloy, cast · devotional figure",
      description:
        "Fingers touch the earth in witness. Dark, supple patina reveals centuries of incense smoke and reverent hands—a silent presence worthy of a museum wall.",
    },
    es: {
      catalogRef: "Lámina II — Asilo de bronce",
      title: "Buda sentado (mudra bhumisparsha)",
      meta: "Aleación dorada, fundición · figura devocional",
      description:
        "Los dedos rozan la tierra en testimonio. La pátina oscura y tersa revela siglos de humo de incienso y manos piadosas: una presencia silenciosa digna de un muro de museo.",
    },
    zh: {
      catalogRef: "图版 II — 青铜庇护",
      title: "禅定佛像（触地印）",
      meta: "鎏金合金，铸造 · 供奉造像",
      description:
        "指尖触地为证。深沉温润的包浆透出数百年香火与虔诚的抚触——一种配得上博物馆墙面般的静默在场。",
    },
  },
  "sf-3": {
    en: {
      catalogRef: "Plate III — Numismatics",
      title: "Silver coin — portrait and legend",
      meta: "Silver · Mediterranean workshop · classical antiquity",
      description:
        "A portrait struck into metal: imperial iconography, excavation patina, edge worn by centuries of hands. The coin becomes a miniature of history.",
    },
    es: {
      catalogRef: "Lámina III — Numismática",
      title: "Moneda de plata — retrato y leyenda",
      meta: "Plata · taller mediterráneo · antigüedad clásica",
      description:
        "Un retrato acuñado en el metal: la iconografía imperial, la pátina de excavación, el canto desgastado por siglos de manos. La moneda se vuelve miniatura de historia.",
    },
    zh: {
      catalogRef: "图版 III — 钱币学",
      title: "银币 — 头像与铭文",
      meta: "银 · 地中海作坊 · 古典时期",
      description:
        "金属上敲铸的肖像：帝制图像、出土包浆、被无数双手磨圆的轮廓——钱币化作历史的微缩画。",
    },
  },
};

export function displayRibbonLabel(locale: SiteLocale, id: string, labelFr: string): string {
  if (locale === "fr") return labelFr;
  return RIBBON[id]?.[locale] ?? labelFr;
}

export function displayFacetLabel(locale: SiteLocale, id: string, labelFr: string): string {
  if (locale === "fr") return labelFr;
  return FACET[id]?.[locale] ?? labelFr;
}

export function localizeCatalogItem(locale: SiteLocale, item: CatalogItem): CatalogItem {
  if (locale === "fr") return item;
  const t = PRODUCTS[item.id]?.[locale];
  if (!t) return item;
  return { ...item, ...t };
}

export function localizeFeaturedPiece(locale: SiteLocale, piece: FeaturedPiece): FeaturedPiece {
  if (locale === "fr") return piece;
  const t = FEATURED[piece.id]?.[locale];
  if (!t) return piece;
  return { ...piece, ...t };
}
