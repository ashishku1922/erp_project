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
        padding: "10px 20px",
      }}
    >
      <Typography.Title
        level={4}
        style={{ textAlign: "center", marginBottom: "20px" }}
      >
        DASHBOARD
      </Typography.Title>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            flexWrap: "wrap", 
          }}
        >
          <DashboardCard
            icon={<ShoppingCartOutlined />}
            title={"Orders"}
            value={orders}
            
          />
          <DashboardCard
            icon={<ShoppingOutlined />}
            title={"Inventory"}
            value={inventory}
          />
          <DashboardCard
            icon={<UserOutlined />}
            title={"Customer"}
            value={customers}
          />
          <DashboardCard
            icon={<DollarCircleOutlined />}
            title={"Revenue"}
            value={revenue}
          />
        </div>
        <Space style={{ marginTop: "20px" }} direction="horizontal">
          <RecentOrders />
          <DashboardChart />
        </Space>
      </div>
    </div>
  );
}

function DashboardCard({ title, value, icon }) {
  return (
    <Card style={{ width: 250, marginBottom: "20px", marginRight: "20px" }}>
      <Space direction="horizontal" size={30} style={{ fontSize: 50 }}>
        {icon}
        <Statistic title={title} value={value} />
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
    <div style={{ marginRight: "20px" , marginTop:"-65px" }}>
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
          borderRadius: "8px",
          overflow: "hidden",
        }}
      ></Table>
    </div>
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
    <div>
      <div style={{ width: "560px", height: "300px" }}>
        <Bar options={options} data={revenueData} />
      </div>
    </div>
  );
}

export default Dashboard;
