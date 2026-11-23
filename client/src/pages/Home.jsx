import Hero from "../components/home/Hero";
import Marquee from "../components/home/Marquee";
import CollectionShowcase from "../components/home/CollectionShowcase";
import FeaturedDesigns from "../components/home/FeaturedDesigns";
import BrandStory from "../components/home/BrandStory";
import InstagramGallery from "../components/home/InstagramGallery";

const Home = () => {
  return (
    <div className="w-full">
      <Hero />
      <Marquee />
      <CollectionShowcase />
      <FeaturedDesigns />
      <BrandStory />
      <InstagramGallery />
    </div>
  );
};

export default Home;
