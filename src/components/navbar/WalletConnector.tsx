
import React, { useState } from 'react';
import { Wallet } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from '../../context/LanguageContext';

interface WalletConnectorProps {
  isWalletConnected: boolean;
  setIsWalletConnected: React.Dispatch<React.SetStateAction<boolean>>;
}

const WalletConnector: React.FC<WalletConnectorProps> = ({ 
  isWalletConnected, 
  setIsWalletConnected 
}) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [showWalletOptions, setShowWalletOptions] = useState(false);

  const handleDonateClick = () => {
    if (isWalletConnected) {
      // If wallet is connected, scroll to donation section
      const donationSection = document.getElementById('donation-section');
      if (donationSection) {
        donationSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If wallet is not connected, show wallet options
      setShowWalletOptions(!showWalletOptions);
    }
  };

  const connectWallet = (type: string) => {
    // Mock wallet connection
    setTimeout(() => {
      setIsWalletConnected(true);
      setShowWalletOptions(false);
      toast({
        title: "Wallet Connected",
        description: `Your ${type} wallet has been connected successfully.`,
      });
    }, 1000);
  };

  return (
    <div className="relative">
      <button 
        className="btn-gold flex items-center gap-2"
        onClick={handleDonateClick}
      >
        {isWalletConnected ? t('hero.donateNow') : t('hero.donateButton')}
        {!isWalletConnected && <Wallet className="w-4 h-4" />}
      </button>

      {/* Wallet options dropdown */}
      {showWalletOptions && !isWalletConnected && (
        <div className="absolute right-0 mt-2 w-52 bg-white rounded-md shadow-lg py-1 z-50">
          <div className="px-4 py-2 text-sm text-gray-700 font-medium border-b border-gray-100">
            Select Wallet
          </div>
          <button
            className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gold-50"
            onClick={() => connectWallet('Phantom')}
          >
            <img src="/wallet-icons/phantom-icon.svg" alt="Phantom" className="w-5 h-5 mr-3" />
            Phantom
          </button>
          <button
            className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gold-50"
            onClick={() => connectWallet('Solflare')}
          >
            <img src="/wallet-icons/solflare-icon.svg" alt="Solflare" className="w-5 h-5 mr-3" />
            Solflare
          </button>
          <button
            className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gold-50"
            onClick={() => connectWallet('OKX')}
          >
            <img src="/wallet-icons/okx-icon.svg" alt="OKX" className="w-5 h-5 mr-3" />
            OKX Wallet
          </button>
          <button
            className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gold-50"
            onClick={() => connectWallet('MetaMask')}
          >
            <img src="/wallet-icons/metamask-icon.svg" alt="MetaMask" className="w-5 h-5 mr-3" />
            MetaMask
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletConnector;
