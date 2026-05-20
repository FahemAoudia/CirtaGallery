import type { SiteLocale } from "@/lib/site-i18n";

/** Textes français alignés sur le seed / l’admin ; autres langues : miroir traduit. */
export const cmsMirror: Record<
  SiteLocale,
  {
    catalogIntro: string;
    featuredKicker: string;
    featuredTitle: string;
    featuredAside: string;
    aboutKicker: string;
    aboutHeading: string;
    aboutP1: string;
    aboutP2: string;
    contactIntro: string;
  }
> = {
  fr: {
    catalogIntro:
      "Douze directions — de la porcelaine au manuscrit — à parcourir comme les vitrines d’une galerie silencieuse. Filtrez par famille ou cherchez un mot : dynastie, ville, matière.",
    featuredKicker: "La traverse des empires",
    featuredTitle:
      "Trois pièces où se mêlent la Chine des fours, le geste du moine et le bruit des pièces anciennes.",
    featuredAside:
      "Comme dans un journal d’exposition : grandes surfaces d’images, texte mesuré, silence autour des œuvres. Ici, la marchandise reste poétique.",
    aboutKicker: "Qui nous sommes",
    aboutHeading: "Un magasin de curiosités dignes des plus beaux cabinets d’amateurs.",
    aboutP1:
      "Nous achetons lentement, au fil des ventes privées et des maisons fermées. Chaque objet doit pouvoir raconter sa route—mer Caspienne, Caraïbes hispaniques, caravanes du Hoggar—sans tricher sur la patine ni sur la matière.",
    aboutP2:
      "Cirta Gallery relie Constantine ancienne à Paris, entre bureau d’expertise et vitrine chaleureuse. Ici, une assiette de Sèvres dialogue avec une lampe de Bohême ; un dragon laqué répond à un buste espagnol.",
    contactIntro:
      "Une réponse sous trois jours ouvrés. Les rendez-vous sur place se réservent après échange d’emails.",
  },
  en: {
    catalogIntro:
      "Twelve directions—from porcelain to manuscript—to browse like the cases of a quiet gallery. Filter by family or search a word: dynasty, city, material.",
    featuredKicker: "Across empires",
    featuredTitle:
      "Three pieces where China’s kilns, the monk’s gesture, and the sound of old coinage meet.",
    featuredAside:
      "Like an exhibition catalogue: large images, measured text, silence around the works. Here commerce stays poetic.",
    aboutKicker: "Who we are",
    aboutHeading: "A curiosity shop worthy of the finest collectors’ cabinets.",
    aboutP1:
      "We buy slowly, through private sales and shuttered houses. Every object must tell its journey—the Caspian, the Hispanic Caribbean, Hoggar caravans—without faking patina or matter.",
    aboutP2:
      "Cirta Gallery links ancient Constantine to Paris, between appraisal desk and warm showroom. Here a Sèvre plate converses with a Bohemian lamp; a lacquer dragon answers a Spanish bust.",
    contactIntro:
      "A reply within three business days. In-person visits are booked after email exchange.",
  },
  es: {
    catalogIntro:
      "Doce direcciones—de la porcelina al manuscrito—para recorrer como las vitrinas de una galería silenciosa. Filtre por familia o busque una palabra: dinastía, ciudad, materia.",
    featuredKicker: "Travesía de imperios",
    featuredTitle:
      "Tres piezas donde se cruzan los hornos de China, el gesto del monje y el sonido de monedas antiguas.",
    featuredAside:
      "Como en un catálogo de exposición: grandes imágenes, texto sobrio, silencio alrededor de las obras. Aquí el comercio sigue siendo poético.",
    aboutKicker: "Quiénes somos",
    aboutHeading: "Una tienda de curiosidades digna de los mejores gabinetes de aficionados.",
    aboutP1:
      "Compramos despacio, en ventas privadas y casas cerradas. Cada objeto debe contar su ruta—mar Caspio, Caribe hispano, caravanas del Hoggar—sin falsear la pátina ni la materia.",
    aboutP2:
      "Cirta Gallery une la Constantina antigua con París, entre gabinete de peritaje y vitrina cálida. Aquí un plato de Sèvres dialoga con una lámpara de Bohemia; un dragón lacado responde a un busto español.",
    contactIntro:
      "Respuesta en tres días laborables. Las visitas presenciales se concertarán tras un intercambio por correo.",
  },
  zh: {
    catalogIntro:
      "十二个方向——从瓷器到手稿——如同无声展厅的展柜依次打开。可按门类筛选，或搜索朝代、城市、材质等关键词。",
    featuredKicker: "跨越帝国",
    featuredTitle: "三件作品交汇：中国的窑火、僧侣的姿态与古钱币的回响。",
    featuredAside:
      "如同展览图录：大幅图像、克制的文字、作品周围的静谧。商业在此仍可诗意。",
    aboutKicker: "关于我们",
    aboutHeading: "一间配得上顶级藏家陈列室的珍奇馆。",
    aboutP1:
      "我们缓慢收购，经由私人拍卖与闭门旧宅。每件器物都应讲述其旅程——里海、西班牙语加勒比、豪嘎尔驼队——而不伪造包浆与材质。",
    aboutP2:
      "Cirta Gallery 连接古老的君士坦丁与巴黎，介于鉴定案头与温暖展柜之间。塞弗尔瓷盘与波西米亚灯盏对话；漆龙回应西班牙胸像。",
    contactIntro: "三个工作日内回复。实地拜访须在邮件沟通后预约。",
  },
};

