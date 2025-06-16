
import React, { useState } from 'react';
import { Code, Shield, Zap, Eye, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const SmartContractSection: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const contractFeatures = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: t('smartContract.features.transparent.title'),
      description: t('smartContract.features.transparent.desc'),
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: t('smartContract.features.automated.title'),
      description: t('smartContract.features.automated.desc'),
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: t('smartContract.features.verifiable.title'),
      description: t('smartContract.features.verifiable.desc'),
      color: "from-green-500 to-teal-500"
    }
  ];

  const contractRules = [
    t('smartContract.rules.1'),
    t('smartContract.rules.2'),
    t('smartContract.rules.3'),
    t('smartContract.rules.4')
  ];

  const handleViewContract = () => {
    navigate('/how-it-works', { state: { scrollToSection: 'smartContract' } });
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-full px-6 py-3 border border-white/10 mb-6">
            <Code className="w-5 h-5 text-blue-400" />
            <span className="text-white font-medium">Smart Contract Powered</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {t('smartContract.title')}
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('smartContract.description')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Contract Features */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-white mb-6">Core Features</h3>
            
            {contractFeatures.map((feature, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className={`p-3 rounded-lg bg-gradient-to-br ${feature.color}`}>
                  {feature.icon}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Contract Rules */}
          <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6">{t('smartContract.rules.title')}</h3>
            
            <div className="space-y-4 mb-8">
              {contractRules.map((rule, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">{index + 1}</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{rule}</p>
                </div>
              ))}
            </div>

            <Button 
              onClick={handleViewContract}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
            >
              {t('smartContract.viewContract')}
              <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Contract Addresses */}
        <div className="mt-16 bg-gradient-to-r from-gray-900/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-6 text-center">{t('smartContract.addresses.title')}</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-sm font-medium text-gray-400 mb-2">{t('smartContract.addresses.pool')}</div>
              <code className="text-blue-400 font-mono text-sm break-all">
                0x6c521c6eB53361e901EC2bC1a2D392c8e9796f77
              </code>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-sm font-medium text-gray-400 mb-2">{t('smartContract.addresses.fee')}</div>
              <code className="text-purple-400 font-mono text-sm break-all">
                0x6c521c6eB53361e901EC2bC1a2D392c8e9796f77
              </code>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartContractSection;
