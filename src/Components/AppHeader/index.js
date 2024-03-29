import {Typography } from "antd";
import { useEffect, useState } from "react";
import { getOrders } from "../../API";

function AppHeader() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders().then((res) => {
      setOrders(res.products);
    });
  }, []);

  return (
    <div className="AppHeader" style={{ 
      background: "#333333",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '10px 20px',
      color: 'white',
      borderBottom: '1px solid white' 
    }}>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTezIql1STw8QKBs46ObvMwel87fo9lq_dbC7HIThnh1ADH9JviugqJQRFj9ohAWeL512E"
        alt="Logo"
        width={40}
        style={{ margin: '0 10px' }}
      />
      <Typography.Title style={{ fontFamily: 'Montserrat', fontSize: '24px', margin: '0 10px', color: 'white' }}>
        Admin Dashboard
      </Typography.Title>
    </div>
  );
}

export default AppHeader;

