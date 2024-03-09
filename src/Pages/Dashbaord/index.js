import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Space, Statistic, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getCustomers, getInventory, getOrders, getRevenue } from "../../API";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [orders, setOrders] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    getOrders().then((res) => {
      setOrders(res.total);
      setRevenue(res.discountedTotal);
    });
    getInventory().then((res) => {
      setInventory(res.total);
    });
    getCustomers().then((res) => {
      setCustomers(res.total);
    });
  }, []);

  return (
    <div
      style={{
        background: "white",
        padding: "10px 100px 55px 45px", // Top, Right, Bottom, Left padding
      }}
    >
      <Space size={15} direction="vertical">
        <Typography.Title level={4}>DASHBOARD</Typography.Title>
        <Space direction="horizontal" size={50}>
          <DashboardCard
            icon={
              <ShoppingCartOutlined
                style={{
                  color: "green",
                  backgroundColor: "black",
                  borderRadius: 20,
                  fontSize: 50,
                  padding: 15,
                }}
              />
            }
            title={"Orders"}
            value={orders}
            backgroundStyle={{
              background: "WHITE",
              color: 'white',
            }}
            titleStyle={{
              color: 'white',
            }}
          />
          <DashboardCard
            icon={
              <ShoppingOutlined
                style={{
                  color: "blue",
                  backgroundColor: "black",
                  borderRadius: 20,
                  fontSize: 50,
                  padding: 15,
                }}
              />
            }
            title={"Inventory"}
            value={inventory}
            backgroundStyle={{
              background: "WHITE",
              color: 'white',
            }}
            titleStyle={{
              color: 'white',
            }}
          />
          <DashboardCard
            icon={
              <UserOutlined
                style={{
                  color: "purple",
                  backgroundColor: "black",
                  borderRadius: 20,
                  fontSize: 50,
                  padding: 15,
                }}
              />
            }
            title={"Customer"}
            value={customers}
            backgroundStyle={{
              background: "WHITE",
              color: 'white',
            }}
            titleStyle={{
              color: 'white',
            }}
          />
          <DashboardCard
            icon={
              <DollarCircleOutlined
                style={{
                  color: "red",
                  backgroundColor: "black",
                  borderRadius: 20,
                  fontSize: 50,
                  padding: 15,
                }}
              />
            }
            title={"Revenue"}
            value={revenue}
            backgroundStyle={{
              background: "WHITE",
              color: 'white',
            }}
            titleStyle={{
              color: 'white',
            }}
          />
        </Space>
        <Space>
          <RecentOrders />
          <DashboardChart />
        </Space>
      </Space>
    </div>
  );
}

function DashboardCard({ title, value, icon, backgroundStyle, titleStyle }) {
  return (
    <Card
      style={{
        width: 250,
        height: 120,
        ...(backgroundStyle ? backgroundStyle : {}),
      }}
    >
      <Space direction="horizontal" size={30} style={{ fontSize: 50 }}>
        {icon}
        <Statistic title={title} value={value} style={titleStyle} />
      </Space>
    </Card>
  );
}

function RecentOrders() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getOrders().then((res) => {
      setDataSource(res.products.splice(0, 3));
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Typography.Title level={4}>RECENT ORDERS</Typography.Title>
      <Table
        columns={[
          {
            title: "Title",
            dataIndex: "title",
            width: 215,
          },
          {
            title: "Quantity",
            dataIndex: "quantity",
            width: 185,
          },
          {
            title: "Price",
            dataIndex: "discountedPrice",
            width: 150,
          },
        ]}
        loading={loading}
        dataSource={dataSource}
        pagination={false}
        style={{
          marginTop: "20px",
          marginBottom: "20px",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      ></Table>
    </>
  );
}

function DashboardChart() {
  const [revenueData, setRevenueData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    getRevenue().then((res) => {
      const labels = res.carts.map((cart) => {
        return `User-${cart.userId}`;
      });
      const data = res.carts.map((cart) => {
        return cart.discountedTotal;
      });

      const dataSource = {
        labels,
        datasets: [
          {
            label: "Revenue",
            data: data,
            backgroundColor: "black",
          },
        ],
      };

      setRevenueData(dataSource);
    });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Order Revenue",
      },
    },
  };

  return (
    <Card style={{ width: 560, height: 300, marginTop: 20, marginLeft: 38 }}>
      <Bar options={options} data={revenueData} />
    </Card>
  );
}

export default Dashboard;
