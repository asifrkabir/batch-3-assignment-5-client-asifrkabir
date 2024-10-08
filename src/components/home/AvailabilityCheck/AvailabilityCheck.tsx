import { Button, Col, Form, Input, Row } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuBike } from "react-icons/lu";
import { HiSparkles } from "react-icons/hi2";

const AvailabilityCheck = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const navigate = useNavigate();

  const handleCheckAvailability = () => {
    if (searchValue) {
      navigate(`/bikes?searchTerm=${searchValue}&isAvailable=true`);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#111111",
        padding: "2rem",
        marginTop: "2rem",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}>
      <h2
        style={{
          marginBottom: "2rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          textAlign: "center",
          color: "#fff",
        }}>
        Have a trip planned out? Search for available bikes here{" "}
        <LuBike style={{ marginLeft: "0.5rem" }} />
      </h2>
      <Form style={{ display: "flex", justifyContent: "center" }}>
        <Row gutter={[24, 24]} justify="center" style={{ width: "100%" }}>
          <Col xs={24} md={12} lg={12}>
            <Form.Item>
              <Input
                placeholder="Search by bike name, brand, model etc."
                onChange={(e) => setSearchValue(e.target.value)}
                size="large"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col>
            <Button
              type="primary"
              size="large"
              onClick={handleCheckAvailability}
              disabled={!searchValue}
              style={
                !searchValue
                  ? {
                      color: "gray",
                    }
                  : {
                      color: "#fff",
                    }
              }>
              Check Availability
              <HiSparkles />
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AvailabilityCheck;
