import { motion } from "framer-motion";
import { Camera } from "lucide-react"; // <-- Changed Instagram to Camera

const InstagramGallery = () => {
  const images = [
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1583391733958-d25e07fac04f?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1605763240000-7e93b172d754?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1621232087081-3c8c8e5c3b8b?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=600&auto=format&fit=crop",
  ];

  const instagramUrl = "https://www.instagram.com/ghunghat_sultana_";

  return (
    <section className="py-20 md:py-32 bg-ivory">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-10 md:mb-16"
        >
          <span className="text-burgundy uppercase tracking-[0.3em] text-[10px] font-bold mb-3 md:mb-4">
            Follow Our Journey
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-charcoal mb-3 md:mb-4">
            @ghunghat_sultana_
          </h2>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="text-charcoal/50 text-xs md:text-sm hover:text-burgundy transition-colors uppercase tracking-[0.15em] flex items-center"
          >
            <Camera size={16} className="mr-2" /> View on Instagram{" "}
            {/* <-- Changed icon here too */}
          </a>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
          {images.map((img, index) => (
            <motion.a
              key={index}
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative aspect-square overflow-hidden bg-[#f5f5f5] cursor-pointer"
            >
              <img
                src={img}
                alt="Instagram Post"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Camera
                  size={32}
                  className="text-ivory transform scale-50 group-hover:scale-100 transition-transform duration-300"
                />{" "}
                {/* <-- Changed icon here */}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramGallery;
