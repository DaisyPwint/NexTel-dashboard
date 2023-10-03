import { useState, useEffect } from "react";
import { Menu, Layout, theme, ConfigProvider } from "antd";
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
  const [collapsed,setCollapsed] = useState(false);

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const items = [
    { label: "Dashboard", key: "/", icon: <DashboardOutlined /> },
    { label: "All Reservations", key: "/reservations", icon: <BarsOutlined /> },
    {
      label: "Room Management",
      key: "rooms",
      icon: <BarsOutlined />,
      children: [
        { label: "Room Type", key: "/room-types" },
        { label: "All Rooms", key: "/rooms" },
        { label: "Reserved Rooms", key: "/reserved-rooms" },
      ],
    },
    {
      label: "Occupancy Overview",
      key: "occupied-rooms",
      icon: <BarsOutlined />,
      children: [
        { label: "Occupied Rooms", key: "/occupied-rooms" },
        { label: "Occupation History", key: "/occupation-history" },
      ],
    },
  ];

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  }

  return (
        <Sider style={{background: colorBgHeader,paddingTop: "20px"}} collapsible collapsed={collapsed} onCollapse={toggleCollapsed}>
          <ConfigProvider theme={{
            components: {
              Menu: {
                itemSelectedColor: "#fff",
                popupBg: "#34495E",
                itemHoverBg: "#4A6380",              }
            }
          }}>
            <Menu onClick={({ key }) => {
                navigate(key);
              }}
              selectedKeys={[selectedKeys]}
              mode="inline"
              items={items}
              style={{background: colorBgHeader}}
            />
          </ConfigProvider>
        </Sider>
  );
};

export default SideMenu;
