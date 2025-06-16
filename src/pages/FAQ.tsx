
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Navbar from '../components/Navbar';
import FAQHeader from '../components/faq/FAQHeader';
import FAQSection from '../components/faq/FAQSection';
import SmartContractSection from '../components/SmartContractSection';
import { faqSections } from '../data/faqData';

const FAQ = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gold-50/30 to-white">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24 max-w-6xl">
        <FAQHeader />
        
        {/* Smart Contract Section */}
        <div className="mb-12">
          <SmartContractSection />
        </div>
        
        <div className="space-y-6">
          {faqSections.map((section, index) => (
            <FAQSection 
              key={index} 
              title={section.title} 
              questions={section.questions} 
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default FAQ;
