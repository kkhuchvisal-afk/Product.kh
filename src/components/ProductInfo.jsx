import { Link } from "react-router-dom";
import SizeSelector from "./SizeSelector";

const perks = [
  ["24H dispatch", "on orders placed before 2pm"],
  ["Free shipping", "over $100"],
  ["30-day returns", "no questions asked"],
];

const ProductInfo = ({
  product,
  activeColor,
  onColorChange,
  size,
  onSizeChange,
  sizeError = false,
  onAdd,
  liked = false,
  onToggleLike,
  sizes,
  unavailableSizes = [],
}) => {
  return (
    <div className="flex flex-col">
      {/* Brand, name, description */}
      <Link
        to={`/shop?brand=${encodeURIComponent(product.brand)}`}
        className="w-fit text-[10px] font-bold uppercase tracking-[0.15em] text-[#ff5a1f] hover:underline"
      >
        {product.brand}
      </Link>
      <h1 className="mt-2 text-4xl font-bold leading-[0.98] tracking-tight text-neutral-900 sm:text-5xl">{product.name}</h1>
      <p className="mt-2 text-[13px] text-neutral-500">{product.description}</p>
      {product.country && <p className="mt-1 text-[11px] text-neutral-400">Brand from {product.country}</p>}

      {/* Price */}
      <div className="mt-5 flex items-baseline gap-3">
        <span className="text-2xl font-bold text-neutral-900">${product.price}</span>
        {product.oldPrice && (
          <>
            <span className="text-sm text-neutral-400 line-through">${product.oldPrice}</span>
            <span className="bg-[#ff5a1f] px-2 py-0.5 text-[9px] font-extrabold tracking-wider text-white">
              SAVE ${product.oldPrice - product.price}
            </span>
          </>
        )}
      </div>

      {/* Colors */}
      {product.colors?.length > 0 && (
        <div className="mt-6">
          <p className="mb-2 text-[11px] font-bold text-neutral-900">Color</p>
          <div className="flex gap-2.5">
            {product.colors.map((c) => (
              <button
                key={c}
                onClick={() => onColorChange?.(c)}
                aria-label={`Color ${c}`}
                aria-pressed={activeColor === c}
                className={`h-8 w-8 rounded-full border border-black/10 ring-offset-2 transition ${
                  activeColor === c ? "ring-2 ring-neutral-900" : "hover:ring-2 hover:ring-neutral-300"
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Sizes */}
      <div className="mt-6">
        <SizeSelector
          sizes={sizes}
          value={size}
          onChange={onSizeChange}
          unavailable={unavailableSizes}
          error={sizeError}
          guideTo="/contact"
        />
      </div>

      {/* Actions */}
      <div className="mt-7 flex gap-3">
        <button onClick={onAdd} className="h-12 flex-1 bg-[#ff5a1f] text-[13px] font-bold text-white transition hover:bg-[#e04a14]">
          Add to bag
        </button>
        <button
          onClick={onToggleLike}
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={liked}
          className={`flex h-12 w-12 items-center justify-center border transition ${
            liked ? "border-[#ff5a1f] text-[#ff5a1f]" : "border-neutral-300 text-neutral-900 hover:border-neutral-900"
          }`}
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9Z" />
          </svg>
        </button>
      </div>

      {/* Perks */}
      <ul className="mt-6 divide-y divide-neutral-100 border-t border-neutral-100 text-[12px] text-neutral-600">
        {perks.map(([strong, rest]) => (
          <li key={strong} className="py-3">
            <span className="font-bold text-neutral-900">{strong}</span> {rest}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductInfo;