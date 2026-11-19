import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Add glass effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
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
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? "bg-ivory/80 backdrop-blur-md py-4 shadow-sm" : "bg-transparent py-6"}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-charcoal z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-10 text-[11px] tracking-[0.2em] uppercase font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="hover:text-gold transition-colors duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Logo */}
          <Link
            to="/"
            className="text-2xl md:text-4xl font-serif font-semibold text-burgundy tracking-wide z-50"
          >
            Ghunghat Fashion
          </Link>

          {/* Icons */}
          <div className="flex items-center space-x-6 text-charcoal">
            <button className="hover:text-gold transition-colors">
              <Search size={20} />
            </button>
            <Link
              to="/admin/login"
              className="text-[11px] tracking-[0.2em] uppercase hover:text-gold transition-colors hidden sm:block"
            >
              Admin
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-ivory z-40 flex flex-col items-center justify-center space-y-8 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-3xl font-serif text-burgundy hover:text-gold transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/admin/login"
              className="text-sm tracking-widest uppercase text-charcoal/50 mt-8 border-b border-charcoal/20 pb-1"
            >
              Admin Portal
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
