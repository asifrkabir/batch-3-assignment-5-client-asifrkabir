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
            padding: 24,
            minHeight: "100vh",
            background: "#fff",
            borderRadius: "5px",
            maxWidth: "1400px",
            margin: "0 auto",
          }}>
          <Outlet />
        </div>
      </Content>

      <AppFooter />
    </Layout>
  );
};

export default MainLayout;
