/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Col,
  Row,
  Spin,
  Typography,
  Empty,
  Modal,
  Form,
  Input,
} from "antd";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useGetBikeByIdQuery } from "../../redux/features/bike/bikeApi";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const { Title, Paragraph } = Typography;

const BikeDetails = () => {
  const [minDateTime, setMinDateTime] = useState("");

  useEffect(() => {
    const now = dayjs().format("YYYY-MM-DDTHH:mm");
    setMinDateTime(now);
  }, []);

  const { id } = useParams();
  const navigate = useNavigate();
  const { data: bikeData, isLoading, error } = useGetBikeByIdQuery(id);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleBookNowClick = () => {
    if (bikeData?.data?.isAvailable) {
      setIsModalVisible(true);
    }
  };

  const handleModalOk = async (values: any) => {
    // Convert startTime to ISO 8601 format
    const startTimeISO = new Date(values.startTime).toISOString();

    const paymentData = {
      paymentType: "booking",
      startTime: startTimeISO,
      bikeId: id,
      paymentAmount: 100,
    };

    setIsModalVisible(false);
    navigate("/payment", { state: paymentData });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  if (isLoading) {
    return <Spin size="large" />;
  }

  const bike = bikeData?.data;

  return (
    <div style={{ padding: "2rem" }}>
      <Link
        to="/bikes"
        style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <Button style={{ marginBottom: "4rem" }}>
          <IoIosArrowRoundBack /> Back to All Bikes
        </Button>
      </Link>

      {error || bike === null ? (
        <div>
          <Empty description="Bike not found" />
        </div>
      ) : (
        <>
          <Row gutter={[24, 24]} align="top">
            <Col xs={24} md={12} style={{ textAlign: "center" }}>
              <img
                alt={bike.name}
                src={
                  bike?.image ||
                  "https://via.placeholder.com/500x500?text=Bike+Image"
                }
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

              <Button
                type="primary"
                onClick={handleBookNowClick}
                disabled={!bike.isAvailable}
                style={{ marginTop: "2rem" }}>
                Book Now
              </Button>
            </Col>
          </Row>

          <Modal
            title="Book Bike"
            open={isModalVisible}
            onOk={() => form.submit()}
            onCancel={handleModalCancel}
            okText="Pay Now"
            cancelText="Cancel">
            <Form
              form={form}
              name="bookingForm"
              onFinish={handleModalOk}
              layout="vertical">
              <Form.Item
                label="Start Time"
                name="startTime"
                rules={[
                  { required: true, message: "Please select start time!" },
                ]}>
                <Input type="datetime-local" min={minDateTime} />
              </Form.Item>
              <Form.Item>
                <Paragraph>
                  Please note: Advanced payment of TK 100 will be required to
                  confirm the booking.
                </Paragraph>
              </Form.Item>
            </Form>
          </Modal>
        </>
      )}
    </div>
  );
};

export default BikeDetails;
