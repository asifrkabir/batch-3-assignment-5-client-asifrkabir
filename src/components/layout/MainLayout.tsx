import React from "react";
import { Layout } from "antd";
import Navbar from "./Navbar";
import AppFooter from "./AppFooter";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

const MainLayout: React.FC = () => {
  return (
    <Layout style={{ background: "#fff" }}>
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
          <Outlet />
        </div>
      </Content>

      <AppFooter />
    </Layout>
  );
};

export default MainLayout;
