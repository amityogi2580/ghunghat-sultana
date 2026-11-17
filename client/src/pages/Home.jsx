import Hero from "../components/home/Hero";
import CollectionShowcase from "../components/home/CollectionShowcase";
import FeaturedDesigns from "../components/home/FeaturedDesigns";
import BrandStory from "../components/home/BrandStory";

const Home = () => {
  return (
    <div className="w-full">
      <Hero />
      <CollectionShowcase />
      <FeaturedDesigns />
      <BrandStory />
      {/* Next sections: Instagram Gallery, Contact CTA */}
    </div>
  );
};

export default Home;
