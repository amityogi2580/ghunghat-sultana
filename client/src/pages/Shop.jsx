import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown, Loader, Search, SlidersHorizontal } from "lucide-react";
import api from "../services/api";

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
    <div className="bg-ivory min-h-screen pt-24">
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-serif text-charcoal mb-4">
            The Collection
          </h1>
          <p className="text-charcoal/50 uppercase tracking-[0.3em] text-xs font-medium">
            Explore our curated designs
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-center border-y border-charcoal/10 py-4 mb-12 gap-4">
          <div className="flex items-center w-full lg:w-64 bg-transparent">
            <Search size={16} className="text-charcoal/40 mr-3" />
            <input
              type="text"
              placeholder="Search designs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent focus:outline-none text-xs text-charcoal placeholder-charcoal/40 tracking-wider"
            />
          </div>

          <div className="flex overflow-x-auto w-full lg:w-auto space-x-8 pb-2 lg:pb-0 hide-scrollbar justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-[11px] tracking-[0.15em] uppercase whitespace-nowrap transition-colors ${selectedCategory === cat ? "text-burgundy font-bold" : "text-charcoal/50 hover:text-charcoal"}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-end w-full lg:w-64">
            <div className="relative flex items-center group cursor-pointer">
              <span className="text-[11px] tracking-[0.15em] uppercase mr-2 group-hover:text-burgundy transition-colors">
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

        {/* Product Grid */}
        {loading ? (
          <div className="flex justify-center py-32">
            <Loader className="animate-spin text-burgundy" size={32} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
                className="group"
              >
                <Link
                  to={`/product/${product._id}`}
                  className="block relative aspect-[3/4] overflow-hidden bg-[#f5f5f5] mb-4"
                >
                  <img
                    src={product.coverImage}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  />
                  {product.isNewArrival && (
                    <span className="absolute top-4 left-4 bg-white text-charcoal text-[9px] font-bold uppercase tracking-[0.15em] px-3 py-1.5">
                      New
                    </span>
                  )}
                </Link>

                <div className="text-center px-2">
                  <p className="text-[10px] text-charcoal/40 uppercase tracking-[0.15em] mb-1">
                    {product.category}
                  </p>
                  <h3 className="font-serif text-lg text-charcoal mb-2 group-hover:text-burgundy transition-colors truncate">
                    <Link to={`/product/${product._id}`}>{product.name}</Link>
                  </h3>
                  <div className="flex items-center justify-center space-x-2 text-sm">
                    <span className="font-medium text-charcoal">
                      {formatPrice(product.sellingPrice)}
                    </span>
                    {product.originalPrice > product.sellingPrice && (
                      <span className="text-charcoal/30 line-through text-xs">
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
