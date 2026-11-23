import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown, Loader, Search, Heart } from "lucide-react";
import api from "../services/api";
import { useWishlist } from "../context/WishlistContext";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get("category") || "All";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortOption, setSortOption] = useState("featured");

  const { toggleWishlist, isInWishlist } = useWishlist();

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

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
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
    <div className="bg-ivory min-h-screen pt-20 md:pt-24">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <h1 className="text-4xl md:text-7xl font-serif text-charcoal mb-2 md:mb-4">
            The Collection
          </h1>
          <p className="text-charcoal/50 uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs font-medium">
            Explore our curated designs
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-center border-y border-charcoal/10 py-3 md:py-4 mb-8 md:mb-12 gap-3 md:gap-4">
          <div className="flex items-center w-full lg:w-64 bg-transparent">
            <Search size={16} className="text-charcoal/40 mr-2 md:mr-3" />
            <input
              type="text"
              placeholder="Search designs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent focus:outline-none text-xs text-charcoal placeholder-charcoal/40 tracking-wider"
            />
          </div>

          <div className="flex overflow-x-auto w-full lg:w-auto space-x-4 md:space-x-8 pb-2 lg:pb-0 hide-scrollbar justify-start md:justify-center px-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-[10px] md:text-[11px] tracking-[0.15em] uppercase whitespace-nowrap transition-colors ${selectedCategory === cat ? "text-burgundy font-bold" : "text-charcoal/50 hover:text-charcoal"}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between w-full lg:w-64">
            <span className="text-[10px] md:text-[11px] text-charcoal/50 uppercase tracking-widest lg:hidden">
              {products.length} Items
            </span>
            <div className="relative flex items-center group cursor-pointer">
              <span className="text-[10px] md:text-[11px] tracking-[0.15em] uppercase mr-2 group-hover:text-burgundy transition-colors">
                Sort
              </span>
              <ChevronDown size={14} />
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

        {/* Product Grid - 2 Columns on Mobile */}
        {loading ? (
          <div className="flex justify-center py-32">
            <Loader className="animate-spin text-burgundy" size={32} />
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-8 md:gap-x-6 md:gap-y-16">
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (index % 4) * 0.05 }}
                className="group"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[#f5f5f5] mb-3 md:mb-4">
                  <Link to={`/product/${product._id}`}>
                    <img
                      src={product.coverImage}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                    />
                  </Link>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-2 right-2 md:top-4 md:right-4 bg-white/70 backdrop-blur-md p-1.5 md:p-2 rounded-full text-charcoal hover:text-burgundy hover:bg-white transition-all duration-300 shadow-sm"
                  >
                    <Heart
                      size={14}
                      className={`md:w-4 md:h-4 ${isInWishlist(product._id) ? "fill-burgundy text-burgundy" : ""}`}
                    />
                  </button>

                  {product.isNewArrival && (
                    <span className="absolute top-2 left-2 md:top-4 md:left-4 bg-white text-charcoal text-[8px] md:text-[9px] font-bold uppercase tracking-[0.15em] px-2 py-1 md:px-3 md:py-1.5 pointer-events-none">
                      New
                    </span>
                  )}
                </div>

                <div className="text-center px-1">
                  <p className="text-[9px] md:text-[10px] text-charcoal/40 uppercase tracking-[0.1em] md:tracking-[0.15em] mb-1 truncate">
                    {product.category}
                  </p>
                  <h3 className="font-serif text-sm md:text-lg text-charcoal mb-1 md:mb-2 group-hover:text-burgundy transition-colors truncate">
                    <Link to={`/product/${product._id}`}>{product.name}</Link>
                  </h3>
                  <div className="flex items-center justify-center space-x-1 md:space-x-2 text-xs md:text-sm">
                    <span className="font-medium text-charcoal">
                      {formatPrice(product.sellingPrice)}
                    </span>
                    {product.originalPrice > product.sellingPrice && (
                      <span className="text-charcoal/30 line-through text-[10px] md:text-xs">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
