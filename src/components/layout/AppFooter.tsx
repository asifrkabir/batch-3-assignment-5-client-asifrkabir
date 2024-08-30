import { Layout, Space } from "antd";
import { FaFacebookSquare, FaInstagram } from "react-icons/fa";
import { FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer style={{ textAlign: "center", padding: "24px 50px" }}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Space size="middle">
          <Link to="/">
            <FaFacebookSquare style={{ fontSize: "24px", color: "#808080" }} />
          </Link>
          <Link to="/">
            <FaXTwitter style={{ fontSize: "24px", color: "#808080" }} />
          </Link>
          <Link to="/">
            <FaInstagram style={{ fontSize: "24px", color: "#808080" }} />
          </Link>
          <Link to="/">
            <FaLinkedin style={{ fontSize: "24px", color: "#808080" }} />
          </Link>
        </Space>

        <Space size="middle">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/bikes">Bikes</NavLink>
        </Space>

        <div>
          Velocirent ©{new Date().getFullYear()} Created by Asif Rezwan Kabir
        </div>
      </Space>
    </Footer>
  );
};

export default AppFooter;
