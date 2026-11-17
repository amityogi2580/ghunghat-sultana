import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown, Loader, Search } from "lucide-react";
import api from "../services/api";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("featured");

  // Fetch Categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(["All", ...res.data.data.map((c) => c.name)]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch Products whenever filters change
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Build the URL with query parameters
        let url = `/products?`;
        if (searchTerm) url += `search=${searchTerm}&`;
        if (selectedCategory !== "All") url += `category=${selectedCategory}&`;
        if (sortOption !== "featured") url += `sort=${sortOption}&`;

        const response = await api.get(url);
        setProducts(response.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    // Debounce search slightly so it doesn't fire on every single keystroke
    const delayDebounceFn = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, selectedCategory, sortOption]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-ivory min-h-screen">
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
        {/* Filter Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-center border-b border-charcoal/10 pb-6 mb-10 gap-6">
          {/* Search */}
          <div className="flex items-center w-full lg:w-1/3 border border-charcoal/20 bg-white px-4 py-2">
            <Search size={18} className="text-charcoal/40 mr-2" />
            <input
              type="text"
              placeholder="Search designs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent focus:outline-none text-sm text-charcoal"
            />
          </div>

          {/* Category Filters */}
          <div className="flex overflow-x-auto w-full lg:w-auto space-x-6 pb-2 lg:pb-0 hide-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-sm tracking-widest uppercase whitespace-nowrap transition-colors ${selectedCategory === cat ? "text-burgundy font-semibold border-b-2 border-burgundy pb-1" : "text-charcoal/60 hover:text-burgundy"}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center w-full lg:w-auto justify-end">
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

        {/* Product Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader className="animate-spin text-burgundy" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <Link
                  to={`/product/${product._id}`}
                  className="block relative aspect-[3/4] overflow-hidden bg-white mb-6"
                >
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
                No products found matching your filters.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
