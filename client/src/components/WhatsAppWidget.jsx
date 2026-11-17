import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import api from "../services/api";

const WhatsAppWidget = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get("/settings");
        if (res.data.data.whatsappNumber) {
          setPhoneNumber(res.data.data.whatsappNumber.replace(/\D/g, ""));
        }
      } catch (err) {
        console.error("Failed to load WhatsApp number");
      }
    };
    fetchSettings();
  }, []);

  if (!phoneNumber) return null;

  const message = encodeURIComponent(
    "Hello Ghunghat Sultana! I have a question about your designs.",
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={32} />
      <span className="absolute right-full mr-4 bg-charcoal text-ivory text-xs px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden md:block">
        Chat with us
      </span>
    </a>
  );
};

export default WhatsAppWidget;
