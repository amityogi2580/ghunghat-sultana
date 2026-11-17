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
    <div className="bg-burgundy text-ivory text-xs tracking-[0.2em] uppercase py-2 text-center font-medium">
      {text}
    </div>
  );
};

export default AnnouncementBar;
