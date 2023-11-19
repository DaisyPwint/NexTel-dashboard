import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Button, Form, Input,Space, Typography,theme } from 'antd';
// import {SubmitButton} from '../components';
import { useResetPwdMutation } from "../features/auth/authApiSlice";
import styles from './security.module.css';

const App = () => {
  const [form] = Form.useForm();
  const { token: {colorBgHeader}} = theme.useToken();
  const navigate = useNavigate();
  const [resetPwd,{isLoading,error}] = useResetPwdMutation();
  const [statusMessage, setStatusMessage] = useState(null);

  const onFinish = async (values) => {
    try{
      const {data} = await resetPwd(values);
      if(data.success){
        setStatusMessage(data.message);
        navigate('/login');
      }else{
        setStatusMessage("Reset Password is not successful");
      }
    }catch(error){
      if(error.status === 400){
        console.error("User not found with");
      }else{
        console.error("An error occured:",error);
      }
    }    
  };

  return (
    <>
      <Typography.Title style={{color: colorBgHeader,textAlign: "center",marginTop: "60px"}} level={1}>Reset Password</Typography.Title>
      <Form form={form} className={styles.form} name="validateOnly" layout="vertical" autoComplete="off" onFinish={onFinish}>
      {statusMessage && <p>{statusMessage}</p>}
      {error && <p>Error Status: {error.status}</p>}
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
      <Button type="primary" htmlType="submit" className="login-form-button" disabled={isLoading}>
              {isLoading? 'loading...' : 'Reset Password'}
            </Button>
        {/* <Space>
          <SubmitButton form={form} />
          <Button htmlType="reset" disabled={isLoading}>{isLoading ? 'loading...' : 'Reset Password'}</Button>
        </Space> */}
      </Form.Item>
      </Form>
    </>
  );
};
export default App;
