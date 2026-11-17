import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { mockProducts } from "../../data/mockProducts";

const FeaturedDesigns = () => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-end mb-12"
        >
          <div>
            <span className="text-gold uppercase tracking-[0.2em] text-xs font-semibold mb-3 block">
              Curated Selection
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-burgundy">
              Featured Designs
            </h2>
          </div>
          <Link
            to="/shop"
            className="hidden md:block text-sm tracking-widest uppercase border-b border-burgundy pb-1 hover:text-gold hover:border-gold transition-colors"
          >
            View All
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {mockProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-beige mb-4">
                {product.isNew && (
                  <span className="absolute top-4 left-4 z-10 bg-ivory text-burgundy text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                    New
                  </span>
                )}

                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Link
                    to={`/product/${product.id}`}
                    className="bg-ivory text-charcoal px-6 py-3 text-xs tracking-widest uppercase translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-burgundy hover:text-ivory"
                  >
                    View Details
                  </Link>
                </div>
              </div>

              <div className="text-center">
                <p className="text-xs text-charcoal/50 uppercase tracking-widest mb-1">
                  {product.category}
                </p>
                <h3 className="font-serif text-lg text-charcoal mb-2 group-hover:text-burgundy transition-colors">
                  {product.name}
                </h3>

                <div className="flex items-center justify-center space-x-3 text-sm">
                  <span className="font-medium text-burgundy">
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
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link
            to="/shop"
            className="inline-block text-sm tracking-widest uppercase border-b border-burgundy pb-1 hover:text-gold hover:border-gold transition-colors"
          >
            View All Designs
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDesigns;
