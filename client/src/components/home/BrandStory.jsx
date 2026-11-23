import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const BrandStory = () => {
  return (
    <section className="py-32 bg-ivory relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image Composition */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative h-[600px] w-full"
          >
            <img
              src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1000&auto=format&fit=crop"
              alt="Craftsmanship"
              className="w-[80%] h-full object-cover absolute right-0 top-0"
            />
            <img
              src="https://images.unsplash.com/photo-1590736969955-71cc94901144?q=80&w=600&auto=format&fit=crop"
              alt="Detail"
              className="w-[45%] h-[60%] object-cover absolute left-0 bottom-0 border-[12px] border-ivory"
            />
            {/* Decorative Text */}
            <h2 className="absolute top-10 left-10 text-8xl font-serif text-charcoal/5 pointer-events-none -z-10">
              GS
            </h2>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="text-burgundy uppercase tracking-[0.3em] text-[10px] font-bold mb-6 block">
              Our Heritage
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-charcoal leading-tight mb-8">
              Where Heritage Meets <br />
              <span className="italic text-burgundy">Modern Artistry</span>
            </h2>

            <div className="space-y-6 text-charcoal/60 font-light leading-loose text-sm md:text-base">
              <p>
                Every piece at Ghunghat Fashion is a testament to the rich
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

            <div className="mt-12">
              <Link
                to="/about"
                className="border-b border-charcoal text-charcoal pb-2 text-[11px] tracking-[0.2em] uppercase hover:text-burgundy hover:border-burgundy transition-colors"
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
