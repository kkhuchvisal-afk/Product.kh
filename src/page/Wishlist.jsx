import { Link } from "react-router-dom";

import ProductCard from "../components/ProductCard";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const Wishlist = () => {
  const { items, count, clear } = useWishlist();
  const { addItem } = useCart();

  if (count === 0) {
    return (
      <section className="mx-auto w-full max-w-6xl bg-white px-8 py-20 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
          <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9Z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Your wishlist is empty</h1>
        <p className="mx-auto mt-2 max-w-xs text-[13px] text-neutral-500">Tap the heart on any pair to save it here for later.</p>
        <Link to="/shop" className="mt-6 inline-block bg-[#ff5a1f] px-7 py-3.5 text-[13px] font-bold text-white transition hover:bg-[#e04a14]">
          Browse shoes
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-6xl bg-white px-8 py-8">
      <p className="mb-2 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.15em] text-[#ff5a1f]">
        <span className="h-px w-6 bg-[#ff5a1f]" />
        Saved for later
      </p>

      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
          Wishlist <span className="text-neutral-400">({count})</span>
        </h1>

        <div className="flex items-center gap-5">
          <button onClick={clear} className="text-[11px] font-bold text-neutral-500 underline-offset-4 transition-colors hover:text-[#ff5a1f] hover:underline">
            Clear all
          </button>
          <button
            onClick={() => items.forEach((p, i) => addItem(p, { open: i === items.length - 1 }))}
            className="bg-[#ff5a1f] px-5 py-2.5 text-[12px] font-bold text-white transition hover:bg-[#e04a14]"
          >
            Add all to bag
          </button>
        </div>
      </div>

      <ul className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {items.map((p) => (
          <li key={p.id}>
            <ProductCard product={p} onQuickShop={addItem} />
          </li>
        ))}
      </ul>

      <p className="mt-6 text-[11px] text-neutral-500">Tap the heart on a pair to remove it from your wishlist.</p>
    </section>
  );
};

export default Wishlist;