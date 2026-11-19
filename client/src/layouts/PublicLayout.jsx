import { Outlet } from "react-router-dom";
import AnnouncementBar from "../components/AnnouncementBar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppWidget from "../components/WhatsAppWidget";

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-ivory relative">
      <AnnouncementBar />
      <Navbar />
      {/* Main content area, pt-20 ensures it doesn't go under the fixed navbar */}
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppWidget />
    </div>
  );
};

export default PublicLayout;
