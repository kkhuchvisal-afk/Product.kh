import { useEffect, useMemo, useRef, useState } from "react";
import { products as allProducts } from "../data/products";

const popular = ["Running", "Nike", "Women's", "Lifestyle", "Training"];

const SearchIcon = ({ className = "h-5 w-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

const ArrowUpRight = ({ className = "h-3.5 w-3.5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

const Kbd = ({ children }) => (
  <kbd className="rounded border border-neutral-300 bg-white px-1.5 py-0.5 text-[10px] font-medium text-neutral-500">{children}</kbd>
);

const SearchBar = ({ open, onClose, products = allProducts, onSelect, onSearchAll }) => {
  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState(0);
  const inputRef = useRef(null);

  const trimmed = query.trim();

  const results = useMemo(() => {
    const q = trimmed.toLowerCase();
    if (!q) return [];
    return products
      .filter((p) => [p.name, p.brand, p.category, p.description].some((f) => f?.toLowerCase().includes(q)))
      .slice(0, 5);
  }, [trimmed, products]);

  // Product rows + one "see all results" row
  const rowCount = trimmed ? results.length + 1 : 0;

  // Focus + lock page scroll while open, reset on close
  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
    setQuery("");
    setHighlight(0);
  }, [open]);

  // Esc to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => setHighlight(0), [query]);

  const choose = (product) => {
    onSelect?.(product);
    onClose?.();
  };

  const searchAll = () => {
    if (!trimmed) return;
    onSearchAll?.(trimmed);
    onClose?.();
  };

  const handleKeyDown = (e) => {
    if (!rowCount) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => (h + 1) % rowCount);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => (h - 1 + rowCount) % rowCount);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlight < results.length) choose(results[highlight]);
      else searchAll();
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center bg-black/50 px-4 pt-[10vh] backdrop-blur-sm"
      onMouseDown={(e) => e.target === e.currentTarget && onClose?.()}
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      <div className="w-full max-w-2xl overflow-hidden rounded-md bg-white shadow-2xl">
        {/* Input */}
        <div className="p-4">
          <div className="flex items-center gap-3 rounded-md bg-neutral-100 px-4 py-3 ring-2 ring-transparent transition focus-within:bg-white focus-within:ring-[#ff5a1f]">
            <SearchIcon className="h-5 w-5 shrink-0 text-neutral-500" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search shoes, brands, and more"
              className="flex-1 bg-transparent text-[15px] text-neutral-900 outline-none placeholder:text-neutral-400"
            />
            {query ? (
              <button onClick={() => setQuery("")} className="text-[11px] font-bold text-neutral-500 transition-colors hover:text-neutral-900">
                Clear
              </button>
            ) : (
              <button onClick={onClose} aria-label="Close search">
                <Kbd>Esc</Kbd>
              </button>
            )}
          </div>
        </div>

        {/* Popular searches */}
        {!trimmed && (
          <div className="px-5 pb-6">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-500">Popular searches</p>
            <div className="flex flex-wrap gap-2">
              {popular.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="rounded-md border border-neutral-300 px-3.5 py-1.5 text-[12px] font-medium text-neutral-800 transition hover:border-[#ff5a1f] hover:bg-[#ff5a1f] hover:text-white"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {trimmed && (
          <ul className="max-h-[55vh] overflow-y-auto border-t border-neutral-200 py-2">
            {results.length === 0 && (
              <li className="px-5 py-8 text-center text-[13px] text-neutral-500">
                No products found for <span className="font-bold text-neutral-900">"{trimmed}"</span>
              </li>
            )}

            {results.map((p, i) => (
              <li key={p.id}>
                <button
                  onClick={() => choose(p)}
                  onMouseEnter={() => setHighlight(i)}
                  className={`flex w-full items-center gap-4 border-l-2 px-5 py-2.5 text-left transition ${
                    i === highlight ? "border-[#ff5a1f] bg-neutral-100" : "border-transparent"
                  }`}
                >
                  <img src={p.image} alt="" className="h-12 w-12 shrink-0 rounded bg-neutral-200 object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-bold text-neutral-900">{p.name}</p>
                    <p className="truncate text-[11px] text-neutral-500">
                      {p.brand} · {p.category}
                    </p>
                  </div>
                  <span className="text-[13px] font-bold text-neutral-900">${p.price}</span>
                </button>
              </li>
            ))}

            {/* See all results */}
            <li className="border-t border-neutral-100 pt-2">
              <button
                onClick={searchAll}
                onMouseEnter={() => setHighlight(results.length)}
                className={`flex w-full items-center justify-between border-l-2 px-5 py-3 text-left text-[12px] font-bold transition ${
                  highlight === results.length ? "border-[#ff5a1f] bg-neutral-100 text-[#ff5a1f]" : "border-transparent text-neutral-900"
                }`}
              >
                <span>See all results for "{trimmed}"</span>
                <ArrowUpRight />
              </button>
            </li>
          </ul>
        )}

        {/* Hints */}
        <div className="hidden items-center gap-5 border-t border-neutral-200 bg-neutral-50 px-5 py-2.5 text-[11px] text-neutral-500 sm:flex">
          <span className="flex items-center gap-1.5"><Kbd>↑</Kbd><Kbd>↓</Kbd> Navigate</span>
          <span className="flex items-center gap-1.5"><Kbd>↵</Kbd> Select</span>
          <span className="flex items-center gap-1.5"><Kbd>Esc</Kbd> Close</span>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;