export const shellCopy: Record<SiteLocale, { skipToContent: string }> = {
  fr: { skipToContent: "Aller au contenu" },
  en: { skipToContent: "Skip to content" },
  es: { skipToContent: "Ir al contenido" },
  zh: { skipToContent: "跳到正文" },
};

export const heroChromeCopy: Record<
  SiteLocale,
  {
    brandSubtitle: string;
    navCollection: string;
    navSalon: string;
    navAbout: string;
    navContact: string;
    searchCatalogLabel: string;
    searchPlaceholder: string;
    searchSubmitAria: string;
    navMainAria: string;
    navMobileAria: string;
    expertise: string;
    specialties: string;
    regionsLine: string;
    heroBuddhaAlt: string;
    heroJarAlt: string;
    heroJarCaption: string;
    heroCoinsAlt: string;
    heroCoinsCaption: string;
    heroAsideParagraph: string;
    collectionBarTitle: string;
    collectionCardsNavAria: string;
    collectionCardJumpSuffix: string;
    menuOpenAria: string;
    menuCloseAria: string;
    menuTitle: string;
  }
> = {
  fr: {
    brandSubtitle: "Antiquités",
    navCollection: "Collections",
    navSalon: "Salon",
    navAbout: "Qui nous sommes",
    navContact: "Prendre rendez-vous",
    searchCatalogLabel: "Recherche dans le catalogue",
    searchPlaceholder: "Recherche : dynastie, matière, pays…",
    searchSubmitAria: "Lancer la recherche",
    navMainAria: "Principale",
    navMobileAria: "Sections (mobile et tablette)",
    expertise: "Expertise",
    specialties: "Spécialités",
    regionsLine: "Asie · Maghreb · Ibérie · Amériques",
    heroBuddhaAlt: "Statue bouddhique ancienne en bronze à patine profonde",
    heroJarAlt: "Porcelaine bleu et blanc, jarre à décor végétal",
    heroJarCaption: "Route de la soie",
    heroCoinsAlt: "Monnaie antique en argent, portrait gravé",
    heroCoinsCaption: "Métaux & histoire",
    heroAsideParagraph:
      "Chaque cliché suggère un continent : le bronze méditatif du Huayan, le bleu cobalt des fours du Sud, les pièces qui ont traversé l’Atlantique. Le magasin n’imite pas le musée : il prolonge sa rigueur.",
    collectionBarTitle: "Notre collection",
    collectionCardsNavAria: "Rayons en images — accéder au catalogue filtré",
    collectionCardJumpSuffix: "ouvrir le catalogue sur ce rayon",
    menuOpenAria: "Ouvrir le menu",
    menuCloseAria: "Fermer le menu",
    menuTitle: "Navigation",
  },
  en: {
    brandSubtitle: "Antiques",
    navCollection: "Collections",
    navSalon: "Salon",
    navAbout: "About us",
    navContact: "Book a visit",
    searchCatalogLabel: "Search the catalogue",
    searchPlaceholder: "Search: dynasty, material, country…",
    searchSubmitAria: "Run search",
    navMainAria: "Main",
    navMobileAria: "Sections (mobile and tablet)",
    expertise: "Expertise",
    specialties: "Specialties",
    regionsLine: "Asia · Maghreb · Iberia · Americas",
    heroBuddhaAlt: "Ancient Buddhist bronze statue with deep patina",
    heroJarAlt: "Blue-and-white porcelain jar with botanical decor",
    heroJarCaption: "Silk Road",
    heroCoinsAlt: "Ancient silver coin with engraved portrait",
    heroCoinsCaption: "Metals & history",
    heroAsideParagraph:
      "Each scene hints at a continent: Huayan meditation bronze, southern-kiln cobalt blue, coins that crossed the Atlantic. The shop does not mimic the museum: it extends its rigour.",
    collectionBarTitle: "Our collection",
    collectionCardsNavAria: "Aisles in pictures — open filtered catalogue",
    collectionCardJumpSuffix: "open catalogue on this aisle",
    menuOpenAria: "Open menu",
    menuCloseAria: "Close menu",
    menuTitle: "Navigation",
  },
  es: {
    brandSubtitle: "Antigüedades",
    navCollection: "Colecciones",
    navSalon: "Salón",
    navAbout: "Quiénes somos",
    navContact: "Pedir cita",
    searchCatalogLabel: "Buscar en el catálogo",
    searchPlaceholder: "Buscar: dinastía, materia, país…",
    searchSubmitAria: "Iniciar búsqueda",
    navMainAria: "Principal",
    navMobileAria: "Secciones (móvil y tablet)",
    expertise: "Pericia",
    specialties: "Especialidades",
    regionsLine: "Asia · Magreb · Iberia · Américas",
    heroBuddhaAlt: "Antigua estatua budista de bronce con pátina profunda",
    heroJarAlt: "Porcelana azul y blanca, jarra con decoración vegetal",
    heroJarCaption: "Ruta de la seda",
    heroCoinsAlt: "Moneda antigua de plata con retrato grabado",
    heroCoinsCaption: "Metales e historia",
    heroAsideParagraph:
      "Cada imagen evoca un continente: el bronce meditativo Huayan, el azul cobalto de hornos del sur, las piezas que cruzaron el Atlántico. La tienda no imita al museo: prolonga su rigor.",
    collectionBarTitle: "Nuestra colección",
    collectionCardsNavAria: "Secciones en imágenes — abrir catálogo filtrado",
    collectionCardJumpSuffix: "abrir el catálogo en esta sección",
    menuOpenAria: "Abrir menú",
    menuCloseAria: "Cerrar menú",
    menuTitle: "Navegación",
  },
  zh: {
    brandSubtitle: "古董",
    navCollection: "藏品",
    navSalon: "沙龙",
    navAbout: "关于我们",
    navContact: "预约到访",
    searchCatalogLabel: "在目录中搜索",
    searchPlaceholder: "搜索：朝代、材质、国家…",
    searchSubmitAria: "搜索",
    navMainAria: "主导航",
    navMobileAria: "分区（手机与平板）",
    expertise: "鉴定资历",
    specialties: "专长领域",
    regionsLine: "亚洲 · 马格里布 · 伊比利亚 · 美洲",
    heroBuddhaAlt: "包浆厚重的古代青铜佛教造像",
    heroJarAlt: "青花植物纹罐",
    heroJarCaption: "丝绸之路",
    heroCoinsAlt: "古代银币，浮雕头像",
    heroCoinsCaption: "金属与历史",
    heroAsideParagraph:
      "每帧画面暗示一片大陆：华严的禅定青铜、南方窑口的钴蓝、横渡大西洋的钱币。店铺并非模仿博物馆，而是延续其严谨。",
    collectionBarTitle: "本馆收藏",
    collectionCardsNavAria: "分类图示 — 打开筛选后的目录",
    collectionCardJumpSuffix: "在目录中查看此展区",
    menuOpenAria: "打开菜单",
    menuCloseAria: "关闭菜单",
    menuTitle: "导航",
  },
};

