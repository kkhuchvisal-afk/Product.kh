import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";

const HeartIcon = ({ filled }) => (
  <svg className="h-3 w-3" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9Z" />
  </svg>
);

const ProductCard = ({ product, onQuickShop, onToggleLike }) => {
  const { brand, name, price, description, badge, colors = [], moreColors = 0, image } = product;
  const { has, toggle } = useWishlist();
  const liked = has(product.id);

  const handleLike = () => {
    toggle(product);
    onToggleLike && onToggleLike(product, !liked);
  };

  return (
    <article className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition hover:shadow-md">
      {/* Image */}
      <div className="relative aspect-[1/0.8] bg-gradient-to-b from-[#e9e7e2] to-[#d9d6cf]">
        <Link to={`/product/${product.id}`} className="block h-full w-full">
          <img
            src={image}
            alt={name}
            onError={(e) => {
              if (product.fallbackImage && e.currentTarget.src !== product.fallbackImage) {
                e.currentTarget.onerror = null;
                e.currentTarget.src = product.fallbackImage;
              }
            }}
            className="h-full w-full object-cover mix-blend-multiply"
          />
        </Link>

        {badge && (
          <span
            className={`absolute left-2.5 top-2.5 rounded-[3px] bg-white px-1.5 py-1 text-[6px] font-extrabold tracking-wider ${
              badge === "BESTSELLER" ? "text-orange-600" : "text-neutral-900"
            }`}
          >
            {badge}
          </span>
        )}

        <button
          onClick={handleLike}
          aria-label="Add to wishlist"
          aria-pressed={liked}
          className={`absolute right-2.5 top-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-white ${
            liked ? "text-orange-600" : "text-neutral-900"
          }`}
        >
          <HeartIcon filled={liked} />
        </button>
      </div>

      {/* Info */}
      <div className="px-3 pb-3 pt-3">
        <div className="flex items-baseline justify-between">
          <span className="text-[7px] font-semibold uppercase tracking-wider text-neutral-500">{brand}</span>
          <span className="text-[14px] font-extrabold text-neutral-900">${price}</span>
        </div>
        <h3 className="mt-0.5 text-[13px] font-extrabold text-neutral-900">
          <Link to={`/product/${product.id}`} className="hover:text-blue-600">{name}</Link>
        </h3>
        <p className="mt-1 text-[8px] text-neutral-500">{description}</p>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1">
            {colors.map((c) => (
              <span key={c} className="h-2 w-2 rounded-full border border-black/10" style={{ backgroundColor: c }} />
            ))}
            {moreColors > 0 && <span className="ml-0.5 text-[7px] text-neutral-500">+{moreColors}</span>}
          </div>
          <button
            onClick={() => onQuickShop && onQuickShop(product)}
            className="flex items-center gap-1 text-[8px] font-semibold text-neutral-900 transition-colors hover:text-orange-600"
          >
            Quick shop <span className="text-[11px] leading-none">+</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;