import {
  AppstoreOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <div
      className="SideMenu"
      style={{
        width: "260px",
      }}
    >
      <Menu
        className="SideMenuVertical"
        mode="vertical"
        style={{
          width: "100%",
          backgroundColor: "white",
        }}
        onClick={(item) => {
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
      >
        <Menu.Item
          key="/"
          icon={<AppstoreOutlined />}
          style={{  marginBottom: "12px", fontSize: "18px" }}
        >
          Dashboard
        </Menu.Item>
        <Menu.Item
          key="/inventory"
          icon={<ShopOutlined />}
          style={{ marginBottom: "12px", fontSize: "18px" }}
        >
          Inventory
        </Menu.Item>
        <Menu.Item
          key="/orders"
          icon={<ShoppingCartOutlined />}
          style={{ marginBottom: "12px", fontSize: "18px" }}
        >
          Orders
        </Menu.Item>
        <Menu.Item
          key="/customers"
          icon={<UserOutlined />}
          style={{ marginBottom: "12px", fontSize: "18px" }}
        >
          Customers
        </Menu.Item>
        <Menu.Item
          key="/calenders"
          icon={<CalendarOutlined />}
          style={{ marginBottom: "12px", fontSize: "18px" }}
        >
          Orders Calender
        </Menu.Item>
      </Menu>
    </div>
  );
}
export default SideMenu;

