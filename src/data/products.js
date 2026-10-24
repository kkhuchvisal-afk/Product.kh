import { brands } from "./brands";
import { shoeImage, slugify } from "./shoeArt";
import { productImages, fallbackStyle } from "./productImages";
import { photosFor } from "./localPhotos";
import { stockPhoto } from "./stockPhotos";

// SAMPLE DATA: model names and prices are placeholders, and the pictures are generated from each product (data/shoeArt.js).
// Replace this file (or the useProducts fetcher) with your real catalog.

// The first eight keep their original ids so saved carts and wishlists still work
const base = [
  { id: 1, brand: "NIKE", name: "Pegasus Aero", price: 145, description: "Men's road running shoes", category: "Running", badge: "JUST IN", colors: ["#e8e4dc", "#f2561d", "#1a1a1a"], moreColors: 2 },
  { id: 2, brand: "ADIDAS", name: "Adizero Rise", price: 160, description: "Unisex performance running shoes", category: "Running", badge: "JUST IN", colors: ["#c8f03c", "#e0e0e0", "#1a1a1a"], moreColors: 2 },
  { id: 3, brand: "HOKA", name: "Cloudline 6", price: 155, description: "Women's cushioned running shoes", category: "Running", badge: "BESTSELLER", colors: ["#d9d9d9", "#b8c4d6", "#f0b8a8"], moreColors: 2 },
  { id: 4, brand: "NEW BALANCE", name: "Everyday 906", price: 150, description: "Unisex lifestyle sneakers", category: "Lifestyle", badge: "JUST IN", colors: ["#b0aca4", "#d9d9d9", "#4a4a4a"], moreColors: 2 },
  { id: 5, brand: "ASICS", name: "Gel-Flow 12", price: 165, description: "Men's stability running shoes", category: "Training", badge: "JUST IN", colors: ["#b8c4d6", "#f4e4e0", "#1a2a4a"], moreColors: 2 },
  { id: 6, brand: "PUMA", name: "Velocity Pace", price: 120, description: "Women's everyday running shoes", category: "Running", badge: "JUST IN", colors: ["#f4b8a0", "#e0dcd0", "#1a1a1a"], moreColors: 2 },
  { id: 7, brand: "MIZUNO", name: "Wave Horizon", price: 140, description: "Men's daily training shoes", category: "Training", badge: "JUST IN", colors: ["#e8e4d8", "#a8d4b8", "#2a3a3a"], moreColors: 2 },
  { id: 8, brand: "BROOKS", name: "Ghost Motion", price: 145, description: "Women's cushioned running shoes", category: "Court sports", badge: "JUST IN", colors: ["#b8c4d6", "#d9d9d9", "#1a1a1a"], moreColors: 2 },
];

const palettes = [
  ["#e8e4dc", "#f2561d", "#1a1a1a"],
  ["#c8f03c", "#e0e0e0", "#1a1a1a"],
  ["#b8c4d6", "#f4e4e0", "#1a2a4a"],
  ["#f4b8a0", "#e0dcd0", "#1a1a1a"],
  ["#e8e4d8", "#a8d4b8", "#2a3a3a"],
  ["#d9d9d9", "#b8c4d6", "#f0b8a8"],
];

