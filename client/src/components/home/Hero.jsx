import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Loader } from "lucide-react";
import api from "../../services/api";

const Hero = () => {
  const [settings, setSettings] = useState({
    heroTitle: "Timeless Elegance",
    heroSubtitle: "Discover a curation of premium Indian fashion...",
    heroImage:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1600&auto=format&fit=crop",
    heroFloatImage:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop",
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

  const titleWords = settings.heroTitle.split(" ");

  return (
    <section className="relative w-full h-screen flex items-center bg-ivory overflow-hidden">
      {/* Background Image with slow zoom */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src={settings.heroImage}
          alt="Hero"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/20" />{" "}
        {/* Slight dark overlay for text readability */}
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full mt-20">
        <div className="max-w-2xl">
          {/* Staggered Word Reveal */}
          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
              className="text-6xl md:text-8xl font-serif text-ivory leading-[1.1] drop-shadow-lg flex flex-wrap gap-x-4"
            >
              {titleWords.map((word, i) => (
                <span
                  key={i}
                  className={
                    i === titleWords.length - 1 ? "italic font-light" : ""
                  }
                >
                  {word}
                </span>
              ))}
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-ivory/90 text-sm md:text-base mb-10 max-w-md leading-relaxed font-medium tracking-wide"
          >
            {settings.heroSubtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <Link
              to="/shop"
              className="bg-ivory text-charcoal px-10 py-5 text-xs tracking-[0.2em] uppercase hover:bg-burgundy hover:text-ivory transition-all duration-500 inline-block font-semibold"
            >
              Explore The Collection
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-ivory/70"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] mb-2">
          Scroll
        </span>
        <div className="w-[1px] h-12 bg-ivory/30 overflow-hidden">
          <motion.div
            animate={{ y: [0, 48] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="w-full h-1/2 bg-ivory"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
