import { Link } from "react-router-dom";
import { collections } from "../data/collections";
import useProducts from "../hook/useProducts";

// Builds the /shop link for a collection, e.g. /shop?category=Running
const shopLink = (filter) => `/shop?${new URLSearchParams(filter).toString()}`;

// Same rules the Shop page applies, so the style count matches what you'll see there
const matches = (p, f) =>
  (!f.category || p.category === f.category) &&
  (!f.region || p.region === f.region) &&
  (!f.brand || p.brand?.toLowerCase() === f.brand.toLowerCase()) &&
  (!f.max || p.price <= f.max);

const ArrowUpRight = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

const Collections = () => {
  const { allProducts } = useProducts();

  return (
    <section className="mx-auto w-full max-w-6xl bg-white px-8 py-8">
      <p className="mb-2 text-[7px] font-bold uppercase tracking-[0.15em] text-orange-600">CURATED FOR YOU</p>
      <h1 className="text-[26px] font-extrabold leading-none tracking-tight text-neutral-900">Collections</h1>
      <p className="mt-2 text-[10px] text-neutral-500">Hand-picked edits to help you find the right pair faster.</p>

      <ul className="mt-6 grid auto-rows-[240px] grid-cols-2 gap-4 lg:grid-cols-4">
        {collections.map((c, i) => {
          const count = allProducts.filter((p) => matches(p, c.filter)).length;
          const featured = i === 0;

          return (
            <li key={c.id} className={featured ? "col-span-2 lg:row-span-2" : ""}>
              <Link
                to={shopLink(c.filter)}
                className="group relative block h-full w-full overflow-hidden rounded-lg bg-neutral-300"
              >
                <img
                  src={c.image}
                  alt=""
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                  <div className="min-w-0">
                    <p className="mb-1 text-[8px] font-bold uppercase tracking-widest text-white/70">
                      {count} {count === 1 ? "style" : "styles"}
                    </p>
                    <h2 className={`font-black leading-none tracking-tight text-white ${featured ? "text-3xl sm:text-4xl" : "text-xl"}`}>
                      {c.title}
                    </h2>
                    <p className={`mt-1.5 text-[11px] text-white/80 ${featured ? "" : "hidden sm:block"}`}>{c.tagline}</p>
                  </div>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-neutral-900 transition group-hover:bg-orange-600 group-hover:text-white">
                    <ArrowUpRight />
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Collections;