
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Coins, Shield, Users, Code } from 'lucide-react';
import { Button } from '../components/ui/button';
import TabButton from '../components/how-it-works/TabButton';
import DonationMechanicsTab from '../components/how-it-works/DonationMechanicsTab';
import WinnerSelectionTab from '../components/how-it-works/WinnerSelectionTab';
import SecurityFeaturesTab from '../components/how-it-works/SecurityFeaturesTab';
import SmartContractTab from '../components/how-it-works/SmartContractTab';

const HowItWorks = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = React.useState('donationMechanics');

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
    <div className="min-h-screen bg-gradient-to-b from-white via-gold-50/30 to-white">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24 max-w-6xl">
        <h1 className="text-4xl font-bold text-left mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600">
          {t('howItWorks.title')}
        </h1>
        <p className="text-left text-gray-600 mb-12 max-w-2xl">
          Our platform uses blockchain technology to ensure transparency and fairness
          in the process of selecting winners for the Gold Card program.
        </p>
        
        <div className="flex flex-wrap justify-start gap-2 mb-8">
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
        
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-gold-100 transition-all duration-300 hover:shadow-lg">
          {renderTabContent()}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HowItWorks;
