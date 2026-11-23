import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Share2,
  MessageCircle,
  Loader,
  ShieldCheck,
  Truck,
} from "lucide-react";
import api from "../services/api";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [settings, setSettings] = useState({ whatsappNumber: "+919999999999" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, setRes] = await Promise.all([
          api.get(`/products/${id}`),
          api.get("/settings"),
        ]);
        setProduct(prodRes.data.data);
        setSettings(setRes.data.data);
        document.title = `${prodRes.data.data.name} | Ghunghat Fashion`;
      } catch (err) {
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => {
      document.title = "Ghunghat Fashion | Premium Indian Couture";
    };
  }, [id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleWhatsAppEnquiry = () => {
    api
      .post("/enquiries", { productId: product._id, productName: product.name })
      .catch(console.error);
    const message = encodeURIComponent(
      `Hello Ghunghat Fashion, I am interested in the "${product.name}" (Price: ${formatPrice(product.sellingPrice)}). Link: ${window.location.href}`,
    );
    const cleanNumber = settings.whatsappNumber.replace(/\D/g, "");
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, "_blank");
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center pt-20">
        <Loader className="animate-spin text-burgundy" size={40} />
      </div>
    );
  if (error || !product)
    return (
      <div className="h-screen flex flex-col items-center justify-center pt-20">
        <h1 className="text-3xl font-serif text-burgundy mb-4">
          Product Not Found
        </h1>
        <Link
          to="/shop"
          className="text-sm uppercase tracking-widest border-b border-charcoal pb-1"
        >
          Return to Shop
        </Link>
      </div>
    );

  return (
    <div className="bg-ivory min-h-screen pt-24 pb-20 lg:pb-12">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="mb-8">
          <Link
            to="/shop"
            className="inline-flex items-center text-xs tracking-[0.15em] text-charcoal/50 hover:text-burgundy uppercase transition-colors"
          >
            <ArrowLeft size={14} className="mr-2" /> Back to Collection
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left: Images */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4"
          >
            <div className="flex md:flex-col gap-4 overflow-x-auto hide-scrollbar md:w-24 flex-shrink-0">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 md:w-full aspect-[3/4] flex-shrink-0 border ${selectedImage === index ? "border-burgundy" : "border-transparent opacity-60 hover:opacity-100"} transition-all`}
                >
                  <img
                    src={img}
                    alt="Thumb"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
            <div className="w-full aspect-[3/4] bg-[#f5f5f5] overflow-hidden">
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Right: Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <p className="text-[10px] text-charcoal/50 uppercase tracking-[0.2em] font-semibold mb-3">
              {product.category}
            </p>
            <h1 className="text-4xl md:text-5xl font-serif text-charcoal mb-4 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-end space-x-4 mb-8">
              <span className="text-xl font-medium text-charcoal">
                {formatPrice(product.sellingPrice)}
              </span>
              {product.originalPrice > product.sellingPrice && (
                <>
                  <span className="text-sm text-charcoal/40 line-through mb-1">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="text-[10px] text-burgundy font-bold tracking-wider mb-1 ml-2 uppercase">
                    Save{" "}
                    {Math.round(
                      ((product.originalPrice - product.sellingPrice) /
                        product.originalPrice) *
                        100,
                    )}
                    %
                  </span>
                </>
              )}
            </div>

            <p className="text-charcoal/70 text-sm leading-loose mb-10 font-light">
              {product.description}
            </p>

            <div className="flex space-x-4 mb-10">
              <button
                onClick={handleWhatsAppEnquiry}
                className="flex-1 bg-charcoal text-ivory py-4 text-xs tracking-[0.2em] uppercase hover:bg-burgundy transition-colors duration-300 flex items-center justify-center"
              >
                <MessageCircle size={16} className="mr-2" /> Enquire on WhatsApp
              </button>
              <button className="px-6 py-4 border border-charcoal/20 text-charcoal hover:border-charcoal transition-colors">
                <Share2 size={16} />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="border-t border-charcoal/10 pt-6 space-y-4">
              <div className="flex items-center text-xs text-charcoal/60">
                <ShieldCheck size={16} className="mr-3 text-burgundy" />{" "}
                Authentic Handcrafted Pieces
              </div>
              <div className="flex items-center text-xs text-charcoal/60">
                <Truck size={16} className="mr-3 text-burgundy" /> Complimentary
                Shipping in India
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile Sticky Enquiry Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-charcoal/10 p-4 z-40 flex justify-between items-center shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-charcoal/50 mb-1 truncate max-w-[150px]">
            {product.name}
          </p>
          <p className="font-medium text-charcoal">
            {formatPrice(product.sellingPrice)}
          </p>
        </div>
        <button
          onClick={handleWhatsAppEnquiry}
          className="bg-burgundy text-ivory px-6 py-3 text-[10px] tracking-widest uppercase hover:bg-charcoal transition-colors flex items-center"
        >
          <MessageCircle size={14} className="mr-2" /> Enquire
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
