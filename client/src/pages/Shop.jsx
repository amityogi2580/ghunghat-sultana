import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown, Loader, Search } from "lucide-react";
import api from "../services/api";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
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
    <div className="bg-ivory min-h-screen pt-20">
      <div className="bg-beige py-24 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-8xl font-serif text-burgundy mb-4 tracking-tight">
            The Collection
          </h1>
          <p className="text-charcoal/60 uppercase tracking-[0.3em] text-xs font-semibold">
            Explore our curated designs
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Filter Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-center border-b border-charcoal/10 pb-6 mb-16 gap-6">
          <div className="flex items-center w-full lg:w-1/3 border-b border-charcoal/20 bg-transparent py-2">
            <Search size={18} className="text-charcoal/40 mr-3" />
            <input
              type="text"
              placeholder="Search designs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent focus:outline-none text-sm text-charcoal placeholder-charcoal/40 tracking-wider"
            />
          </div>

          <div className="flex overflow-x-auto w-full lg:w-auto space-x-8 pb-2 lg:pb-0 hide-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-[11px] tracking-[0.2em] uppercase whitespace-nowrap transition-colors ${selectedCategory === cat ? "text-burgundy font-bold border-b-2 border-burgundy pb-1" : "text-charcoal/50 hover:text-burgundy"}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center w-full lg:w-auto justify-end">
            <div className="relative flex items-center group cursor-pointer">
              <span className="text-[11px] tracking-[0.2em] uppercase mr-2 group-hover:text-gold transition-colors">
                Sort By
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

        {/* Product Grid with Editorial Reveal */}
        {loading ? (
          <div className="flex justify-center py-32">
            <Loader className="animate-spin text-burgundy" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: (index % 3) * 0.1 }}
                className="group"
              >
                <Link
                  to={`/product/${product._id}`}
                  className="block relative aspect-[3/4] overflow-hidden bg-beige mb-6"
                >
                  {/* Image Reveal Effect */}
                  <motion.div
                    initial={{ clipPath: "inset(100% 0 0 0)" }}
                    whileInView={{ clipPath: "inset(0 0 0 0)" }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
                    className="w-full h-full"
                  >
                    <img
                      src={product.coverImage}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                    />
                  </motion.div>
                </Link>
                <div className="text-center">
                  <p className="text-[10px] text-gold uppercase tracking-[0.2em] font-semibold mb-2">
                    {product.category}
                  </p>
                  <h3 className="font-serif text-2xl text-charcoal mb-3 group-hover:text-burgundy transition-colors">
                    <Link to={`/product/${product._id}`}>{product.name}</Link>
                  </h3>
                  <div className="flex items-center justify-center space-x-3 text-sm">
                    <span className="font-medium text-charcoal tracking-wide">
                      {formatPrice(product.sellingPrice)}
                    </span>
                    {product.originalPrice > product.sellingPrice && (
                      <span className="text-charcoal/30 line-through tracking-wide">
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
