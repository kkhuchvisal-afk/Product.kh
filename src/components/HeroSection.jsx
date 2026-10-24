import { useEffect, useState } from "react";

const defaultSlides = [
  {
    eyebrow: "THE NEXT MOVE STARTS HERE",
    title: ["Find Your", "Next Move"],
    subtitle: "Move Fast. Live Bold.",
    description: "Performance that pushes you. Style that moves with you.\nFind your pair, whatever comes next.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1400&q=80",
    caption: "PERFORMANCE, REIMAGINED.",
    label: "MADE TO MOVE",
  },
  {
    eyebrow: "NEW SEASON, NEW PACE",
    title: ["Built For", "Every Mile"],
    subtitle: "Run Further. Recover Faster.",
    description: "Responsive cushioning for daily miles and long runs.\nFind the pair that keeps up.",
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=1400&q=80",
    caption: "ENGINEERED FOR SPEED.",
    label: "BUILT TO RUN",
  },
  {
    eyebrow: "OFF THE TRACK, ON THE STREET",
    title: ["Street Ready,", "Always"],
    subtitle: "Comfort Meets Attitude.",
    description: "Everyday sneakers with a performance edge.\nWear them anywhere, anytime.",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1400&q=80",
    caption: "STYLE THAT MOVES.",
    label: "WEAR IT YOUR WAY",
  },
];

const defaultTagline = ["More than a shoe.", "A mindset. A moment.", "A way forward."];

const ArrowUpRight = ({ className = "h-4 w-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

const pad = (n) => String(n).padStart(2, "0");

const HeroSection = ({ slides = defaultSlides, tagline = defaultTagline, interval = 6000, onShop }) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-advance (pauses on hover)
  useEffect(() => {
    if (paused || slides.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), interval);
    return () => clearInterval(id);
  }, [paused, slides.length, interval]);

  const slide = slides[index];

  return (
    <section className="mx-auto w-full max-w-6xl" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="grid bg-[#111] text-white lg:min-h-[520px] lg:grid-cols-2">
        {/* Copy */}
        <div className="order-2 flex flex-col justify-center px-8 py-12 sm:px-12 lg:order-1 lg:px-14">
          <p className="mb-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.15em] text-[#ff5a1f]">
            <span className="h-px w-6 bg-[#ff5a1f]" />
            {slide.eyebrow}
          </p>

          <h1 className="text-5xl font-bold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
            {slide.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p className="mt-7 text-lg font-semibold">{slide.subtitle}</p>
          <p className="mt-2 max-w-sm whitespace-pre-line text-[13px] leading-relaxed text-white/60">{slide.description}</p>

          <button
            onClick={onShop}
            className="mt-8 flex w-fit items-center gap-3 bg-[#ff5a1f] px-6 py-3.5 text-[13px] font-bold text-white transition hover:bg-[#e04a14]"
          >
            Shop Now <ArrowUpRight />
          </button>

          {/* Slide counter */}
          <button
            onClick={() => setIndex((i) => (i + 1) % slides.length)}
            aria-label="Next slide"
            className="mt-10 flex w-fit items-center gap-3 text-[10px] font-medium uppercase tracking-[0.15em] text-white/50 transition-colors hover:text-white"
          >
            <span>
              {pad(index + 1)} / {pad(slides.length)}
            </span>
            <span className="h-px w-10 bg-white/30" />
            <span>{slide.label}</span>
          </button>
        </div>

        {/* Image */}
        <div className="relative order-1 min-h-[300px] bg-black lg:order-2">
          {slides.map((s, i) => (
            <img
              key={s.image}
              src={s.image}
              alt=""
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          <p className="absolute bottom-6 left-6 text-[9px] font-semibold uppercase tracking-[0.15em] text-white/90">{slide.caption}</p>
          <button
            onClick={onShop}
            aria-label="Shop now"
            className="absolute bottom-5 right-6 text-[#ff5a1f] transition-transform hover:translate-x-0.5 hover:-translate-y-0.5"
          >
            <ArrowUpRight className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Orange tagline strip */}
      <div className="flex flex-col gap-1 bg-[#ff5a1f] px-8 py-3.5 text-[11px] font-extrabold uppercase tracking-wide text-black sm:flex-row sm:justify-between">
        {tagline.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;