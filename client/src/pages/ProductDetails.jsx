import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, Share2, MessageCircle, Loader } from "lucide-react";
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
      } catch (err) {
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const whatsappMessage = product
    ? encodeURIComponent(
        `Hello Ghunghat Sultana, I am interested in the "${product.name}" (Price: ${formatPrice(product.sellingPrice)}). Could you please provide more details? Link: ${window.location.href}`,
      )
    : "";
  const whatsappUrl = `https://wa.me/${settings.whatsappNumber.replace(/\D/g, "")}?text=${whatsappMessage}`;

  if (loading)
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader className="animate-spin text-burgundy" size={40} />
      </div>
    );
  if (error || !product)
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center">
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
    <div className="bg-ivory min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <Link
            to="/shop"
            className="inline-flex items-center text-sm text-charcoal/60 hover:text-burgundy uppercase tracking-widest"
          >
            <ArrowLeft size={16} className="mr-2" /> Back to Shop
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col-reverse md:flex-row gap-4"
          >
            <div className="flex md:flex-col gap-4 overflow-x-auto">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-24 flex-shrink-0 border-2 ${selectedImage === index ? "border-burgundy" : "border-transparent opacity-60"}`}
                >
                  <img
                    src={img}
                    alt="Thumb"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
            <div className="w-full aspect-[3/4] bg-white">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center"
          >
            <p className="text-gold uppercase tracking-[0.2em] text-xs font-semibold mb-3">
              {product.category}
            </p>
            <h1 className="text-4xl md:text-5xl font-serif text-burgundy mb-4">
              {product.name}
            </h1>

            <div className="flex items-end space-x-4 mb-8">
              <span className="text-2xl font-medium text-charcoal">
                {formatPrice(product.sellingPrice)}
              </span>
              {product.originalPrice > product.sellingPrice && (
                <>
                  <span className="text-lg text-charcoal/40 line-through mb-1">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="text-sm text-green-700 font-medium mb-1 ml-2">
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

            <div className="w-full h-[1px] bg-charcoal/10 mb-8" />
            <p className="text-charcoal/70 text-sm leading-relaxed mb-10">
              {product.description}
            </p>

            <div className="flex flex-col space-y-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center bg-burgundy text-ivory py-4 text-sm tracking-widest uppercase hover:bg-charcoal transition-colors"
              >
                <MessageCircle size={18} className="mr-3" /> Enquire on WhatsApp
              </a>
              <div className="flex space-x-4">
                <button className="flex-1 flex items-center justify-center py-4 border border-charcoal/20 text-charcoal text-sm tracking-widest uppercase hover:border-burgundy hover:text-burgundy transition-colors">
                  <Heart size={16} className="mr-2" /> Add to Wishlist
                </button>
                <button className="flex items-center justify-center px-6 py-4 border border-charcoal/20 text-charcoal hover:border-burgundy hover:text-burgundy transition-colors">
                  <Share2 size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
