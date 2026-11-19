import { motion } from "framer-motion";

const Marquee = () => {
  return (
    <div className="bg-burgundy py-4 overflow-hidden border-y border-gold/30 relative flex whitespace-nowrap">
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="flex space-x-8 items-center text-ivory font-serif text-2xl md:text-3xl tracking-widest"
      >
        <span>Premium Indian Couture</span>
        <span className="text-gold text-xl">✦</span>
        <span>Handcrafted Elegance</span>
        <span className="text-gold text-xl">✦</span>
        <span>Worldwide Shipping</span>
        <span className="text-gold text-xl">✦</span>
        <span>Premium Indian Couture</span>
        <span className="text-gold text-xl">✦</span>
        <span>Handcrafted Elegance</span>
        <span className="text-gold text-xl">✦</span>
      </motion.div>
    </div>
  );
};

export default Marquee;