export const aboutSectionUi: Record<
  SiteLocale,
  {
    promiseDt: string;
    promiseDd: string;
    rendezvousDt: string;
    rendezvousDd: string;
    figShelves: string;
    figDragons: string;
    figBronze: string;
  }
> = {
  fr: {
    promiseDt: "Notre promesse",
    promiseDd: "Authenticité prouvée ou désintéressement.",
    rendezvousDt: "Rendez-vous",
    rendezvousDd:
      "Salons sur rendez-vous, ou envoi numérique sécurisé pour les collectionneurs lointains.",
    figShelves: "Cabinets & céramiques",
    figDragons: "Dragons de bronze",
    figBronze: "Bronze patiné",
  },
  en: {
    promiseDt: "Our promise",
    promiseDd: "Proven authenticity or we step aside.",
    rendezvousDt: "Visits",
    rendezvousDd:
      "By appointment, or secure digital previews for distant collectors.",
    figShelves: "Cabinets & ceramics",
    figDragons: "Bronze dragons",
    figBronze: "Patinated bronze",
  },
  es: {
    promiseDt: "Nuestra promesa",
    promiseDd: "Autenticidad probada o nos retiramos.",
    rendezvousDt: "Citas",
    rendezvousDd: "Salón con cita previa, o envío digital seguro para lejanos.",
    figShelves: "Vitrinas y cerámica",
    figDragons: "Dragones de bronce",
    figBronze: "Bronce patinado",
  },
  zh: {
    promiseDt: "我们的承诺",
    promiseDd: "可证实来源与真伪，否则不予勉强。",
    rendezvousDt: "预约",
    rendezvousDd: "沙龙需预约；亦可为远方藏家提供安全的线上鉴赏。",
    figShelves: "陈列与陶瓷",
    figDragons: "青铜龙饰",
    figBronze: "包浆青铜",
  },
};

export const featuredUi: Record<SiteLocale, { requestCondition: string }> = {
  fr: { requestCondition: "Demander une fiche d’état" },
  en: { requestCondition: "Request a condition report" },
  es: { requestCondition: "Solicitar informe de estado" },
  zh: { requestCondition: "索取品相说明" },
};

export const catalogUi: Record<
  SiteLocale,
  {
    kicker: string;
    heading: string;
    facetHeading: string;
    facetHint: string;
    ribbonActive: string;
    emptyMessage: string;
    mobileFiltersSummary: string;
    mobileCategories: string;
    mobileRibbon: string;
    refineNavAria: string;
    refineNavMobileAria: string;
    ribbonNavAria: string;
  }
