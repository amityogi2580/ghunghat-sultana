import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center bg-ivory overflow-hidden py-12 md:py-0">
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        {/* Left Side: Editorial Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="col-span-1 md:col-span-5 flex flex-col justify-center order-2 md:order-1"
        >
          <span className="text-gold uppercase tracking-[0.2em] text-sm font-medium mb-4">
            The New Collection
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-burgundy leading-[1.1] mb-6">
            Timeless <br />
            <span className="italic font-light">Elegance</span>
          </h1>
          <p className="text-charcoal/70 text-base md:text-lg mb-10 max-w-md leading-relaxed">
            Discover a curation of premium Indian fashion and heritage designs.
            Crafted for the modern muse who values artistry and tradition.
          </p>

          <div className="flex items-center space-x-6">
            <Link
              to="/shop"
              className="bg-burgundy text-ivory px-8 py-4 text-xs tracking-widest uppercase hover:bg-charcoal transition-colors duration-300"
            >
              Shop The Collection
            </Link>
          </div>
        </motion.div>

        {/* Right Side: Asymmetrical Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="col-span-1 md:col-span-7 order-1 md:order-2 relative h-[50vh] md:h-[75vh] w-full"
        >
          {/* Main Image */}
          <img
            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1600&auto=format&fit=crop"
            alt="Ghunghat Sultana Editorial"
            className="w-full h-full object-cover object-center shadow-xl"
          />

          {/* Floating Accent Image (Creates the editorial look) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="absolute -bottom-8 -left-8 w-40 h-56 md:w-56 md:h-72 border-[8px] border-ivory hidden lg:block"
          >
            <img
              src="https://images.unsplash.com/photo-1583391733958-d25e07fac04f?q=80&w=800&auto=format&fit=crop"
              alt="Detail shot"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
