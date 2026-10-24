import { Link } from "react-router-dom";

const quickLinks = [
  { label: "Shop all", to: "/shop" },
  { label: "Brands", to: "/brands" },
  { label: "Collections", to: "/collections" },
  { label: "Contact us", to: "/contact" },
];

const ArrowUpRight = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

const NotFound = () => {
  return (
    <section className="mx-auto w-full max-w-6xl">
      <div className="bg-[#111] px-8 py-16 text-white sm:px-14 sm:py-24">
        <p className="mb-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.15em] text-[#ff5a1f]">
          <span className="h-px w-6 bg-[#ff5a1f]" />
          Error 404
        </p>

        <h1 className="text-7xl font-bold leading-[0.9] tracking-tight sm:text-9xl">
          Wrong
          <span className="block text-[#ff5a1f]">turn.</span>
        </h1>

        <p className="mt-6 max-w-sm text-[14px] leading-relaxed text-white/60">
          We couldn't find the page you were looking for. It may have moved, or the link might be wrong.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/" className="flex items-center gap-3 bg-[#ff5a1f] px-6 py-3.5 text-[13px] font-bold text-white transition hover:bg-[#e04a14]">
            Back to home <ArrowUpRight />
          </Link>
          <Link to="/shop" className="border border-white/30 px-6 py-3.5 text-[13px] font-bold text-white transition hover:border-white">
            Shop all shoes
          </Link>
        </div>
      </div>

      {/* Quick links, styled like the orange strip */}
      <ul className="grid grid-cols-2 bg-[#ff5a1f] text-black sm:grid-cols-4">
        {quickLinks.map((l) => (
          <li key={l.to}>
            <Link
              to={l.to}
              className="flex items-center justify-between px-6 py-4 text-[11px] font-extrabold uppercase tracking-wide transition-colors hover:bg-black hover:text-white"
            >
              {l.label}
              <ArrowUpRight />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default NotFound;