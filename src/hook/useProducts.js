import { useCallback, useEffect, useMemo, useState } from "react";
import { products as localProducts } from "../data/products";

export const defaultFilters = {
  search: "",
  category: "All",
  brand: "All",
  region: "All",
  minPrice: null,
  maxPrice: null,
  sort: "featured", // featured | price-asc | price-desc | name
};

/**
 * useProducts
 *
 * Static data (default):  const { products } = useProducts();
 * From an API:            useProducts({ fetcher: () => fetch("/api/products").then((r) => r.json()) });
 */
const useProducts = ({ fetcher, initialFilters } = {}) => {
  const [allProducts, setAllProducts] = useState(fetcher ? [] : localProducts);
  const [loading, setLoading] = useState(Boolean(fetcher));
  const [error, setError] = useState(null);
  const [filters, setFiltersState] = useState({ ...defaultFilters, ...initialFilters });
  const [reloadKey, setReloadKey] = useState(0);

  // Load from the fetcher (skipped when using the local data file)
  useEffect(() => {
    if (!fetcher) return;
    let ignore = false;
    setLoading(true);
    setError(null);

    Promise.resolve(fetcher())
      .then((data) => {
        if (!ignore) setAllProducts(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        if (!ignore) setError(err);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadKey]);

  const setFilter = useCallback((key, value) => setFiltersState((f) => ({ ...f, [key]: value })), []);
  const setFilters = useCallback((patch) => setFiltersState((f) => ({ ...f, ...patch })), []);
  const resetFilters = useCallback(() => setFiltersState({ ...defaultFilters }), []);
  const refetch = useCallback(() => setReloadKey((k) => k + 1), []);

  // Filter + sort
  const products = useMemo(() => {
    const q = filters.search.trim().toLowerCase();

    const list = allProducts.filter((p) => {
      if (filters.category !== "All" && p.category !== filters.category) return false;
      if (filters.region !== "All" && p.region !== filters.region) return false;
      if (filters.brand !== "All" && p.brand?.toLowerCase() !== filters.brand.toLowerCase()) return false;
      if (filters.minPrice != null && p.price < filters.minPrice) return false;
      if (filters.maxPrice != null && p.price > filters.maxPrice) return false;
      if (q && ![p.name, p.brand, p.category, p.description].some((f) => f?.toLowerCase().includes(q))) return false;
      return true;
    });

    switch (filters.sort) {
      case "price-asc":
        return [...list].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...list].sort((a, b) => b.price - a.price);
      case "name":
        return [...list].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return list;
    }
  }, [allProducts, filters]);

  // Values for building filter UIs
  const categories = useMemo(() => ["All", ...new Set(allProducts.map((p) => p.category).filter(Boolean))], [allProducts]);
  const regions = useMemo(() => ["All", ...new Set(allProducts.map((p) => p.region).filter(Boolean))], [allProducts]);
  const brands = useMemo(() => ["All", ...new Set(allProducts.map((p) => p.brand).filter(Boolean))], [allProducts]);
  const priceRange = useMemo(() => {
    if (!allProducts.length) return { min: 0, max: 0 };
    const prices = allProducts.map((p) => p.price);
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, [allProducts]);

  const getById = useCallback((id) => allProducts.find((p) => String(p.id) === String(id)) || null, [allProducts]);

  return {
    products, // filtered + sorted
    allProducts, // everything, untouched
    total: products.length,
    loading,
    error,
    filters,
    setFilter,
    setFilters,
    resetFilters,
    categories,
    brands,
    regions,
    priceRange,
    getById,
    refetch,
  };
};

export default useProducts;