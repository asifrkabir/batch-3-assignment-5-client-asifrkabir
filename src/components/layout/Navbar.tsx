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

type MenuItemType = {
  key: string;
  label: React.ReactNode;
  children?: MenuItemType[];
};

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

  const defaultItems: MenuItemType[] = [
    { key: "/", label: <NavLink to="/">Home</NavLink> },
    { key: "/about", label: <NavLink to="/about">About</NavLink> },
    { key: "/bikes", label: <NavLink to="/bikes">All Bikes</NavLink> },
  ];

  const userItems: MenuItemType[] = [
    {
      key: "/my-rentals",
      label: <NavLink to="/my-rentals">My Rentals</NavLink>,
    },
    { key: "/bikes", label: <NavLink to="/bikes">All Bikes</NavLink> },
  ];

  const adminItems: MenuItemType[] = [
    {
      key: "/users",
      label: "Users",
      children: [
        {
          key: "/manage-users",
          label: <NavLink to="/manage-users">Manage Users</NavLink>,
        },
      ],
    },
    { key: "/bikes", label: <NavLink to="/bikes">All Bikes</NavLink> },
  ];

  // Map to ensure uniqueness by key
  const menuItemsMap = new Map<string, MenuItemType>();

  defaultItems.forEach((item) => menuItemsMap.set(item.key, item));

  if (user?.role === "user") {
    userItems.forEach((item) => menuItemsMap.set(item.key, item));
  } else if (user?.role === "admin") {
    adminItems.forEach((item) => menuItemsMap.set(item.key, item));
  }

  // Convert Map back to array
  const menuItems: MenuItemType[] = Array.from(menuItemsMap.values());

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

    navigate("/login", { replace: true });
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
                  style={{ objectFit: "cover", maxWidth: "3rem" }}
                />
                <p
                  style={{
                    marginLeft: "0.4rem",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    color: "#1890ff",
                  }}>
                  Velocirent
                </p>
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
        title="Velocirent"
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
