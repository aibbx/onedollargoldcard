
import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Coins, Shield, Users, Cpu } from 'lucide-react';
import TabButton from './TabButton';
import DonationMechanicsTab from './DonationMechanicsTab';
import WinnerSelectionTab from './WinnerSelectionTab';
import SecurityFeaturesTab from './SecurityFeaturesTab';
import WhySolanaTab from './WhySolanaTab';

const HowItWorks = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('donationMechanics');

  const tabs = [
    { id: 'donationMechanics', label: 'Donation Mechanics', icon: <Coins className="w-5 h-5" /> },
    { id: 'winnerSelection', label: 'Winner Selection', icon: <Users className="w-5 h-5" /> },
    { id: 'security', label: 'Security Features', icon: <Shield className="w-5 h-5" /> },
    { id: 'whySolana', label: 'Why Solana?', icon: <Cpu className="w-5 h-5" /> },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'donationMechanics':
        return <DonationMechanicsTab />;
      case 'winnerSelection':
        return <WinnerSelectionTab />;
      case 'security':
        return <SecurityFeaturesTab />;
      case 'whySolana':
        return <WhySolanaTab />;
      default:
        return <DonationMechanicsTab />;
    }
  };

  const scrollToDonationSection = () => {
    const donationSection = document.getElementById('donation-section');
    if (donationSection) {
      donationSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="how-it-works" className="py-24 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-6">{t('howItWorks.title')}</h2>
          <div className="w-20 h-1 bg-gold-400 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-3xl mx-auto mb-8">
            Our platform uses blockchain technology to ensure transparency and fairness
            in the process of selecting winners for the Gold Card program.
          </p>
          <button 
            onClick={scrollToDonationSection}
            className="btn-gold inline-flex items-center gap-2"
          >
            {t('hero.donateNow')}
          </button>
        </div>
        
        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              id={tab.id}
              label={tab.label}
              icon={tab.icon}
              isActive={activeTab === tab.id}
              onClick={setActiveTab}
            />
          ))}
        </div>
        
        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
          {renderTabContent()}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
