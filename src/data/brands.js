// Brand origin (where the brand was founded). Used for the region filter and the Brands page.
const size = (n) => (n.length > 10 ? "text-[11px]" : n.length > 8 ? "text-[13px]" : "text-[17px]");

const make = (name, country, region, look = "font-extrabold uppercase tracking-tight", px) => ({
  name,
  country,
  region,
  style: `${px ? `text-[${px}px]` : size(name)} ${look}`,
});

export const brands = [
  // First ten are the ones shown on the home page
  make("adidas", "Germany", "Europe", "font-extrabold tracking-tight"),
  make("NIKE", "USA", "North America", "font-black italic uppercase tracking-tight"),
  make("PUMA", "Germany", "Europe", "font-black italic uppercase tracking-tight"),
  make("FILA", "Italy", "Europe"),
  make("HOKA", "France", "Europe"),
  make("new balance", "USA", "North America", "font-extrabold tracking-tight", 14),
  make("Mizuno", "Japan", "Asia", "font-bold italic tracking-tight"),
  make("asics", "Japan", "Asia", "font-extrabold italic tracking-tight"),
  make("SKECHERS", "USA", "North America", "font-black italic uppercase tracking-tight", 12),
  make("Brooks", "USA", "North America", "font-extrabold italic tracking-tight"),

  // North America
  make("Saucony", "USA", "North America", "font-extrabold italic tracking-tight"),
  make("Under Armour", "USA", "North America"),
  make("Converse", "USA", "North America", "font-extrabold tracking-tight"),
  make("Vans", "USA", "North America", "font-black italic uppercase tracking-tight"),
  make("Merrell", "USA", "North America", "font-extrabold tracking-tight"),
  make("Altra", "USA", "North America"),
  make("Topo Athletic", "USA", "North America"),

  // Europe
  make("On", "Switzerland", "Europe", "font-black uppercase tracking-tight"),
  make("Reebok", "UK", "Europe", "font-extrabold uppercase tracking-tight"),
  make("Salomon", "France", "Europe"),
  make("Veja", "France", "Europe"),
  make("Le Coq Sportif", "France", "Europe", "font-extrabold tracking-tight"),
  make("Diadora", "Italy", "Europe", "font-extrabold italic tracking-tight"),
  make("Kappa", "Italy", "Europe"),
  make("Lotto", "Italy", "Europe", "font-black italic uppercase tracking-tight"),
  make("Umbro", "UK", "Europe"),
  make("Gola", "UK", "Europe", "font-extrabold tracking-tight"),
  make("Karhu", "Finland", "Europe"),
  make("Joma", "Spain", "Europe"),
  make("Munich", "Spain", "Europe"),

  // Asia
  make("Onitsuka Tiger", "Japan", "Asia", "font-extrabold tracking-tight"),
  make("Li-Ning", "China", "Asia", "font-black italic uppercase tracking-tight"),
  make("Anta", "China", "Asia"),
  make("Xtep", "China", "Asia"),
  make("Peak", "China", "Asia"),

  // Latin America
  make("Olympikus", "Brazil", "Latin America", "font-extrabold tracking-tight"),
  make("Topper", "Argentina", "Latin America"),
  make("Penalty", "Brazil", "Latin America"),

  // Oceania
  make("Volley", "Australia", "Oceania", "font-extrabold italic tracking-tight"),
];

export default brands;