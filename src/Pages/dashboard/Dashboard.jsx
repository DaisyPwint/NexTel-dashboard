import { Space, Typography} from 'antd';
import DashboardCard from '../../Components/dashboard-card/DashboardCard';
import PieChart from '../../Components/pie-chart/PieChart';
import styles from './dashboard.module.css';
import BarChart from '../../Components/bar-chart/BarChart';

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <Typography.Title level={2} style={{marginTop: 0}}>Overview</Typography.Title>
      <Space size={'large'} direction='horizontal'>
        <DashboardCard title="New Reservation" value={30}/>
        <DashboardCard title="Occupied Rooms" value={20}/>
        <DashboardCard title="Available Rooms" value={10} />
      </Space>
      <PieChart/>
      <BarChart/>
    </div>
  )
}

export default Dashboard