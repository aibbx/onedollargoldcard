
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const HowItWorks = () => {
  const { t } = useLanguage();

  return (
    <section id="how-it-works" className="py-24 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-6">{t('howItWorks.title')}</h2>
          <div className="w-20 h-1 bg-gold-400 mx-auto"></div>
        </div>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gold-200"></div>
          
          <div className="space-y-12 relative">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12 md:text-right mb-8 md:mb-0">
                <div className="slide-up" style={{ '--delay': '0' } as React.CSSProperties}>
                  <span className="inline-block text-gold-600 text-lg font-bold mb-2">Step 1</span>
                  <h3 className="text-2xl font-bold mb-3">{t('howItWorks.step1.title')}</h3>
                  <p className="text-gray-600">{t('howItWorks.step1.desc')}</p>
                </div>
              </div>
              
              <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-gold-500 border-4 border-white text-white font-bold z-10">
                1
              </div>
              
              <div className="md:w-1/2 md:pl-12">
                <div className="bg-white p-6 rounded-lg shadow-md slide-up" style={{ '--delay': '1' } as React.CSSProperties}>
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gold-100 mb-4 mx-auto md:mx-0">
                    <svg className="w-8 h-8 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12 md:text-right order-1 md:order-2 mb-8 md:mb-0">
                <div className="bg-white p-6 rounded-lg shadow-md slide-up" style={{ '--delay': '3' } as React.CSSProperties}>
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gold-100 mb-4 mx-auto md:mx-0 md:ml-auto">
                    <svg className="w-8 h-8 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-gold-500 border-4 border-white text-white font-bold z-10">
                2
              </div>
              
              <div className="md:w-1/2 md:pl-12 order-2 md:order-1">
                <div className="slide-up" style={{ '--delay': '2' } as React.CSSProperties}>
                  <span className="inline-block text-gold-600 text-lg font-bold mb-2">Step 2</span>
                  <h3 className="text-2xl font-bold mb-3">{t('howItWorks.step2.title')}</h3>
                  <p className="text-gray-600">{t('howItWorks.step2.desc')}</p>
                </div>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12 md:text-right mb-8 md:mb-0">
                <div className="slide-up" style={{ '--delay': '4' } as React.CSSProperties}>
                  <span className="inline-block text-gold-600 text-lg font-bold mb-2">Step 3</span>
                  <h3 className="text-2xl font-bold mb-3">{t('howItWorks.step3.title')}</h3>
                  <p className="text-gray-600">{t('howItWorks.step3.desc')}</p>
                </div>
              </div>
              
              <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-gold-500 border-4 border-white text-white font-bold z-10">
                3
              </div>
              
              <div className="md:w-1/2 md:pl-12">
                <div className="bg-white p-6 rounded-lg shadow-md slide-up" style={{ '--delay': '5' } as React.CSSProperties}>
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gold-100 mb-4 mx-auto md:mx-0">
                    <svg className="w-8 h-8 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Step 4 */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12 md:text-right order-1 md:order-2 mb-8 md:mb-0">
                <div className="bg-white p-6 rounded-lg shadow-md slide-up" style={{ '--delay': '7' } as React.CSSProperties}>
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gold-100 mb-4 mx-auto md:mx-0 md:ml-auto">
                    <svg className="w-8 h-8 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-gold-500 border-4 border-white text-white font-bold z-10">
                4
              </div>
              
              <div className="md:w-1/2 md:pl-12 order-2 md:order-1">
                <div className="slide-up" style={{ '--delay': '6' } as React.CSSProperties}>
                  <span className="inline-block text-gold-600 text-lg font-bold mb-2">Step 4</span>
                  <h3 className="text-2xl font-bold mb-3">{t('howItWorks.step4.title')}</h3>
                  <p className="text-gray-600">{t('howItWorks.step4.desc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center bg-white p-8 rounded-xl shadow-md max-w-2xl mx-auto">
          <div className="inline-block bg-gold-100 text-gold-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">
            Backup Mechanism
          </div>
          <p className="text-gray-700">
            {t('pool.backupInfo')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
