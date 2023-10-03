import { Layout,Space} from 'antd';
import DashboardCard from '../Components/DashboardCard';
const {Content} = Layout;

const Dashboard = () => {
  return (
    <Content style={{padding: "20px 0 0 20px"}}>
      <Space size={'large'} direction='horizontal'>
          <DashboardCard title="Total Rooms" value={50}/>
          <DashboardCard title="Reserved Rooms" value={10} style={{ color: '#3f8600' }}/>
          <DashboardCard title="Occupied Rooms" value={20} style={{ color: '#cf1322'}}/>
          <DashboardCard title="Available Rooms" value={20} style={{color: '#3f8600'}}/>
      </Space>
    </Content>
  )
}

export default Dashboard