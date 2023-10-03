import React from 'react';
import { UserOutlined } from "@ant-design/icons"
import { Space,Avatar,Typography,Dropdown, Divider, theme } from "antd"

const items = [
  {
    key: '1',
    label: (
      <a target="_blank"  href="/change">
        change password
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank"  href="/reset">
        reset password
      </a>
    ),
  },
  {
    key: '3',
    danger: true,
    label: 'Log out',
  },
];

const { useToken } = theme;

const AppHeader = () => {

  const { token: {colorBgHeader}} = theme.useToken();
  const { token } = useToken();

  const contentStyle = {
    padding: "15px",
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };
  const menuStyle = {
    boxShadow: 'none',
  };

  return (
    <header style={{backgroundColor: colorBgHeader}} className="header">
      <Typography.Title style={{color: '#fff'}} level={2}>Nextel</Typography.Title>
      <Dropdown trigger={['click']}
      menu={{
        items,
      }}
      dropdownRender={(menu) => (
        <div style={contentStyle}>
          <Space
            style={{
              padding: 20,
            }}
          >
            name: admin
          </Space>
          <Divider
            style={{
              margin: 0,
            }}
          />
          {React.cloneElement(menu, {
            style: menuStyle,
          })}
        </div>
      )}
    >      
      <a onClick={(e) => e.preventDefault()}>
        <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>
          <UserOutlined/>
        </Avatar>
      </a>
    </Dropdown>
    </header>
  )
}

export default AppHeader