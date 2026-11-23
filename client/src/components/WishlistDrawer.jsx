import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Trash2 } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import api from "../services/api";

const WishlistDrawer = () => {
  const { wishlist, isDrawerOpen, setIsDrawerOpen, removeFromWishlist } =
    useWishlist();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleBulkEnquiry = async () => {
    if (wishlist.length === 0) return;

    try {
      // Track the enquiry for each product in the list
      await Promise.all(
        wishlist.map((product) =>
          api
            .post("/enquiries", {
              productId: product._id,
              productName: product.name,
            })
            .catch(() => {}),
        ),
      );

      // Fetch WhatsApp number
      const res = await api.get("/settings");
      const cleanNumber = res.data.data.whatsappNumber.replace(/\D/g, "");

      // Create the message
      let message = `Hello Ghunghat Fashion,\n\nI am interested in the following designs:\n\n`;
      wishlist.forEach((item, index) => {
        message += `${index + 1}. ${item.name} (${formatPrice(item.sellingPrice)})\n`;
      });
      message += `\nCould you please provide more details?`;

      const encodedMessage = encodeURIComponent(message);
      window.open(
        `https://wa.me/${cleanNumber}?text=${encodedMessage}`,
        "_blank",
      );

      setIsDrawerOpen(false);
    } catch (error) {
      console.error("Failed to process enquiry", error);
    }
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsDrawerOpen(false)}
            className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 w-full md:w-[400px] h-full bg-ivory z-[101] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-charcoal/10">
              <h2 className="text-xl font-serif text-charcoal">
                Your Wishlist ({wishlist.length})
              </h2>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="text-charcoal/50 hover:text-burgundy transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {wishlist.length === 0 ? (
                <div className="text-center py-20 text-charcoal/50">
                  <p className="text-sm tracking-wider uppercase mb-2">
                    Your wishlist is empty
                  </p>
                  <p className="text-xs">
                    Discover our collection and add your favourites.
                  </p>
                </div>
              ) : (
                wishlist.map((item) => (
                  <div key={item._id} className="flex gap-4">
                    <img
                      src={item.coverImage}
                      alt={item.name}
                      className="w-20 h-24 object-cover bg-white"
                    />
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <p className="text-[10px] text-charcoal/50 uppercase tracking-wider mb-1">
                          {item.category}
                        </p>
                        <h3 className="font-serif text-sm text-charcoal leading-tight">
                          {item.name}
                        </h3>
                      </div>
                      <div className="flex justify-between items-end">
                        <span className="text-sm font-medium text-charcoal">
                          {formatPrice(item.sellingPrice)}
                        </span>
                        <button
                          onClick={() => removeFromWishlist(item._id)}
                          className="text-charcoal/30 hover:text-burgundy transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {wishlist.length > 0 && (
              <div className="p-6 border-t border-charcoal/10 bg-white">
                <button
                  onClick={handleBulkEnquiry}
                  className="w-full bg-burgundy text-ivory py-4 text-[11px] tracking-[0.2em] uppercase hover:bg-charcoal transition-colors flex items-center justify-center"
                >
                  <MessageCircle size={16} className="mr-2" />
                  Enquire About These Designs
                </button>
                <p className="text-center text-[10px] text-charcoal/40 mt-3 uppercase tracking-wider">
                  Fast, personalized assistance via WhatsApp
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WishlistDrawer;
