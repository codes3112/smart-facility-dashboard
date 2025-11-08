import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { LoaderProvider } from './hooks/useLoader'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <LoaderProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </LoaderProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