// [brand, name, price, description, category]
const raw = [
  ["NIKE", "Zoom Stride 5", 130, "Men's road running shoes", "Running"],
  ["NIKE", "Court Vision Low", 95, "Women's court sneakers", "Court sports"],
  ["ADIDAS", "Ultra Glide 3", 150, "Unisex cushioned running shoes", "Running"],
  ["ADIDAS", "Terrace Low", 100, "Unisex lifestyle sneakers", "Lifestyle"],
  ["PUMA", "Deviate Rush", 140, "Men's racing shoes", "Running"],
  ["PUMA", "Court Pro Lite", 90, "Women's court shoes", "Court sports"],
  ["NEW BALANCE", "Fresh Glide 4", 130, "Women's neutral running shoes", "Running"],
  ["NEW BALANCE", "Heritage Mid 550", 120, "Unisex lifestyle sneakers", "Lifestyle"],
  ["ASICS", "Gel-Trainer 9", 125, "Men's gym training shoes", "Training"],
  ["ASICS", "Blast Court FF", 140, "Unisex indoor court shoes", "Court sports"],
  ["HOKA", "Cloud Trail 2", 160, "Men's trail hiking shoes", "Hiking"],
  ["HOKA", "Speed Lite 5", 170, "Unisex lightweight running shoes", "Running"],
  ["BROOKS", "Launch Pace 10", 125, "Men's everyday running shoes", "Running"],
  ["BROOKS", "Cascade Trail Lite", 145, "Women's trail hiking shoes", "Hiking"],
  ["SAUCONY", "Ride Flow 17", 140, "Men's cushioned running shoes", "Running"],
  ["SAUCONY", "Shadow Retro", 110, "Unisex lifestyle sneakers", "Lifestyle"],
  ["ON", "Cloud Surfer", 160, "Women's road running shoes", "Running"],
  ["ON", "Cloud Easy", 150, "Unisex everyday sneakers", "Lifestyle"],
  ["UNDER ARMOUR", "Pulse Run", 120, "Men's running shoes", "Running"],
  ["UNDER ARMOUR", "Court Surge", 130, "Men's basketball shoes", "Basketball"],
  ["CONVERSE", "Street Mid", 70, "Unisex canvas sneakers", "Lifestyle"],
  ["CONVERSE", "Lift Platform", 85, "Women's lifestyle sneakers", "Lifestyle"],
  ["VANS", "Lowrider Skate", 80, "Unisex skate shoes", "Lifestyle"],
  ["VANS", "Slip-On Classic", 65, "Unisex slip-on sneakers", "Lifestyle"],
  ["SKECHERS", "Go Walk Lite", 85, "Women's walking shoes", "Lifestyle"],
  ["SKECHERS", "Max Cushion Run", 110, "Men's running shoes", "Running"],
  ["FILA", "Disruptor Chunky", 95, "Women's lifestyle sneakers", "Lifestyle"],
  ["FILA", "Court Deluxe", 80, "Men's court shoes", "Court sports"],
  ["REEBOK", "Float Energy", 100, "Men's running shoes", "Running"],
  ["REEBOK", "Club Low", 85, "Unisex lifestyle sneakers", "Lifestyle"],
  ["SALOMON", "Speed Trail", 140, "Men's trail hiking shoes", "Hiking"],
  ["SALOMON", "Mountain XT", 170, "Unisex mountain shoes", "Hiking"],
  ["VEJA", "Campo Leather", 140, "Unisex lifestyle sneakers", "Lifestyle"],
  ["VEJA", "Condor Run", 155, "Women's running shoes", "Running"],
  ["LE COQ SPORTIF", "Arthur Low", 90, "Men's lifestyle sneakers", "Lifestyle"],
  ["LE COQ SPORTIF", "Court Classic", 85, "Unisex court shoes", "Court sports"],
  ["DIADORA", "Heritage N9000", 130, "Unisex lifestyle sneakers", "Lifestyle"],
  ["DIADORA", "Equipe Run", 120, "Men's running shoes", "Running"],
  ["KAPPA", "Authentic Terrace", 70, "Unisex lifestyle sneakers", "Lifestyle"],
  ["KAPPA", "Fit Train", 75, "Women's training shoes", "Training"],
  ["LOTTO", "Solista Court", 90, "Men's court shoes", "Court sports"],
  ["LOTTO", "Maestro 700", 110, "Men's football boots", "Football"],
  ["UMBRO", "Speciali Pro", 120, "Men's football boots", "Football"],
  ["UMBRO", "Terrace Trainer", 70, "Unisex lifestyle sneakers", "Lifestyle"],
  ["MIZUNO", "Wave Rider Lite", 140, "Men's road running shoes", "Running"],
  ["MIZUNO", "Morelia Cup", 180, "Men's football boots", "Football"],
  ["ONITSUKA TIGER", "Tokyo Slip", 120, "Unisex lifestyle sneakers", "Lifestyle"],
  ["ONITSUKA TIGER", "Serrano Low", 130, "Women's lifestyle sneakers", "Lifestyle"],
  ["LI-NING", "Feidian Speed", 150, "Men's racing shoes", "Running"],
  ["LI-NING", "Way Court", 140, "Men's basketball shoes", "Basketball"],
  ["ANTA", "Shock Wave 3", 110, "Men's basketball shoes", "Basketball"],
  ["ANTA", "C202 Run", 100, "Unisex running shoes", "Running"],
  ["XTEP", "160X Pace", 130, "Men's racing shoes", "Running"],
  ["XTEP", "Daily Walk", 60, "Women's walking shoes", "Lifestyle"],
  ["PEAK", "Taichi Flash", 110, "Men's running shoes", "Running"],
  ["PEAK", "Court Edge", 105, "Men's basketball shoes", "Basketball"],
  ["OLYMPIKUS", "Corre Lite", 70, "Women's running shoes", "Running"],
  ["OLYMPIKUS", "Street Flex", 65, "Unisex lifestyle sneakers", "Lifestyle"],
  ["TOPPER", "Strike Pro", 75, "Men's football boots", "Football"],
  ["TOPPER", "Urban Low", 60, "Unisex lifestyle sneakers", "Lifestyle"],
  ["PENALTY", "Matis Pro", 80, "Men's futsal shoes", "Football"],
  ["PENALTY", "Rocket Futsal", 70, "Unisex futsal shoes", "Football"],
  ["KARHU", "Fusion Run", 150, "Men's running shoes", "Running"],
  ["KARHU", "Aria Nordic", 135, "Women's running shoes", "Running"],
  ["MERRELL", "Moab Light", 120, "Men's hiking shoes", "Hiking"],
  ["MERRELL", "Trail Glove Lite", 130, "Women's trail shoes", "Hiking"],
  ["ALTRA", "Torin Zero", 140, "Men's road running shoes", "Running"],
  ["ALTRA", "Lone Light", 150, "Unisex hiking shoes", "Hiking"],
  ["VOLLEY", "Canvas Low", 60, "Unisex canvas sneakers", "Lifestyle"],
  ["VOLLEY", "Tennis Heritage", 70, "Women's court shoes", "Court sports"],
  ["JOMA", "Aguila Futsal", 65, "Men's futsal shoes", "Football"],
  ["JOMA", "Court Fast", 70, "Unisex court shoes", "Court sports"],
  ["MUNICH", "Dynamic Retro", 80, "Unisex lifestyle sneakers", "Lifestyle"],
  ["MUNICH", "Gresca Court", 75, "Women's court shoes", "Court sports"],
  ["TOPO ATHLETIC", "Phantom Road", 135, "Men's road running shoes", "Running"],
  ["TOPO ATHLETIC", "Mountain Trail", 140, "Unisex trail shoes", "Hiking"],
  ["GOLA", "Harrier Low", 70, "Men's lifestyle sneakers", "Lifestyle"],
  ["GOLA", "Elan Retro", 65, "Women's lifestyle sneakers", "Lifestyle"],
];

