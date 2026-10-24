import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import useProducts from "../hook/useProducts";

import { useCart } from "../context/CartContext";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name", label: "Name A–Z" },
];

const PAGE_SIZE = 24;

const selectClass =
  "h-9 rounded-full border border-neutral-300 bg-white px-3 text-[11px] font-medium text-neutral-900 outline-none transition focus:border-blue-600";

const Shop = () => {
  const { addItem } = useCart();
  const [params, setParams] = useSearchParams();
  const [visible, setVisible] = useState(PAGE_SIZE);
  const { products, total, categories, brands, regions, setFilters, resetFilters, priceRange } = useProducts();

  // The URL is the source of truth, so links like /shop?brand=Nike work
  const category = params.get("category") || "All";
  const brandParam = params.get("brand");
  const brand = brands.find((b) => b.toLowerCase() === brandParam?.toLowerCase()) || "All";
  const sort = params.get("sort") || "featured";
  const q = params.get("q") || "";
  const region = regions.includes(params.get("region")) ? params.get("region") : "All";
  const maxParam = Number(params.get("max"));
  const maxPrice = maxParam > 0 ? maxParam : null;

  useEffect(() => {
    setFilters({ category, brand, sort, search: q, maxPrice, region });
    setVisible(PAGE_SIZE);
  }, [category, brand, sort, q, maxPrice, region, setFilters]);

  const update = (key, value, defaultValue) => {
    const next = new URLSearchParams(params);
    if (!value || value === defaultValue) next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const priceOptions = useMemo(() => {
    const out = [];
    for (let v = Math.ceil((priceRange.min + 1) / 25) * 25; v <= Math.ceil(priceRange.max / 25) * 25; v += 25) out.push(v);
    return out;
  }, [priceRange]);

  const hasFilters = category !== "All" || brand !== "All" || sort !== "featured" || q || maxPrice != null || region !== "All";

  const handleReset = () => {
    resetFilters();
    setParams({}, { replace: true });
  };

  return (
    <section className="mx-auto w-full max-w-6xl bg-white px-8 py-8">
      {/* Header */}
      <p className="mb-2 text-[7px] font-bold uppercase tracking-[0.15em] text-orange-600">THE FULL COLLECTION</p>
      <div className="flex items-end justify-between gap-4">
        <h1 className="text-[26px] font-extrabold leading-none tracking-tight text-neutral-900">Shop all shoes</h1>
        <p className="text-[10px] text-neutral-500">
          {total} {total === 1 ? "style" : "styles"}
        </p>
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-col gap-4">
        <input
          type="search"
          value={q}
          onChange={(e) => update("q", e.target.value)}
          placeholder="Search shoes, brands, sports"
          aria-label="Search products"
          className="h-10 w-full rounded-full border border-neutral-300 px-4 text-[12px] outline-none transition placeholder:text-neutral-400 focus:border-blue-600 sm:max-w-sm"
        />

        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => update("category", c, "All")}
              className={`rounded-full border px-3 py-1 text-[9px] font-medium transition ${
                category === c
                  ? "border-neutral-900 bg-neutral-900 text-white"
                  : "border-neutral-300 bg-white text-neutral-600 hover:border-neutral-900 hover:text-neutral-900"
              }`}
            >
              {c === "All" ? "All styles" : c}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select value={brand} onChange={(e) => update("brand", e.target.value, "All")} aria-label="Brand" className={selectClass}>
            {brands.map((b) => (
              <option key={b} value={b}>
                {b === "All" ? "All brands" : b}
              </option>
            ))}
          </select>

          <select value={region} onChange={(e) => update("region", e.target.value, "All")} aria-label="Brand origin" className={selectClass}>
            {regions.map((r) => (
              <option key={r} value={r}>
                {r === "All" ? "All regions" : r}
              </option>
            ))}
          </select>

          <select
            value={maxPrice ?? ""}
            onChange={(e) => update("max", e.target.value, "")}
            aria-label="Max price"
            className={selectClass}
          >
            <option value="">Any price</option>
            {priceOptions.map((v) => (
              <option key={v} value={v}>
                Under ${v}
              </option>
            ))}
          </select>

          <select value={sort} onChange={(e) => update("sort", e.target.value, "featured")} aria-label="Sort" className={selectClass}>
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>

          {hasFilters && (
            <button onClick={handleReset} className="ml-1 text-[10px] font-bold text-neutral-900 underline-offset-4 hover:text-orange-600 hover:underline">
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      {products.length > 0 ? (
        <>
          <ul className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {products.slice(0, visible).map((p) => (
              <li key={p.id}>
                <ProductCard product={p} onQuickShop={addItem} />
              </li>
            ))}
          </ul>

          {products.length > visible && (
            <div className="mt-8 flex flex-col items-center gap-2">
              <p className="text-[10px] text-neutral-500">
                Showing {Math.min(visible, products.length)} of {products.length}
              </p>
              <button
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                className="border border-neutral-900 px-7 py-3 text-[11px] font-bold text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
              >
                Show more
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="mt-6 flex flex-col items-center rounded-lg border border-dashed border-neutral-300 py-16 text-center">
          <p className="text-sm font-extrabold text-neutral-900">No shoes match your filters</p>
          <p className="mt-1 text-[11px] text-neutral-500">Try a different brand, sport or price.</p>
          <button onClick={handleReset} className="mt-4 rounded-full bg-blue-600 px-5 py-2.5 text-[11px] font-bold text-white transition hover:bg-blue-700">
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
};

export default Shop;