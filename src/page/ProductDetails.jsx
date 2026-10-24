import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import ProductGallery from "../components/ProductGallery";
import ProductInfo from "../components/ProductInfo";
import useProducts from "../hook/useProducts";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { shoeImage, shoeViews } from "../data/shoeArt";

const ProductDetails = () => {
  const { id } = useParams();
  const { getById, allProducts } = useProducts();
  const { addItem } = useCart();
  const { has, toggle } = useWishlist();

  const product = getById(id);
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);
  const [sizeError, setSizeError] = useState(false);

  // Start fresh when navigating to another product
  useEffect(() => {
    setSize(null);
    setColor(null);
    setSizeError(false);
  }, [id]);

  if (!product) {
    return (
      <section className="mx-auto w-full max-w-6xl bg-white px-8 py-20 text-center">
        <p className="text-3xl font-bold tracking-tight text-neutral-900">Product not found</p>
        <p className="mt-2 text-[13px] text-neutral-500">That pair may have sold out or the link is wrong.</p>
        <Link to="/shop" className="mt-6 inline-block bg-[#ff5a1f] px-7 py-3.5 text-[13px] font-bold text-white transition hover:bg-[#e04a14]">
          Back to shop
        </Link>
      </section>
    );
  }

  const activeColor = color ?? product.colors?.[0] ?? null;

  // Generated pictures are redrawn in the selected color; real photos stay as they are
  const mainImage = product.generated ? shoeImage(product, activeColor) : product.image;
  // Generated shoes get three pictures: side, top and sole
  const galleryImages = product.images ?? (product.generated ? shoeViews(product, activeColor) : [product.image]);

  const related = [
    ...allProducts.filter((p) => p.id !== product.id && p.category === product.category),
    ...allProducts.filter((p) => p.id !== product.id && p.category !== product.category),
  ].slice(0, 4);

  const handleAdd = () => {
    if (!size) {
      setSizeError(true);
      return;
    }
    // Same shoe in a different size or color is a separate line in the bag
    addItem({
      ...product,
      productId: product.id,
      image: mainImage,
      id: `${product.id}-${size}-${activeColor ?? "default"}`,
      size,
      color: activeColor,
    });
  };

  return (
    <>
      <section className="mx-auto w-full max-w-6xl bg-white px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-[11px] text-neutral-500">
          <Link to="/" className="hover:text-neutral-900">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-neutral-900">Shop</Link>
          <span>/</span>
          <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-neutral-900">
            {product.category}
          </Link>
        </nav>

        <div className="grid gap-10 md:grid-cols-2">
          {/* Real photos: add an `images: [...]` array to a product. Drawn shoes get side, top and sole views. */}
          <ProductGallery images={galleryImages} alt={product.name} badge={product.badge} fallback={product.fallbackImage} />

          <ProductInfo
            product={product}
            activeColor={activeColor}
            onColorChange={setColor}
            size={size}
            onSizeChange={(s) => {
              setSize(s);
              setSizeError(false);
            }}
            sizeError={sizeError}
            onAdd={handleAdd}
            liked={has(product.id)}
            onToggleLike={() => toggle(product)}
          />
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="mx-auto w-full max-w-6xl bg-white px-8 py-8">
          <p className="mb-2 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.15em] text-[#ff5a1f]">
            <span className="h-px w-6 bg-[#ff5a1f]" />
            Keep looking
          </p>
          <h2 className="mb-5 text-2xl font-bold leading-none tracking-tight text-neutral-900">You may also like</h2>
          <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {related.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} onQuickShop={addItem} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
};

export default ProductDetails;