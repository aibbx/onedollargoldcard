
import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Coins, Shield, Users, Code } from 'lucide-react';
import TabButton from './TabButton';
import DonationMechanicsTab from './DonationMechanicsTab';
import WinnerSelectionTab from './WinnerSelectionTab';
import SecurityFeaturesTab from './SecurityFeaturesTab';
import SmartContractTab from './SmartContractTab';

const HowItWorks = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('donationMechanics');

  const tabs = [
    { id: 'donationMechanics', label: 'Donation Mechanics', icon: <Coins className="w-5 h-5" /> },
    { id: 'winnerSelection', label: 'Winner Selection', icon: <Users className="w-5 h-5" /> },
    { id: 'security', label: 'Security Features', icon: <Shield className="w-5 h-5" /> },
    { id: 'smartContract', label: 'Smart Contract', icon: <Code className="w-5 h-5" /> },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'donationMechanics':
        return <DonationMechanicsTab />;
      case 'winnerSelection':
        return <WinnerSelectionTab />;
      case 'security':
        return <SecurityFeaturesTab />;
      case 'smartContract':
        return <SmartContractTab />;
      default:
        return <DonationMechanicsTab />;
    }
  };

  return (
    <div>
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
      <div className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-gold-100">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default HowItWorks;
