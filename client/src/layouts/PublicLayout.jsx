import { Outlet } from "react-router-dom";
import AnnouncementBar from "../components/AnnouncementBar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppWidget from "../components/WhatsAppWidget"; // <-- NEW

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-ivory relative">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppWidget /> {/* <-- NEW */}
    </div>
  );
};

export default PublicLayout;
