import { Outlet } from "react-router-dom";
import AnnouncementBar from "../components/AnnouncementBar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-grow">
        <Outlet /> {/* This is where our page content will render */}
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
