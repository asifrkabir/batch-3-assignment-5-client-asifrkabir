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
        Featured Bikes
      </h1>
      <Row gutter={[16, 16]}>
        {bikeData?.data?.map((bike) => {
          return (
            <Col
              key={bike._id}
              sm={24}
              md={12}
              lg={8}
              style={{
                display: "flex",
                justifyContent: "center",
              }}>
              <BikeCard bike={bike} />
            </Col>
          );
        })}
      </Row>
      <Flex style={{ marginTop: "3rem" }} justify="center">
        <Button size="large">View All</Button>
      </Flex>
    </>
  );
};

export default FeaturedBikes;
