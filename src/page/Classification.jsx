import { Link } from "react-router-dom";
import { classification } from "../data/classification";
import useProducts from "../hook/useProducts";

// Same rules the Shop page applies, so the style count matches what you'll see there
const matches = (p, f) => {
  if (f.category && p.category !== f.category) return false;
  if (f.q) {
    const q = f.q.toLowerCase();
    if (![p.name, p.brand, p.category, p.description].some((x) => x?.toLowerCase().includes(q))) return false;
  }
  return true;
};

const shopLink = (filter) => `/shop?${new URLSearchParams(filter).toString()}`;

const ArrowUpRight = ({ className = "h-3.5 w-3.5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

const Classification = () => {
  const { allProducts } = useProducts();

  return (
    <>
      {/* Header */}
      <section className="mx-auto w-full max-w-6xl">
        <div className="bg-[#111] px-8 py-12 text-white sm:px-14 sm:py-16">
          <p className="mb-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.15em] text-[#ff5a1f]">
            <span className="h-px w-6 bg-[#ff5a1f]" />
            Find your fit
          </p>
          <h1 className="text-4xl font-bold leading-[1] tracking-tight sm:text-6xl">
            Footwear by sport
            <span className="block">and daily use.</span>
          </h1>
          <p className="mt-5 max-w-md text-[13px] leading-relaxed text-white/60">
            Every pair is made for something. Start with what you'll do in them, then pick the type that fits.
          </p>

          {/* Jump links */}
          <div className="mt-7 flex flex-wrap gap-2">
            {classification.map((g) => (
              <a
                key={g.id}
                href={`#${g.id}`}
                className="border border-white/30 px-4 py-2 text-[11px] font-bold text-white transition hover:border-[#ff5a1f] hover:bg-[#ff5a1f]"
              >
                {g.title}
              </a>
            ))}
          </div>
        </div>
        <div className="h-1.5 bg-[#ff5a1f]" />
      </section>

      {/* Groups */}
      {classification.map((group) => (
        <section key={group.id} id={group.id} className="mx-auto w-full max-w-6xl scroll-mt-32 bg-white px-8 py-10">
          <div className="mb-6 flex items-end gap-4">
            <span className="text-4xl font-bold leading-none text-[#ff5a1f]">{group.number}</span>
            <div>
              <h2 className="text-2xl font-bold leading-none tracking-tight text-neutral-900">{group.title}</h2>
              <p className="mt-1.5 text-[12px] text-neutral-500">{group.description}</p>
            </div>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {group.items.map((item) => {
              const count = allProducts.filter((p) => matches(p, item.filter)).length;

              return (
                <li key={item.id}>
                  <Link
                    to={shopLink(item.filter)}
                    className="group flex h-full flex-col overflow-hidden border border-neutral-200 bg-white transition hover:border-[#ff5a1f] hover:shadow-md"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-neutral-200">
                      <img src={item.image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                      <span className="absolute left-3 top-3 bg-white px-2 py-1 text-[8px] font-extrabold uppercase tracking-wider text-neutral-900">
                        {count} {count === 1 ? "style" : "styles"}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-[16px] font-bold text-neutral-900">{item.name}</h3>
                        <span className="mt-1 text-neutral-900 transition-colors group-hover:text-[#ff5a1f]">
                          <ArrowUpRight className="h-4 w-4" />
                        </span>
                      </div>
                      <p className="mt-1.5 text-[12px] leading-relaxed text-neutral-600">{item.description}</p>

                      <div className="mt-auto pt-4">
                        <p className="mb-2 text-[9px] font-bold uppercase tracking-wider text-neutral-400">Look for</p>
                        <ul className="flex flex-wrap gap-1.5">
                          {item.features.map((f) => (
                            <li key={f} className="bg-neutral-100 px-2.5 py-1 text-[10px] font-medium text-neutral-700">
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </>
  );
};

export default Classification;