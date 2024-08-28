import { useEffect, useState } from "react";
import { useGetAllRentalsByUserQuery } from "../../redux/features/rental/rentalApi";
import { TQueryParam } from "../../types";
import { TRental } from "../../types/rental.type";
import { Button, Pagination, Table, TableColumnsType, TableProps } from "antd";
import dayjs from "dayjs";
import { FaCreditCard } from "react-icons/fa6";

type TTableData = Pick<
  TRental,
  "_id" | "bikeId" | "startTime" | "returnTime" | "totalCost"
>;

const UnpaidTab = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);

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
      render: (text: string) => dayjs(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "Return Time",
      dataIndex: "returnTime",
      render: (text: string) => dayjs(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "Total Cost (Tk.)",
      dataIndex: "totalCost",
    },
    {
      title: "Action",
      render: (item) => {
        return (
          <Button type="primary" onClick={() => console.log(item)}>
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
    </>
  );
};

export default UnpaidTab;
