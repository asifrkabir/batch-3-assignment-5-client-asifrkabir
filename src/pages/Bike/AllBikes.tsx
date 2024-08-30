import { Col, DatePicker, Empty, Input, Row, Select, Spin } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import BikeCard from "../../components/bike/BikeCard/BikeCard";
import { useGetAllBikesQuery } from "../../redux/features/bike/bikeApi";
import { TQueryParam } from "../../types";
import { useLocation } from "react-router-dom";

const { Option } = Select;

const AllBikes = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("searchTerm") || "";
  const isAvailable = queryParams.get("isAvailable") || "";

  const [filters, setFilters] = useState({
    searchTerm: searchTerm,
    brand: "",
    model: "",
    year: "",
    isAvailable: isAvailable,
  });

  const [params, setParams] = useState<TQueryParam[]>([]);

  useEffect(() => {
    const newParams: TQueryParam[] = [];
    for (const [key, value] of Object.entries(filters)) {
      if (value) {
        newParams.push({ name: key, value });
      }
    }
    setParams(newParams);
  }, [filters]);

  const { data: bikeData, isLoading } = useGetAllBikesQuery([...params]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  };

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      year: date?.year().toString() || "",
    }));
  };

  if (isLoading) {
    return <Spin size="large" />;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>All Bikes</h1>

      <div style={{ marginBottom: "2rem", textAlign: "center" }}>
        <Row justify="center" gutter={[16, 16]}>
          <Col>
            <Input
              placeholder="Search by name, brand, model or description"
              style={{ width: 200 }}
              defaultValue={searchTerm}
              onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
            />
          </Col>
          <Col>
            <Select
              placeholder="Select Brand"
              style={{ width: 200 }}
              onChange={(value) => handleFilterChange("brand", value)}>
              <Option value="">All Brands</Option>
              <Option value="Yamaha">Yamaha</Option>
              <Option value="Suzuki">Suzuki</Option>
            </Select>
          </Col>
          <Col>
            <Input
              placeholder="Enter Full Model"
              style={{ width: 200 }}
              onChange={(e) => handleFilterChange("model", e.target.value)}
            />
          </Col>
          <Col>
            <DatePicker
              picker="year"
              style={{ width: 200 }}
              placeholder="Select Year"
              onChange={handleDateChange}
              format="YYYY"
            />
          </Col>
          <Col>
            <Select
              placeholder="Availability"
              style={{ width: 200 }}
              defaultValue={isAvailable}
              onChange={(value) => handleFilterChange("isAvailable", value)}>
              <Option value="">All</Option>
              <Option value="true">Available</Option>
              <Option value="false">Unavailable</Option>
            </Select>
          </Col>
        </Row>
      </div>

      <Row gutter={[16, 16]}>
        {bikeData?.data?.length === 0 ? (
          <Col
            style={{
              margin: "4rem auto",
            }}>
            <Empty />
          </Col>
        ) : (
          bikeData?.data?.map((bike) => (
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
          ))
        )}
      </Row>
    </div>
  );
};

export default AllBikes;
