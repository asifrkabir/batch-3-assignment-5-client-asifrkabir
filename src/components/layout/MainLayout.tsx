import { useEffect, useState } from "react";
import { Drawer, Layout } from "antd";
import SiderContent from "./Sider/SiderContent";
import HeaderContent from "./Header/HeaderContent";
import FooterContent from "./Footer/FooterContent";
import { Outlet } from "react-router-dom";

const { Header, Sider, Content, Footer } = Layout;

const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "sticky",
  left: 0,
  bottom: 0,
  top: 0,
  scrollbarWidth: "none",
  backgroundColor: "#fff",
};

const drawerStyles = {
  body: {
    padding: 0,
  },
};

const headerStyle: React.CSSProperties = {
  position: "sticky",
  top: 0,
  zIndex: 1,
  width: "100%",
  padding: 0,
  background: "#fff",
  display: "flex",
  alignItems: "center",
  boxShadow: "1px 1px 1px lightgray",
};

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isLg = window.matchMedia("(max-width: 992px)").matches;
      setIsMobile(isLg);
      setCollapsed(isLg);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Layout>
      {isMobile ? (
        <Drawer
          open={drawerVisible}
          onClose={() => setDrawerVisible(false)}
          placement="left"
          styles={drawerStyles}>
          <SiderContent collapsed={false} />
        </Drawer>
      ) : (
        <Sider
          style={siderStyle}
          trigger={null}
          collapsible
          collapsed={collapsed}
          onCollapse={(collapsed) => setCollapsed(collapsed)}>
          <SiderContent collapsed={collapsed} />
        </Sider>
      )}
      <Layout>
        <Header style={headerStyle}>
          <HeaderContent
            collapsed={collapsed}
            setCollapsed={() => {
              if (isMobile) {
                setDrawerVisible(!drawerVisible);
              } else {
                setCollapsed(!collapsed);
              }
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 980,
            background: "#fff",
            borderRadius: 8,
          }}>
          <Outlet />
        </Content>
        <Footer>
          <FooterContent />
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
