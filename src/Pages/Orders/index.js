import { Avatar, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getInventory, getOrders } from "../../API";

function Orders() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getOrders().then((res) => {
      setDataSource(res.products);
      setLoading(false);
    });
  }, []);

  return (
    <div style={{
      background: ' linear-gradient(174.2deg,  rgba(255,244,228,1) 7.1%, rgba(240,246,238,1) 67.4%)', 
      padding: '10px 100px 55px 45px',/* Top, Right, Bottom, Left padding */
    }}>
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>ORDERS</Typography.Title>
      <Table
        loading={loading}
        columns={[
          {
            title: "ID",
            dataIndex: "id",
          },
          {
            title: "Title",
            dataIndex: "title",
          },
          {
            title: "Price",
            dataIndex: "price",
            render: (value) => <span>${value}</span>,
          },
          {
            title: "DiscountedPrice",
            dataIndex: "discountedPrice",
            render: (value) => <span>${value}</span>,
          },
          {
            title: "Quantity",
            dataIndex: "quantity",
          },
          {
            title: "Total",
            dataIndex: "total",
            render: (value) => <span>${value}</span>,
          },
          {
            title: "ExpectedDeliveryDate",
            dataIndex: "expectedDeliveryDate",
          },
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
        style={{
          marginTop: '20px',
          marginBottom: '10px',
          borderRadius: '8px',
          overflow: 'hidden',
          marginLeft: '80px'
        }}
      ></Table>
    </Space>
    </div>
  );
}
export default Orders;
