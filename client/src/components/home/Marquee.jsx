import { motion } from "framer-motion";

const Marquee = () => {
  const text =
    "Premium Indian Couture • Handcrafted Elegance • Worldwide Shipping • ";

  return (
    <div className="bg-burgundy py-6 overflow-hidden flex whitespace-nowrap border-y border-champagne/20">
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        className="flex space-x-8 items-center text-ivory font-serif text-2xl md:text-4xl tracking-widest uppercase"
      >
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
      </motion.div>
    </div>
  );
};

export default Marquee;
