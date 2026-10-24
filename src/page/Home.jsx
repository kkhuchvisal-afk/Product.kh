import { useNavigate } from "react-router-dom";

import HeroSection from "../components/HeroSection";
import BrandSection from "../components/BrandSection";
import CategorySection from "../components/CategorySection";
import FeaturedProducts from "../components/FeaturedProducts";

import { brands } from "../data/brands";
import { categories } from "../data/categories";
import useProducts from "../hook/useProducts";


const Home = ({ onAddToCart }) => {
  const navigate = useNavigate();
  const { allProducts } = useProducts();

  // The catalog is big now, so the home page only shows a slice of it
  const newArrivals = allProducts.filter((p) => p.badge === "JUST IN").slice(-8).reverse();
  const categoriesWithCounts = categories.map((c) => ({
    ...c,
    count: allProducts.filter((p) => p.category === c.name).length,
  }));

  return (
    <>
      <HeroSection
        onShop={() => document.getElementById("new-arrivals")?.scrollIntoView({ behavior: "smooth" })}
      />

      <BrandSection
        brands={brands.slice(0, 10)}
        onSelect={(brand) => navigate(`/shop?brand=${encodeURIComponent(brand.name)}`)}
        onShopAll={() => navigate("/brands")}
      />

      <div id="categories">
        <CategorySection
          categories={categoriesWithCounts}
          onSelect={(category) => navigate(`/shop?category=${encodeURIComponent(category.name)}`)}
          onViewAll={() => navigate("/shop")}
        />
      </div>

      <div id="new-arrivals">
        <FeaturedProducts
          products={newArrivals}
          onQuickShop={onAddToCart}
          onShopAll={() => navigate("/shop")}
          onDiscover={() => navigate("/shop")}
        />
      </div>
    </>
  );
};

export default Home;