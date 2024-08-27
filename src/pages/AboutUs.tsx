import { HomeOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { Card, Col, Row, Timeline } from "antd";

const AboutUs = () => {
  const timelineItems = [
    { children: "Company founded", label: "2020" },
    { children: "Launched our bike rental platform", label: "2021" },
    { children: "Reached 10,000 active users", label: "2022" },
    { children: "Expanded to 3 new cities", label: "2023" },
    { children: "Awarded Best Startup of the Year", label: "2024" },
  ];

  return (
    <div style={{ padding: "2rem" }}>
      <Row justify="center" style={{ marginBottom: "4rem" }}>
        <Col xs={24} md={18} lg={16}>
          <Card bordered={false}>
            <h1 style={{ textAlign: "center" }}>Our Mission</h1>
            <p>
              We aim to provide the best bike rental experience with a focus on
              customer satisfaction, sustainability, and community engagement.
            </p>
          </Card>
        </Col>
      </Row>

      <Row justify="center" style={{ marginBottom: "4rem" }} gutter={[24, 24]}>
        <Col xs={24}>
          <h2 style={{ textAlign: "center" }}>Meet Our Team</h2>
        </Col>
        <Col
          xs={24}
          lg={12}
          style={{ display: "flex", justifyContent: "center" }}>
          <Card
            hoverable
            cover={
              <img
                alt="Team Member 1"
                src="https://api.dicebear.com/7.x/miniavs/svg?seed=3"
              />
            }>
            <Card.Meta
              title="John Doe"
              description="CEO - Passionate about innovation and customer service."
            />
          </Card>
        </Col>
        <Col
          xs={24}
          lg={12}
          style={{ display: "flex", justifyContent: "center" }}>
          <Card
            hoverable
            cover={
              <img
                alt="Team Member 3"
                src="https://api.dicebear.com/7.x/miniavs/svg?seed=9"
              />
            }>
            <Card.Meta
              title="Alice Johnson"
              description="COO - Ensuring smooth operations and customer satisfaction."
            />
          </Card>
        </Col>
      </Row>

      <Row justify="center" style={{ marginBottom: "4rem" }}>
        <Col xs={24} md={18}>
          <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
            Our Journey & Milestones
          </h2>
          <Timeline items={timelineItems} mode="left" />
        </Col>
      </Row>

      <Row justify="center">
        <Col xs={24} md={18} lg={16}>
          <Card>
            <h2 style={{ textAlign: "center" }}>Contact Information</h2>
            <p>
              <HomeOutlined /> Office: 123 Bike Lane, Cityville, Country
            </p>
            <p>
              <PhoneOutlined /> Phone: (123) 456-7890
            </p>
            <p>
              <MailOutlined /> Email: info@bikerental.com
            </p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AboutUs;
