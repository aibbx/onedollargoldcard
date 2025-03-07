
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HowItWorksContent from '../components/how-it-works/HowItWorks';

const HowItWorks = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gold-50/30 to-white">
      <Navbar />
      
      <main>
        <div className="text-center pt-32 pb-12">
          <h1 className="text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600">
            {t('howItWorks.title')}
          </h1>
          <div className="w-20 h-1 bg-gold-400 mx-auto mb-6"></div>
        </div>
        
        <HowItWorksContent />
      </main>

      <Footer />
    </div>
  );
};

export default HowItWorks;
