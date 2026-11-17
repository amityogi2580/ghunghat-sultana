import { Link } from "react-router-dom";
import { Search, Menu } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-ivory border-b border-charcoal/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <button className="md:hidden text-charcoal">
          <Menu size={24} />
        </button>

        <div className="hidden md:flex items-center space-x-8 text-sm tracking-widest uppercase">
          <Link to="/shop" className="hover:text-gold transition-colors">
            Shop All
          </Link>
          <Link to="/about" className="hover:text-gold transition-colors">
            Our Story
          </Link>
          <Link to="/contact" className="hover:text-gold transition-colors">
            Contact
          </Link>
        </div>

        <Link
          to="/"
          className="text-3xl font-serif font-semibold text-burgundy tracking-wide"
        >
          Ghunghat Fashion
        </Link>

        <div className="flex items-center space-x-6 text-charcoal">
          <button className="hover:text-gold transition-colors">
            <Search size={20} />
          </button>
          <Link
            to="/admin/login"
            className="text-xs tracking-widest uppercase hover:text-gold transition-colors hidden sm:block"
          >
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
