import { useState, useEffect } from "react";
import { Menu, Layout, theme, ConfigProvider, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BarsOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
const { Sider } = Layout;

const SideMenu = () => {
  const { token: {colorBgHeader}} = theme.useToken();
  
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const items = [
    { label: "Dashboard", key: "/", icon: <DashboardOutlined /> },
    { label: "Reservations", key: "/reservations", icon: <BarsOutlined /> },
    {
      label: "Room",
      key: "room",
      icon: <BarsOutlined />,
      children: [
        { label: "types", key: "/room-type" },
        { label: "lists", key: "/rooms" },
      ],
    },
    {
      label: "Occupation",
      key: "occupied-rooms",
      icon: <BarsOutlined />,
      children: [
        { label: "lists", key: "/occupied-rooms" },
        { label: "Histories", key: "/occupation-history" },
      ],
    },
  ];

  return (
        <Sider width={200} style={{
          background: colorBgHeader,
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          zIndex: 2,
          bottom: 0
          }} 
          >
          <ConfigProvider theme={{
            components: {
              Menu: {
                itemSelectedColor: "#fff",
                popupBg: "#34495E",
                itemHoverBg: "#4A6380",}
            }
          }}>
            <Typography.Title style={{marginTop: '0.5em',display: 'flex',justifyContent: 'center',alignContent: 'center'}}>N</Typography.Title>
            <Menu onClick={({ key }) => {
                navigate(key);
              }}
              selectedKeys={[selectedKeys]}
              mode="inline"
              items={items}
              style={{background: colorBgHeader,
              }}
            />
          </ConfigProvider>
        </Sider>
  );
};

export default SideMenu;
