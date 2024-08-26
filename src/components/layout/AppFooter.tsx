import React from "react";
import { Layout, Space } from "antd";
import { FaXTwitter, FaLinkedin } from "react-icons/fa6";
import { FaFacebookSquare, FaInstagram } from "react-icons/fa";

const { Footer } = Layout;

const AppFooter: React.FC = () => {
  return (
    <Footer style={{ textAlign: "center", padding: "24px 50px" }}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {/* Social Media Icons */}
        <Space size="middle">
          <a href="/" rel="noopener noreferrer">
            <FaFacebookSquare style={{ fontSize: "24px", color: "#808080" }} />
          </a>
          <a href="/" rel="noopener noreferrer">
            <FaXTwitter style={{ fontSize: "24px", color: "#808080" }} />
          </a>
          <a href="/" rel="noopener noreferrer">
            <FaInstagram style={{ fontSize: "24px", color: "#808080" }} />
          </a>
          <a href="/" rel="noopener noreferrer">
            <FaLinkedin style={{ fontSize: "24px", color: "#808080" }} />
          </a>
        </Space>

        <Space size="middle">
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-of-service">Terms of Service</a>
          <a href="/contact-us">Contact Us</a>
        </Space>

        <div>
          Velocirent ©{new Date().getFullYear()} Created by Asif Rezwan Kabir
        </div>
      </Space>
    </Footer>
  );
};

export default AppFooter;
