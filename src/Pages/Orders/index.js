import React, { useEffect, useState } from 'react';
import { Space, Table, Typography } from 'antd';
import { getOrders } from '../../API';

function Orders() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getOrders().then((res) => {
      // Add expected delivery date to each product
      const updatedProducts = res.products.map((product, index) => ({
        ...product,
        expectedDeliveryDate: generateDeliveryDate(index),
      }));
      setDataSource(updatedProducts);
      setLoading(false);
    });
  }, []);

  // Function to generate delivery date based on index
  const generateDeliveryDate = (index) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDate() + index; // Increment day based on index
    return new Date(year, month, day);
  };

  return (
    <div
      style={{
        background: "white",
        padding: '10px 100px 55px 45px', /* Top, Right, Bottom, Left padding */
      }}
    >
      <Space size={20} direction="vertical">
        <Typography.Title level={4}>ORDERS</Typography.Title>
        <Table
          loading={loading}
          columns={[
            {
              title: 'ID',
              dataIndex: 'id',
            },
            {
              title: 'Title',
              dataIndex: 'title',
            },
            {
              title: 'Price',
              dataIndex: 'price',
              render: (value) => <span>${value}</span>,
            },
            {
              title: 'DiscountedPrice',
              dataIndex: 'discountedPrice',
              render: (value) => <span>${value}</span>,
            },
            {
              title: 'Quantity',
              dataIndex: 'quantity',
            },
            {
              title: 'Total',
              dataIndex: 'total',
              render: (value) => <span>${value}</span>,
            },
            {
              title: 'ExpectedDeliveryDate',
              dataIndex: 'expectedDeliveryDate',
              render: (value) => <span>{value.toDateString()}</span>,
            },
          ]}
          dataSource={dataSource}
          pagination={{
            pageSize: 5,
          }}
          style={{
            marginTop: '20px',
            marginBottom: '14px',
            borderRadius: '8px',
            overflow: 'hidden',
            marginLeft: '90px',
            marginRight: '190px',
          }}
        ></Table>
      </Space>
    </div>
  );
}

export default Orders;