> = {
  fr: {
    kicker: "Catalogue en ligne",
    heading: "Des civilisations entières, posées sur vos étagères",
    facetHeading: "Catégories",
    facetHint:
      "Ruban du haut de page ou colonne de gauche : deux entrées pour le même cabinet, comme sur votre croquis — revisitées.",
    ribbonActive: "Rayons actifs",
    emptyMessage:
      "Aucun objet ne correspond à cette recherche. Élargissez le ruban ou effacez un filtre.",
    mobileFiltersSummary: "Filtres · catégories & rayons",
    mobileCategories: "Catégories",
    mobileRibbon: "Rayons actifs",
    refineNavAria: "Filtrer par matière",
    refineNavMobileAria: "Filtrer par matière (mobile)",
    ribbonNavAria: "Rayons",
  },
  en: {
    kicker: "Online catalogue",
    heading: "Whole civilizations, resting on your shelves",
    facetHeading: "Categories",
    facetHint:
      "The top ribbon or left column: two doors into the same cabinet—revisited.",
    ribbonActive: "Active aisles",
    emptyMessage:
      "No piece matches this search. Broaden the ribbon or clear a filter.",
    mobileFiltersSummary: "Filters · categories & aisles",
    mobileCategories: "Categories",
    mobileRibbon: "Active aisles",
    refineNavAria: "Filter by material",
    refineNavMobileAria: "Filter by material (mobile)",
    ribbonNavAria: "Aisles",
  },
  es: {
    kicker: "Catálogo en línea",
    heading: "Civilizaciones enteras, sobre sus estanterías",
    facetHeading: "Categorías",
    facetHint:
      "La cinta superior o la columna izquierda: dos entradas al mismo gabinete—revisitadas.",
    ribbonActive: "Secciones activas",
    emptyMessage:
      "Ninguna pieza coincide con esta búsqueda. Amplíe la sección o borre un filtro.",
    mobileFiltersSummary: "Filtros · categorías y secciones",
    mobileCategories: "Categorías",
    mobileRibbon: "Secciones activas",
    refineNavAria: "Filtrar por materia",
    refineNavMobileAria: "Filtrar por materia (móvil)",
    ribbonNavAria: "Secciones",
  },
  zh: {
    kicker: "在线目录",
    heading: "整片文明，静立您的书架之上",
    facetHeading: "类别",
    facetHint: "页眉色带或左侧栏：通往同一藏厅的两扇门——焕然呈现。",
    ribbonActive: "当前展区",
    emptyMessage: "没有符合筛选的藏品。请放宽展区条件或清除筛选。",
    mobileFiltersSummary: "筛选 · 类别与展区",
    mobileCategories: "类别",
    mobileRibbon: "当前展区",
    refineNavAria: "按材质筛选",
    refineNavMobileAria: "按材质筛选（手机）",
    ribbonNavAria: "展区",
  },
};

export const catalogRefineCopy: Record<
  SiteLocale,
  {
    refineLabel: string;
    placeholder: string;
    update: string;
    reset: string;
  }
> = {
  fr: {
    refineLabel: "Affiner la recherche",
    placeholder: "Affiner : Ming, Tolède, corail…",
    update: "Mettre à jour",
    reset: "Réinitialiser",
  },
  en: {
    refineLabel: "Refine search",
    placeholder: "Refine: Ming, Toledo, coral…",
    update: "Update",
    reset: "Reset",
  },
  es: {
    refineLabel: "Afinar búsqueda",
    placeholder: "Afinar: Ming, Toledo, coral…",
    update: "Actualizar",
    reset: "Restablecer",
  },
  zh: {
    refineLabel: "细化搜索",
    placeholder: "例如：明代、托莱多、珊瑚…",
    update: "更新",
    reset: "重置",
  },
};

export const productCardCopy: Record<
  SiteLocale,
  {
    priceCad: string;
    onRequest: string;
    qtyFor: string;
    decreaseQty: string;
    increaseQty: string;
    addToCart: string;
    contactOffer: string;
    descriptionLabel: string;
    voirPlus: string;
    voirMoins: string;
    depthLabel: string;
    weightLabel: string;
    hauteurLabel: string;
    /** Libellés courts — une seule ligne sur les cartes catalogue. */
    depthLabelShort: string;
    weightLabelShort: string;
    hauteurLabelShort: string;
  }
