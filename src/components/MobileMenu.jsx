import { useEffect } from "react";
import Logo from "./Logo";

const defaultLinks = ["Shop", "New arrivals", "Brands", "Sport", "About"];

const MobileMenu = ({ open, onClose, links = defaultLinks, onNavigate }) => {
  // Esc to close + lock page scroll while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    <div className={`fixed inset-0 z-[70] md:hidden ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-neutral-900/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`absolute inset-y-0 left-0 flex w-[82%] max-w-xs flex-col bg-[#f9f9f6] shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-[46px] items-center justify-between border-b border-neutral-200 px-6">
          <Logo className="text-[20px] text-neutral-900" />
          <button onClick={onClose} aria-label="Close menu" className="p-1 text-neutral-900 transition-colors hover:text-blue-600">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-6 py-6">
          <ul>
            {links.map((link) => (
              <li key={link} className="border-b border-neutral-200">
                <button
                  onClick={() => {
                    onNavigate?.(link);
                    onClose?.();
                  }}
                  className="flex w-full items-center justify-between py-4 text-left text-3xl font-black uppercase tracking-[-0.03em] text-neutral-900 transition-colors hover:text-blue-600"
                >
                  {link}
                  <svg className="h-4 w-4 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-neutral-200 px-6 py-5 text-[11px] text-neutral-500">
          <p className="font-bold text-neutral-900">Free shipping over $100</p>
          <p className="mt-1">30-day returns, no questions asked.</p>
        </div>
      </aside>
    </div>
  );
};

export default MobileMenu;