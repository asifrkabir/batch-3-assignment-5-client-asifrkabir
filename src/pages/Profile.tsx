import { Avatar, Button, Col, Row, Spin, Typography } from "antd";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { MdOutlineEdit } from "react-icons/md";
import { toast } from "sonner";
import AppForm from "../components/form/AppForm";
import AppInput from "../components/form/AppInput";
import AppTextArea from "../components/form/AppTextArea";
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from "../redux/features/user/userApi";
import { profileUpdateSchema } from "../schemas/user/user.schema";
import { TError } from "../types";
import { isFetchBaseQueryError } from "../utils/isFetchBaseQueryError";

const { Title, Text } = Typography;

const Profile = () => {
  const [updateUserProfile] = useUpdateUserProfileMutation();
  const { data, isLoading } = useGetUserProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const user = data?.data;
  const defaultValues = user
    ? {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      }
    : {};

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Processing...");

    const userData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
    };

    try {
      const res = await updateUserProfile(userData);

      if ("data" in res && res.data) {
        toast.success("Profile updated successfully", {
          id: toastId,
          duration: 2000,
        });

        setIsEditing(false);
      } else if (isFetchBaseQueryError(res.error)) {
        const error = res.error as TError;

        toast.error(error.data.message, { id: toastId, duration: 2000 });
      } else {
        toast.error("Something went wrong", { id: toastId, duration: 2000 });
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  if (isLoading) {
    return <Spin size="large" />;
  }

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
