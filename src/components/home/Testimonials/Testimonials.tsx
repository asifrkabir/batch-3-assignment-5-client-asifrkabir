import { Avatar, Card } from "antd";
import Marquee from "react-fast-marquee";

const testimonials = [
  {
    title: "Exceptional Service and Quality",
    description:
      "VelociRent provided a seamless bike rental experience with top-notch service.",
  },
  {
    title: "Reliable and Convenient",
    description:
      "The rental process was easy, and the bike was perfect for my weekend getaway.",
  },
  {
    title: "Top-Notch Bikes, Top-Notch Service",
    description:
      "Great selection and impeccable service made my adventure unforgettable.",
  },
  {
    title: "A Great Way to Explore",
    description:
      "VelociRent made exploring the countryside an effortless and enjoyable experience.",
  },
  {
    title: "Unforgettable Experience",
    description:
      "From booking to riding, VelociRent exceeded all my expectations.",
  },
];

const Testimonials = () => {
  return (
    <>
      <h1 style={{ textAlign: "center", marginBottom: "4rem" }}>
        Testimonials
      </h1>
      <Marquee pauseOnHover>
        {testimonials.map((testimonial, index) => {
          return (
            <Card style={{ maxWidth: 400, margin: "0 2rem" }} key={index}>
              <Card.Meta
                avatar={
                  <Avatar
                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                  />
                }
                title={testimonial.title}
                description={<p>{testimonial.description}</p>}
              />
            </Card>
          );
        })}
      </Marquee>
    </>
  );
};

export default Testimonials;
