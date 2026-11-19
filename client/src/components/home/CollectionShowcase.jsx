import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Loader } from "lucide-react";
import api from "../../services/api";

const CollectionShowcase = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback collections in case the database is empty
  const fallbackCollections = [
    {
      _id: "fallback-1",
      name: "Bridal",
      description: "Heirloom pieces for your special day",
      image:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop",
    },
    {
      _id: "fallback-2",
      name: "Festive",
      description: "Celebrate in modern silhouettes",
      image:
        "https://images.unsplash.com/photo-1605763240000-7e93b172d754?q=80&w=1000&auto=format&fit=crop",
    },
    {
      _id: "fallback-3",
      name: "Everyday",
      description: "Refined comfort for daily wear",
      image:
        "https://images.unsplash.com/photo-1583391733958-d25e07fac04f?q=80&w=1000&auto=format&fit=crop",
    },
  ];

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await api.get("/collections");
        if (response.data.data && response.data.data.length > 0) {
          setCollections(response.data.data.slice(0, 3));
        } else {
          setCollections(fallbackCollections);
        }
      } catch (error) {
        console.error("Error fetching collections:", error);
        setCollections(fallbackCollections);
      } finally {
        setLoading(false);
      }
    };
    fetchCollections();
  }, []);

  const defaultImage =
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop";

  return (
    <section className="py-24 bg-ivory">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-16"
        >
          <span className="text-gold uppercase tracking-[0.2em] text-xs font-semibold mb-3">
            Curated For You
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-burgundy">
            Shop by Collection
          </h2>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-10">
            <Loader className="animate-spin text-burgundy" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10">
            {collections.map((collection, index) => (
              <motion.div
                key={collection._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`group relative overflow-hidden ${
                  index === 1 ? "md:mt-12" : ""
                }`}
              >
                {/* FIXED LINK HERE: Goes to shop page with category filter */}
                <Link
                  to={`/shop?category=${collection.name}`}
                  className="block relative aspect-[3/4]"
                >
                  <img
                    src={collection.image || defaultImage}
                    alt={collection.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                  <div className="absolute bottom-0 left-0 w-full p-8 text-ivory flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-3xl font-serif mb-2">
                      {collection.name}
                    </h3>
                    <p className="text-sm font-sans text-ivory/80 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {collection.description || "Explore our latest edit"}
                    </p>
                    <div className="w-8 h-[1px] bg-gold mb-6 transition-all duration-500 group-hover:w-16" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CollectionShowcase;
