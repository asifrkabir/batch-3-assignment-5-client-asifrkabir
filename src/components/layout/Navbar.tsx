import { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Drawer,
  Button,
  Avatar,
  Dropdown,
  MenuProps,
} from "antd";
import { MenuOutlined } from "@ant-design/icons";
import logo from "../../assets/images/logo/velocirent_logo.png";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  logout,
  selectCurrentToken,
} from "../../redux/features/auth/authSlice";
import { TAuthUser } from "../../types";
import { verifyToken } from "../../utils/verifyToken";
import { toast } from "sonner";

const { Header } = Layout;

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectCurrentToken);

  let user: TAuthUser | null = null;
  if (token) {
    user = verifyToken(token) as TAuthUser;
  }

  const defaultItems = [
    { key: "/", label: <NavLink to="/">Home</NavLink> },
    { key: "/about", label: <NavLink to="/about">About</NavLink> },
  ];

  const userItems = [
    { key: "profile", label: <NavLink to="/profile">Profile</NavLink> },
    { key: "my-rentals", label: <NavLink to="/rentals">My Rentals</NavLink> },
  ];

  const adminItems = [
    {
      key: "adminDashboard",
      label: <NavLink to="/admin">Admin Dashboard</NavLink>,
    },
    {
      key: "manageUsers",
      label: <NavLink to="/manage-users">Manage Users</NavLink>,
    },
  ];

  let menuItems = [...defaultItems];

  if (user?.role === "user") {
    menuItems = [...menuItems, ...userItems];
  } else if (user?.role === "admin") {
    menuItems = [...menuItems, ...adminItems];
  }

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

  const handleLogout = () => {
    const toastId = toast.loading("Logging out");

    dispatch(logout());

    toast.success("Logged out", { id: toastId, duration: 2000 });

    navigate("/login");
  };

  const avatarMenuItems: MenuProps["items"] = [
    { key: "profile", label: <Link to="/profile">Profile</Link> },
    {
      key: "logout",
      label: <p onClick={handleLogout}>Logout</p>,
    },
  ];

  return (
    <>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
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
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={logo}
                  alt=""
                  style={{ objectFit: "cover", maxWidth: "3rem" }}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <Link to="/">
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={logo}
                  alt=""
                  style={{ objectFit: "cover", maxWidth: "4rem" }}
                />
              </div>
            </Link>
            <div
              style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
              <Menu
                theme="light"
                mode="horizontal"
                selectedKeys={[location.pathname]}
                items={menuItems}
                style={{ flex: 1, justifyContent: "flex-end" }}
              />
            </div>
          </>
        )}
        {user ? (
          <Dropdown
            menu={{ items: avatarMenuItems }}
            trigger={["click", "hover"]}>
            <Avatar
              size="large"
              src="https://api.dicebear.com/7.x/miniavs/svg?seed=3"
              style={{
                marginLeft: "1rem",
                cursor: "pointer",
                border: "1px solid #4F7CAC",
              }}
            />
          </Dropdown>
        ) : (
          <Button type="primary" style={{ marginLeft: "1rem" }}>
            <Link to="/login">Login</Link>
          </Button>
        )}
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
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={onClose}
        />
      </Drawer>
    </>
  );
};

export default Navbar;
