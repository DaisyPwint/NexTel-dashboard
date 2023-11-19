import { Routes,Route } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import color from './core/color';
import { ConfigProvider } from 'antd';
import ProtectedRoute from './routing/ProtectedRoute';
import { Login, ResetPwd, ChangePwd, AddRoom, AddRoomType, AllRooms, Dashboard, Detail, EditRoomType, OccupationHistory, OccupiedRooms, Reservations, RoomType } from './pages';

const ANT_THEME = {
  token: {
    colorPrimary: color.primaryColor,
    colorLink: color.linkColor,
    colorBgHeader: color.headerBgColor,
    colorBgLayout: color.whiteColor,
    colorText: color.textColor,
    fontFamily: `"Inter", "system-ui", "Avenir", "Helvetica", "Arial", "sans-serif"`,
  },
  components: {
    Button: {
      primaryShadow: "none",
    },
    Input: {
      activeShadow: color.activeShadowColor,
    },
  },
}

const App = () => {

  return (   
    <ConfigProvider theme={ANT_THEME}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/reset" element={<ResetPwd />} />
        <Route path="/change" element={<ChangePwd />} />
        <Route path='/' element={<AppLayout />}>
          <Route index element={<Dashboard/>} />
          <Route path="add-room-type" element={<AddRoomType />}/>
          <Route path="room-type" element={<RoomType />}/>
          <Route path="room-type/:id" element={<EditRoomType />}/>
          <Route path="add-room" element={<AddRoom />}/>
          <Route path="rooms" element={<AllRooms />}/>
          <Route path="reservations" element={<Reservations />}/>
          <Route path="reservations/:id" element={<Detail />}/>
          <Route path="occupied-rooms" element={<OccupiedRooms />}/>
          <Route path="occupation-history" element={<OccupationHistory />}/>
        </Route>
      </Routes>
    </ConfigProvider>
  )
}

export default App
