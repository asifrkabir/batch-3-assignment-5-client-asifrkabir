import { Button, Col, Flex, Row } from "antd";
import BikeCard from "../../bike/BikeCard/BikeCard";
import { useGetAllBikesQuery } from "../../../redux/features/bike/bikeApi";

const FeaturedBikes = () => {
  const { data: bikeData, isLoading } = useGetAllBikesQuery([
    { name: "limit", value: 6 },
  ]);

  if (isLoading) {
    return "Loading...";
  }

  return (
    <>
      <h1 style={{ textAlign: "center", marginBottom: "4rem" }}>
        Features Bikes
      </h1>
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Row gutter={[24, 24]} justify="center">
          {bikeData?.data?.map((bike) => {
            return (
              <Col
                key={bike._id}
                xs={24}
                md={12}
                lg={8}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "0rem 2rem",
                }}>
                <BikeCard bike={bike} />
              </Col>
            );
          })}
        </Row>
      </div>
      <Flex style={{ marginTop: "3rem" }} justify="center">
        <Button size="large">View All</Button>
      </Flex>
    </>
  );
};

export default FeaturedBikes;
