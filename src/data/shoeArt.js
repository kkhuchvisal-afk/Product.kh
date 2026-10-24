// Draws a side-view illustration of each shoe from its data (type, colors, brand, name).
// No photos needed: every product gets an image that matches its name, category and colors.

export const slugify = (...parts) =>
  parts.join(" ").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const escapeXml = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

const luminance = (hex) => {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return (0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255;
};

// How each kind of shoe is built: collar height (H), sole thickness (T) and extra parts
const specs = {
  running: { H: 0, T: 46, mesh: true, midLine: true, pullTab: true },
  lifestyle: { H: 0, T: 30, rubberToe: true },
  training: { H: 0, T: 38, lowerPanel: "dark" },
  court: { H: 0, T: 34, lowerPanel: "accent", darkToe: true },
  basketball: { H: 78, T: 42, lowerPanel: "accent", strap: true },
  football: { H: 0, T: 12, studs: true, accentToe: true },
  futsal: { H: 0, T: 20, gum: true, lowerPanel: "accent" },
  hiking: { H: 44, T: 52, lugs: true, bumper: true, lowerPanel: "dark", darkSole: true },
  slipon: { H: 0, T: 28, slip: true, lowerPanel: "accent" },
};

export const shoeType = (p) => {
  const text = `${p.name} ${p.description}`.toLowerCase();
  if (/slip-on/.test(text)) return "slipon";
  if (/futsal/.test(text)) return "futsal";
  const byCategory = {
    Running: "running",
    Lifestyle: "lifestyle",
    Training: "training",
    "Court sports": "court",
    Basketball: "basketball",
    Football: "football",
    Hiking: "hiking",
  };
  return byCategory[p.category] || "lifestyle";
};

// upper = chosen color, dark = darkest of the rest, accent = the other one
const pickColors = (colors, chosen) => {
  const list = colors && colors.length ? colors : ["#d9d9d9", "#f2561d", "#1a1a1a"];
  const upper = chosen || list[0];
  const rest = list.filter((c) => c !== upper).sort((a, b) => luminance(a) - luminance(b));
  let dark = rest[0] ?? "#1c1c1c";
  if (luminance(dark) > 0.4) dark = "#1c1c1c";
  const accent = rest.find((c) => c !== dark) ?? "#ff5a1f";
  return { upper, dark, accent };
};

const bez = (p0, p1, p2, p3, t) => {
  const u = 1 - t;
  return [
    u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0],
    u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1],
  ];
};

