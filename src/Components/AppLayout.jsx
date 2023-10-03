import { Layout,Space} from 'antd';
// import AppHeader from './Components/AppHeader';
// import AppContent from './Components/AppContent';
// import SideMenu from './Components/SideMenu';
// import AppFooter from './Components/AppFooter';
import AppHeader from './AppHeader';
import AppContent from './AppContent';
import SideMenu from './SideMenu';
import AppFooter from './AppFooter';

const AppLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh"}}>  
      <AppHeader />
      <Layout>
        <SideMenu/>
        <Space direction='vertical' style={{flex: 1}}>
          <AppContent/>
          <AppFooter/>
        </Space>
      </Layout>
    </Layout>
  )
}

export default AppLayout