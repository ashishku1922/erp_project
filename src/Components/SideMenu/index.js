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
          background: "#333333",
        }}
        onClick={(item) => {
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
      >
        <Menu.Item
          key="/"
          icon={<AppstoreOutlined />}
          style={{ fontSize: "18px", color: "white", backgroundColor: selectedKeys === "/" ? "black" : "transparent" }} 
        >
          Dashboard
        </Menu.Item>
        <Menu.Item
          key="/inventory"
          icon={<ShopOutlined />}
          style={{ fontSize: "18px", color: "white", backgroundColor: selectedKeys === "/inventory" ? "black" : "transparent" }} 
        >
          Products
        </Menu.Item>
        <Menu.Item
          key="/orders"
          icon={<ShoppingCartOutlined />}
          style={{ fontSize: "18px", color: "white", backgroundColor: selectedKeys === "/orders" ? "black" : "transparent" }} 
        >
          Orders
        </Menu.Item>
        <Menu.Item
          key="/customers"
          icon={<UserOutlined />}
          style={{ fontSize: "18px", color: "white", backgroundColor: selectedKeys === "/customers" ? "black" : "transparent" }} 
        >
          Customers
        </Menu.Item>
        <Menu.Item
          key="/calenders"
          icon={<CalendarOutlined />}
          style={{ marginBottom: "12px", fontSize: "18px" ,color: 'white',backgroundColor: selectedKeys === "/calenders" ? 'black' : 'transparent' }}
        >
          Orders Calender
        </Menu.Item>
      </Menu>
    </div>
  );
}
export default SideMenu;
