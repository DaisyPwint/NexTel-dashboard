import { UserOutlined } from '@ant-design/icons';
import { Card, Typography, Space } from 'antd';
import styles from './dashboardCard.module.css';

const DashboardCard = ({title,value,style}) => {
  return (
    <Space direction='horizontal'>
      <Card className={styles.card}>
        <Space direction="horizontal" size={'large'}>
          <UserOutlined className={styles.icon}/>
          <Space direction='vertical'>
            <Typography.Text>{title}</Typography.Text>
            <Typography.Title level={2} className={styles.title}>{value}</Typography.Title>
          </Space>
        </Space>
      </Card>
    </Space>
  )
}

export default DashboardCard