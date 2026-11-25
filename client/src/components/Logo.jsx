const Logo = ({ light = false }) => {
  const primaryColor = light ? "text-champagne" : "text-burgundy";
  const secondaryColor = light ? "text-ivory/70" : "text-charcoal/70";
  const svgColor = light ? "#D8C3A5" : "#641C32";

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Arch Icon */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mb-1 md:mb-2"
      >
        <path
          d="M20 90V45C20 24.5655 36.5655 8 57 8C77.4345 8 94 24.5655 94 45V90"
          stroke={svgColor}
          strokeWidth="6"
          fill="none"
        />
        <path
          d="M35 90V45C35 32.8497 44.8497 23 57 23C69.1503 23 79 32.8497 79 45V90"
          stroke={light ? "#FAF7F1" : "#D8C3A5"}
          strokeWidth="3"
          fill="none"
          opacity="0.6"
        />
        <text
          x="57"
          y="78"
          fontFamily="Georgia, serif"
          fontSize="42"
          fill={svgColor}
          textAnchor="middle"
          fontWeight="bold"
        >
          G
        </text>
      </svg>

      {/* Typography */}
      <div className="flex flex-col items-center leading-none">
        <span
          className={`font-serif font-semibold tracking-wider text-lg md:text-xl ${primaryColor}`}
        >
          GHUNGHAT
        </span>
        <span
          className={`text-[8px] md:text-[10px] tracking-[0.4em] uppercase font-sans font-medium mt-1 ${secondaryColor}`}
        >
          Fashion Sultana
        </span>
      </div>
    </div>
  );
};

export default Logo;
