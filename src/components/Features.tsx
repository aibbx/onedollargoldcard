
import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { cn } from '@/lib/utils';
import { CheckCircle, ShieldCheck, Users, BarChart3 } from 'lucide-react';

const Features = () => {
  const { t } = useLanguage();
  
  const featureItemRef = (index: number) => {
    return {
      style: { '--delay': String(index * 2) } as React.CSSProperties,
      className: 'reveal-animation'
    };
  };
  
  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-6">{t('features.title')}</h2>
          <div className="w-20 h-1 bg-gold-400 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <div 
            className="glass-card rounded-xl p-8 transition-all duration-300 hover:shadow-xl hover:transform hover:scale-[1.02]"
            {...featureItemRef(0)}
          >
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gold-100 text-gold-600 mb-6 mx-auto">
              <CheckCircle size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-center">
              {t('features.transparent.title')}
            </h3>
            <p className="text-gray-600 text-center">
              {t('features.transparent.desc')}
            </p>
          </div>
          
          {/* Feature 2 */}
          <div 
            className="glass-card rounded-xl p-8 transition-all duration-300 hover:shadow-xl hover:transform hover:scale-[1.02]"
            {...featureItemRef(1)}
          >
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gold-100 text-gold-600 mb-6 mx-auto">
              <Users size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-center">
              {t('features.accessible.title')}
            </h3>
            <p className="text-gray-600 text-center">
              {t('features.accessible.desc')}
            </p>
          </div>
          
          {/* Feature 3 */}
          <div 
            className="glass-card rounded-xl p-8 transition-all duration-300 hover:shadow-xl hover:transform hover:scale-[1.02]"
            {...featureItemRef(2)}
          >
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gold-100 text-gold-600 mb-6 mx-auto">
              <BarChart3 size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-center">
              {t('features.fair.title')}
            </h3>
            <p className="text-gray-600 text-center">
              {t('features.fair.desc')}
            </p>
          </div>
          
          {/* Feature 4 */}
          <div 
            className="glass-card rounded-xl p-8 transition-all duration-300 hover:shadow-xl hover:transform hover:scale-[1.02]"
            {...featureItemRef(3)}
          >
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gold-100 text-gold-600 mb-6 mx-auto">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-center">
              {t('features.secure.title')}
            </h3>
            <p className="text-gray-600 text-center">
              {t('features.secure.desc')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
