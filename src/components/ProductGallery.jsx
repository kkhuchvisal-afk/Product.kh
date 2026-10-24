import { useEffect, useState } from "react";

const Chevron = ({ dir }) => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d={dir === "left" ? "m15 5-7 7 7 7" : "m9 5 7 7-7 7"} />
  </svg>
);

/**
 * images: array of image URLs (one is fine, thumbnails hide themselves)
 * badge:  optional tag shown on the main image ("JUST IN", "BESTSELLER", ...)
 */
const ProductGallery = ({ images = [], alt = "", badge, fallback }) => {
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(null); // { x, y } in percent while hovering

  // Go back to the first image when the product changes
  const key = images.join("|");
  useEffect(() => setIndex(0), [key]);

  const count = images.length;
  const go = (next) => count > 0 && setIndex((next + count) % count);

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setZoom({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleKey = (e) => {
    if (e.key === "ArrowLeft") go(index - 1);
    if (e.key === "ArrowRight") go(index + 1);
  };

  if (count === 0) {
    return <div className="aspect-square bg-neutral-200" />;
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div
        tabIndex={0}
        onKeyDown={handleKey}
        onMouseMove={handleMove}
        onMouseLeave={() => setZoom(null)}
        aria-label={`${alt} image ${index + 1} of ${count}`}
        className="group relative aspect-square cursor-zoom-in overflow-hidden bg-gradient-to-b from-[#e9e7e2] to-[#d9d6cf] outline-none focus-visible:ring-2 focus-visible:ring-[#ff5a1f]"
      >
        <img
          src={images[index]}
          alt={alt}
          draggable={false}
          onError={(e) => {
            if (fallback && e.currentTarget.src !== fallback) {
              e.currentTarget.onerror = null;
              e.currentTarget.src = fallback;
            }
          }}
          className="h-full w-full object-cover mix-blend-multiply transition-transform duration-200 ease-out"
          style={zoom ? { transform: "scale(1.8)", transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
        />

        {badge && (
          <span
            className={`absolute left-3 top-3 bg-white px-2 py-1 text-[8px] font-extrabold tracking-wider ${
              badge === "BESTSELLER" ? "text-[#ff5a1f]" : "text-neutral-900"
            }`}
          >
            {badge}
          </span>
        )}

        {count > 1 && (
          <>
            <button
              onClick={() => go(index - 1)}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center bg-white/90 text-neutral-900 opacity-0 transition hover:bg-[#ff5a1f] hover:text-white group-hover:opacity-100 group-focus-within:opacity-100"
            >
              <Chevron dir="left" />
            </button>
            <button
              onClick={() => go(index + 1)}
              aria-label="Next image"
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center bg-white/90 text-neutral-900 opacity-0 transition hover:bg-[#ff5a1f] hover:text-white group-hover:opacity-100 group-focus-within:opacity-100"
            >
              <Chevron dir="right" />
            </button>
            <span className="absolute bottom-3 right-3 bg-black/70 px-2 py-1 text-[9px] font-bold tracking-wider text-white">
              {index + 1} / {count}
            </span>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {count > 1 && (
        <ul className="grid grid-cols-5 gap-2">
          {images.map((src, i) => (
            <li key={src + i}>
              <button
                onClick={() => setIndex(i)}
                aria-label={`Show image ${i + 1}`}
                aria-current={i === index}
                className={`block aspect-square w-full overflow-hidden border-2 bg-neutral-200 transition ${
                  i === index ? "border-[#ff5a1f]" : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductGallery;