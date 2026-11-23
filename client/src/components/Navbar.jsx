import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Menu, X, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useWishlist } from "../context/WishlistContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
        className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? "bg-ivory/90 backdrop-blur-lg py-4 shadow-sm border-b border-charcoal/5" : "bg-transparent py-6"}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
          <button
            className="lg:hidden text-charcoal z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
            className="text-2xl lg:text-3xl font-serif font-semibold text-burgundy tracking-wide z-50 text-center absolute left-1/2 -translate-x-1/2"
          >
            Ghunghat Fashion
          </Link>

          <div className="flex items-center space-x-6 text-charcoal">
            <button className="hover:text-burgundy transition-colors hidden sm:block">
              <Search size={20} strokeWidth={1.5} />
            </button>

            {/* WISHLIST BUTTON */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="relative hover:text-burgundy transition-colors group"
            >
              <Heart
                size={20}
                strokeWidth={1.5}
                className="group-hover:fill-burgundy transition-all"
              />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-burgundy text-ivory text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            <Link
              to="/admin/login"
              className="text-[11px] tracking-[0.2em] uppercase hover:text-burgundy transition-colors hidden sm:block ml-2"
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
            className="fixed inset-0 bg-ivory z-40 flex flex-col items-center justify-center space-y-10 lg:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-4xl font-serif text-charcoal hover:text-burgundy transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