> = {
  fr: {
    priceCad: "Prix (CAD)",
    onRequest: "Sur demande",
    qtyFor: "Quantité pour",
    decreaseQty: "Diminuer la quantité",
    increaseQty: "Augmenter la quantité",
    addToCart: "Ajouter au panier",
    contactOffer: "Contactez-nous pour une offre sur ce lot.",
    descriptionLabel: "Description",
    voirPlus: "Voir plus",
    voirMoins: "Voir moins",
    depthLabel: "Profondeur",
    weightLabel: "Poids",
    hauteurLabel: "Hauteur",
    depthLabelShort: "Prof.",
    weightLabelShort: "Poids",
    hauteurLabelShort: "Haut.",
  },
  en: {
    priceCad: "Price (CAD)",
    onRequest: "On request",
    qtyFor: "Quantity for",
    decreaseQty: "Decrease quantity",
    increaseQty: "Increase quantity",
    addToCart: "Add to cart",
    contactOffer: "Contact us for an offer on this lot.",
    descriptionLabel: "Description",
    voirPlus: "Show more",
    voirMoins: "Show less",
    depthLabel: "Depth",
    weightLabel: "Weight",
    hauteurLabel: "Height",
    depthLabelShort: "Dep.",
    weightLabelShort: "Wt.",
    hauteurLabelShort: "Ht.",
  },
  es: {
    priceCad: "Precio (CAD)",
    onRequest: "Bajo consulta",
    qtyFor: "Cantidad para",
    decreaseQty: "Reducir cantidad",
    increaseQty: "Aumentar cantidad",
    addToCart: "Añadir al carrito",
    contactOffer: "Contáctenos para una oferta sobre este lote.",
    descriptionLabel: "Descripción",
    voirPlus: "Ver más",
    voirMoins: "Ver menos",
    depthLabel: "Profundidad",
    weightLabel: "Peso",
    hauteurLabel: "Altura",
    depthLabelShort: "Prof.",
    weightLabelShort: "Peso",
    hauteurLabelShort: "Alt.",
  },
  zh: {
    priceCad: "价格（加元）",
    onRequest: "议价",
    qtyFor: "数量：",
    decreaseQty: "减少数量",
    increaseQty: "增加数量",
    addToCart: "加入购物车",
    contactOffer: "有意议价请联系我们以商议此件。",
    descriptionLabel: "简介",
    voirPlus: "展开",
    voirMoins: "收起",
    depthLabel: "深度",
    weightLabel: "重量",
    hauteurLabel: "高度",
    depthLabelShort: "深",
    weightLabelShort: "重",
    hauteurLabelShort: "高",
  },
};

/** Fiche œuvre (lightbox) — catalogue */
export const productInspectCopy: Record<
  SiteLocale,
  {
    sheetKicker: string;
    zoomHint: string;
    close: string;
    openDetailsAria: string;
    prevImageAria: string;
    nextImageAria: string;
  }
> = {
  fr: {
    sheetKicker: "Fiche œuvre",
    zoomHint:
      "Molette : zoom · double-clic : réinitialiser · glisser pour déplacer lorsque zoomé",
    close: "Fermer",
    openDetailsAria: "Ouvrir la fiche détaillée et agrandir la photo",
    prevImageAria: "Vue précédente",
    nextImageAria: "Vue suivante",
  },
  en: {
    sheetKicker: "Piece sheet",
    zoomHint:
      "Scroll wheel: zoom · double-click: reset · drag to pan when zoomed",
    close: "Close",
    openDetailsAria: "Open detailed sheet and enlarge the photo",
    prevImageAria: "Previous view",
    nextImageAria: "Next view",
  },
  es: {
    sheetKicker: "Ficha de la pieza",
    zoomHint:
      "Rueda del ratón: zoom · doble clic: restablecer · arrastrar para mover con zoom",
    close: "Cerrar",
    openDetailsAria: "Abrir ficha detallada y ampliar la foto",
    prevImageAria: "Vista anterior",
    nextImageAria: "Vista siguiente",
  },
  zh: {
    sheetKicker: "作品档案",
    zoomHint: "滚轮缩放 · 双击还原 · 放大后可拖拽平移",
    close: "关闭",
    openDetailsAria: "打开详情并放大图片",
    prevImageAria: "上一视图",
    nextImageAria: "下一视图",
  },
};

export const faqChatCopy: Record<
  SiteLocale,
  {
    fabAria: string;
    panelTitle: string;
    intro: string;
    assistant: string;
    clear: string;
    close: string;
    empty: string;
  }
> = {
  fr: {
    fabAria: "Ouvrir les questions fréquentes",
    panelTitle: "Questions & réponses",
    intro: "Choisissez une question — la réponse apparaît comme dans une conversation.",
    assistant: "Cirta Gallery",
    clear: "Effacer",
    close: "Fermer",
    empty: "Aucune question pour le moment.",
  },
  en: {
    fabAria: "Open frequently asked questions",
    panelTitle: "Questions & answers",
    intro: "Tap a question — the answer appears below, chat-style.",
    assistant: "Cirta Gallery",
    clear: "Clear",
    close: "Close",
    empty: "No questions yet.",
  },
  es: {
    fabAria: "Abrir preguntas frecuentes",
    panelTitle: "Preguntas y respuestas",
    intro: "Elija una pregunta: la respuesta aparece debajo, al estilo chat.",
    assistant: "Cirta Gallery",
    clear: "Limpiar",
    close: "Cerrar",
    empty: "Aún no hay preguntas.",
  },
  zh: {
    fabAria: "打开常见问题",
    panelTitle: "问答",
    intro: "点选问题，回答会在下方以对话形式显示。",
    assistant: "Cirta Gallery",
    clear: "清除",
    close: "关闭",
    empty: "暂无问题。",
  },
};

export const cartCopy: Record<
  SiteLocale,
  {
    closeOverlayAria: string;
    drawerTitle: string;
    closeAria: string;
    thankYouTitle: string;
    thankYouBlurb: string;
    close: string;
    empty: string;
    less: string;
    more: string;
    remove: string;
    totalCad: string;
    taxNote: string;
    paypalMissing: string;
    reserveByMessage: string;
  }
