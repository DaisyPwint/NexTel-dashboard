import { Layout} from 'antd';
import AppHeader from './app-header/AppHeader';
import AppContent from './AppContent';
import SideMenu from './SideMenu';

const AppLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh"}} hasSider>  
      <SideMenu/>
      <Layout style={{marginLeft: '200px'}}>
        <AppHeader />
        <AppContent/>
      </Layout>
    </Layout>
  )
}

export default AppLayout