import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "valocity:cart";

const CartContext = createContext(null);

const loadItems = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(loadItems);
  const [isOpen, setIsOpen] = useState(false);

  // Persist the cart between page loads
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable, ignore */
    }
  }, [items]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  // Adds one unit; increases the quantity if the product is already in the cart
  const addItem = useCallback((product, { open = true } = {}) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      }
      const { id, productId, name, brand, price, image, size, color } = product;
      return [...prev, { id, productId: productId ?? id, name, brand, price, image, size, color, qty: 1 }];
    });
    if (open) setIsOpen(true);
  }, []);

  // qty <= 0 removes the item
  const updateQty = useCallback((id, qty) => {
    setItems((prev) =>
      qty <= 0 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, qty } : i))
    );
  }, []);

  const removeItem = useCallback((id) => setItems((prev) => prev.filter((i) => i.id !== id)), []);
  const clearCart = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({
      items,
      count: items.reduce((sum, i) => sum + i.qty, 0),
      subtotal: items.reduce((sum, i) => sum + i.price * i.qty, 0),
      isOpen,
      openCart,
      closeCart,
      addItem,
      updateQty,
      removeItem,
      clearCart,
    }),
    [items, isOpen, openCart, closeCart, addItem, updateQty, removeItem, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
};

export default CartContext;