import { useEffect, useState } from "react";
import { useGetAllRentalsByUserQuery } from "../../redux/features/rental/rentalApi";
import { TAuthUser, TQueryParam } from "../../types";
import { TRental } from "../../types/rental.type";
import {
  Button,
  Modal,
  Pagination,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import dayjs from "dayjs";
import { FaCreditCard } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentToken } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import {
  useGetUserCouponByUserIdQuery,
  useUpdateUserCouponMutation,
} from "../../redux/features/coupon/couponApi";

type TTableData = Pick<
  TRental,
  "_id" | "bikeId" | "startTime" | "returnTime" | "totalCost"
>;

const UnpaidTab = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRental, setSelectedRental] = useState<TRental | null>(null);
  const [discountedCost, setDiscountedCost] = useState(0);

  const navigate = useNavigate();

  const [updateUserCoupon] = useUpdateUserCouponMutation();

  const token = useAppSelector(selectCurrentToken);
  let user = null;

  if (token) {
    user = verifyToken(token) as TAuthUser;
  }

  const { data: userCouponData } = useGetUserCouponByUserIdQuery(user?.userId, {
    skip: !user,
  });
  const existingCouponData = userCouponData?.data;
  console.log(existingCouponData);

  const { data: rentalData, isFetching } = useGetAllRentalsByUserQuery(
    [
      { name: "paymentStatus", value: "unpaid" },
      { name: "sort", value: "-createdAt" },
      { name: "limit", value: 10 },
      { name: "page", value: page },
      ...params,
    ],
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const tableData = rentalData?.data?.map((rental) => ({
    key: rental._id,
    ...rental,
    bikeName: rental.bikeId.name,
  }));

  const metaData = rentalData?.meta;

  useEffect(() => {
    if (tableData?.length === 0 && page > 1) {
      setPage(page - 1);
    }
  }, [tableData, page]);

  const goToPaymentPage = (data: TRental) => {
    if (existingCouponData) {
      const discount =
        (existingCouponData.coupon.discountPercentage / 100) * data.totalCost;
      const finalCost = data.totalCost - discount;

      setSelectedRental(data);
      setDiscountedCost(finalCost);
      setModalVisible(true);
    } else {
      navigate("/payment", {
        state: {
          paymentType: "return",
          paymentAmount: data.totalCost,
          rentalId: data._id,
        },
      });
    }
  };

  const handleProceedToPayment = async () => {
    if (selectedRental) {
      await updateUserCoupon(existingCouponData?._id);

      navigate("/payment", {
        state: {
          paymentType: "return",
          paymentAmount: discountedCost,
          rentalId: selectedRental._id,
        },
      });
      setModalVisible(false);
    }
  };

  const columns: TableColumnsType<TTableData> = [
    {
      title: "ID",
      dataIndex: "_id",
      hidden: true,
    },
    {
      title: "Bike Name",
      dataIndex: "bikeName",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      render: (date: string) =>
        date && dayjs(date).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "Return Time",
      dataIndex: "returnTime",
      render: (date: string) =>
        date && dayjs(date).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "Total Cost (Tk.)",
      dataIndex: "totalCost",
    },
    {
      title: "Action",
      render: (item) => {
        return (
          <Button
            type="primary"
            disabled={!item.returnTime}
            onClick={() => goToPaymentPage(item)}>
            Pay Now <FaCreditCard />
          </Button>
        );
      },
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
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
    <>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
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
        title="Coupon Applied!"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="proceed" type="primary" onClick={handleProceedToPayment}>
            Proceed
          </Button>,
        ]}>
        <p>
          Original Cost: <strong>Tk.{selectedRental?.totalCost}</strong>
        </p>
        <p>
          Discount:{" "}
          <strong>{existingCouponData?.coupon?.discountPercentage}%</strong>
        </p>
        <p>
          Final Cost: <strong>Tk.{discountedCost}</strong>
        </p>
      </Modal>
    </>
  );
};

export default UnpaidTab;
