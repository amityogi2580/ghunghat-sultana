import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="bg-ivory min-h-screen">
      {/* Hero */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=2000&auto=format&fit=crop"
          alt="About Us"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="relative z-10 text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-serif text-burgundy mb-4"
          >
            Our Story
          </motion.h1>
          <p className="text-charcoal uppercase tracking-[0.2em] text-sm font-medium">
            The Journey of Ghunghat Sultana
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-24 space-y-16">
        <div className="text-center">
          <h2 className="text-3xl font-serif text-burgundy mb-6">
            Rooted in Heritage
          </h2>
          <p className="text-charcoal/70 leading-relaxed text-lg">
            Founded with a passion for preserving the rich textile traditions of
            India, Ghunghat Sultana is more than just a fashion label—it is a
            celebration of craftsmanship. Every piece tells a story of heritage,
            woven together with modern aesthetics for the contemporary muse.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="aspect-[4/5] bg-gray-200"
          >
            <img
              src="https://images.unsplash.com/photo-1590736969955-71cc94901144?q=80&w=800&auto=format&fit=crop"
              alt="Craft"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-serif text-charcoal mb-4">
              Uncompromising Quality
            </h3>
            <p className="text-charcoal/70 leading-relaxed">
              We work directly with local artisans and weavers across India.
              From the intricate zari work of Banaras to the delicate Chikankari
              of Lucknow, our collections are crafted using time-honored
              techniques that have been passed down through generations.
            </p>
          </motion.div>
        </div>

        <div className="text-center pt-12">
          <h3 className="text-2xl font-serif text-burgundy mb-6">
            Our Promise
          </h3>
          <p className="text-charcoal/70 leading-relaxed">
            When you choose Ghunghat Sultana, you are not just buying an outfit;
            you are supporting a legacy of artistry and bringing home a piece of
            India's soul.
          </p>
          <div className="mt-10">
            <Link
              to="/shop"
              className="bg-burgundy text-ivory px-10 py-4 text-sm tracking-widest uppercase hover:bg-charcoal transition-colors"
            >
              Explore The Collection
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
