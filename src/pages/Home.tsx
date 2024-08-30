import AvailabilityCheck from "../components/home/AvailabilityCheck/AvailabilityCheck";
import Banner from "../components/home/Banner/Banner";
import ContactUs from "../components/home/ContactUs/ContactUs";
import FeaturedBikes from "../components/home/FeaturedBikes/FeaturedBikes";
import Testimonials from "../components/home/Testimonials/Testimonials";
import WhyChooseUs from "../components/home/WhyChooseUs/WhyChooseUs";
import WinCoupon from "../components/home/WinCoupon/WinCoupon";

const Home = () => {
  return (
    <>
      <Banner />
      <AvailabilityCheck />
      <div style={{ margin: "8rem 0" }}></div>
      <FeaturedBikes />
      <div style={{ margin: "8rem 0" }}></div>
      <Testimonials />
      <div style={{ margin: "8rem 0" }}></div>
      <WhyChooseUs />
      <div style={{ margin: "8rem 0" }}></div>
      <WinCoupon />
      <div style={{ margin: "8rem 0" }}></div>
      <ContactUs />
    </>
  );
};

export default Home;
