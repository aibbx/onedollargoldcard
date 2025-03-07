
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { Toaster } from './components/ui/toaster'
import { Toaster as SonnerToaster } from './components/ui/sonner'
import { LanguageProvider } from './context/LanguageContext.tsx'
import { WalletProvider } from './context/WalletContext.tsx'

// Buffer polyfill for browser environment
import { Buffer } from 'buffer';
// Make Buffer available globally
window.Buffer = window.Buffer || Buffer;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <WalletProvider>
          <App />
          <Toaster />
          <SonnerToaster />
        </WalletProvider>
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
