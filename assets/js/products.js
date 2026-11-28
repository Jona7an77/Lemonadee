/* Lemonadee — product catalog.
   Edit this file to add, remove or change products.
   - price: write it as text, e.g. "$24.00". Leave "[PRICE]" until you decide.
   - art: which pixel illustration to show until you add real photos
     (stand, cat, hero, name, lamp, map). To use a photo instead, set
     image: "assets/img/your-photo.jpg".
   - featured: true puts the product in the home-page hero carousel and
     the "Featured drops" grid.
   - tagline: short headline shown on its carousel slide.
   - cutout: optional transparent PNG (background removed) for the
     carousel, e.g. "assets/img/map-stand-cutout.png". Falls back to image.
   - category: must match one of CATEGORIES below. */

const CATEGORIES = [
  { id: "stands", label: "Controller stands" },
  { id: "lamps", label: "Lamps" },
  { id: "display", label: "Display pieces" },
  { id: "custom", label: "Custom" }
];

const PRODUCTS = [
  {
    id: "fantasy-map-stand",
    tagline: "Legendary map",
    name: "Fantasy Map Controller Stand",
    category: "stands",
    meta: "Fits Switch 1 & 2 Pro",
    price: "[PRICE]",
    badge: "Custom",
    featured: true,
    art: "map",
    description: "A controller throne with a raised fantasy-map plate. Holds Switch 1 and Switch 2 Pro controllers.",
    colors: [
      { name: "Teal + Lemon", hex: "#032425" },
      { name: "Ivy", hex: "#416858" },
      { name: "Cocoon", hex: "#DEDBCC" },
      { name: "Lemon", hex: "#FFF44F" }
    ],
    details: ["Printed in PLA", "Printed to order", "Add a name plate on request"]
  },
  {
    id: "8-bit-cat-lamp",
    tagline: "Glow up",
    name: "8-Bit Cat Desk Lamp",
    category: "lamps",
    meta: "Multicolor print · USB powered",
    price: "[PRICE]",
    badge: "New drop",
    featured: true,
    art: "cat",
    description: "A pixel cat that glows on your desk. Multicolor print with a warm LED inside.",
    colors: [
      { name: "Lemon", hex: "#FFF44F" },
      { name: "Lighthouse", hex: "#F3F4F4" },
      { name: "Ivy", hex: "#416858" }
    ],
    details: ["USB powered", "Multicolor print", "LED included"]
  },
  {
    id: "pixel-hero-base",
    tagline: "Level up",
    name: "Pixel Hero Display Base",
    category: "display",
    meta: "For figures up to 6 in",
    price: "[PRICE]",
    featured: true,
    art: "hero",
    description: "A stepped pixel base that makes any figure look like it just leveled up.",
    colors: [
      { name: "Teal", hex: "#032425" },
      { name: "Ivy", hex: "#416858" },
      { name: "Cocoon", hex: "#DEDBCC" }
    ],
    details: ["Fits figures up to 6 in", "Non-slip feet", "Printed to order"]
  },
  {
    id: "custom-name-stand",
    tagline: "Make it yours",
    name: "Custom Name Controller Stand",
    category: "custom",
    meta: "Your name or gamertag",
    price: "[PRICE]",
    badge: "Your name",
    featured: true,
    art: "name",
    description: "A controller stand with your name or gamertag in pixel letters across the front.",
    colors: [
      { name: "Teal + Lemon", hex: "#032425" },
      { name: "Lemon", hex: "#FFF44F" },
      { name: "Ivy", hex: "#416858" }
    ],
    details: ["Up to 12 characters", "Choose two colors", "Printed to order"]
  },
  {
    id: "pixel-lemon-lamp",
    name: "Pixel Lemon Lamp",
    category: "lamps",
    meta: "Multicolor print · USB-C",
    price: "[PRICE]",
    art: "lamp",
    description: "The Lemonadee lemon as a soft night light.",
    colors: [
      { name: "Lemon", hex: "#FFF44F" },
      { name: "Lighthouse", hex: "#F3F4F4" }
    ],
    details: ["USB-C powered", "Multicolor print", "LED included"]
  },
  {
    id: "dual-controller-stand",
    name: "Dual Controller Stand",
    category: "stands",
    meta: "Holds two controllers",
    price: "[PRICE]",
    art: "stand",
    description: "Side-by-side stand for co-op nights. Two slots, one clean desk.",
    colors: [
      { name: "Teal", hex: "#032425" },
      { name: "Ivy", hex: "#416858" },
      { name: "Lemon", hex: "#FFF44F" }
    ],
    details: ["Two slots", "Printed in PLA", "Printed to order"]
  }
];

