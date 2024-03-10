import { Avatar, Button, Form, Input, Modal, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getInventory } from "../../API";

function Inventory() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    setLoading(true);
    getInventory().then((res) => {
      setDataSource(res.products);
      setLoading(false);
    });
  }, []);

  const handleAddProduct = () => {
    setVisible(true);
    setSelectedProduct(null);
    form.resetFields();
  };

  const handleEditProduct = (product) => {
    setVisible(true);
    setSelectedProduct(product);
    form.setFieldsValue(product);
  };

  const handleDeleteProduct = (productId) => {
    const newData = dataSource.filter((item) => item.id !== productId);
    setDataSource(newData);
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      setVisible(false);
      const newData = [...dataSource];
      if (selectedProduct) {
        const index = newData.findIndex((item) => item.id === selectedProduct.id);
        newData[index] = { ...newData[index], ...values };
      } else {
        newData.push({ id: newData.length + 1, ...values });
      }
      setDataSource(newData);
    }).catch((errorInfo) => {
      console.log('Validation failed:', errorInfo);
    });
  };

  const handleModalCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  return (
    <div style={{
      background: "WHITE",
      padding: '10px 40px 55px 40px', 
    }}>
      <Space size={20} direction="vertical">
        <Typography.Title level={4}>PRODUCTS</Typography.Title>
        <Button type="primary" onClick={handleAddProduct}>Add Product</Button>
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
            {
              title: "Actions",
              render: (_, record) => (
                <Space size="middle">
                  <Button type="primary" onClick={() => handleEditProduct(record)}>Edit</Button>
                  <Button type="danger" onClick={() => handleDeleteProduct(record.id)}>Delete</Button>
                </Space>
              ),
            },
          ]}
          dataSource={dataSource}
          pagination={{
            pageSize: 5,
          }}
          style={{
            marginTop: '5px',
            marginBottom: '-35px',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        ></Table>
      </Space>
      <Modal
        title={selectedProduct ? "Edit Product" : "Add Product"}
        visible={visible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Save"
        cancelText="Cancel"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={selectedProduct}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[
              { required: true, message: 'Please enter the title!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[
              { required: true, message: 'Please enter the price!' },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="rating"
            label="Rating"
            rules={[
              { required: true, message: 'Please enter the rating!' },
            ]}
          >
            <Rate />
          </Form.Item>
          <Form.Item
            name="stock"
            label="Stock"
            rules={[
              { required: true, message: 'Please enter the stock!' },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="brand"
            label="Brand"
            rules={[
              { required: true, message: 'Please enter the brand!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[
              { required: true, message: 'Please enter the category!' },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Inventory;
