import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const BrandStory = () => {
  return (
    <section className="py-24 bg-beige relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image Side (Overlapping layout) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] lg:h-[600px] w-full"
          >
            {/* Main Image */}
            <img
              src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1000&auto=format&fit=crop"
              alt="Craftsmanship detail"
              className="w-full h-full object-cover shadow-2xl relative z-10"
            />

            {/* Decorative Gold Border Frame */}
            <div className="absolute top-8 -right-8 w-full h-full border border-gold z-0 hidden md:block" />

            {/* Small Floating Image */}
            <img
              src="https://images.unsplash.com/photo-1590736969955-71cc94901144?q=80&w=600&auto=format&fit=crop"
              alt="Fabric detail"
              className="absolute -bottom-12 -right-8 w-48 h-64 object-cover border-8 border-beige shadow-xl z-20 hidden md:block"
            />
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <span className="text-gold uppercase tracking-[0.2em] text-xs font-semibold mb-4">
              The Ghunghat Sultana Legacy
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-burgundy leading-tight mb-8">
              Where Heritage <br />
              Meets Modern <span className="italic font-light">Artistry</span>
            </h2>

            <div className="space-y-6 text-charcoal/70 font-sans leading-relaxed">
              <p>
                Every piece at Ghunghat Sultana is a testament to the rich
                tapestry of Indian craftsmanship. We believe that true luxury
                lies in the details—the delicate hand-embroidery, the weight of
                pure silk, and the timeless silhouettes that transcend trends.
              </p>
              <p>
                Our designs are curated for the modern muse who honors her roots
                while walking confidently into the future. From intimate
                gatherings to grand celebrations, we weave stories of elegance
                into every thread.
              </p>
            </div>

            <div className="mt-10">
              <Link
                to="/about"
                className="inline-block text-sm tracking-widest uppercase border-b border-burgundy text-burgundy pb-1 hover:text-gold hover:border-gold transition-colors duration-300"
              >
                Discover Our Journey
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
