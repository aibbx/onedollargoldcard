
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SmartContractViewer from '../components/smart-contract/SmartContractViewer';

const HowItWorks = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gold-50/30 to-white">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24 max-w-6xl">
        <h1 className="text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600">
          Smart Contract Code
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Complete source code of our smart contract deployed on BSC blockchain
        </p>
        
        <SmartContractViewer />
      </main>

      <Footer />
    </div>
  );
};

export default HowItWorks;
