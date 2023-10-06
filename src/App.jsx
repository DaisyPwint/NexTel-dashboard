import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import ResetPwd from "./Pages/ResetPassword";
import ChangePwd from "./Pages/ChangePassword";
import AppLayout from "./Components/AppLayout";
import color from "./core/color";
import { ConfigProvider } from "antd";

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
};

const App = () => {
  return (
    <ConfigProvider theme={ANT_THEME}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/reset" element={<ResetPwd />} />
        <Route path="/change" element={<ChangePwd />} />
        <Route path="*" element={<AppLayout />} />
      </Routes>
    </ConfigProvider>
  );
};

export default App;