> = {
  fr: {
    closeOverlayAria: "Fermer le panier",
    drawerTitle: "Panier",
    closeAria: "Fermer",
    thankYouTitle: "Merci pour votre paiement",
    thankYouBlurb:
      "Votre commande est enregistrée. La galerie vous contactera sous peu pour la livraison ou le retrait.",
    close: "Fermer",
    empty: "Votre panier est vide. Ajoutez des pièces depuis le catalogue.",
    less: "Moins",
    more: "Plus",
    remove: "Retirer",
    totalCad: "Total CAD",
    taxNote:
      "Taxes et précisions de livraison avec l’administration après commande.",
    paypalMissing:
      "PayPal indisponible : vérifiez NEXT_PUBLIC_PAYPAL_CLIENT_ID dans votre fichier d’environnement.",
    reserveByMessage: "Ou réservez par message ou téléphone",
  },
  en: {
    closeOverlayAria: "Close cart",
    drawerTitle: "Cart",
    closeAria: "Close",
    thankYouTitle: "Thank you for your payment",
    thankYouBlurb:
      "Your order is recorded. The gallery will contact you shortly about shipping or pickup.",
    close: "Close",
    empty: "Your cart is empty. Add pieces from the catalogue.",
    less: "Less",
    more: "More",
    remove: "Remove",
    totalCad: "Total CAD",
    taxNote: "Taxes and delivery details will be confirmed after your order.",
    paypalMissing:
      "PayPal unavailable: check NEXT_PUBLIC_PAYPAL_CLIENT_ID in your environment file.",
    reserveByMessage: "Or reserve by message or phone",
  },
  es: {
    closeOverlayAria: "Cerrar carrito",
    drawerTitle: "Carrito",
    closeAria: "Cerrar",
    thankYouTitle: "Gracias por su pago",
    thankYouBlurb:
      "Su pedido está registrado. La galería le contactará pronto para envío o recogida.",
    close: "Cerrar",
    empty: "Su carrito está vacío. Añada piezas desde el catálogo.",
    less: "Menos",
    more: "Más",
    remove: "Quitar",
    totalCad: "Total CAD",
    taxNote: "Impuestos y envío se concretarán tras el pedido.",
    paypalMissing:
      "PayPal no disponible: compruebe NEXT_PUBLIC_PAYPAL_CLIENT_ID en su entorno.",
    reserveByMessage: "O reserve por mensaje o teléfono",
  },
  zh: {
    closeOverlayAria: "关闭购物车",
    drawerTitle: "购物车",
    closeAria: "关闭",
    thankYouTitle: "感谢您的付款",
    thankYouBlurb: "订单已记录。画廊将尽快与您联系安排寄送或自取。",
    close: "关闭",
    empty: "购物车为空。请从目录中添加藏品。",
    less: "减少",
    more: "增加",
    remove: "移除",
    totalCad: "合计（加元）",
    taxNote: "税费与物流细节将在下单后与馆方确认。",
    paypalMissing: "无法使用 PayPal：请检查环境变量 NEXT_PUBLIC_PAYPAL_CLIENT_ID。",
    reserveByMessage: "或通过留言或电话预订",
  },
};

export const contactCopy: Record<
  SiteLocale,
  {
    kicker: string;
    heading: string;
    addressLabel: string;
    thankYou: string;
    labelName: string;
    phName: string;
    labelEmail: string;
    phEmail: string;
    labelRef: string;
    phRef: string;
    labelMessage: string;
    phMessage: string;
    submit: string;
    submitSending: string;
    sendError: string;
    footnote: string;
  }
> = {
  fr: {
    kicker: "Contact confidentiel",
    heading: "Réserver une pièce, un passage au salon ou une expertise",
    addressLabel: "Adresse",
    thankYou:
      "Merci. Votre message est transmis : nous revenons vers vous sous trois jours ouvrés.",
    labelName: "Nom",
    phName: "Nom et prénom",
    labelEmail: "Courriel",
    phEmail: "vous@exemple.com",
    labelRef: "Réf. catalogue (optionnel)",
    phRef: "ex. CG-07, Planche II",
    labelMessage: "Message",
    phMessage:
      "Objet désiré, budget indicatif, dates de visite, ou questions d’authenticité.",
    submit: "Envoyer",
    submitSending: "Envoi…",
    sendError:
      "L’envoi a échoué. Réessayez plus tard ou écrivez-nous directement à l’adresse indiquée à côté.",
    footnote:
      "Pour une acquisition urgente, indiquez-le : nous priorisons les dossiers patrimoniaux.",
  },
  en: {
    kicker: "Confidential contact",
    heading: "Reserve a piece, a salon visit, or an appraisal",
    addressLabel: "Address",
    thankYou:
      "Thank you. Your message is sent—we will reply within three business days.",
    labelName: "Name",
    phName: "First and last name",
    labelEmail: "Email",
    phEmail: "you@example.com",
    labelRef: "Catalogue ref. (optional)",
    phRef: "e.g. CG-07, Plate II",
    labelMessage: "Message",
    phMessage:
      "Desired object, indicative budget, visit dates, or authenticity questions.",
    submit: "Send",
    submitSending: "Sending…",
    sendError:
      "Could not send. Try again later or email us directly at the address shown beside the form.",
    footnote:
      "For an urgent acquisition, say so—we prioritise heritage files.",
  },
  es: {
    kicker: "Contacto confidencial",
    heading: "Reservar una pieza, una visita al salón o una pericia",
    addressLabel: "Dirección",
    thankYou:
      "Gracias. Su mensaje ha sido enviado: responderemos en tres días laborables.",
    labelName: "Nombre",
    phName: "Nombre y apellidos",
    labelEmail: "Correo",
    phEmail: "usted@ejemplo.com",
    labelRef: "Ref. catálogo (opcional)",
    phRef: "p. ej. CG-07, Lámina II",
    labelMessage: "Mensaje",
    phMessage:
      "Objeto deseado, presupuesto orientativo, fechas de visita o dudas de autenticidad.",
    submit: "Enviar",
    submitSending: "Enviando…",
    sendError:
      "No se pudo enviar. Inténtelo más tarde o escríbanos al correo indicado al lado del formulario.",
    footnote:
      "Si la adquisición es urgente, indíquelo: priorizamos expedientes patrimoniales.",
  },
  zh: {
    kicker: "保密联络",
    heading: "预约洽购、到访沙龙或申请鉴定",
    addressLabel: "地址",
    thankYou: "谢谢。您的留言已收到，我们将在三个工作日内回复。",
    labelName: "姓名",
    phName: "姓名",
    labelEmail: "电子邮箱",
    phEmail: "you@example.com",
    labelRef: "目录编号（可选）",
    phRef: "例如 CG-07，图版 II",
    labelMessage: "留言",
    phMessage: "意向藏品、预算范围、希望到访日期或真伪咨询。",
    submit: "发送",
    submitSending: "发送中…",
    sendError: "发送失败。请稍后再试，或直接使用页面左侧显示的邮箱联系我们。",
    footnote: "若为紧急洽购请注明，我们将优先处理重要遗产类委托。",
  },
};

