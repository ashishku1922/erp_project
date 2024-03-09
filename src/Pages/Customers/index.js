import { Avatar, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getCustomers, getInventory } from "../../API";

function Customers() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getCustomers().then((res) => {
      setDataSource(res.users);
      setLoading(false);
    });
  }, []);

  return (
    <div style={{
      background: ' white', 
      padding: '10px 100px 35px 45px',/* Top, Right, Bottom, Left padding */
    }}>
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>CUSTOMERS</Typography.Title>
      <Table
        loading={loading}
        columns={[
          {
            title: "Photo",
            dataIndex: "image",
            render: (link) => {
              return <Avatar src={link} />;
            },
          },
          {
            title: "First Name",
            dataIndex: "firstName",
          },
          {
            title: "LastName",
            dataIndex: "lastName",
          },
          {
            title: "Email",
            dataIndex: "email",
          },
          {
            title: "Phone",
            dataIndex: "phone",
            width: 150,
          },

          {
            title: "address",
            dataIndex: "address",
            width: 250,
            render: (address) => {
              return (
                <span>
                  {address.address}, {address.city}
                </span>
              );
            },
          },
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
        style={{
          marginTop: '20px',
          marginBottom: '-10px',
          borderRadius: '8px',
          overflow: 'hidden',
          marginLeft: '160px'
        }}
      ></Table>
    </Space>
    </div>
  );
}
export default Customers;
