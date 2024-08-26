import "./Banner.css";
import bannerVideo from "../../../assets/videos/banner/banner-video.mp4";

const Banner = () => {
  return (
    <div className="banner-container">
      <video className="banner-video" autoPlay loop muted>
        <source src={bannerVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="banner-overlay"></div>

      <div className="banner-content">
        <h1>Welcome to Velocirent</h1>
        <p>Your journey starts here</p>
      </div>
    </div>
  );
};

export default Banner;
