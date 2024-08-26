import { Card, Button } from "antd";
import { Link } from "react-router-dom";
import { TBike } from "../../../types";

type BikeCardProps = {
  bike: TBike;
};

const BikeCard = ({ bike }: BikeCardProps) => {
  return (
    <Card
      hoverable
      style={{
        minWidth: "20rem",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
      cover={
        <img
          alt={bike.name}
          src="https://via.placeholder.com/300x200?text=Bike+Image" // Replace this with actual bike image
          style={{ objectFit: "cover", height: "200px" }}
        />
      }>
      <Card.Meta
        title={bike.name}
        description={
          <div>
            <p>Brand: {bike.brand}</p>
            <p>Price per Hour: ${bike.pricePerHour}</p>
          </div>
        }
      />
      <Button style={{ marginTop: "1rem" }}>
        <Link to={`/bikes/${bike._id}`}>View Details</Link>
      </Button>
    </Card>
  );
};

export default BikeCard;
