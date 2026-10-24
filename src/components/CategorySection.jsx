const defaultCategories = [
  {
    id: 1,
    name: "Running",
    count: 124,
    image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80",
  },
  {
    id: 2,
    name: "Training",
    count: 86,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
  },
  {
    id: 3,
    name: "Basketball",
    count: 52,
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80",
  },
  {
    id: 4,
    name: "Court sports",
    count: 41,
    image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&q=80",
  },
];

const ArrowUpRight = ({ className = "h-3 w-3" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

const CategorySection = ({
  eyebrow = "FIND YOUR GAME",
  title = "Shop by sport",
  subtitle = "Footwear built for how you move, whatever the sport.",
  categories = defaultCategories,
  onSelect,
  onViewAll,
}) => {
  return (
    <section className="mx-auto w-full max-w-6xl bg-white px-8 py-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="mb-2 text-[7px] font-bold uppercase tracking-[0.15em] text-orange-600">{eyebrow}</p>
          <h2 className="text-[26px] font-extrabold leading-none tracking-tight text-neutral-900">{title}</h2>
          <p className="mt-2 text-[10px] text-neutral-500">{subtitle}</p>
        </div>
        <button
          onClick={onViewAll}
          className="mt-6 flex items-center gap-1.5 text-[9px] font-bold text-neutral-900 transition-colors hover:text-orange-600"
        >
          View all sports <ArrowUpRight />
        </button>
      </div>

      {/* Cards */}
      <ul className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {categories.map((c) => (
          <li key={c.id}>
            <button
              onClick={() => onSelect && onSelect(c)}
              className="group relative block aspect-[3/4] w-full overflow-hidden rounded-lg bg-neutral-300 text-left"
            >
              <img
                src={c.image}
                alt={c.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />

              {/* Gradient for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
                <div>
                  <h3 className="text-[15px] font-extrabold text-white">{c.name}</h3>
                  <p className="text-[8px] font-medium uppercase tracking-widest text-white/70">
                    {c.count} styles
                  </p>
                </div>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-neutral-900 transition group-hover:bg-orange-600 group-hover:text-white">
                  <ArrowUpRight />
                </span>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CategorySection;