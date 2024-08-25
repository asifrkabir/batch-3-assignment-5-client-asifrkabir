import {
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Flex } from "antd";

type HeaderContentProps = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
};

const HeaderContent = ({ collapsed, setCollapsed }: HeaderContentProps) => {
  return (
    <Flex
      style={{ width: "100%", marginRight: "16px" }}
      justify="space-between"
      align="center">
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />
      <div>
        <Avatar icon={<UserOutlined />} />
      </div>
    </Flex>
  );
};

export default HeaderContent;