/** Libellés accessibles pour courriel, téléphone, WhatsApp et réseaux */
export const socialContactAria: Record<
  SiteLocale,
  {
    mail: string;
    phone: string;
    whatsapp: string;
    facebook: string;
    instagram: string;
    pinterest: string;
    ebay: string;
    whatnot: string;
  }
> = {
  fr: {
    mail: "Écrire à Cirta Gallery",
    phone: "Appeler Cirta Gallery",
    whatsapp: "Contacter Cirta Gallery sur WhatsApp",
    facebook: "Cirta Gallery sur Facebook (nouvel onglet)",
    instagram: "Cirta Gallery sur Instagram (nouvel onglet)",
    pinterest: "Cirta Gallery sur Pinterest (nouvel onglet)",
    ebay: "Cirta Gallery sur eBay (nouvel onglet)",
    whatnot: "Cirta Gallery sur Whatnot (nouvel onglet)",
  },
  en: {
    mail: "Email Cirta Gallery",
    phone: "Call Cirta Gallery",
    whatsapp: "Message Cirta Gallery on WhatsApp",
    facebook: "Cirta Gallery on Facebook (opens in a new tab)",
    instagram: "Cirta Gallery on Instagram (opens in a new tab)",
    pinterest: "Cirta Gallery on Pinterest (opens in a new tab)",
    ebay: "Cirta Gallery on eBay (opens in a new tab)",
    whatnot: "Cirta Gallery on Whatnot (opens in a new tab)",
  },
  es: {
    mail: "Escribir a Cirta Gallery",
    phone: "Llamar a Cirta Gallery",
    whatsapp: "Contactar con Cirta Gallery por WhatsApp",
    facebook: "Cirta Gallery en Facebook (nueva pestaña)",
    instagram: "Cirta Gallery en Instagram (nueva pestaña)",
    pinterest: "Cirta Gallery en Pinterest (nueva pestaña)",
    ebay: "Cirta Gallery en eBay (nueva pestaña)",
    whatnot: "Cirta Gallery en Whatnot (nueva pestaña)",
  },
  zh: {
    mail: "发送邮件至 Cirta Gallery",
    phone: "致电 Cirta Gallery",
    whatsapp: "通过 WhatsApp 联系 Cirta Gallery",
    facebook: "Cirta Gallery 的 Facebook（新标签页打开）",
    instagram: "Cirta Gallery 的 Instagram（新标签页打开）",
    pinterest: "Cirta Gallery 的 Pinterest（新标签页打开）",
    ebay: "Cirta Gallery 的 eBay（新标签页打开）",
    whatnot: "Cirta Gallery 的 Whatnot（新标签页打开）",
  },
};

export const footerCopy: Record<
  SiteLocale,
  {
    brandTagline: string;
    blurb: string;
    navTitle: string;
    siteMapAria: string;
    navCollection: string;
    navSalon: string;
    navAbout: string;
    navContact: string;
    serviceTitle: string;
    policyReturn: string;
    policyShipping: string;
    policyHours: string;
    policyLegal: string;
    visitsTitle: string;
    socialTitle: string;
    adminFooterLink: string;
    legalLine: string;
    cataloguePanier: string;
  }
