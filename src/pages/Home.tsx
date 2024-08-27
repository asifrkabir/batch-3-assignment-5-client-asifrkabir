import AvailabilityCheck from "../components/home/AvailabilityCheck/AvailabilityCheck";
import Banner from "../components/home/Banner/Banner";
import FeaturedBikes from "../components/home/FeaturedBikes/FeaturedBikes";
import Testimonials from "../components/home/Testimonials/Testimonials";

const Home = () => {
  return (
    <>
      <Banner />
      <AvailabilityCheck />
      <div style={{ margin: "8rem 0" }}></div>
      <FeaturedBikes />
      <div style={{ margin: "8rem 0" }}></div>
      <Testimonials />
    </>
  );
};

export default Home;
