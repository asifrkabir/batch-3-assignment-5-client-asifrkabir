import { Tabs } from "antd";
import UnpaidTab from "../../components/rental/UnpaidTab";
import PaidTab from "../../components/rental/PaidTab";
import Title from "antd/es/typography/Title";

const items = [
  {
    label: "Unpaid",
    key: "unpaid",
    children: <UnpaidTab />,
  },
  {
    label: "Paid",
    key: "paid",
    children: <PaidTab />,
  },
];

const MyRentals = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <Title level={2} style={{ marginBottom: "2rem" }}>
        My Rentals
      </Title>

      <Tabs defaultActiveKey="unpaid" type="card" size="large" items={items} />
    </div>
  );
};

export default MyRentals;