> = {
  fr: {
    brandTagline: "Antiquités",
    blurb:
      "Maison spécialisée dans les arts décoratifs et la sculpture du monde entier : Asie, Méditerranée, Amériques, et numismatique d’ancien régime.",
    navTitle: "Navigation",
    siteMapAria: "Plan du site",
    navCollection: "Collections",
    navSalon: "Salon",
    navAbout: "Qui sommes-nous",
    navContact: "Contact",
    serviceTitle: "Service client",
    policyReturn: "Politique de retour",
    policyShipping: "Politique de livraison",
    policyHours: "Horaires",
    policyLegal: "Informations légales",
    visitsTitle: "Visites",
    socialTitle: "Réseaux",
    adminFooterLink: "Connexion équipe",
    legalLine: "Expertises · emballage musée · provenances documentées",
    cataloguePanier: "Catalogue & panier",
  },
  en: {
    brandTagline: "Antiques",
    blurb:
      "House specialising in decorative arts and sculpture from Asia, the Mediterranean, and the Americas, plus ancien-régime numismatics.",
    navTitle: "Navigation",
    siteMapAria: "Site map",
    navCollection: "Collections",
    navSalon: "Salon",
    navAbout: "About us",
    navContact: "Contact",
    serviceTitle: "Customer care",
    policyReturn: "Returns policy",
    policyShipping: "Shipping policy",
    policyHours: "Hours",
    policyLegal: "Legal information",
    visitsTitle: "Visits",
    socialTitle: "Social",
    adminFooterLink: "Staff login",
    legalLine: "Appraisals · museum packing · documented provenance",
    cataloguePanier: "Catalogue & cart",
  },
  es: {
    brandTagline: "Antigüedades",
    blurb:
      "Casa especializada en artes decorativas y escultura de Asia, Mediterráneo y Américas, y numismática de antiguo régimen.",
    navTitle: "Navegación",
    siteMapAria: "Mapa del sitio",
    navCollection: "Colecciones",
    navSalon: "Salón",
    navAbout: "Quiénes somos",
    navContact: "Contacto",
    serviceTitle: "Atención al cliente",
    policyReturn: "Política de devolución",
    policyShipping: "Política de envío",
    policyHours: "Horario",
    policyLegal: "Información legal",
    visitsTitle: "Visitas",
    socialTitle: "Redes",
    adminFooterLink: "Acceso equipo",
    legalLine: "Pericias · embalaje museo · procedencias documentadas",
    cataloguePanier: "Catálogo y carrito",
  },
  zh: {
    brandTagline: "古董",
    blurb:
      "专注于装饰艺术与雕塑：亚洲、地中海、美洲，以及旧制度时期钱币学。",
    navTitle: "导航",
    siteMapAria: "网站地图",
    navCollection: "藏品",
    navSalon: "沙龙",
    navAbout: "关于我们",
    navContact: "联系",
    serviceTitle: "客户服务",
    policyReturn: "退换政策",
    policyShipping: "寄送政策",
    policyHours: "开放时间",
    policyLegal: "法律信息",
    visitsTitle: "到访",
    socialTitle: "社交",
    adminFooterLink: "团队登录",
    legalLine: "鉴定 · 博物馆级包装 · 有据来源",
    cataloguePanier: "目录与购物车",
  },
};

export const heroActionsCopy: Record<SiteLocale, { cart: string }> = {
  fr: { cart: "Panier" },
  en: { cart: "Cart" },
  es: { cart: "Carrito" },
  zh: { cart: "购物车" },
};

export function catalogCountLine(
  locale: SiteLocale,
  filtered: number,
  total: number,
): string {
  switch (locale) {
    case "fr":
      return `${filtered} pièce${filtered === 1 ? "" : "s"} sur ${total} visibles`;
    case "en":
      return `${filtered} piece${filtered === 1 ? "" : "s"} of ${total} shown`;
    case "es":
      return `${filtered} pieza${filtered === 1 ? "" : "s"} de ${total} visibles`;
    case "zh":
      return `共 ${total} 件展示，当前筛选 ${filtered} 件`;
    default:
      return `${filtered} / ${total}`;
  }
}

export function cartArticleLine(locale: SiteLocale, n: number): string {
  if (locale === "zh") return `${n}件`;
  const w =
    locale === "fr"
      ? n === 1
        ? "article"
        : "articles"
      : locale === "en"
        ? n === 1
          ? "item"
          : "items"
        : n === 1
          ? "artículo"
          : "artículos";
  return `${n} ${w}`;
}

export function paypalOrderDescription(locale: SiteLocale, count: number): string {
  switch (locale) {
    case "fr":
      return `Cirta Gallery — commande (${count} réf.)`;
    case "en":
      return `Cirta Gallery — order (${count} ref.)`;
    case "es":
      return `Cirta Gallery — pedido (${count} ref.)`;
    case "zh":
      return `Cirta Gallery 订单（${count} 件）`;
    default:
      return `Cirta Gallery (${count})`;
  }
}

export function footerCopyrightLine(locale: SiteLocale, year: number): string {
  switch (locale) {
    case "fr":
      return `© ${year} Cirta Gallery Antiquités.`;
    case "en":
      return `© ${year} Cirta Gallery Antiques.`;
    case "es":
      return `© ${year} Cirta Gallery Antigüedades.`;
    case "zh":
      return `© ${year} Cirta Gallery 古董.`;
    default:
      return `© ${year} Cirta Gallery.`;
  }
}
