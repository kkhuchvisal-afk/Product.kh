import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "valocity:wishlist";

const WishlistContext = createContext(null);

const loadItems = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const WishlistProvider = ({ children }) => {
  const [items, setItems] = useState(loadItems);

  // Persist the wishlist between page loads
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable, ignore */
    }
  }, [items]);

  const has = useCallback((id) => items.some((i) => i.id === id), [items]);

  // Adds the product if it isn't saved yet, removes it if it is
  const toggle = useCallback((product) => {
    setItems((prev) =>
      prev.some((i) => i.id === product.id) ? prev.filter((i) => i.id !== product.id) : [...prev, product]
    );
  }, []);

  const remove = useCallback((id) => setItems((prev) => prev.filter((i) => i.id !== id)), []);
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({ items, count: items.length, has, toggle, remove, clear }),
    [items, has, toggle, remove, clear]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside <WishlistProvider>");
  return ctx;
};

export default WishlistContext;