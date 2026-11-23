import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Loader } from "lucide-react";
import api from "../../services/api";

const Hero = () => {
  const [settings, setSettings] = useState({
    heroTitle: "Timeless Elegance",
    heroSubtitle:
      "Discover a curation of premium Indian fashion and heritage designs. Crafted for the modern muse who values artistry and tradition.",
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
      <div className="h-[80vh] flex items-center justify-center bg-ivory">
        <Loader className="animate-spin text-burgundy" size={40} />
      </div>
    );

  return (
    <section className="relative w-full min-h-[90vh] md:min-h-screen flex items-center bg-ivory overflow-hidden pt-20 md:pt-20">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="col-span-1 lg:col-span-5 flex flex-col justify-center order-2 lg:order-1 z-10 mt-6 md:mt-0"
        >
          <span className="text-burgundy uppercase tracking-[0.25em] md:tracking-[0.3em] text-[9px] md:text-[10px] font-bold mb-4 md:mb-6">
            The New Collection
          </span>
          <h1 className="text-5xl md:text-8xl font-serif text-charcoal leading-[1.1] mb-4 md:mb-8">
            {settings.heroTitle.split(" ").map((word, i) => (
              <span
                key={i}
                className={i % 2 !== 0 ? "italic text-burgundy" : ""}
              >
                {word}{" "}
              </span>
            ))}
          </h1>
          <p className="text-charcoal/60 text-xs md:text-base mb-8 md:mb-10 max-w-md leading-loose font-light">
            {settings.heroSubtitle}
          </p>
          <div>
            <Link
              to="/shop"
              className="bg-charcoal text-ivory px-8 md:px-10 py-4 md:py-5 text-[10px] md:text-[11px] tracking-[0.2em] uppercase hover:bg-burgundy transition-all duration-500 inline-block text-center w-full md:w-auto"
            >
              Shop The Collection
            </Link>
          </div>
        </motion.div>

        <div className="col-span-1 lg:col-span-7 order-1 lg:order-2 relative h-[45vh] md:h-[85vh] w-full flex justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full md:w-[85%] h-full relative z-10"
          >
            <img
              src={settings.heroImage}
              alt="Hero Main"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50, y: 50 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="absolute -bottom-8 left-0 w-[45%] h-[50%] border-[6px] md:border-[10px] border-ivory z-20 hidden md:block"
          >
            <img
              src={settings.heroFloatImage}
              alt="Hero Detail"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
