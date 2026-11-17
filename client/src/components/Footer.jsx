import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-charcoal text-ivory py-16 mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-4xl font-serif text-gold mb-4">
            Ghunghat Sultana
          </h2>
          <p className="text-ivory/60 font-sans text-sm max-w-sm leading-relaxed">
            Curating premium Indian fashion and heritage designs for the modern
            muse. Crafted with love, delivered worldwide.
          </p>
        </div>

        <div>
          <h3 className="text-sm tracking-widest uppercase mb-6 text-ivory/80">
            Explore
          </h3>
          <ul className="space-y-3 text-sm text-ivory/60">
            <li>
              <Link to="/shop" className="hover:text-gold transition-colors">
                Shop All
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gold transition-colors">
                Our Story
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm tracking-widest uppercase mb-6 text-ivory/80">
            Customer Care
          </h3>
          <ul className="space-y-3 text-sm text-ivory/60">
            <li>
              <Link to="/contact" className="hover:text-gold transition-colors">
                Contact Us
              </Link>
            </li>
            <li>
              <a href="/privacy" className="hover:text-gold transition-colors">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-ivory/10 text-center text-xs text-ivory/40">
        &copy; {new Date().getFullYear()} Ghunghat Sultana. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
