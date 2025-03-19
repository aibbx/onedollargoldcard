
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from '../../context/LanguageContext';
import { useWallet } from '../../context/WalletContext';
import { WalletType } from '../../types/wallet';
import ConnectWalletModal from '../wallet/ConnectWalletModal';
import { Button } from '../ui/button';
import ConnectedWalletButton from '../wallet/ConnectedWalletButton';
import WalletMenu from '../wallet/WalletMenu';
import { Wallet, Plug, ChevronRight } from 'lucide-react';

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
          className="bg-gold-gradient hover:shadow-gold-500/30 border border-gold-300
                   text-black font-semibold px-5 py-2.5 rounded-lg
                   shadow-lg transition-all duration-300 ease-out transform 
                   hover:scale-[1.03] active:scale-[0.98] flex items-center gap-2 relative overflow-hidden group"
          onClick={handleDonateClick}
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-gold-300/20 via-transparent to-transparent 
                         -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></span>
          <Wallet className="w-4 h-4 text-gold-900" />
          <span>Connect Wallet</span>
          <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
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
