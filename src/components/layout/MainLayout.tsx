import React from "react";
import { Layout } from "antd";
import Navbar from "./Navbar";

const { Content, Footer } = Layout;

const MainLayout: React.FC = () => {
  return (
    <Layout>
      <Navbar />

      <Content style={{ padding: "24px" }}>
        <div
          style={{
            margin: "16px 0",
            padding: 24,
            minHeight: "100vh",
            background: "#fff",
            borderRadius: "5px",
          }}>
          Content
        </div>
      </Content>

      <Footer style={{ textAlign: "center" }}>
        BikeRental ©{new Date().getFullYear()} Created by YourName
      </Footer>
    </Layout>
  );
};

export default MainLayout;
