const ArrowUpRight = ({ className = "h-3.5 w-3.5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

const PromoBanner = ({
  eyebrow = "LIMITED TIME",
  title = "Up to 30% off\nselect runners.",
  description = "Lace up for less. Selected styles from your favorite brands, while stock lasts.",
  ctaLabel = "Shop the sale",
  endsText = "Ends Sunday",
  image = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&q=80",
  onClick,
}) => {
  return (
    <section className="mx-auto w-full max-w-6xl">
      <div className="relative grid overflow-hidden bg-blue-600 text-white md:grid-cols-2">
        {/* Copy */}
        <div className="relative z-10 flex flex-col items-start justify-center px-8 py-12 sm:px-12 sm:py-16">
          <p className="mb-4 text-[8px] font-bold uppercase tracking-[0.2em] text-white/70">{eyebrow}</p>

          <h2 className="whitespace-pre-line text-4xl font-black uppercase leading-[0.9] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
            {title}
          </h2>

          <p className="mt-5 max-w-sm text-[12px] leading-relaxed text-white/80">{description}</p>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <button
              onClick={onClick}
              className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[11px] font-bold text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
            >
              {ctaLabel} <ArrowUpRight />
            </button>
            {endsText && (
              <span className="rounded-full bg-orange-500 px-3 py-1 text-[8px] font-extrabold uppercase tracking-widest">
                {endsText}
              </span>
            )}
          </div>
        </div>

        {/* Image */}
        <div className="relative min-h-[240px] md:min-h-full">
          <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover mix-blend-luminosity opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-600/30 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;