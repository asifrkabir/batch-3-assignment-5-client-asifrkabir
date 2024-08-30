import { Button, Col, Row } from "antd";
import ConfettiExplosion from "react-confetti-explosion";
import { GoHomeFill } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "70vh",
      }}>
      <ConfettiExplosion particleCount={100} width={1500} />
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1>Booking successful!</h1>
        <p>Wish you a wonderful journey ahead!</p>
      </div>
      <Row justify="center" gutter={[16, 16]}>
        <Col>
          <Link to="/bikes">
            <Button
              key="back"
              type="default"
              onClick={() => navigate("/bikes")}>
              View More Bikes
            </Button>
          </Link>
        </Col>
        <Col>
          <Button key="home" type="primary" onClick={() => navigate("/")}>
            Go to Homepage <GoHomeFill />
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default PaymentSuccess;
