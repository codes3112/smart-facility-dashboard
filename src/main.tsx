import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { LoaderProvider } from './hooks/useLoader'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <LoaderProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
      </LoaderProvider>
    </BrowserRouter>
  </StrictMode>,
)
