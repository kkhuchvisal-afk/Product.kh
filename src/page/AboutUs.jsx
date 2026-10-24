import { Link } from "react-router-dom";

const stats = [
  { value: "10+", label: "Sports" },
  { value: "24H", label: "Dispatch" },
  { value: "30 DAY", label: "Returns" },
];

const values = [
  { title: "Performance first", text: "Every pair we stock is picked for how it feels at pace: cushioning, grip, fit and durability." },
  { title: "Style that moves", text: "Good-looking shoes shouldn't slow you down. We carry pairs that work on the track and off it." },
  { title: "Honest and simple", text: "Clear prices, fast dispatch and easy returns. Shopping for shoes should be the easy part." },
  { title: "Made for everyone", text: "From first runs to race day, we help people of every level find the pair that fits their game." },
];

const ArrowUpRight = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

const AboutUs = () => {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto w-full max-w-6xl">
        <div className="grid bg-[#111] text-white lg:min-h-[420px] lg:grid-cols-2">
          <div className="flex flex-col justify-center px-8 py-12 sm:px-12 lg:px-14">
            <p className="mb-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.15em] text-[#ff5a1f]">
              <span className="h-px w-6 bg-[#ff5a1f]" />
              About us
            </p>
            <h1 className="text-5xl font-bold leading-[0.98] tracking-tight sm:text-6xl">
              More than
              <span className="block">a shoe.</span>
            </h1>
            <p className="mt-6 max-w-sm text-[13px] leading-relaxed text-white/60">
              Velocity is built for people who move. We bring together the best performance footwear so you can focus on the next mile, the next game, the next move.
            </p>
          </div>

          <div className="relative min-h-[260px] bg-black">
            <img
              src="https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1400&q=80"
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <p className="absolute bottom-6 left-6 text-[9px] font-semibold uppercase tracking-[0.15em] text-white/90">Made to move</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 bg-[#ff5a1f] text-black">
          {stats.map((s) => (
            <div key={s.label} className="px-6 py-5 text-center sm:py-6">
              <p className="text-2xl font-extrabold tracking-tight sm:text-3xl">{s.value}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto w-full max-w-6xl bg-white px-8 py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#ff5a1f]">Our story</p>
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-neutral-900">Built for the pace of now.</h2>
          </div>
          <div className="space-y-4 text-[14px] leading-relaxed text-neutral-600">
            <p>
              We started Velocity with a simple idea: finding the right pair shouldn't be complicated. Too many options, too much noise, and not enough people who actually care how a shoe performs.
            </p>
            <p>
              So we curate. We work with brands we trust, test what matters, and make it easy to compare, choose and get your pair fast, whatever your sport.
            </p>
            <p>That's the whole idea: move fast, live bold, and find the pair that keeps up.</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto w-full max-w-6xl bg-white px-8 pb-12">
        <div className="border-t border-neutral-200 pt-12">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#ff5a1f]">What we stand for</p>
          <h2 className="mb-8 text-3xl font-bold tracking-tight text-neutral-900">Our values</h2>

          <ul className="grid gap-px bg-neutral-200 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <li key={v.title} className="bg-white p-6">
                <span className="text-[11px] font-bold text-[#ff5a1f]">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-[15px] font-bold text-neutral-900">{v.title}</h3>
                <p className="mt-2 text-[12px] leading-relaxed text-neutral-600">{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto w-full max-w-6xl bg-[#111] px-8 py-12 text-white">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Ready to find
            <span className="block text-[#ff5a1f]">your next move?</span>
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link to="/shop" className="flex items-center gap-3 bg-[#ff5a1f] px-6 py-3.5 text-[13px] font-bold text-white transition hover:bg-[#e04a14]">
              Shop Now <ArrowUpRight />
            </Link>
            <Link to="/contact" className="border border-white/30 px-6 py-3.5 text-[13px] font-bold text-white transition hover:border-white">
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;