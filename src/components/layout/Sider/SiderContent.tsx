import { Menu } from "antd";
import {
  UserOutlined,
  ProfileOutlined,
  LogoutOutlined,
  OrderedListOutlined,
  CarryOutOutlined,
  InfoCircleOutlined,
  SettingOutlined,
  FormOutlined,
} from "@ant-design/icons";
import logo from "../../../assets/images/logo/velocirent_logo.png";
import "./SiderContent.css";
import { Link } from "react-router-dom";

type SiderContentProps = {
  collapsed: boolean;
};

const menuItems = [
  {
    key: "dashboard",
    icon: <UserOutlined />,
    label: <Link to="/">Dashboard</Link>,
  },
  {
    key: "testForm",
    icon: <FormOutlined />,
    label: <Link to="/test-form">Test Form</Link>,
  },
  {
    key: "myOrders",
    icon: <CarryOutOutlined />,
    label: "My Orders",
  },
  {
    key: "todo",
    icon: <OrderedListOutlined />,
    label: "ToDo",
    children: [
      { key: "5", label: "Option 5" },
      { key: "6", label: "Option 6" },
      {
        key: "sub3",
        label: "Submenu",
        children: [
          { key: "7", label: "Option 7" },
          { key: "8", label: "Option 8" },
        ],
      },
    ],
  },
  {
    key: "profile",
    icon: <ProfileOutlined />,
    label: "Profile",
  },
  {
    key: "about",
    icon: <InfoCircleOutlined />,
    label: <Link to="/about">About</Link>,
  },
  {
    key: "settings",
    icon: <SettingOutlined />,
    label: "Settings",
  },
  {
    key: "logout",
    icon: <LogoutOutlined />,
    label: "Logout",
  },
];

const SiderContent = ({ collapsed }: SiderContentProps) => {
  return (
    <>
      <div className="sider-logo-container">
        <img src={logo} alt="Logo" className="sider-logo" />
        {!collapsed && <span className="sider-logo-text">MyApp</span>}
      </div>
      <Menu
        defaultSelectedKeys={["dashboard"]}
        items={menuItems}
        style={{ borderRight: "none" }}
        mode="inline"
      />
    </>
  );
};

export default SiderContent;
