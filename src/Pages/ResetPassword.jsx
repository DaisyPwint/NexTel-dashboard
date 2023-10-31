import { UserOutlined } from '@ant-design/icons';
import { Button, Form, Input,Space, Typography,theme } from 'antd';
import SubmitButton from '../Components/SubmitButton';

const App = () => {
  const [form] = Form.useForm();
  const { token: {colorBgHeader}} = theme.useToken();
  
  const onFinish = (values) => {
    console.log('Finish:', values);
  };
  return (
    <>
      <Typography.Title style={{color: colorBgHeader,textAlign: "center",marginTop: "60px"}} level={1}>Reset Password</Typography.Title>
      <Form form={form} className='form' name="validateOnly" layout="vertical" autoComplete="off" onFinish={onFinish}>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your name!',
          },
        ]}
      >
        <Input autoComplete='off' prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Name" />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 12, offset: 3 }}>
        <Space>
          <SubmitButton form={form} />
          <Button htmlType="reset">Cancel</Button>
        </Space>
      </Form.Item>
      </Form>
    </>
  );
};
export default App;
