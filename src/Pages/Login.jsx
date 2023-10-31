import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, theme, Typography } from 'antd';

const App = () => {
  const { token: {colorBgHeader}} = theme.useToken();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <>
      <Typography.Title style={{color: colorBgHeader,textAlign: "center",marginTop: "60px"}} level={1}>Change Password</Typography.Title>
      <Form
      name="normal_login"
      className="form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your name!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Name" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your confirm Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Confirm Password"
          />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form.Item>
        <Form.Item style={{textAlign: 'center'}}>
          <a className="login-form-forgot" href="/reset">
            Reset password
          </a>
        </Form.Item>
      </Form>
    </>
  );
};
export default App;