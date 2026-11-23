import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../services/api";

const SearchOverlay = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Fetch results when query changes
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      try {
        // We use the existing products API with the search query parameter
        const res = await api.get(`/products?search=${query}`);
        setResults(res.data.data.slice(0, 6)); // Show max 6 results in overlay
      } catch (err) {
        console.error("Search failed", err);
      } finally {
        setLoading(false);
      }
    };

    // Debounce so we don't spam the API on every keystroke
    const timer = setTimeout(() => {
      fetchResults();
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-ivory/95 backdrop-blur-xl z-[100] flex flex-col"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 md:p-10 border-b border-charcoal/10">
            <span className="text-sm tracking-[0.2em] uppercase font-medium text-charcoal/50">
              Search
            </span>
            <button
              onClick={onClose}
              className="text-charcoal hover:text-burgundy transition-colors p-2"
            >
              <X size={28} />
            </button>
          </div>

          {/* Search Input */}
          <div className="max-w-4xl mx-auto w-full px-6 pt-12 pb-8">
            <div className="relative flex items-center border-b-2 border-charcoal/20 focus-within:border-burgundy transition-colors pb-4">
              <Search size={32} className="text-charcoal/30 mr-4" />
              <input
                type="text"
                autoFocus
                placeholder="Search for designs, collections..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-2xl md:text-4xl font-serif text-charcoal placeholder-charcoal/20 focus:outline-none"
              />
              {loading && (
                <Loader className="animate-spin text-burgundy" size={24} />
              )}
            </div>
          </div>

          {/* Results Area */}
          <div className="flex-1 overflow-y-auto max-w-7xl mx-auto w-full px-6 py-8">
            {query && !loading && results.length === 0 && (
              <p className="text-center text-charcoal/50 mt-10">
                No results found for "{query}"
              </p>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {results.map((product) => (
                <Link
                  key={product._id}
                  to={`/product/${product._id}`}
                  onClick={onClose} // Close overlay when a product is clicked
                  className="group"
                >
                  <div className="aspect-[3/4] overflow-hidden bg-[#f5f5f5] mb-2">
                    <img
                      src={product.coverImage}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <p className="text-[9px] uppercase tracking-widest text-charcoal/50 mb-1">
                    {product.category}
                  </p>
                  <h4 className="font-serif text-sm text-charcoal group-hover:text-burgundy transition-colors truncate">
                    {product.name}
                  </h4>
                  <p className="text-xs text-charcoal mt-1">
                    {formatPrice(product.sellingPrice)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