const generated = raw.map(([brand, name, price, description, category], i) => {
  const badge = i % 3 === 0 ? "JUST IN" : i % 10 === 4 ? "BESTSELLER" : i % 7 === 2 ? "SALE" : undefined;
  return {
    id: base.length + i + 1,
    brand,
    name,
    price,
    ...(badge === "SALE" && { oldPrice: Math.round(price * 1.2) }),
    description,
    category,
    badge,
    colors: palettes[i % palettes.length],
    moreColors: 1 + (i % 3),
  };
});

// Attach where each brand comes from, for the region filter
const origin = Object.fromEntries(brands.map((b) => [b.name.toLowerCase(), b]));

export const products = [...base, ...generated].map((p, index) => {
  const b = origin[p.brand.toLowerCase()];
  const slug = slugify(p.brand, p.name);

  const illustration = shoeImage(p);
  const manual = productImages[slug];
  const mine = photosFor(slug); // photos you added to src/assets/products/

  let images;
  let generated = false;
  if (manual) images = [manual];
  else if (mine.length) images = mine;
  else if (fallbackStyle === "stock") images = [stockPhoto(p, index)];
  else {
    images = [illustration];
    generated = true; // drawn from the data, so it can follow the chosen color
  }

  return {
    ...p,
    country: b?.country,
    region: b?.region,
    slug,
    generated,
    image: images[0],
    images: images.length > 1 ? images : undefined,
    fallbackImage: illustration, // shown if a photo fails to load
  };
});

export default products;