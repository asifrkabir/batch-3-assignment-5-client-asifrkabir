import {
  Button,
  Col,
  Dropdown,
  Flex,
  MenuProps,
  Modal,
  Pagination,
  Row,
  Table,
  TableColumnsType,
  TableProps,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { FaPlusCircle, FaTrashAlt } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import { toast } from "sonner";
import {
  useCreateBikeMutation,
  useGetAllBikesQuery,
} from "../../../redux/features/bike/bikeApi";
import {
  useDeleteUserMutation,
  useUpdateUserRoleMutation,
} from "../../../redux/features/user/userApi";
import { TBike, TError, TQueryParam } from "../../../types";
import { isFetchBaseQueryError } from "../../../utils/isFetchBaseQueryError";
import AppForm from "../../../components/form/AppForm";
import AppInput from "../../../components/form/AppInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import AppSelect from "../../../components/form/AppSelect";
import AppTextArea from "../../../components/form/AppTextArea";
import AppDatePicker from "../../../components/form/AppDatePicker";
import { brandOptions, modelOptions } from "../../../constants/bike";
import { convertDropdownOptionsToTableFilters } from "../../../utils/convertDropdownOptionsToTableFilters";

const { Title } = Typography;

const items = [
  {
    label: "Admin",
    key: "admin",
  },
];

const ManageBikes = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);

  const [createBike] = useCreateBikeMutation();

  const [selectedBikeId, setSelectedBikeId] = useState("");
  const [deleteUser] = useDeleteUserMutation();
  const [updateUserRole] = useUpdateUserRoleMutation();
  const { data, isFetching } = useGetAllBikesQuery([
    { name: "sort", value: "-createdAt" },
    { name: "limit", value: 10 },
    { name: "page", value: page },
    ...params,
  ]);

  const [isAddBikeModalVisible, setIsAddBikeModalVisible] = useState(false);
  const [isDeleteBikeModalVisible, setIsDeleteBikeModalVisible] =
    useState(false);

  const tableData = data?.data?.map((bike) => ({
    key: bike._id,
    ...bike,
  }));

  const metaData = data?.meta;

  useEffect(() => {
    if (tableData?.length === 0 && page > 1) {
      setPage(page - 1);
    }
  }, [tableData, page]);

  const openBikeAddModal = () => {
    setIsAddBikeModalVisible(true);
  };

  const openBikeDeleteModal = (bikeId: string) => {
    setSelectedBikeId(bikeId);
    setIsDeleteBikeModalVisible(true);
  };

  const handleAddBike: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Processing...");

    const bikeData = {
      ...data,
      year: Number(data.year.year()),
      cc: Number(data.cc),
      pricePerHour: Number(data.pricePerHour),
    };

    try {
      const res = await createBike(bikeData);

      if ("data" in res && res.data) {
        toast.success("Bike added successfully", {
          id: toastId,
          duration: 2000,
        });

        setIsAddBikeModalVisible(false);
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

  const handleUpdateUserRole: MenuProps["onClick"] = async (data) => {
    const toastId = toast.loading("Processing...");

    const userData = {
      id: selectedBikeId,
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
    if (selectedBikeId !== "") {
      const toastId = toast.loading("Deleting user...");

      try {
        const res = await deleteUser(selectedBikeId);

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
        setIsDeleteBikeModalVisible(false);
        setSelectedBikeId("");
      }
    }
  };

  const handleAddBikeCancel = () => {
    setIsAddBikeModalVisible(false);
    setSelectedBikeId("");
  };

  const handleDeleteBikeCancel = () => {
    setIsDeleteBikeModalVisible(false);
    setSelectedBikeId("");
  };

  const roleUpdateMenuProps = {
    items,
    onClick: handleUpdateUserRole,
  };

  const columns: TableColumnsType<TBike> = [
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
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      filters: convertDropdownOptionsToTableFilters(brandOptions),
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
      filters: convertDropdownOptionsToTableFilters(modelOptions),
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "CC",
      dataIndex: "cc",
      key: "cc",
    },
    {
      title: "Price/Hour (Tk.)",
      dataIndex: "pricePerHour",
      key: "pricePerHour",
    },
    {
      title: "Available?",
      dataIndex: "isAvailable",
      key: "isAvailable",
      render: (isAvailable: boolean) => (isAvailable ? "Yes" : "No"),
      filters: [
        {
          text: "Yes",
          value: true,
        },
        {
          text: "No",
          value: false,
        },
      ],
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
              onClick={() => setSelectedBikeId(user._id)}
              style={{ marginRight: "8px" }}
              disabled={user.role === "admin"}>
              Update Role
            </Button>
          </Dropdown>
          <Button
            danger
            icon={<FaTrashAlt />}
            onClick={() => openBikeDeleteModal(user._id)}
            disabled={user.role === "admin"}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const onChange: TableProps<TBike>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];

      filters.brand?.forEach((item) => {
        queryParams.push({ name: "brand", value: item });
      });

      filters.model?.forEach((item) => {
        queryParams.push({ name: "model", value: item });
      });

      filters.isAvailable?.forEach((item) => {
        queryParams.push({ name: "isAvailable", value: item });
      });

      setParams(queryParams);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Flex
        align="center"
        justify="space-between"
        style={{ marginBottom: "2rem" }}>
        <Title level={2} style={{ margin: "0" }}>
          Manage Bikes
        </Title>
        <Button type="primary" size="large" onClick={() => openBikeAddModal()}>
          Add Bike <FaPlusCircle />
        </Button>
      </Flex>

      <Table
        columns={columns}
        dataSource={tableData}
        pagination={false}
        loading={isFetching}
        onChange={onChange}
        scroll={{ x: "max-content" }}
      />

      <Pagination
        total={metaData?.total || 0}
        showTotal={(total, range) =>
          `${range[0]}-${range[1] || 0} of ${total} items`
        }
        current={page}
        onChange={(value) => setPage(value)}
        pageSize={metaData?.limit || 10}
        style={{ marginTop: "2rem", justifyContent: "end" }}
      />

      <Modal
        title="Add Bike"
        open={isAddBikeModalVisible}
        onOk={handleDeleteUser}
        onCancel={handleAddBikeCancel}
        width={1200}
        footer={null}>
        <AppForm onSubmit={handleAddBike}>
          <Row gutter={[24, 24]} style={{ marginTop: "2rem" }}>
            <Col xs={24} md={12}>
              <AppInput
                name="name"
                label="Name"
                placeholder="Enter Name"
                required
              />
            </Col>
            <Col xs={24} md={12}>
              <AppSelect
                name="brand"
                label="Brand"
                options={brandOptions}
                placeholder="Select Brand"
                required
              />
            </Col>
            <Col xs={24} md={12}>
              <AppSelect
                name="model"
                label="Model"
                options={modelOptions}
                placeholder="Select Model"
                required
              />
            </Col>
            <Col xs={24} md={12}>
              <AppDatePicker
                name="year"
                label="Year"
                picker="year"
                placeholder="Select Year"
                required
              />
            </Col>
            <Col xs={24} md={12}>
              <AppInput
                name="cc"
                label="CC"
                placeholder="Enter CC"
                type="number"
                required
              />
            </Col>
            <Col xs={24} md={12}>
              <AppInput
                name="pricePerHour"
                label="Price Per Hour"
                placeholder="Enter Price Per Hour"
                type="number"
                required
              />
            </Col>
            <Col xs={24} span={24}>
              <AppTextArea
                name="description"
                label="Description"
                placeholder="Enter a description"
                required
              />
            </Col>
          </Row>

          <div
            style={{
              marginTop: "3rem",
              display: "flex",
              justifyContent: "end",
            }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button
              style={{ marginLeft: "10px" }}
              onClick={handleAddBikeCancel}>
              Cancel
            </Button>
          </div>
        </AppForm>
      </Modal>

      <Modal
        title="Confirm Deletion"
        open={isDeleteBikeModalVisible}
        onOk={handleDeleteUser}
        onCancel={handleDeleteBikeCancel}
        footer={[
          <Button key="back" onClick={handleDeleteBikeCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" danger onClick={handleDeleteUser}>
            Delete
          </Button>,
        ]}>
        <p>Are you sure you want to delete this bike?</p>
      </Modal>
    </div>
  );
};

export default ManageBikes;
