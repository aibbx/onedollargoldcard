
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from '../../context/LanguageContext';
import { useWallet, WalletType } from '../../context/WalletContext';
import ConnectWalletModal from '../wallet/ConnectWalletModal';
import { Button } from '../ui/button';
import ConnectedWalletButton from '../wallet/ConnectedWalletButton';
import WalletMenu from '../wallet/WalletMenu';

const WalletConnector: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { 
    isWalletConnected, 
    walletType, 
    walletAddress, 
    connectWallet, 
    disconnectWallet,
    donations 
  } = useWallet();
  
  const [showWalletMenu, setShowWalletMenu] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);

  const handleDonateClick = () => {
    if (isWalletConnected) {
      // If wallet is connected, scroll to donation section
      const donationSection = document.getElementById('donation-section');
      if (donationSection) {
        donationSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If wallet is not connected, show wallet modal
      setShowWalletModal(true);
    }
  };

  const handleScrollToDonation = () => {
    const donationSection = document.getElementById('donation-section');
    if (donationSection) {
      donationSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleConnectWallet = async (type: WalletType) => {
    try {
      await connectWallet(type);
      
      // After connecting wallet, scroll to donation section
      setTimeout(() => {
        handleScrollToDonation();
      }, 500);
      
      return Promise.resolve();
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      throw error;
    }
  };

  return (
    <div className="relative">
      {isWalletConnected ? (
        <div className="relative">
          <ConnectedWalletButton 
            walletType={walletType} 
            walletAddress={walletAddress}
            onClick={() => setShowWalletMenu(!showWalletMenu)}
          />
          
          {/* Wallet menu dropdown */}
          {showWalletMenu && (
            <WalletMenu
              walletType={walletType}
              walletAddress={walletAddress}
              donations={donations}
              onDisconnect={disconnectWallet}
              onDonateClick={handleScrollToDonation}
              onClose={() => setShowWalletMenu(false)}
            />
          )}
        </div>
      ) : (
        <Button 
          variant="default"
          className="bg-gold-500 hover:bg-gold-600 text-black font-medium rounded-md 
                   shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform 
                   hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
          onClick={handleDonateClick}
        >
          Connect Wallet
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
            <rect width="24" height="24" rx="4" fill="currentColor" opacity="0.2"/>
            <path d="M18 7.5H6C5.17157 7.5 4.5 8.17157 4.5 9V15C4.5 15.8284 5.17157 16.5 6 16.5H18C18.8284 16.5 19.5 15.8284 19.5 15V9C19.5 8.17157 18.8284 7.5 18 7.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16.5 13.5C17.3284 13.5 18 12.8284 18 12C18 11.1716 17.3284 10.5 16.5 10.5C15.6716 10.5 15 11.1716 15 12C15 12.8284 15.6716 13.5 16.5 13.5Z" fill="currentColor"/>
          </svg>
        </Button>
      )}

      {/* Wallet connect modal */}
      <ConnectWalletModal
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
        onConnectWallet={handleConnectWallet}
      />
    </div>
  );
};

export default WalletConnector;
