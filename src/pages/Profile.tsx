import { Avatar, Button, Col, Row, Typography } from "antd";
import { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import AppForm from "../components/form/AppForm";
import AppInput from "../components/form/AppInput";
import AppTextArea from "../components/form/AppTextArea";
import { profileUpdateSchema } from "../schemas/user/user.schema";
import { FieldValues, SubmitHandler } from "react-hook-form";

const { Title, Text } = Typography;

const user = {
  _id: "66cd99c989cfe18dfd0c098c",
  name: "User",
  email: "user@mail.com",
  phone: "123",
  address: "Test Address",
  role: "user",
  createdAt: "2024-08-27T09:18:01.229Z",
  updatedAt: "2024-08-27T09:18:01.229Z",
  __v: 0,
};

const defaultValues = {
  name: "User",
  email: "user@mail.com",
  phone: "123",
  address: "Test Address",
};

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const onSubmit: SubmitHandler<FieldValues> = (values) => {
    console.log("Updated values:", values);
    setIsEditing(false);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Row
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "2rem",
          borderRadius: "8px",
          background: "linear-gradient(135deg, #4F7CAC, #A4DEF9)",
          marginBottom: "2rem",
        }}>
        <Col>
          <Avatar
            size={100}
            src="https://api.dicebear.com/7.x/miniavs/svg?seed=3"
            style={{
              border: "2px solid #fff",
            }}
          />
        </Col>
        <Col style={{ textAlign: "right", color: "white" }}>
          <Title level={3} style={{ margin: 0 }}>
            Welcome,
          </Title>
          <Text
            ellipsis
            style={{
              fontSize: "24px",
              fontWeight: "bold",
            }}>
            {user.name}
          </Text>
        </Col>
      </Row>

      <AppForm
        onSubmit={onSubmit}
        schema={profileUpdateSchema}
        defaultValues={defaultValues}>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <AppInput
              name="name"
              label="Name"
              placeholder="Name"
              required
              disabled={!isEditing}
            />
          </Col>
          <Col xs={24} md={12}>
            <AppInput
              type="email"
              name="email"
              label="Email"
              placeholder="Email"
              required
              disabled={!isEditing}
            />
          </Col>
          <Col xs={24} md={12}>
            <AppInput
              name="phone"
              label="Phone"
              placeholder="Phone"
              required
              disabled={!isEditing}
            />
          </Col>
          <Col span={24}>
            <AppTextArea
              name="address"
              label="Address"
              placeholder="Address"
              required
              disabled={!isEditing}
            />
          </Col>
        </Row>

        {isEditing ? (
          <div style={{ marginTop: "3rem" }}>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
            <Button style={{ marginLeft: "10px" }} onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        ) : (
          <Button onClick={handleEdit} style={{ marginTop: "3rem" }}>
            <MdOutlineEdit />
            Edit Profile
          </Button>
        )}
      </AppForm>
    </div>
  );
};

export default Profile;
