import { useState } from "react";
import { Link } from "react-router-dom";
import { brands } from "../data/brands";
import useProducts from "../hook/useProducts";

const regionOrder = ["North America", "Europe", "Asia", "Latin America", "Oceania"];

// Brand wordmark styles include a small fixed size; swap it for a bigger one here
const bigger = (style) => style.replace(/text-\[\d+px\]/, "");

const Brands = () => {
  const { allProducts } = useProducts();
  const [region, setRegion] = useState("All");

  const countFor = (name) => allProducts.filter((p) => p.brand?.toLowerCase() === name.toLowerCase()).length;
  const countries = new Set(brands.map((b) => b.country)).size;

  const groups = regionOrder
    .filter((r) => region === "All" || r === region)
    .map((r) => ({ region: r, items: brands.filter((b) => b.region === r) }))
    .filter((g) => g.items.length > 0);

  return (
    <section className="mx-auto w-full max-w-6xl bg-white px-8 py-8">
      <p className="mb-2 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.15em] text-[#ff5a1f]">
        <span className="h-px w-6 bg-[#ff5a1f]" />
        From around the world
      </p>
      <h1 className="text-3xl font-bold tracking-tight text-neutral-900">All brands</h1>
      <p className="mt-2 text-[12px] text-neutral-500">
        {brands.length} brands from {countries} countries. Pick one to see every pair we carry.
      </p>

      {/* Region filter */}
      <div className="mt-5 flex flex-wrap gap-2">
        {["All", ...regionOrder].map((r) => (
          <button
            key={r}
            onClick={() => setRegion(r)}
            className={`border px-3.5 py-1.5 text-[11px] font-medium transition ${
              region === r
                ? "border-neutral-900 bg-neutral-900 text-white"
                : "border-neutral-300 text-neutral-700 hover:border-neutral-900 hover:text-neutral-900"
            }`}
          >
            {r === "All" ? "All regions" : r}
          </button>
        ))}
      </div>

      {groups.map((g) => (
        <div key={g.region} className="mt-8">
          <h2 className="mb-3 flex items-baseline gap-3 border-b border-neutral-200 pb-2 text-[13px] font-bold text-neutral-900">
            {g.region}
            <span className="text-[10px] font-medium text-neutral-400">{g.items.length} brands</span>
          </h2>

          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {g.items.map((brand) => {
              const count = countFor(brand.name);
              return (
                <li key={brand.name}>
                  <Link
                    to={`/shop?brand=${encodeURIComponent(brand.name)}`}
                    className="group relative flex h-32 flex-col items-center justify-center border border-neutral-200 bg-white transition hover:border-[#ff5a1f] hover:shadow-md"
                  >
                    <span className={`${bigger(brand.style)} ${brand.name.length > 8 ? "text-lg" : "text-2xl"} px-2 text-center text-neutral-900`}>
                      {brand.name}
                    </span>

                    <span className="absolute inset-x-3 bottom-2.5 flex items-center justify-between text-[9px] font-medium text-neutral-500">
                      <span>{brand.country}</span>
                      <span className="transition-colors group-hover:text-[#ff5a1f]">
                        {count} {count === 1 ? "style" : "styles"}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </section>
  );
};

export default Brands;