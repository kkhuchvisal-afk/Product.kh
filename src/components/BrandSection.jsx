const defaultBrands = [
  { name: "adidas", style: "text-[17px] font-extrabold tracking-tight" },
  { name: "NIKE", style: "text-[17px] font-black italic uppercase tracking-tight" },
  { name: "PUMA", style: "text-[17px] font-black italic uppercase tracking-tight" },
  { name: "FILA", style: "text-[17px] font-extrabold uppercase tracking-tight" },
  { name: "HOKA", style: "text-[17px] font-extrabold uppercase tracking-tight" },
  { name: "new balance", style: "text-[14px] font-extrabold tracking-tight" },
  { name: "Mizuno", style: "text-[17px] font-bold italic tracking-tight" },
  { name: "asics", style: "text-[17px] font-extrabold italic tracking-tight" },
  { name: "SKECHERS", style: "text-[12px] font-black italic uppercase tracking-tight" },
  { name: "Brooks", style: "text-[17px] font-extrabold italic tracking-tight" },
];

const BrandSection = ({
  eyebrow = "THE NAMES YOU TRUST",
  title = "Great brands. Greater possibilities.",
  brands = defaultBrands,
  onSelect,
  onShopAll,
}) => {
  return (
    // w-full makes the panel fill the whole column (inside a flex-col parent, mx-auto alone shrinks it to its content)
    <section className="mx-auto w-full max-w-6xl bg-white px-8 py-8">
      {/* Header */}
      <div className="mb-5 flex items-end justify-between gap-6">
        <div>
          <p className="mb-2 text-[7px] font-bold uppercase tracking-[0.15em] text-orange-600">
            {eyebrow}
          </p>
          <h2 className="text-[26px] font-extrabold leading-none tracking-tight text-neutral-900">
            {title}
          </h2>
        </div>

        <button
          onClick={onShopAll}
          className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[9px] font-bold text-neutral-900 transition-colors hover:text-orange-600"
        >
          Shop all brands
          <svg
            className="h-3 w-3"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17 17 7M8 7h9v9" />
          </svg>
        </button>
      </div>

      {/* Grid */}
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {brands.map((brand) => (
          <li key={brand.name}>
            <button
              onClick={() => onSelect && onSelect(brand)}
              className="flex h-12 w-full items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-900 shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-md"
            >
              <span className={brand.style}>{brand.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default BrandSection;