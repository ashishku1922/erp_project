import React, { useEffect, useState } from 'react';
import { Space, Table, Typography, Button, Modal, Select } from 'antd';
import { getOrders } from '../../API';

const { Option } = Select;

function Orders() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [viewOrderModalVisible, setViewOrderModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    setLoading(true);
    getOrders().then((res) => {
      const updatedProducts = res.products.map((product, index) => ({
        ...product,
        expectedDeliveryDate: generateDeliveryDate(index),
      }));
      setDataSource(updatedProducts);
      setLoading(false);
    });
  }, []);

  const generateDeliveryDate = (index) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDate() + index; 
    return new Date(year, month, day);
  };

  const handleViewOrderDetails = (order) => {
    setSelectedOrder(order);
    setViewOrderModalVisible(true);
  };

  const handleUpdateOrderStatus = (orderId, status) => {
    console.log('Updating status of order:', orderId, 'to', status);
  };

  const handleDeleteOrder = (orderId) => {
    const newData = dataSource.filter((item) => item.id !== orderId);
    setDataSource(newData);
  };

  return (
    <div
      style={{
        background: "white",
        padding: '10px 100px 55px 45px', 
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
            {
              title: 'Status',
              dataIndex: 'status',
              render: (status, record) => (
                <Select defaultValue={status} style={{ width: 120 }} onChange={(value) => handleUpdateOrderStatus(record.id, value)}>
                  <Option value="Pending">Pending</Option>
                  <Option value="Processing">Processing</Option>
                  <Option value="Shipped">Shipped</Option>
                  <Option value="Delivered">Delivered</Option>
                </Select>
              ),
            },
            {
              title: 'Actions',
              dataIndex: 'id',
              render: (orderId, record) => (
                <Space size="middle">
                  <Button type="primary" onClick={() => handleViewOrderDetails(record)}>View Details</Button>
                  <Button type="danger" onClick={() => handleDeleteOrder(orderId)}>Delete</Button>
                </Space>
              ),
            },
          ]}
          dataSource={dataSource}
          pagination={{
            pageSize: 5,
          }}
          style={{
            marginTop: '20px',
            marginBottom: '-54px',
            borderRadius: '8px',
            overflow: 'hidden',
            marginLeft: '9px',
            marginRight: '19px',
          }}
        ></Table>
      </Space>

      <Modal
        title="Order Details"
        visible={viewOrderModalVisible}
        onCancel={() => setViewOrderModalVisible(false)}
        footer={null}
      >
        {selectedOrder && (
          <div>
            <p>ID: {selectedOrder.id}</p>
            <p>Title: {selectedOrder.title}</p>
            <p>Price: ${selectedOrder.price}</p>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Orders;
