import { useEffect } from "react";
import { Link } from "react-router-dom";

const formatPrice = (n) => `$${n.toFixed(2).replace(/\.00$/, "")}`;

const CartDrawer = ({
  open,
  onClose,
  items = [],
  onUpdateQty,
  onRemove,
  onCheckout,
  freeShippingThreshold = 100,
}) => {
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

  const count = items.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const remaining = Math.max(freeShippingThreshold - subtotal, 0);
  const progress = Math.min((subtotal / freeShippingThreshold) * 100, 100);

  return (
    <div className={`fixed inset-0 z-[80] ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
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
        aria-label="Shopping cart"
        className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-5">
          <h2 className="text-lg font-extrabold tracking-tight text-neutral-900">
            Your bag <span className="text-neutral-400">({count})</span>
          </h2>
          <button onClick={onClose} aria-label="Close cart" className="p-1 text-neutral-900 transition-colors hover:text-blue-600">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          /* Empty state */
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 8h14l-1 12H6L5 8Z" />
                <path d="M9 8V6a3 3 0 0 1 6 0v2" />
              </svg>
            </div>
            <p className="text-sm font-extrabold text-neutral-900">Your bag is empty</p>
            <p className="mt-1 text-[12px] text-neutral-500">Find your next pair and it will show up here.</p>
            <button
              onClick={onClose}
              className="mt-5 rounded-full bg-blue-600 px-5 py-2.5 text-[11px] font-bold text-white transition hover:bg-blue-700"
            >
              Keep shopping
            </button>
          </div>
        ) : (
          <>
            {/* Free shipping progress */}
            <div className="border-b border-neutral-100 bg-neutral-50 px-6 py-4">
              <p className="text-[11px] text-neutral-600">
                {remaining > 0 ? (
                  <>
                    Add <span className="font-bold text-neutral-900">{formatPrice(remaining)}</span> more for free shipping
                  </>
                ) : (
                  <span className="font-bold text-blue-600">You've unlocked free shipping</span>
                )}
              </p>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-neutral-200">
                <div className="h-full rounded-full bg-blue-600 transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>

            {/* Items */}
            <ul className="flex-1 divide-y divide-neutral-100 overflow-y-auto px-6">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4 py-5">
                  <img src={item.image} alt={item.name} className="h-20 w-20 shrink-0 rounded-lg bg-neutral-200 object-cover" />

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-[8px] font-semibold uppercase tracking-wider text-neutral-500">{item.brand}</p>
                        <p className="truncate text-[13px] font-extrabold text-neutral-900">{item.name}</p>
                        {(item.size || item.color) && (
                          <p className="mt-0.5 flex items-center gap-1.5 text-[10px] text-neutral-500">
                            {item.size && <span>Size {item.size}</span>}
                            {item.color && (
                              <span className="h-2 w-2 rounded-full border border-black/10" style={{ backgroundColor: item.color }} />
                            )}
                          </p>
                        )}
                      </div>
                      <p className="text-[13px] font-extrabold text-neutral-900">{formatPrice(item.price * item.qty)}</p>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-3">
                      {/* Quantity */}
                      <div className="flex items-center rounded-full border border-neutral-300">
                        <button
                          onClick={() => onUpdateQty?.(item.id, item.qty - 1)}
                          aria-label={`Decrease quantity of ${item.name}`}
                          className="flex h-7 w-7 items-center justify-center text-neutral-900 transition-colors hover:text-blue-600"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-[11px] font-bold text-neutral-900">{item.qty}</span>
                        <button
                          onClick={() => onUpdateQty?.(item.id, item.qty + 1)}
                          aria-label={`Increase quantity of ${item.name}`}
                          className="flex h-7 w-7 items-center justify-center text-neutral-900 transition-colors hover:text-blue-600"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => onRemove?.(item.id)}
                        className="text-[10px] font-medium text-neutral-500 underline-offset-2 transition-colors hover:text-orange-600 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Footer */}
            <div className="border-t border-neutral-200 px-6 py-5">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-medium text-neutral-600">Subtotal</span>
                <span className="text-lg font-extrabold text-neutral-900">{formatPrice(subtotal)}</span>
              </div>
              <p className="mt-1 text-[10px] text-neutral-500">Taxes and shipping calculated at checkout.</p>

              <Link
                to="/cart"
                onClick={onClose}
                className="mt-4 block w-full rounded-full border border-neutral-900 py-3 text-center text-[12px] font-bold text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
              >
                View bag
              </Link>
              <button
                onClick={() => onCheckout?.(items)}
                className="mt-2 w-full rounded-full bg-blue-600 py-3 text-[12px] font-bold text-white transition hover:bg-blue-700"
              >
                Checkout
              </button>
              <button
                onClick={onClose}
                className="mt-2 w-full py-2 text-[11px] font-bold text-neutral-900 transition-colors hover:text-blue-600"
              >
                Continue shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
};

export default CartDrawer;