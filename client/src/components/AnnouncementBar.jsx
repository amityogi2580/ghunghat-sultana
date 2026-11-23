import { useState, useEffect } from "react";
import api from "../services/api";

const AnnouncementBar = () => {
  const [text, setText] = useState(
    "Complimentary Shipping on Orders Above ₹5000",
  );

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get("/settings");
        if (res.data.data.announcementText) {
          setText(res.data.data.announcementText);
        }
      } catch (err) {
        console.error("Failed to load announcement");
      }
    };
    fetchSettings();
  }, []);

  return (
    <div className="bg-burgundy text-ivory text-[10px] md:text-xs tracking-[0.25em] uppercase py-3 text-center font-medium border-b border-white/10">
      {text}
    </div>
  );
};

export default AnnouncementBar;
