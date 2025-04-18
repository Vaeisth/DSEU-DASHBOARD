import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <queryClientProvider client={new QueryClient()}>
    <App />
    </queryClientProvider>
  </StrictMode>,
)
