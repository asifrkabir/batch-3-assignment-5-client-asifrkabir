import React, { useState, useEffect } from "react";
import { Layout, Menu, Drawer, Button, Avatar, Flex } from "antd";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";

const { Header } = Layout;

const items = new Array(3).fill(null).map((_, index) => ({
  key: String(index + 1),
  label: `nav ${index + 1}`,
}));

const Navbar: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth <= 768;
      setIsMobile(isMobileView);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onClose = () => {
    setDrawerVisible(false);
  };

  return (
    <>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          background: "#fff",
          padding: "0 24px",
        }}>
        {isMobile ? (
          <>
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={showDrawer}
              style={{ marginRight: 16 }}
            />
            <div className="demo-logo" style={{ flex: 1 }}>
              BikeRental
            </div>
          </>
        ) : (
          <>
            <div className="demo-logo" style={{ flex: 1 }}>
              BikeRental
            </div>
            <Flex
              align="center"
              style={{ flex: 1, justifyContent: "flex-end" }}>
              <Menu
                theme="light"
                mode="horizontal"
                defaultSelectedKeys={["1"]}
                items={items}
                style={{ flex: 1, justifyContent: "flex-end" }}
              />
            </Flex>
          </>
        )}
        <Avatar icon={<UserOutlined />} style={{ marginLeft: "1rem" }} />
      </Header>

      <Drawer
        title="Navigation"
        placement="left"
        onClose={onClose}
        open={drawerVisible}
        styles={{ body: { padding: 0 }, header: { padding: "10px 24px" } }}>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items}
          onClick={onClose}
        />
      </Drawer>
    </>
  );
};

export default Navbar;
