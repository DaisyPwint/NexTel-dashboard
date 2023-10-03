import { LockOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';

const ChangePassword = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
      <Form
      name="normal_login"
      className="form"
      onFinish={onFinish}
    >
        <Form.Item
          name="oldpassword"
          rules={[
            {
              required: true,
              message: 'Please input your old Password',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Old Password"
          />
        </Form.Item>
        <Form.Item
          name="newpassword"
          rules={[
            {
              required: true,
              message: 'Please input your new Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="New Password"
          />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit" className="login-form-button">
            Change Password
          </Button>
        </Form.Item>
      </Form>
  )
}

export default ChangePassword