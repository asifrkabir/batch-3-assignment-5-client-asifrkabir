import { Button, Col, Row } from "antd";
import { GoHomeFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1>Something Went Wrong!</h1>
        <p>We couldn't find the page you were looking for.</p>
      </div>
      <Row justify="center" gutter={[16, 16]}>
        <Col>
          <Button key="back" onClick={() => navigate(-1)}>
            Go Back
          </Button>
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

export default ErrorPage;
