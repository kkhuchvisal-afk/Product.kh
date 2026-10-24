import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import MobileMenu from "./MobileMenu";
import Logo from "./Logo";
import { useWishlist } from "../context/WishlistContext";

const links = ["Home", "Men", "Women", "Kids", "Sports", "Brands", "New Arrivals", "Sale"];

// Where each nav label goes. Men / Women / Kids all open the shop until your products have a gender field.
const routes = {
  Home: "/",
  Men: "/shop",
  Women: "/shop",
  Kids: "/shop",
  Sports: "/classification",
  Brands: "/brands",
  "New Arrivals": "/shop",
  Sale: "/shop?sort=price-asc",
};

const Icon = ({ children, className = "h-[18px] w-[18px]" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const SearchIcon = (props) => (
  <Icon {...props}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </Icon>
);
const UserIcon = () => (
  <Icon>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
  </Icon>
);
const HeartIcon = () => (
  <Icon>
    <path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9Z" />
  </Icon>
);
const BagIcon = () => (
  <Icon>
    <path d="M5 8h14l-1 12H6L5 8Z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </Icon>
);

const Navbar = ({ cartCount = 0, onSelectProduct, onCartClick }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { count: wishlistCount } = useWishlist();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Cmd/Ctrl + K opens search
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const handleSelectProduct = (product) => {
    onSelectProduct?.(product);
    navigate(`/product/${product.id}`);
  };

  const activeLabel =
    pathname === "/" ? "Home" : pathname.startsWith("/brands") ? "Brands" : pathname.startsWith("/classification") ? "Sports" : null;

  return (
    <>
      {/* No backdrop-blur here: it would trap the fixed search and menu overlays inside the header */}
      <header className="sticky top-0 z-50 bg-white">
        {/* Row 1: logo, search, actions */}
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-6">
          <button
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="text-neutral-900 transition-colors hover:text-[#ff5a1f] md:hidden"
          >
            <Icon className="h-5 w-5">
              <path d="M4 7h16M4 12h16M4 17h10" />
            </Icon>
          </button>

          <Link to="/" aria-label="Velocity home">
            <Logo />
          </Link>

          <div className="ml-auto flex items-center gap-5 text-neutral-900">
            {/* Search field (desktop) */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden h-9 w-72 items-center gap-2 rounded-md bg-neutral-100 px-3 text-left text-[12px] text-neutral-500 transition hover:bg-neutral-200 md:flex"
            >
              <SearchIcon className="h-4 w-4 shrink-0" />
              <span className="flex-1 truncate">Search shoes, brands, and more</span>
              <kbd className="text-[10px] font-medium text-neutral-400">⌘ K</kbd>
            </button>

            {/* Search icon (mobile) */}
            <button aria-label="Search" onClick={() => setSearchOpen(true)} className="transition-colors hover:text-[#ff5a1f] md:hidden">
              <SearchIcon />
            </button>

            <button aria-label="Account" className="transition-colors hover:text-[#ff5a1f]">
              <UserIcon />
            </button>

            <button aria-label="Wishlist" onClick={() => navigate("/wishlist")} className="relative transition-colors hover:text-[#ff5a1f]">
              <HeartIcon />
              {wishlistCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-3.5 min-w-[14px] items-center justify-center rounded-full bg-[#ff5a1f] px-1 text-[8px] font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button onClick={onCartClick} aria-label="Cart" className="flex items-center gap-1.5 text-[12px] font-bold transition-colors hover:text-[#ff5a1f]">
              <BagIcon />
              <span>
                <span className="hidden sm:inline">Cart </span>({cartCount})
              </span>
            </button>
          </div>
        </div>

        {/* Row 2: links */}
        <nav className="hidden border-y border-neutral-200 md:block">
          <div className="mx-auto flex h-11 max-w-6xl items-center justify-between px-6">
            <ul className="flex items-center gap-7">
              {links.map((link) => (
                <li key={link}>
                  <Link
                    to={routes[link] || "/"}
                    className={`text-[12px] transition-colors ${
                      link === "Sale"
                        ? "font-semibold text-[#ff5a1f] hover:text-[#e04a14]"
                        : activeLabel === link
                        ? "font-bold text-neutral-900"
                        : "font-medium text-neutral-700 hover:text-neutral-900"
                    }`}
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>

            <Link to="/collections" className="flex items-center gap-1 text-[11px] font-medium text-neutral-500 transition-colors hover:text-neutral-900">
              The Velocity Edit
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17 17 7M8 7h9v9" />
              </svg>
            </Link>
          </div>
        </nav>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={links} onNavigate={(link) => navigate(routes[link] || "/")} />
      <SearchBar
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelect={handleSelectProduct}
        onSearchAll={(q) => navigate(`/shop?q=${encodeURIComponent(q)}`)}
      />
    </>
  );
};

export default Navbar;