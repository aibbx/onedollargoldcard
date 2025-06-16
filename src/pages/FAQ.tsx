
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FAQHeader from '../components/faq/FAQHeader';
import FAQSection from '../components/faq/FAQSection';
import { faqSections } from '../data/faqData';

const FAQ = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gold-50/30 to-white">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24 max-w-6xl">
        <FAQHeader />
        
        <div className="space-y-6">
          {faqSections.map((section, index) => (
            <FAQSection 
              key={index} 
              title={section.title} 
              questions={section.questions} 
            />
          ))}
        </div>

        {/* Important Notice */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">Important Notice</h3>
          <p className="text-blue-700">
            This platform operates as a fully secured on-chain dApp and is not affiliated with any government agency or WFLI company.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
