
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from './context/LanguageContext';
import { WalletProvider } from './context/WalletContext';
import Index from './pages/Index';
import FAQ from './pages/FAQ';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <WalletProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </WalletProvider>
      </LanguageProvider>
    </HelmetProvider>
  );
}

export default App;
