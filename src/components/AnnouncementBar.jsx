import { useEffect, useState } from "react";

const defaultMessages = [
  { text: "New Arrivals are here. Sale: up to 30% off", href: "/shop" },
  { text: "Free shipping on orders over $100", href: "/shop" },
  { text: "30-day returns, no questions asked", href: "/shop" },
];

const ArrowUpRight = () => (
  <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

const AnnouncementBar = ({
  messages = defaultMessages,
  left = "Move Fast. Live Bold.",
  right = "US / USD",
  interval = 4000,
  dismissible = false,
}) => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (messages.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % messages.length), interval);
    return () => clearInterval(id);
  }, [messages.length, interval]);

  if (!visible || messages.length === 0) return null;
  const current = messages[index];

  return (
    <div className="relative bg-[#111] text-white">
      <div className="mx-auto grid h-8 max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-6 text-[10px]">
        <span className="hidden font-medium uppercase tracking-[0.12em] text-white/70 sm:block">{left}</span>

        <a
          href={current.href || "#"}
          className="col-start-2 flex items-center justify-center gap-1.5 font-semibold transition-colors hover:text-[#ff5a1f] sm:col-start-2"
        >
          <span key={index} className="truncate">{current.text}</span>
          <ArrowUpRight />
        </a>

        <span className="hidden justify-self-end font-medium uppercase tracking-[0.12em] text-white/70 sm:block">{right}</span>
      </div>

      {dismissible && (
        <button
          onClick={() => setVisible(false)}
          aria-label="Dismiss announcement"
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/60 transition-colors hover:text-white"
        >
          <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default AnnouncementBar;