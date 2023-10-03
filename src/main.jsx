import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider theme={{
        token: {
          colorPrimary: "#34495E",
          colorLink: "#16A085",
          colorBgHeader: "#34495E",
          colorBgLayout: "#FFFFFF",
          colorText: "#A9A9A9",
          fontFamily: `"Inter", "system-ui", "Avenir", "Helvetica", "Arial", "sans-serif"`       
        },
        components: {
          Button: {
            primaryShadow: "none"
          },
          Input: {
            activeShadow: "0 0 0 2.5px rgba(5, 145, 255, 0.1)"
          }
        }
      }}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
