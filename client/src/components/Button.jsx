import { motion } from "framer-motion";

const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center px-8 py-3 text-sm tracking-widest uppercase transition-all duration-300 font-medium";

  const variants = {
    primary: "bg-burgundy text-ivory hover:bg-charcoal",
    outline:
      "border border-burgundy text-burgundy hover:bg-burgundy hover:text-ivory",
    gold: "bg-gold text-charcoal hover:bg-charcoal hover:text-gold",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
