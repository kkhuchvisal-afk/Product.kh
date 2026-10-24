import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const columns = [
  { title: "Shop", links: ["New arrivals", "Men", "Women", "Kids", "Sale"] },
  { title: "Sport", links: ["Running", "Training", "Basketball", "Lifestyle"] },
  { title: "Help", links: ["Shipping", "Returns", "Size guide", "Contact us", "About us"] },
];

const socials = [
  {
    name: "Instagram",
    path: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
      </>
    ),
  },
  {
    name: "X",
    path: <path d="M4 4l16 16M20 4 4 20" />,
  },
  {
    name: "YouTube",
    path: (
      <>
        <rect x="2.5" y="5" width="19" height="14" rx="4" />
        <path d="m10 9 5 3-5 3V9Z" fill="currentColor" />
      </>
    ),
  },
];

const routeFor = {
  "New arrivals": "/shop",
  Men: "/shop",
  Women: "/shop",
  Kids: "/shop",
  Sale: "/shop",
  Running: "/collections",
  Training: "/collections",
  Basketball: "/collections",
  Lifestyle: "/collections",
  Shipping: "/contact",
  Returns: "/contact",
  "Size guide": "/contact",
  "Contact us": "/contact",
  "About us": "/about",
};

const Footer = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSent(true);
    setEmail("");
  };

  return (
    <footer className="border-t border-neutral-200 bg-[#f9f9f6]">
      {/* Newsletter */}
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-3xl font-black uppercase leading-[0.9] tracking-[-0.04em] text-neutral-900">
            Get first <span className="text-blue-600">dibs.</span>
          </h3>
          <p className="mt-3 text-[12px] text-neutral-600">New drops and early access, straight to your inbox.</p>
        </div>

        {sent ? (
          <p className="text-[12px] font-bold text-blue-600">You're in. Check your inbox.</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex w-full max-w-sm items-center gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              required
              className="h-10 flex-1 rounded-full border border-neutral-300 bg-white px-4 text-[12px] outline-none transition focus:border-blue-600"
            />
            <button
              type="submit"
              className="h-10 rounded-full bg-blue-600 px-5 text-[11px] font-bold text-white transition hover:bg-blue-700"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>

      {/* Links */}
      <div className="border-t border-neutral-200">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div>
            <a href="/" aria-label="Velocity home"><Logo className="text-[20px] text-neutral-900" /></a>
            <p className="mt-3 max-w-[240px] text-[12px] leading-relaxed text-neutral-600">
              Performance footwear engineered for the pace of now.
            </p>

            <div className="mt-5 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href="#"
                  aria-label={s.name}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 text-neutral-900 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {s.path}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-3 text-[11px] font-extrabold text-neutral-900">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link to={routeFor[link] || "/"} className="text-[12px] text-neutral-600 transition-colors hover:text-blue-600">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-neutral-200">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-4 text-[10px] text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Valocity. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-neutral-900">Privacy</a>
            <a href="#" className="hover:text-neutral-900">Terms</a>
            <a href="#" className="hover:text-neutral-900">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;