// import { useEffect } from 'react';
import { Space, Typography} from 'antd';
import styles from './dashboard.module.css';
import { DashboardCard,PieChart,BarChart } from '../../components';
import { useNewReserveQuery } from '../../features/reservation/reserveApiSlice';

const Dashboard = () => {
  const { data: newReserveCount, isLoading, error } = useNewReserveQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={styles.container}>
      <Typography.Title level={2} style={{marginTop: 0}}>Overview</Typography.Title>
      <Space size={'large'} direction='horizontal'>
        <DashboardCard title="New Reservation" value={newReserveCount}/>
        <DashboardCard title="Occupied Rooms" value={20}/>
        <DashboardCard title="Available Rooms" value={10} />
      </Space>
      <PieChart/>
      <BarChart/>
    </div>
  )
}

export default Dashboard