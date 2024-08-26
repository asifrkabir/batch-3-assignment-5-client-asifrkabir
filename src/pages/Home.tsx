import AvailabilityCheck from "../components/home/AvailabilityCheck/AvailabilityCheck";
import Banner from "../components/home/Banner/Banner";
import FeaturedBikes from "../components/home/FeaturedBikes/FeaturedBikes";

const Home = () => {
  return (
    <>
      <Banner />
      <AvailabilityCheck />
      <div style={{ margin: "10rem 0" }}></div>
      <FeaturedBikes />
    </>
  );
};

export default Home;
