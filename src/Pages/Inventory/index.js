import { Avatar, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getInventory } from "../../API";

function Inventory() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getInventory().then((res) => {
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
      <Typography.Title level={4}>INVENTORY</Typography.Title>
      <Table
        loading={loading}
        columns={[
          {
            title: "Thumbnail",
            dataIndex: "thumbnail",
            render: (link) => {
              return <Avatar src={link} />;
            },
          },
          {
            title: "Title",
            dataIndex: "title",
            width: 205,
          },
          {
            title: "Price",
            dataIndex: "price",
            render: (value) => <span>${value}</span>,
            width: 135,
          },
          {
            title: "Rating",
            dataIndex: "rating",
            width: 205,
            render: (rating) => {
              return <Rate value={rating} allowHalf disabled />;
            },
          },
          {
            title: "Stock",
            dataIndex: "stock",
            width: 205,
          },

          {
            title: "Brand",
            dataIndex: "brand",
            width: 205,
          },
          {
            title: "Category",
            dataIndex: "category",
            width: 135,
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
export default Inventory;
