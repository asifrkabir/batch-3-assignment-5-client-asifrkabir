import { useState } from "react";
import { useGetAllRentalsByUserQuery } from "../../redux/features/rental/rentalApi";
import { TQueryParam } from "../../types";
import { TRental } from "../../types/rental.type";
import { Pagination, Table, TableColumnsType, TableProps } from "antd";
import dayjs from "dayjs";

export type TTableData = Pick<
  TRental,
  "_id" | "bikeId" | "startTime" | "returnTime" | "totalCost"
>;

const UnpaidTab = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);

  const {
    data: rentalData,
    isLoading,
    isFetching,
  } = useGetAllRentalsByUserQuery([
    { name: "paymentStatus", value: "unpaid" },
    ...params,
  ]);

  const metaData = rentalData?.meta;

  const tableData = rentalData?.data?.map(
    ({ _id, bikeId, startTime, returnTime, totalCost }) => ({
      key: _id,
      _id,
      bikeId,
      bikeName: bikeId.name,
      startTime,
      returnTime,
      totalCost,
    })
  );

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

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
      />
      <Pagination
        total={metaData?.total}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
        current={page}
        onChange={(value) => setPage(value)}
        pageSize={metaData?.limit}
      />
    </>
  );
};

export default UnpaidTab;
