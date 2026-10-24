import AnnouncementBar from "../components/AnnouncementBar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

const MainLayout = ({ children, cartCount = 0, onCartClick, onSelectProduct }) => {
  return (
    <div className="flex min-h-screen flex-col bg-[#f4f4f2] font-sans text-neutral-900 antialiased">
      <AnnouncementBar />
      <Navbar cartCount={cartCount} onCartClick={onCartClick} onSelectProduct={onSelectProduct} />

      {/* Sections stack here with a small gap so white panels read as cards on the gray page */}
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-4 px-0 sm:px-4">
        {children}
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default MainLayout;