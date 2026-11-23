import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Menu, X, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useWishlist } from "../context/WishlistContext";
import SearchOverlay from "./SearchOverlay"; // <-- Import Overlay

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // <-- New State
  const location = useLocation();
  const { wishlist, setIsDrawerOpen } = useWishlist();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Shop All", path: "/shop" },
    { name: "Our Story", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? "bg-ivory/95 backdrop-blur-lg py-3 shadow-sm border-b border-charcoal/5" : "bg-transparent py-4 md:py-6"}`}
      >
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 flex items-center justify-between">
          <button
            className="lg:hidden text-charcoal z-50 p-2 -ml-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <div className="hidden lg:flex items-center space-x-10 text-[11px] tracking-[0.2em] uppercase font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="hover:text-burgundy transition-colors duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-burgundy transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          <Link
            to="/"
            className="text-xl md:text-3xl font-serif font-semibold text-burgundy tracking-wide absolute left-1/2 -translate-x-1/2"
          >
            Ghunghat Fashion
          </Link>

          <div className="flex items-center space-x-4 md:space-x-6 text-charcoal">
            {/* SEARCH BUTTON TRIGGER */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hover:text-burgundy transition-colors hidden sm:block"
            >
              <Search size={18} strokeWidth={1.5} />
            </button>

            <button
              onClick={() => setIsDrawerOpen(true)}
              className="relative hover:text-burgundy transition-colors group p-2 -mr-2"
            >
              <Heart
                size={20}
                strokeWidth={1.5}
                className="group-hover:fill-burgundy transition-all"
              />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 bg-burgundy text-ivory text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            <Link
              to="/admin/login"
              className="text-[11px] tracking-[0.2em] uppercase hover:text-burgundy transition-colors hidden md:block ml-2"
            >
              Admin
            </Link>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-ivory z-40 flex flex-col items-center justify-center space-y-8 lg:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-3xl font-serif text-charcoal hover:text-burgundy transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/admin/login"
              className="text-xs tracking-[0.2em] uppercase text-charcoal/50 mt-4 border-b border-charcoal/20 pb-1"
            >
              Admin Portal
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RENDER SEARCH OVERLAY */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};

export default Navbar;
