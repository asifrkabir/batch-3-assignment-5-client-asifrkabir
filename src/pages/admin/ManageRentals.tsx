import {
  Button,
  Modal,
  Pagination,
  Table,
  TableColumnsType,
  TableProps,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  useGetAllRentalsQuery,
  useReturnBikeMutation,
} from "../../redux/features/rental/rentalApi";
import { TError, TQueryParam } from "../../types";
import { TRental } from "../../types/rental.type";
import { isFetchBaseQueryError } from "../../utils/isFetchBaseQueryError";
import dayjs from "dayjs";

const { Title } = Typography;

const ManageRentals = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const [selectedRentalId, setSelectedRentalId] = useState("");

  const [returnBike] = useReturnBikeMutation();

  const { data, isFetching } = useGetAllRentalsQuery([
    { name: "sort", value: "-createdAt" },
    { name: "limit", value: 10 },
    { name: "page", value: page },
    ...params,
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const tableData = data?.data?.map((rental) => ({
    key: rental._id,
    ...rental,
    bikeName: rental.bikeId?.name,
    customerName: rental.userId?.name,
  }));

  const metaData = data?.meta;

  useEffect(() => {
    if (tableData?.length === 0 && page > 1) {
      setPage(page - 1);
    }
  }, [tableData, page]);

  const showReturnBikeModal = (rentalId: string) => {
    setSelectedRentalId(rentalId);
    setIsModalVisible(true);
  };

  const handleReturnBike = async () => {
    const toastId = toast.loading("Processing...");

    const rentalData = {
      id: selectedRentalId,
    };

    try {
      const res = await returnBike(rentalData);

      if ("data" in res && res.data) {
        toast.success("Bike returned successfully", {
          id: toastId,
          duration: 2000,
        });

        setIsModalVisible(false);
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

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedRentalId("");
  };

  const columns: TableColumnsType<TRental> = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Bike Name",
      dataIndex: "bikeName",
      key: "bikeName",
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
      title: "Returned?",
      dataIndex: "isReturned",
      key: "isReturned",
      render: (isReturned: boolean) => (isReturned ? "Yes" : "No"),
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
      title: "Action",
      key: "action",
      render: (rental) => (
        <div>
          <Button
            type="primary"
            onClick={() => showReturnBikeModal(rental._id)}
            disabled={rental.isReturned === true}>
            Calculate
          </Button>
        </div>
      ),
    },
  ];

  const onChange: TableProps<TRental>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];

      filters.isReturned?.forEach((item) => {
        queryParams.push({ name: "isReturned", value: item });
      });

      setParams(queryParams);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Title level={2} style={{ marginBottom: "2rem" }}>
        Manage Rentals
      </Title>

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
        title="Confirm Return"
        open={isModalVisible}
        onOk={handleReturnBike}
        onCancel={handleCancel}
        okText="Delete"
        cancelText="Cancel"
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleReturnBike}>
            Confirm
          </Button>,
        ]}>
        <p>
          Confirm return of the bike? Make sure the bike is in proper condition.
        </p>
      </Modal>
    </div>
  );
};

export default ManageRentals;
