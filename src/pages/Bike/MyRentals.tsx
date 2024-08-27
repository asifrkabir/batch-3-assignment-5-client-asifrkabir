import { Tabs } from "antd";
import UnpaidTab from "../../components/rental/UnpaidTab";
import PaidTab from "../../components/rental/PaidTab";

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
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>My Rentals</h1>

      <Tabs defaultActiveKey="unpaid" type="card" size="large" items={items} />
    </div>
  );
};

export default MyRentals;
