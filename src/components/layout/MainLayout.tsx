import React from "react";
import { Layout } from "antd";
import Navbar from "./Navbar";
import AppFooter from "./AppFooter";

const { Content } = Layout;

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

      <AppFooter />
    </Layout>
  );
};

export default MainLayout;
