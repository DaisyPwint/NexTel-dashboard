import './App.css';
import { Routes,Route } from 'react-router-dom';
import Login from './Pages/Login';
import ResetPwd from './Pages/ResetPassword';
import ChangePwd from './Pages/ChangePassword';
import AppLayout from './Components/AppLayout';

const App = () => {
  return (   
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/reset" element={<ResetPwd />} />
      <Route path="/change" element={<ChangePwd />} />
      <Route path="*" element={<AppLayout />} />
    </Routes>
  )
}

export default App