import { Button, Col, Row, Spin, Typography, Empty } from "antd";
import { Link, useParams } from "react-router-dom";
import { useGetBikeByIdQuery } from "../../redux/features/bike/bikeApi";

const { Title, Paragraph } = Typography;

const BikeDetails = () => {
  const { id } = useParams();
  const { data: bikeData, isLoading, error } = useGetBikeByIdQuery(id);

  if (isLoading) {
    return <Spin size="large" />;
  }

  const bike = bikeData?.data;

  return (
    <div style={{ padding: "2rem" }}>
      <Button style={{ marginBottom: "4rem" }}>
        <Link to="/bikes">Back to All Bikes</Link>
      </Button>

      {error || bike === null ? (
        <div>
          <Empty description="Bike not found" />
        </div>
      ) : (
        <Row gutter={[24, 24]} align="top">
          <Col xs={24} md={12} style={{ textAlign: "center" }}>
            <img
              alt={bike.name}
              src={
                bike.image ||
                "https://via.placeholder.com/500x500?text=Bike+Image"
              } // Replace with actual image URL
              style={{
                width: "100%",
                maxWidth: "500px",
                height: "auto",
                borderRadius: "8px",
              }}
            />
          </Col>
          <Col xs={24} md={12}>
            <Title level={2}>{bike.name}</Title>
            <Paragraph>
              <strong>Brand:</strong> {bike.brand}
            </Paragraph>
            <Paragraph>
              <strong>Model:</strong> {bike.model}
            </Paragraph>
            <Paragraph>
              <strong>Price per Hour:</strong> ${bike.pricePerHour}
            </Paragraph>
            <Paragraph>
              <strong>Year:</strong> {bike.year}
            </Paragraph>
            <Paragraph>
              <strong>Status:</strong>{" "}
              {bike.isAvailable ? "Available" : "Unavailable"}
            </Paragraph>
            <Paragraph>
              <strong>Description:</strong> {bike.description}
            </Paragraph>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default BikeDetails;
