import { Card, Col, Row } from "antd";
import { FaCheckCircle } from "react-icons/fa";
import { FaDollarSign, FaUserShield } from "react-icons/fa6";
import { MdSpeed, MdSupport } from "react-icons/md";

const features = [
  {
    icon: <FaCheckCircle />,
    title: "Quality Bikes",
    description: "Top-notch bikes for every adventure.",
  },
  {
    icon: <FaUserShield />,
    title: "Safety First",
    description: "Your safety is our priority.",
  },
  {
    icon: <FaDollarSign />,
    title: "Affordable Rates",
    description: "Competitive pricing with no hidden costs.",
  },
  {
    icon: <MdSupport />,
    title: "24/7 Support",
    description: "Always here to help, anytime, anywhere.",
  },
  {
    icon: <MdSpeed />,
    title: "Fast Booking",
    description: "Quick and easy booking process.",
  },
];

const WhyChooseUs = () => {
  return (
    <>
      <h1 style={{ textAlign: "center", marginBottom: "4rem" }}>
        Why Choose Us
      </h1>
      <Row gutter={[24, 24]} justify="center">
        {features.map((feature, index) => (
          <Col xs={24} sm={12} md={8} key={index}>
            <Card
              hoverable
              style={{
                textAlign: "center",
                borderRadius: "8px",
                padding: "1.5rem",
              }}>
              <div style={{ fontSize: "2rem", color: "#1890ff" }}>
                {feature.icon}
              </div>
              <h3 style={{ marginTop: "1rem" }}>{feature.title}</h3>
              <p>{feature.description}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default WhyChooseUs;
