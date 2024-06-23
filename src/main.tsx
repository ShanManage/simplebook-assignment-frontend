import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ConfigProvider, ThemeConfig } from 'antd'
import { AuthProvider } from './utils/helpers'
import { Providers } from './redux'

const config: ThemeConfig = {
  components: {
    Button: {
      colorPrimary: '#5570F1'
    },
    Pagination: {
      borderRadius: 20,
      itemActiveBg: '#4387F0',
      colorPrimary: '#f8f8f8',
      colorPrimaryHover: '#f8f8f8'
    }
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers>
      <AuthProvider>
        <ConfigProvider theme={config}>
          <App />
        </ConfigProvider>
      </AuthProvider>
    </Providers>
  </React.StrictMode>,
)
