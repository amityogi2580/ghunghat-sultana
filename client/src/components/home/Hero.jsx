import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Loader } from "lucide-react";
import api from "../../services/api";

const Hero = () => {
  const [settings, setSettings] = useState({
    heroTitle: "The Art of\nTimeless Elegance",
    heroSubtitle:
      "Discover a curation of premium Indian fashion and heritage designs. Crafted for the modern muse who values artistry and tradition.",
    heroImage:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=2000&auto=format&fit=crop",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get("/settings");
        setSettings(res.data.data);
      } catch (err) {
        console.error("Failed to load hero settings");
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-ivory">
        <Loader className="animate-spin text-burgundy" size={40} />
      </div>
    );

  return (
    <section className="relative w-full h-screen flex items-center bg-charcoal overflow-hidden">
      {/* Background Image */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src={settings.heroImage}
          alt="Hero"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
      </motion.div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full mt-16">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-champagne uppercase tracking-[0.3em] text-xs font-semibold mb-6 block"
          >
            The New Collection
          </motion.span>

          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.33, 1, 0.68, 1] }}
              className="text-6xl md:text-8xl font-serif text-ivory leading-[1.1] whitespace-pre-line"
            >
              {settings.heroTitle}
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-ivory/80 text-sm md:text-base mb-12 max-w-md leading-relaxed font-light tracking-wide"
          >
            {settings.heroSubtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/shop"
              className="bg-ivory text-charcoal px-10 py-5 text-xs tracking-[0.2em] uppercase hover:bg-burgundy hover:text-ivory transition-all duration-500 text-center font-medium"
            >
              Shop The Collection
            </Link>
            <Link
              to="/about"
              className="border border-ivory/30 text-ivory px-10 py-5 text-xs tracking-[0.2em] uppercase hover:bg-ivory hover:text-charcoal transition-all duration-500 text-center font-medium"
            >
              Our Story
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
