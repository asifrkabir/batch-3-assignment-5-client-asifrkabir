import {
  Button,
  Col,
  Flex,
  Modal,
  Pagination,
  Row,
  Table,
  TableColumnsType,
  TableProps,
  Typography,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { FaPlusCircle, FaTrashAlt } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import { toast } from "sonner";
import AppForm from "../../components/form/AppForm";
import AppInput from "../../components/form/AppInput";
import {
  useCreateCouponMutation,
  useDeleteCouponMutation,
  useGetAllCouponsQuery,
  useGetCouponByIdQuery,
  useUpdateCouponByIdMutation,
} from "../../redux/features/coupon/couponApi";
import {
  couponCreateSchema,
  couponUpdateSchema,
} from "../../schemas/coupon/coupon.schema";
import { TCoupon, TError, TQueryParam } from "../../types";
import { isFetchBaseQueryError } from "../../utils/isFetchBaseQueryError";

const { Title } = Typography;

const ManageCoupons = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const [selectedCouponId, setSelectedCouponId] = useState("");

  const { data, isFetching } = useGetAllCouponsQuery([
    { name: "sort", value: "-createdAt" },
    { name: "limit", value: 10 },
    { name: "page", value: page },
    ...params,
  ]);

  const [createCoupon] = useCreateCouponMutation();
  const [updateCoupon] = useUpdateCouponByIdMutation();
  const [deleteCoupon] = useDeleteCouponMutation();
  const { data: couponData } = useGetCouponByIdQuery(selectedCouponId, {
    skip: !selectedCouponId,
  });
  const coupon = couponData?.data;
  const selectedCouponValues = coupon
    ? {
        code: coupon.code,
        discountPercentage: String(coupon.discountPercentage),
        startTime: dayjs(coupon.startTime),
        endTime: dayjs(coupon.endTime),
      }
    : {};

  const [isAddCouponModalVisible, setIsAddCouponModalVisible] = useState(false);
  const [isUpdateCouponModalVisible, setIsUpdateCouponModalVisible] =
    useState(false);
  const [isDeleteCouponModalVisible, setIsDeleteCouponModalVisible] =
    useState(false);

  const tableData = data?.data?.map((coupon) => ({
    key: coupon._id,
    ...coupon,
  }));

  const metaData = data?.meta;

  useEffect(() => {
    if (tableData?.length === 0 && page > 1) {
      setPage(page - 1);
    }
  }, [tableData, page]);

  const openCouponAddModal = () => {
    setIsAddCouponModalVisible(true);
  };

  const openCouponUpdateModal = (id: string) => {
    console.log(id);
    setSelectedCouponId(id);
    setIsUpdateCouponModalVisible(true);
  };

  const openCouponDeleteModal = (id: string) => {
    setSelectedCouponId(id);
    setIsDeleteCouponModalVisible(true);
  };

  const handleAddCoupon: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Processing...");

    try {
      const payload = {
        ...data,
      };

      const res = await createCoupon(payload);

      if ("data" in res && res.data) {
        toast.success("Coupon added successfully", {
          id: toastId,
          duration: 2000,
        });

        setIsAddCouponModalVisible(false);
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

  const handleUpdateCoupon: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Processing...");

    try {
      const payload = {
        id: selectedCouponId,
        data: {
          ...data,
        },
      };

      const res = await updateCoupon(payload);

      if ("data" in res && res.data) {
        toast.success("Coupon updated successfully", {
          id: toastId,
          duration: 2000,
        });

        setIsUpdateCouponModalVisible(false);
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

  const handleDeleteCoupon = async () => {
    if (selectedCouponId !== "") {
      const toastId = toast.loading("Processing...");

      try {
        const res = await deleteCoupon(selectedCouponId);

        if ("data" in res && res.data) {
          toast.success("Coupon deleted successfully", { id: toastId });
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
        setIsDeleteCouponModalVisible(false);
        setSelectedCouponId("");
      }
    }
  };

  const handleAddCouponCancel = () => {
    setIsAddCouponModalVisible(false);
    setSelectedCouponId("");
  };

  const handleUpdateCouponCancel = () => {
    setIsUpdateCouponModalVisible(false);
    setSelectedCouponId("");
  };

  const handleDeleteCouponCancel = () => {
    setIsDeleteCouponModalVisible(false);
    setSelectedCouponId("");
  };

  const columns: TableColumnsType<TCoupon> = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      hidden: true,
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Discount Percentage (%)",
      dataIndex: "discountPercentage",
      key: "discountPercentage",
    },
    // {
    //   title: "Start Time",
    //   dataIndex: "startTime",
    //   key: "startTime",
    //   render: (date: string) =>
    //     date && dayjs(date).format("YYYY-MM-DD HH:mm:ss"),
    // },
    // {
    //   title: "End Time",
    //   dataIndex: "endTime",
    //   key: "endTime",
    //   render: (date: string) =>
    //     date && dayjs(date).format("YYYY-MM-DD HH:mm:ss"),
    // },
    {
      title: "Actions",
      key: "actions",
      render: (item) => (
        <div>
          <Button
            type="primary"
            icon={<MdOutlineEdit />}
            onClick={() => openCouponUpdateModal(item._id)}
            style={{ marginRight: "8px" }}>
            Update
          </Button>
          <Button
            danger
            icon={<FaTrashAlt />}
            onClick={() => openCouponDeleteModal(item._id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const onChange: TableProps<TCoupon>["onChange"] = (
    _pagination,
    _filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];

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
          Manage Coupons
        </Title>
        <Button
          type="primary"
          size="large"
          onClick={() => openCouponAddModal()}>
          Add Coupon <FaPlusCircle />
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
        title="Add Coupon"
        open={isAddCouponModalVisible}
        onCancel={handleAddCouponCancel}
        width={1200}
        footer={null}>
        <AppForm
          onSubmit={handleAddCoupon}
          schema={couponCreateSchema}
          resetAfterSubmit>
          <Row gutter={[24, 24]} style={{ marginTop: "2rem" }}>
            <Col xs={24} md={12}>
              <AppInput
                name="code"
                label="Code"
                placeholder="Enter Coupon Code"
                required
              />
            </Col>
            <Col xs={24} md={12}>
              <AppInput
                name="discountPercentage"
                label="Discount Percentage (%)"
                placeholder="Discount Percentage (%)"
                type="number"
                required
              />
            </Col>
            {/* <Col xs={24} md={12}>
              <AppDatePicker
                name="startTime"
                label="Start Time"
                picker="date"
                placeholder="Start Time"
                required
              />
            </Col>
            <Col xs={24} md={12}>
              <AppDatePicker
                name="endTime"
                label="End Time"
                picker="date"
                placeholder="End Time"
                required
              />
            </Col> */}
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
              onClick={handleAddCouponCancel}>
              Cancel
            </Button>
          </div>
        </AppForm>
      </Modal>

      <Modal
        title="Update Coupon"
        open={isUpdateCouponModalVisible}
        onCancel={handleUpdateCouponCancel}
        width={1200}
        footer={null}>
        <AppForm
          onSubmit={handleUpdateCoupon}
          defaultValues={selectedCouponValues}
          schema={couponUpdateSchema}>
          <Row gutter={[24, 24]} style={{ marginTop: "2rem" }}>
            <Col xs={24} md={12}>
              <AppInput
                name="code"
                label="Code"
                placeholder="Enter Coupon Code"
                required
              />
            </Col>
            <Col xs={24} md={12}>
              <AppInput
                name="discountPercentage"
                label="Discount Percentage (%)"
                placeholder="Discount Percentage (%)"
                type="number"
                required
              />
            </Col>
            {/* <Col xs={24} md={12}>
              <AppDatePicker
                name="startTime"
                label="Start Time"
                picker="date"
                placeholder="Start Time"
                required
              />
            </Col>
            <Col xs={24} md={12}>
              <AppDatePicker
                name="endTime"
                label="End Time"
                picker="date"
                placeholder="End Time"
                required
              />
            </Col> */}
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
              onClick={handleUpdateCouponCancel}>
              Cancel
            </Button>
          </div>
        </AppForm>
      </Modal>

      <Modal
        title="Confirm Deletion"
        open={isDeleteCouponModalVisible}
        onOk={handleDeleteCoupon}
        onCancel={handleDeleteCouponCancel}
        footer={[
          <Button key="back" onClick={handleDeleteCouponCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            danger
            onClick={handleDeleteCoupon}>
            Delete
          </Button>,
        ]}>
        <p>Are you sure you want to delete this coupon?</p>
      </Modal>
    </div>
  );
};

export default ManageCoupons;
