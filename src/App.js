
import { useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import CartDrawer from "./components/CartDrawer";
import Home from "./page/Home";

import Shop from "./page/Shop";
import ProductDetails from "./page/ProductDetails";
import Brands from "./page/Brands";
import Collections from "./page/Collections";
import Cart from "./page/Cart";
import AboutUs from "./page/AboutUs";
import Contact from "./page/Contact";
import Wishlist from "./page/Wishlist";
import Classification from "./page/Classification";
import NotFound from "./page/NotFound";

import { CartProvider, useCart } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";


// Jump back to the top whenever the page changes

const ScrollOnNavigate = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [pathname]);

  return null;
};


// Lives inside the providers so it can use the cart hook
function Shell() {
  const { items, count, isOpen, openCart, closeCart, addItem, updateQty, removeItem } = useCart();

  return (
    <>
      <ScrollOnNavigate />

      <MainLayout cartCount={count} onCartClick={openCart}>
        <Routes>
          <Route path="/" element={<Home onAddToCart={addItem} />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/classification" element={<Classification />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/cart" element={<Cart onCheckout={(cartItems) => console.log("checkout", cartItems)} />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact onSubmit={async (values) => console.log("contact", values)} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>

      <CartDrawer
        open={isOpen}
        onClose={closeCart}
        items={items}
        onUpdateQty={updateQty}
        onRemove={removeItem}
        onCheckout={(cartItems) => console.log("checkout", cartItems)}
      />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <WishlistProvider>
        <CartProvider>
          <Shell />
        </CartProvider>
      </WishlistProvider>
    </BrowserRouter>
  );
}

export default App;