export const shoeSvg = (product, chosenColor, { caption: showCaption = true } = {}) => {
  const type = shoeType(product);
  const s = specs[type];
  const { upper, dark, accent } = pickColors(product.colors, chosenColor);
  const { H, T } = s;
  const S = 470 - T; // top of the sole

  const soleColor = s.gum ? "#d8b27c" : s.darkSole ? "#47423b" : type === "football" ? "#1f1f1f" : "#f3efe6";
  const outsole = s.gum ? "#b8915a" : "#222";

  // Silhouette of the upper (toe points right)
  const c1 = [380, S - 158 - H * 0.8];
  const lace = [c1, [430, S - 120], [500, S - 84], [560, S - 68]];
  const collarPath = `M 158 ${S - 122 - H} C 166 ${S - 136 - H}, 176 ${S - 140 - H}, 194 ${S - 140 - H} C 232 ${S - 138 - H}, 262 ${S - 114 - H * 0.5}, 296 ${S - 110 - H * 0.3} C 316 ${S - 108 - H * 0.3}, 326 ${S - 140 - H * 0.6}, 344 ${S - 158 - H * 0.8} C 354 ${S - 168 - H * 0.85}, 368 ${S - 166 - H * 0.85}, 380 ${S - 158 - H * 0.8}`;
  const upperPath = `M 140 ${S + 10} C 134 ${S - 30}, 140 ${S - 90 - H * 0.6}, 158 ${S - 122 - H} ${collarPath.slice(collarPath.indexOf("C"))} C 430 ${S - 120}, 500 ${S - 84}, 560 ${S - 68} C 610 ${S - 54}, 664 ${S - 40}, 696 ${S - 14} C 706 ${S - 6}, 708 ${S + 4}, 700 ${S + 10} Z`;
  const solePath = `M 124 ${S} L 706 ${S} C 708 ${S + T * 0.55}, 684 468, 626 470 L 156 470 C 132 470, 122 ${S + T * 0.7}, 124 ${S} Z`;

  // Laces follow the curve from the tongue to the toe box
  let laces = "";
  if (!s.slip) {
    for (let i = 0; i < 5; i++) {
      const t = 0.1 + i * 0.19;
      const [x, y] = bez(...lace, t);
      const [x2, y2] = bez(...lace, t + 0.02);
      const len = Math.hypot(x2 - x, y2 - y) || 1;
      const nx = -(y2 - y) / len; // normal, pointing up-right of the lace line
      const ny = (x2 - x) / len;
      laces += `<line x1="${(x - nx * 3 + ny * 0).toFixed(1)}" y1="${(y - ny * 3).toFixed(1)}" x2="${(x + nx * 22).toFixed(1)}" y2="${(y + ny * 22).toFixed(1)}" />`;
    }
  }
  const lacesColor = type === "hiking" || type === "football" ? accent : "#ffffff";

  // Elastic gore for slip-ons
  const gore = s.slip
    ? `<path d="M 330 ${S - 128} C 390 ${S - 104}, 470 ${S - 80}, 548 ${S - 64}" fill="none" stroke="${accent}" stroke-width="16" stroke-linecap="round" opacity="0.95" />
       <path d="M 330 ${S - 128} C 390 ${S - 104}, 470 ${S - 80}, 548 ${S - 64}" fill="none" stroke="${dark}" stroke-width="2" stroke-dasharray="3 9" stroke-linecap="round" />`
    : "";

  const panelColor = s.lowerPanel === "dark" ? dark : accent;
  const lowerPanel = s.lowerPanel
    ? `<path d="M 120 ${S - 30} C 250 ${S - 48}, 420 ${S - 42}, 560 ${S - 16} L 720 ${S - 16} L 720 ${S + 20} L 120 ${S + 20} Z" fill="${panelColor}" />`
    : "";

  const heelColor = s.mesh || s.pullTab ? accent : dark;
  const heelCounter = `<path d="M 120 ${S + 14} L 120 ${S - 150 - H} L 210 ${S - 150 - H} C 246 ${S - 96}, 240 ${S - 34}, 228 ${S + 14} Z" fill="${heelColor}" opacity="${s.lowerPanel === "accent" ? 0.9 : 1}" />`;

  const toeColor = s.rubberToe ? "#f3efe6" : s.accentToe ? accent : dark;
  const toeCap =
    s.rubberToe || s.darkToe || s.accentToe || s.bumper
      ? `<path d="M ${s.bumper ? 560 : 590} ${S - 66} C 640 ${S - 48}, 690 ${S - 30}, 716 ${S + 14} L ${s.bumper ? 520 : 556} ${S + 14} C 570 ${S - 20}, 575 ${S - 46}, ${s.bumper ? 560 : 590} ${S - 66} Z" fill="${toeColor}" />`
      : "";

  const strap = s.strap
    ? `<path d="M 160 ${S - 100 - H + 40} C 220 ${S - 104 - H + 62}, 270 ${S - 92 - H + 70}, 322 ${S - 120 - H * 0.55}" fill="none" stroke="${dark}" stroke-width="14" stroke-linecap="round" />`
    : "";

  const mesh = s.mesh
    ? `<pattern id="mesh" width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="4.5" cy="4.5" r="1.6" fill="${dark}" opacity="0.2" /></pattern>
       <path d="${upperPath}" fill="url(#mesh)" />`
    : "";

  const midLine = s.midLine ? `<rect x="110" y="${S + T * 0.42}" width="620" height="7" fill="${accent}" />` : "";
  const sole = `
    <clipPath id="soleClip"><path d="${solePath}" /></clipPath>
    <path d="${solePath}" fill="${soleColor}" />
    <g clip-path="url(#soleClip)">
      <rect x="110" y="462" width="620" height="14" fill="${outsole}" />
      ${midLine}
      <rect x="110" y="${S}" width="620" height="5" fill="#000" opacity="0.1" />
    </g>
    <path d="${solePath}" fill="none" stroke="#000" stroke-opacity="0.14" stroke-width="2" />`;

  // Studs under football boots, deep lugs under hiking boots
  let ground = "";
  if (s.studs) {
    ground = [190, 262, 360, 470, 560, 628]
      .map((x) => `<rect x="${x}" y="468" width="16" height="16" rx="4" fill="#1a1a1a" />`)
      .join("");
  }
  if (s.lugs) {
    let d = "M 150 468";
    for (let x = 150; x < 640; x += 30) d += ` L ${x + 8} 484 L ${x + 22} 484 L ${x + 30} 468`;
    ground = `<path d="${d} Z" fill="#1d1b18" />`;
  }

  const pullTab = s.pullTab
    ? `<path d="M 150 ${S - 112} C 136 ${S - 126}, 134 ${S - 148}, 150 ${S - 156} L 166 ${S - 146} C 160 ${S - 134}, 164 ${S - 124}, 170 ${S - 118} Z" fill="${accent}" />`
    : "";

  const caption = `${product.brand ?? ""}  ·  ${product.name}`.trim();

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 640" width="800" height="640" role="img" aria-label="${escapeXml(caption)}">
  <defs>
    <radialGradient id="shadow" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="#000" stop-opacity="0.3" />
      <stop offset="1" stop-color="#000" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="shine" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity="0.32" />
      <stop offset="0.55" stop-color="#fff" stop-opacity="0" />
      <stop offset="1" stop-color="#000" stop-opacity="0.12" />
    </linearGradient>
    <clipPath id="up"><path d="${upperPath}" /></clipPath>
  </defs>

  <g transform="translate(-16 -40)">
    <ellipse cx="418" cy="486" rx="300" ry="18" fill="url(#shadow)" />

    <!-- upper -->
    <path d="${upperPath}" fill="${upper}" />
    <g clip-path="url(#up)">
      ${lowerPanel}
      ${heelCounter}
      ${toeCap}
      ${strap}
      <path d="M 322 ${S - 96} L 340 ${S - 168 - H * 0.85} L 402 ${S - 162 - H * 0.8} L 436 ${S - 116} Z" fill="#fff" opacity="0.32" />
      <path d="${upperPath}" fill="url(#shine)" />
    </g>
    ${mesh}
    ${gore}
    <path d="${upperPath}" fill="none" stroke="#000" stroke-opacity="0.16" stroke-width="2" stroke-linejoin="round" />
    <path d="${collarPath}" fill="none" stroke="${dark}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" />
    ${pullTab}
    <g stroke="${lacesColor}" stroke-width="6" stroke-linecap="round" opacity="0.95">${laces}</g>

    <!-- sole -->
    ${ground}
    ${sole}
  </g>

  ${showCaption ? `<text x="400" y="575" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="22" font-weight="700" letter-spacing="3" fill="#111" opacity="0.38">${escapeXml(caption.toUpperCase())}</text>` : ""}
</svg>`;

  return svg;
};

// Ready to use as <img src="...">
export const shoeImage = (product, chosenColor, options) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(shoeSvg(product, chosenColor, options))}`;

// ---------------------------------------------------------------------------------------------
// Extra views: the shoe seen from above and from below, so a product can have a real gallery
// ---------------------------------------------------------------------------------------------

// Footprint of the shoe seen from above (toe points right)
const outline =
  "M 152 320 C 152 275, 175 250, 225 247 C 290 244, 330 256, 380 252 C 450 246, 500 218, 570 222 C 640 226, 696 270, 700 320 C 696 370, 640 414, 570 418 C 500 422, 450 394, 380 388 C 330 384, 290 396, 225 393 C 175 390, 152 365, 152 320 Z";

const frame = (body, label, product) => {
  const caption = `${product.brand ?? ""}  ·  ${product.name}  ·  ${label}`.trim();
  return { caption, wrap: (showCaption) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 640" width="800" height="640" role="img" aria-label="${escapeXml(caption)}">
  <defs>
    <radialGradient id="shadow" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="#000" stop-opacity="0.28" />
      <stop offset="1" stop-color="#000" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="shine" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity="0.3" />
      <stop offset="0.5" stop-color="#fff" stop-opacity="0" />
      <stop offset="1" stop-color="#000" stop-opacity="0.14" />
    </linearGradient>
  </defs>
  ${body}
  ${showCaption ? `<text x="400" y="590" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="22" font-weight="700" letter-spacing="3" fill="#111" opacity="0.38">${escapeXml(caption.toUpperCase())}</text>` : ""}
</svg>` };
};

export const shoeTopSvg = (product, chosenColor, { caption: showCaption = true } = {}) => {
  const type = shoeType(product);
  const s = specs[type];
  const { upper, dark, accent } = pickColors(product.colors, chosenColor);
  const soleColor = s.gum ? "#d8b27c" : s.darkSole ? "#47423b" : type === "football" ? "#1f1f1f" : "#f3efe6";
  const panelColor = s.lowerPanel === "dark" ? dark : accent;
  const heelColor = s.mesh || s.pullTab ? accent : dark;
  const toeColor = s.rubberToe ? "#f3efe6" : s.accentToe ? accent : dark;
  const lacesColor = type === "hiking" || type === "football" ? accent : "#ffffff";

  let laces = "";
  if (!s.slip) {
    for (let i = 0; i < 6; i++) {
      const x = 384 + i * 33;
      laces += `<line x1="${x}" y1="${296 + i * -1.5}" x2="${x + 9}" y2="${344 + i * 1.5}" />`;
    }
  }
  const gore = s.slip
    ? `<rect x="356" y="298" width="236" height="44" rx="10" fill="${accent}" /><rect x="356" y="298" width="236" height="44" rx="10" fill="none" stroke="${dark}" stroke-width="2" stroke-dasharray="3 9" />`
    : "";

  const body = `
  <g transform="translate(-26 -6)">
    <ellipse cx="430" cy="338" rx="290" ry="128" fill="url(#shadow)" />
    <clipPath id="up"><path d="${outline}" /></clipPath>
    <pattern id="mesh" width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="4.5" cy="4.5" r="1.6" fill="${dark}" opacity="0.2" /></pattern>

    <path d="${outline}" fill="${soleColor}" stroke="${soleColor}" stroke-width="14" stroke-linejoin="round" />
    <path d="${outline}" fill="${upper}" />
    <g clip-path="url(#up)">
      ${s.lowerPanel ? `<path d="${outline}" fill="none" stroke="${panelColor}" stroke-width="30" />` : ""}
      <path d="M 140 226 L 236 226 C 254 290, 254 350, 236 414 L 140 414 Z" fill="${heelColor}" />
      ${s.rubberToe || s.darkToe || s.accentToe || s.bumper ? `<path d="M 588 218 C 660 228, 700 275, 704 320 C 700 365, 660 412, 588 422 C 612 380, 612 260, 588 218 Z" fill="${toeColor}" />` : ""}
      ${s.mesh ? `<path d="${outline}" fill="url(#mesh)" />` : ""}
      <path d="${outline}" fill="url(#shine)" />
    </g>
    <path d="${outline}" fill="none" stroke="#000" stroke-opacity="0.16" stroke-width="2" stroke-linejoin="round" />

    <!-- tongue, laces / elastic -->
    <rect x="352" y="298" width="244" height="44" rx="12" fill="#fff" opacity="0.38" />
    ${gore}
    <g stroke="${lacesColor}" stroke-width="6" stroke-linecap="round" opacity="0.95">${laces}</g>

    <!-- foot opening -->
    <path d="M 196 320 C 196 286, 218 270, 256 268 C 300 266, 344 284, 358 320 C 344 356, 300 374, 256 372 C 218 370, 196 354, 196 320 Z" fill="#2a2a2a" stroke="${dark}" stroke-width="10" stroke-linejoin="round" />
    <path d="M 214 320 C 214 296, 232 284, 258 282 C 290 281, 318 292, 332 320 C 318 348, 290 359, 258 358 C 232 356, 214 344, 214 320 Z" fill="#000" opacity="0.28" />
  </g>`;

  return frame(body, "TOP VIEW", product).wrap(showCaption);
};

export const shoeSoleSvg = (product, chosenColor, { caption: showCaption = true } = {}) => {
  const type = shoeType(product);
  const s = specs[type];
  const { dark, accent } = pickColors(product.colors, chosenColor);
  const rim = s.gum ? "#d8b27c" : s.darkSole ? "#47423b" : type === "football" ? "#2a2a2a" : "#f3efe6";
  const base = s.gum ? "#c79c63" : s.lugs ? "#1d1b18" : "#232323";
  const pad = s.gum ? "#b8915a" : accent;

  const tread = s.lugs
    ? `<pattern id="tread" width="26" height="22" patternUnits="userSpaceOnUse"><path d="M 0 16 L 13 4 L 26 16" fill="none" stroke="#fff" stroke-opacity="0.22" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" /></pattern>`
    : `<pattern id="tread" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><rect width="5" height="14" fill="#fff" fill-opacity="0.16" /></pattern>`;

  const studs = s.studs
    ? [[250, 290], [250, 350], [318, 320], [470, 262], [470, 378], [545, 246], [545, 320], [545, 394], [622, 284], [622, 356], [672, 320]]
        .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="11" fill="#111" /><circle cx="${x - 3}" cy="${y - 3}" r="4" fill="#fff" opacity="0.15" />`)
        .join("")
    : "";

  const body = `
  <g transform="translate(-26 -6)">
    <ellipse cx="430" cy="338" rx="290" ry="128" fill="url(#shadow)" />
    ${tread}
    <clipPath id="inset"><path d="${outline}" transform="translate(426 320) scale(0.94 0.9) translate(-426 -320)" /></clipPath>

    <path d="${outline}" fill="${rim}" stroke="${rim}" stroke-width="14" stroke-linejoin="round" />
    <path d="${outline}" fill="${base}" transform="translate(426 320) scale(0.94 0.9) translate(-426 -320)" />
    <g clip-path="url(#inset)">
      <ellipse cx="240" cy="320" rx="96" ry="88" fill="${pad}" opacity="0.5" />
      <ellipse cx="575" cy="320" rx="132" ry="112" fill="${pad}" opacity="0.82" />
      <rect x="120" y="200" width="620" height="240" fill="url(#tread)" />
      <path d="M 478 230 C 462 290, 462 350, 478 410" fill="none" stroke="#000" stroke-opacity="0.35" stroke-width="4" stroke-linecap="round" />
      <path d="M 316 296 C 350 308, 400 308, 436 296 C 448 320, 448 320, 436 344 C 400 332, 350 332, 316 344 C 304 320, 304 320, 316 296 Z" fill="${base}" opacity="0.9" />
    </g>
    ${studs}
    <path d="${outline}" fill="none" stroke="#000" stroke-opacity="0.16" stroke-width="2" stroke-linejoin="round" />
  </g>`;

  return frame(body, "SOLE VIEW", product).wrap(showCaption);
};

const toUri = (svg) => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

// Side, top and sole pictures, in the order a gallery should show them
export const shoeViews = (product, chosenColor, options) => [
  shoeImage(product, chosenColor, options),
  toUri(shoeTopSvg(product, chosenColor, options)),
  toUri(shoeSoleSvg(product, chosenColor, options)),
];

export default shoeImage;