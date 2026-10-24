import { useState } from "react";
import ProductCard from "./ProductCard";

const filters = ["All arrivals", "Running", "Lifestyle", "Training", "Court sports"];

const defaultProducts = [
  {
    id: 1, brand: "NIKE", name: "Pegasus Aero", price: 145,
    description: "Men's road running shoes", category: "Running", badge: "JUST IN",
    colors: ["#e8e4dc", "#f2561d", "#1a1a1a"], moreColors: 2,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
  },
  {
    id: 2, brand: "ADIDAS", name: "Adizero Rise", price: 160,
    description: "Unisex performance running shoes", category: "Running", badge: "JUST IN",
    colors: ["#c8f03c", "#e0e0e0", "#1a1a1a"], moreColors: 2,
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&q=80",
  },
  {
    id: 3, brand: "HOKA", name: "Cloudline 6", price: 155,
    description: "Women's cushioned running shoes", category: "Running", badge: "BESTSELLER",
    colors: ["#d9d9d9", "#b8c4d6", "#f0b8a8"], moreColors: 2,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80",
  },
  {
    id: 4, brand: "NEW BALANCE", name: "Everyday 906", price: 150,
    description: "Unisex lifestyle sneakers", category: "Lifestyle", badge: "JUST IN",
    colors: ["#b0aca4", "#d9d9d9", "#4a4a4a"], moreColors: 2,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80",
  },
  {
    id: 5, brand: "ASICS", name: "Gel-Flow 12", price: 165,
    description: "Men's stability running shoes", category: "Training", badge: "JUST IN",
    colors: ["#b8c4d6", "#f4e4e0", "#1a2a4a"], moreColors: 2,
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80",
  },
  {
    id: 6, brand: "PUMA", name: "Velocity Pace", price: 120,
    description: "Women's everyday running shoes", category: "Running", badge: "JUST IN",
    colors: ["#f4b8a0", "#e0dcd0", "#1a1a1a"], moreColors: 2,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80",
  },
  {
    id: 7, brand: "MIZUNO", name: "Wave Horizon", price: 140,
    description: "Men's daily training shoes", category: "Training", badge: "JUST IN",
    colors: ["#e8e4d8", "#a8d4b8", "#2a3a3a"], moreColors: 2,
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&q=80",
  },
  {
    id: 8, brand: "BROOKS", name: "Ghost Motion", price: 145,
    description: "Women's cushioned running shoes", category: "Court sports", badge: "JUST IN",
    colors: ["#b8c4d6", "#d9d9d9", "#1a1a1a"], moreColors: 2,
    image: "https://tse2.mm.bing.net/th/id/OIP.G1wKSpCjjLyAan6PAjRVBAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
];

const ArrowUpRight = ({ className = "h-3 w-3" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

const FeaturedProducts = ({
  eyebrow = "FRESH IN. READY TO GO.",
  title = "New arrivals",
  subtitle = "Your next favorite pair just landed. Discover the latest in comfort and performance.",
  products = defaultProducts,
  onQuickShop,
  onShopAll,
  onDiscover,
}) => {
  const [active, setActive] = useState("All arrivals");

  const visible =
    active === "All arrivals" ? products : products.filter((p) => p.category === active);


  return (
    <section className="mx-auto max-w-6xl bg-white px-8 py-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="mb-2 text-[7px] font-bold uppercase tracking-[0.15em] text-orange-600">{eyebrow}</p>
          <h2 className="text-[26px] font-extrabold leading-none tracking-tight text-neutral-900">{title}</h2>
          <p className="mt-2 text-[10px] text-neutral-500">{subtitle}</p>
        </div>
        <button
          onClick={onShopAll}
          className="mt-6 flex items-center gap-1.5 text-[9px] font-bold text-neutral-900 transition-colors hover:text-orange-600"
        >
          Shop all new arrivals <ArrowUpRight />
        </button>
      </div>

      {/* Filter pills */}
      <div className="mt-5 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`rounded-full border px-3 py-1 text-[8px] font-medium transition ${
              active === f
                ? "border-neutral-900 bg-neutral-900 text-white"
                : "border-neutral-300 bg-white text-neutral-600 hover:border-neutral-900 hover:text-neutral-900"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      <ul className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {visible.map((p) => (
          <li key={p.id}>
            <ProductCard product={p} onQuickShop={onQuickShop} />
          </li>
        ))}
      </ul>

      {/* Bottom CTA */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={onDiscover}
          className="flex items-center gap-2 rounded-[3px] border border-neutral-900 px-5 py-2.5 text-[9px] font-bold text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
        >
          Discover All New Arrivals <ArrowUpRight />
        </button>
      </div>
    </section>
  );
};

export default FeaturedProducts;