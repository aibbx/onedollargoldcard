
import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { cn } from '@/lib/utils';
import { CheckCircle, ShieldCheck, Users, BarChart3, Award, Lock, Globe, Verified } from 'lucide-react';

const Features = () => {
  const { t } = useLanguage();
  
  const featureItemRef = (index: number) => {
    return {
      style: { '--delay': String(index * 2) } as React.CSSProperties,
      className: 'reveal-animation'
    };
  };
  
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center">
              <Award className="w-8 h-8 text-gold-400" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-blue-900" style={{ fontFamily: 'Georgia, serif' }}>
            OFFICIAL PLATFORM FEATURES
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built with federal-grade security standards and blockchain transparency for the Gold Card initiative
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 - Government Grade Security */}
          <div 
            className="bg-white rounded-xl p-8 shadow-xl border-l-4 border-blue-600 hover:shadow-2xl hover:transform hover:scale-[1.02] transition-all duration-300"
            {...featureItemRef(0)}
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-6 mx-auto">
              <ShieldCheck size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-center text-blue-900 uppercase tracking-wide">
              Federal Security
            </h3>
            <p className="text-gray-600 text-center leading-relaxed">
              Government-grade blockchain security with full transaction transparency and federal compliance oversight.
            </p>
          </div>
          
          {/* Feature 2 - Official Authorization */}
          <div 
            className="bg-white rounded-xl p-8 shadow-xl border-l-4 border-gold-500 hover:shadow-2xl hover:transform hover:scale-[1.02] transition-all duration-300"
            {...featureItemRef(1)}
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gold-100 text-gold-600 mb-6 mx-auto">
              <Verified size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-center text-blue-900 uppercase tracking-wide">
              Official Initiative
            </h3>
            <p className="text-gray-600 text-center leading-relaxed">
              Authorized platform supporting the official Gold Card program with minimum $1.05 USD1 participation.
            </p>
          </div>
          
          {/* Feature 3 - Democratic Access */}
          <div 
            className="bg-white rounded-xl p-8 shadow-xl border-l-4 border-green-500 hover:shadow-2xl hover:transform hover:scale-[1.02] transition-all duration-300"
            {...featureItemRef(2)}
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6 mx-auto">
              <Users size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-center text-blue-900 uppercase tracking-wide">
              Equal Opportunity
            </h3>
            <p className="text-gray-600 text-center leading-relaxed">
              Democratic access to US residency opportunities through the official Gold Card pathway.
            </p>
          </div>
          
          {/* Feature 4 - Blockchain Verified */}
          <div 
            className="bg-white rounded-xl p-8 shadow-xl border-l-4 border-purple-500 hover:shadow-2xl hover:transform hover:scale-[1.02] transition-all duration-300"
            {...featureItemRef(3)}
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-600 mb-6 mx-auto">
              <Globe size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-center text-blue-900 uppercase tracking-wide">
              Global Platform
            </h3>
            <p className="text-gray-600 text-center leading-relaxed">
              Worldwide accessibility with EVM blockchain integration and multi-chain USD1 support.
            </p>
          </div>
        </div>

        {/* Additional Trust Section */}
        <div className="mt-16 bg-blue-900 rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4 text-gold-400">COMPLIANCE & OVERSIGHT</h3>
            <div className="w-20 h-1 bg-gold-400 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Lock className="w-12 h-12 text-blue-300 mx-auto mb-4" />
              <h4 className="font-bold text-lg mb-2">Secure Infrastructure</h4>
              <p className="text-blue-200">Advanced encryption and blockchain security protocols</p>
            </div>
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-blue-300 mx-auto mb-4" />
              <h4 className="font-bold text-lg mb-2">Transparent Tracking</h4>
              <p className="text-blue-200">Real-time monitoring of all contributions and distributions</p>
            </div>
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-blue-300 mx-auto mb-4" />
              <h4 className="font-bold text-lg mb-2">Regulatory Compliance</h4>
              <p className="text-blue-200">Full adherence to federal guidelines and oversight requirements</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
