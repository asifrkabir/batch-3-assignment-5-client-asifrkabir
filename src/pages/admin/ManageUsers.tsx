import {
  Button,
  Dropdown,
  MenuProps,
  Modal,
  Table,
  TableColumnsType,
  Typography,
} from "antd";
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import { toast } from "sonner";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "../../redux/features/user/userApi";
import { TError, TUser } from "../../types";
import { isFetchBaseQueryError } from "../../utils/isFetchBaseQueryError";

const { Title } = Typography;

const items = [
  {
    label: "Admin",
    key: "admin",
  },
];

const ManageUsers = () => {
  const [selectedUserId, setSelectedUserId] = useState("");
  const [deleteUser] = useDeleteUserMutation();
  const [updateUserRole] = useUpdateUserRoleMutation();
  const { data, isFetching } = useGetAllUsersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [page, setPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleUserDeleteClick = (userId: string) => {
    setSelectedUserId(userId);
    setIsModalVisible(true);
  };

  const handleUpdateUserRole: MenuProps["onClick"] = async (data) => {
    const toastId = toast.loading("Processing...");

    const userData = {
      id: selectedUserId,
      data: {
        role: data.key,
      },
    };

    try {
      const res = await updateUserRole(userData);

      if ("data" in res && res.data) {
        toast.success("Role updated successfully", {
          id: toastId,
          duration: 2000,
        });
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

  const handleDeleteUser = async () => {
    if (selectedUserId !== "") {
      const toastId = toast.loading("Deleting user...");

      try {
        const res = await deleteUser(selectedUserId);

        if ("data" in res && res.data) {
          toast.success("User deleted successfully", { id: toastId });
        } else if (isFetchBaseQueryError(res.error)) {
          const error = res.error as TError;
          toast.error(error.data.message, { id: toastId });
        } else {
          toast.error("Something went wrong", { id: toastId });
        }
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong", { id: toastId });
      } finally {
        setIsModalVisible(false);
        setSelectedUserId("");
      }
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedUserId("");
  };

  const roleUpdateMenuProps = {
    items,
    onClick: handleUpdateUserRole,
  };

  const columns: TableColumnsType<TUser> = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Actions",
      key: "actions",
      render: (user) => (
        <div>
          <Dropdown menu={roleUpdateMenuProps} trigger={["click"]}>
            <Button
              type="primary"
              icon={<MdOutlineEdit />}
              onClick={() => setSelectedUserId(user._id)}
              style={{ marginRight: "8px" }}
              disabled={user.role === "admin"}>
              Update Role
            </Button>
          </Dropdown>
          <Button
            danger
            icon={<FaTrashAlt />}
            onClick={() => handleUserDeleteClick(user._id)}
            disabled={user.role === "admin"}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const userData = data?.data?.map((user) => ({
    key: user._id,
    ...user,
  }));

  return (
    <div style={{ padding: "2rem" }}>
      <Title level={2}>Manage Users</Title>
      <Table
        columns={columns}
        dataSource={userData}
        pagination={{
          current: page,
          onChange: (page) => setPage(page),
          total: data?.meta?.total,
          pageSize: data?.meta?.limit,
        }}
        loading={isFetching}
        style={{ marginBottom: "2rem" }}
      />
      <Modal
        title="Confirm Deletion"
        open={isModalVisible}
        onOk={handleDeleteUser}
        onCancel={handleCancel}
        okText="Delete"
        cancelText="Cancel"
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" danger onClick={handleDeleteUser}>
            Delete
          </Button>,
        ]}>
        <p>Are you sure you want to delete this user?</p>
      </Modal>
    </div>
  );
};

export default ManageUsers;
