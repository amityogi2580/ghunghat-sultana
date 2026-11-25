import { Link } from "react-router-dom";
import { Camera, Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-charcoal text-ivory pt-20 pb-10 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">
          {/* Brand & Contact */}
          <div className="md:col-span-4">
            <Link to="/" className="inline-block mb-6">
              <Logo light={true} />
            </Link>

            <p className="text-ivory/50 text-sm max-w-sm leading-relaxed mb-8 font-light">
              Curating premium Indian fashion and heritage designs for the
              modern muse. Crafted with love, delivered worldwide.
            </p>

            <div className="space-y-4 text-xs tracking-wider text-ivory/70">
              <div className="flex items-center">
                <Phone size={14} className="mr-3 text-champagne" /> +91 97826
                75316
              </div>
              <div className="flex items-center">
                <Mail size={14} className="mr-3 text-champagne" />{" "}
                hello@ghunghatfashion.com
              </div>
              <div className="flex items-center">
                <MapPin size={14} className="mr-3 text-champagne" /> Cement
                Road, Sultana, Rajasthan
              </div>
            </div>
          </div>

          {/* Explore Links */}
          <div className="md:col-span-2 md:col-start-6">
            <h3 className="text-[11px] tracking-[0.2em] uppercase mb-6 text-ivory font-medium">
              Explore
            </h3>
            <ul className="space-y-4 text-xs text-ivory/60">
              <li>
                <Link
                  to="/shop"
                  className="hover:text-champagne transition-colors"
                >
                  Shop All
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-champagne transition-colors"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-champagne transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/ghunghat_sultana_"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-champagne transition-colors flex items-center"
                >
                  <Camera size={14} className="mr-2" /> Instagram
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="md:col-span-2">
            <h3 className="text-[11px] tracking-[0.2em] uppercase mb-6 text-ivory font-medium">
              Customer Care
            </h3>
            <ul className="space-y-4 text-xs text-ivory/60">
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-champagne transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="hover:text-champagne transition-colors"
                >
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-champagne transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup (Premium Touch) */}
          <div className="md:col-span-3">
            <h3 className="text-[11px] tracking-[0.2em] uppercase mb-6 text-ivory font-medium">
              Become an Insider
            </h3>
            <p className="text-ivory/50 text-xs leading-relaxed mb-4 font-light">
              Subscribe to receive updates on new collections, exclusive offers,
              and private events.
            </p>
            <form className="relative flex items-center border-b border-white/20 pb-2 group focus-within:border-champagne transition-colors">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-transparent text-xs text-ivory placeholder-ivory/30 focus:outline-none"
              />
              <button
                type="button"
                className="text-ivory hover:text-champagne transition-colors ml-2"
              >
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-[10px] tracking-widest text-ivory/40 uppercase">
          <p>
            &copy; {new Date().getFullYear()} Ghunghat Fashion. All rights
            reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span>Secure Enquiries</span>
            <span>Authentic Handcrafted</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