/* ---------- Pixel illustrations (placeholders until you add photos) ---------- */
const PIXEL_COLORS = {
  T: "#032425", I: "#416858", G: "#9BB55A", Y: "#FFF44F", L: "#F3F4F4", C: "#DEDBCC"
};

const PIXEL_ART = {
  stand: [
    "............",
    "..IIIIIIII..",
    "..IYYIIIGI..",
    "..IIIIIGIG..",
    "..IIIIIIGI..",
    "..IIIIIIII..",
    "TTTTTTTTTTTT",
    "TTTTTTTTTTTT"
  ],
  map: [
    "............",
    "..CCCCCCCC..",
    "..CGGCCICC..",
    "..CGIGCCYC..",
    "..CCGGCCCC..",
    "..CCCCCCCC..",
    "TTTTTTTTTTTT",
    "TYYTTTTTTYYT"
  ],
  cat: [
    ".I......I.",
    ".II....II.",
    ".IIIIIIII.",
    ".ILIIIILI.",
    ".IIIYYIII.",
    ".IIIIIIII.",
    "....TT....",
    "....TT....",
    "..YYYYYY.."
  ],
  hero: [
    "...YYYY...",
    "...YTYY...",
    "...YYYY...",
    "..IIIIII..",
    "..IIIIII..",
    "..T....T..",
    ".CCCCCCCC.",
    "TTTTTTTTTT"
  ],
  name: [
    "............",
    ".IIIIIIIIII.",
    ".ILILILIYYI.",
    ".ILILILIYYI.",
    ".IIIIIIIIII.",
    "TTTTTTTTTTTT",
    "TTTTTTTTTTTT"
  ],
  lamp: [
    "..........GG",
    "........GGG.",
    "...TTTTTTG..",
    "..TYYYYYYT..",
    ".TYLLYYYYYT.",
    "TYYLYYYYYYYT",
    ".TYYYYYYYYT.",
    "..TYYYYYYT..",
    "...TTTTTT..."
  ]
};

function pixelSVG(key, label) {
  const rows = PIXEL_ART[key] || PIXEL_ART.stand;
  const w = Math.max(...rows.map(r => r.length));
  const h = rows.length;
  let rects = "";
  rows.forEach((row, y) => {
    [...row].forEach((ch, x) => {
      if (PIXEL_COLORS[ch]) rects += `<rect x="${x}" y="${y}" width="1" height="1" fill="${PIXEL_COLORS[ch]}"/>`;
    });
  });
  const a11y = label ? `role="img" aria-label="${label}"` : `aria-hidden="true"`;
  return `<svg viewBox="0 0 ${w} ${h}" shape-rendering="crispEdges" ${a11y}>${rects}</svg>`;
}

function productMedia(p, labelled) {
  if (p.image) return `<img src="${p.image}" alt="${labelled ? p.name : ""}" loading="lazy" style="width:100%;height:100%;object-fit:cover">`;
  return pixelSVG(p.art, labelled ? p.name + " illustration" : "");
}

function slideMedia(p) {
  const src = p.cutout || p.image;
  if (src) return `<img src="${src}" alt="${escapeHTML(p.name)}"${p.cutout ? ' class="is-cutout"' : ""}>`;
  return pixelSVG(p.art, p.name + " illustration");
}

function heroSlide(p, i, total) {
  return `
  <li class="hc-slide" role="group" aria-roledescription="slide" aria-label="${i + 1} of ${total}">
    <a class="hc-card" href="product.html?id=${encodeURIComponent(p.id)}">
      <p class="hc-tagline">${escapeHTML(p.tagline || p.name)}</p>
      <div class="hc-stage">
        <span class="hc-plate" aria-hidden="true"></span>
        <span class="hc-pix hc-pix-a" aria-hidden="true"></span>
        <span class="hc-pix hc-pix-b" aria-hidden="true"></span>
        <span class="hc-pix hc-pix-c" aria-hidden="true"></span>
        <div class="hc-media">${slideMedia(p)}</div>
      </div>
      <p class="hc-name"><span>${escapeHTML(p.name)}</span><span class="hc-go" aria-hidden="true">→</span></p>
    </a>
  </li>`;
}

function categoryLabel(id) {
  const c = CATEGORIES.find(c => c.id === id);
  return c ? c.label : id;
}

function escapeHTML(s) {
  return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function productCard(p) {
  const badge = p.badge
    ? `<span class="badge${p.badge === "New drop" ? " badge-new" : ""}">${escapeHTML(p.badge)}</span>`
    : "";
  return `
  <a class="card" href="product.html?id=${encodeURIComponent(p.id)}">
    <div class="card-media">${badge}${productMedia(p, false)}</div>
    <p class="card-title">${escapeHTML(p.name)}</p>
    <p class="card-meta">${escapeHTML(p.meta)}</p>
    <p class="card-price">${escapeHTML(p.price)}</p>
  </a>`;
}
