import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown, Loader } from "lucide-react";
import api from "../services/api";

const Shop = () => {
  const [sortOption, setSortOption] = useState("featured");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch products from the backend when the page loads
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        setProducts(response.data.data);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-ivory min-h-screen">
      {/* Editorial Header */}
      <div className="bg-beige py-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-serif text-burgundy mb-4">
            The Collection
          </h1>
          <p className="text-charcoal/60 uppercase tracking-widest text-sm">
            Explore our curated designs
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Filter and Sort Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-charcoal/10 pb-6 mb-10 gap-4">
          <div className="text-sm text-charcoal/60 tracking-wider">
            Showing {products.length} designs
          </div>

          <div className="flex items-center space-x-6">
            <div className="relative flex items-center group cursor-pointer">
              <span className="text-sm uppercase tracking-wider mr-2 group-hover:text-gold transition-colors">
                Sort By
              </span>
              <ChevronDown size={16} />
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="absolute inset-0 opacity-0 cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-20">
            <Loader className="animate-spin text-burgundy" size={40} />
          </div>
        )}

        {/* Error State */}
        {error && <div className="text-center text-red-500 py-20">{error}</div>}

        {/* Product Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {products.map((product, index) => (
              <motion.div
                key={product._id} // Using MongoDB _id now
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <Link
                  to={`/product/${product._id}`}
                  className="block relative aspect-[3/4] overflow-hidden bg-white mb-6"
                >
                  {product.isNewArrival && (
                    <span className="absolute top-4 left-4 z-10 bg-ivory text-burgundy text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                      New
                    </span>
                  )}
                  <img
                    src={product.coverImage}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </Link>

                <div className="text-center">
                  <p className="text-xs text-gold uppercase tracking-widest mb-1">
                    {product.category}
                  </p>
                  <h3 className="font-serif text-xl text-charcoal mb-2 group-hover:text-burgundy transition-colors">
                    <Link to={`/product/${product._id}`}>{product.name}</Link>
                  </h3>

                  <div className="flex items-center justify-center space-x-3 text-sm">
                    <span className="font-medium text-charcoal">
                      {formatPrice(product.sellingPrice)}
                    </span>
                    {product.originalPrice > product.sellingPrice && (
                      <span className="text-charcoal/40 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {products.length === 0 && (
              <div className="col-span-full text-center py-20 text-charcoal/60">
                No products found in the database yet.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
