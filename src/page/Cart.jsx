import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const FREE_SHIPPING_FROM = 100;
const SHIPPING_FEE = 8;

// Demo promo codes: percent off the subtotal. Replace with a real check against your backend.
const PROMO_CODES = { VELOCITY10: 10 };

const money = (n) => `$${n.toFixed(2).replace(/\.00$/, "")}`;

const Cart = ({ onCheckout }) => {
  const { items, count, subtotal, updateQty, removeItem, clearCart } = useCart();
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState(null); // { code, percent }
  const [codeError, setCodeError] = useState(false);

  const discount = applied ? (subtotal * applied.percent) / 100 : 0;
  const shipping = items.length === 0 || subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_FEE;
  const total = subtotal - discount + shipping;
  const remaining = Math.max(FREE_SHIPPING_FROM - subtotal, 0);

  const applyCode = (e) => {
    e.preventDefault();
    const key = code.trim().toUpperCase();
    if (PROMO_CODES[key]) {
      setApplied({ code: key, percent: PROMO_CODES[key] });
      setCodeError(false);
      setCode("");
    } else {
      setCodeError(true);
    }
  };

  if (items.length === 0) {
    return (
      <section className="mx-auto w-full max-w-6xl bg-white px-8 py-20 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
          <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 8h14l-1 12H6L5 8Z" />
            <path d="M9 8V6a3 3 0 0 1 6 0v2" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Your bag is empty</h1>
        <p className="mt-2 text-[13px] text-neutral-500">Find your next pair and it will show up here.</p>
        <Link to="/shop" className="mt-6 inline-block bg-[#ff5a1f] px-7 py-3.5 text-[13px] font-bold text-white transition hover:bg-[#e04a14]">
          Start shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-6xl bg-white px-8 py-8">
      <p className="mb-2 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.15em] text-[#ff5a1f]">
        <span className="h-px w-6 bg-[#ff5a1f]" />
        Your bag
      </p>
      <div className="flex items-end justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
          Shopping bag <span className="text-neutral-400">({count})</span>
        </h1>
        <button onClick={clearCart} className="text-[11px] font-bold text-neutral-500 underline-offset-4 transition-colors hover:text-[#ff5a1f] hover:underline">
          Clear bag
        </button>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_340px]">
        {/* Items */}
        <ul className="divide-y divide-neutral-200 border-y border-neutral-200">
          {items.map((item) => (
            <li key={item.id} className="flex gap-5 py-6">
              <Link to={`/product/${item.productId ?? item.id}`} className="h-28 w-28 shrink-0 overflow-hidden bg-neutral-200">
                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
              </Link>

              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">{item.brand}</p>
                    <Link to={`/product/${item.productId ?? item.id}`} className="block truncate text-[15px] font-bold text-neutral-900 hover:text-[#ff5a1f]">
                      {item.name}
                    </Link>
                    {(item.size || item.color) && (
                      <p className="mt-1 flex items-center gap-2 text-[11px] text-neutral-500">
                        {item.size && <span>Size {item.size}</span>}
                        {item.color && <span className="h-2.5 w-2.5 rounded-full border border-black/10" style={{ backgroundColor: item.color }} />}
                      </p>
                    )}
                  </div>
                  <p className="text-[15px] font-bold text-neutral-900">{money(item.price * item.qty)}</p>
                </div>

                <div className="mt-auto flex items-center justify-between pt-4">
                  <div className="flex items-center border border-neutral-300">
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      aria-label={`Decrease quantity of ${item.name}`}
                      className="flex h-9 w-9 items-center justify-center text-neutral-900 transition-colors hover:bg-neutral-100"
                    >
                      −
                    </button>
                    <span className="w-9 text-center text-[12px] font-bold text-neutral-900">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      aria-label={`Increase quantity of ${item.name}`}
                      className="flex h-9 w-9 items-center justify-center text-neutral-900 transition-colors hover:bg-neutral-100"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-[11px] font-medium text-neutral-500 underline-offset-2 transition-colors hover:text-[#ff5a1f] hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Summary */}
        <aside className="h-fit bg-neutral-50 p-6 lg:sticky lg:top-32">
          <h2 className="text-[15px] font-bold text-neutral-900">Order summary</h2>

          {/* Free shipping progress */}
          <div className="mt-4">
            <p className="text-[11px] text-neutral-600">
              {remaining > 0 ? (
                <>
                  Add <span className="font-bold text-neutral-900">{money(remaining)}</span> more for free shipping
                </>
              ) : (
                <span className="font-bold text-[#ff5a1f]">You've unlocked free shipping</span>
              )}
            </p>
            <div className="mt-2 h-1 overflow-hidden bg-neutral-200">
              <div className="h-full bg-[#ff5a1f] transition-all duration-500" style={{ width: `${Math.min((subtotal / FREE_SHIPPING_FROM) * 100, 100)}%` }} />
            </div>
          </div>

          {/* Promo code */}
          <form onSubmit={applyCode} className="mt-5">
            <label htmlFor="promo" className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-neutral-500">
              Promo code
            </label>
            <div className="flex gap-2">
              <input
                id="promo"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setCodeError(false);
                }}
                placeholder="Enter code"
                className={`h-10 min-w-0 flex-1 border bg-white px-3 text-[12px] uppercase outline-none transition placeholder:normal-case focus:border-[#ff5a1f] ${
                  codeError ? "border-red-500" : "border-neutral-300"
                }`}
              />
              <button type="submit" className="h-10 bg-neutral-900 px-4 text-[11px] font-bold text-white transition hover:bg-[#ff5a1f]">
                Apply
              </button>
            </div>
            {codeError && <p className="mt-1.5 text-[10px] font-medium text-red-600">That code isn't valid.</p>}
            {applied && (
              <p className="mt-1.5 flex items-center justify-between text-[10px] font-medium text-neutral-600">
                <span>
                  <span className="font-bold text-neutral-900">{applied.code}</span> applied ({applied.percent}% off)
                </span>
                <button type="button" onClick={() => setApplied(null)} className="underline hover:text-[#ff5a1f]">
                  Remove
                </button>
              </p>
            )}
          </form>

          {/* Totals */}
          <dl className="mt-5 space-y-2 border-t border-neutral-200 pt-4 text-[12px] text-neutral-600">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd className="font-medium text-neutral-900">{money(subtotal)}</dd>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-[#ff5a1f]">
                <dt>Discount</dt>
                <dd className="font-medium">−{money(discount)}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt>Shipping</dt>
              <dd className="font-medium text-neutral-900">{shipping === 0 ? "Free" : money(shipping)}</dd>
            </div>
            <div className="flex justify-between border-t border-neutral-200 pt-3 text-[15px] font-bold text-neutral-900">
              <dt>Total</dt>
              <dd>{money(total)}</dd>
            </div>
          </dl>
          <p className="mt-1 text-[10px] text-neutral-500">Taxes calculated at checkout.</p>

          <button
            onClick={() => onCheckout?.(items)}
            className="mt-5 w-full bg-[#ff5a1f] py-3.5 text-[13px] font-bold text-white transition hover:bg-[#e04a14]"
          >
            Checkout
          </button>
          <Link to="/shop" className="mt-3 block text-center text-[11px] font-bold text-neutral-900 transition-colors hover:text-[#ff5a1f]">
            Continue shopping
          </Link>
        </aside>
      </div>
    </section>
  );
};

export default Cart;