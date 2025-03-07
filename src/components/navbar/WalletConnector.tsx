
import React, { useState } from 'react';
import { ChevronDown, LogOut, History } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from '../../context/LanguageContext';
import { useWallet, WalletType } from '../../context/WalletContext';
import { getExplorerUrl } from '../../utils/walletUtils';
import ConnectWalletModal from '../wallet/ConnectWalletModal';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

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

  const handleConnectWallet = async (type: WalletType) => {
    try {
      await connectWallet(type);
      
      // After connecting wallet, scroll to donation section
      setTimeout(() => {
        const donationSection = document.getElementById('donation-section');
        if (donationSection) {
          donationSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
      
      return Promise.resolve();
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      throw error;
    }
  };

  const formatWalletAddress = (address: string) => {
    if (!address) return '';
    return `${address.substring(0, 4)}...${address.substring(address.length - 4)}`;
  };

  const openTransaction = (txId: string) => {
    if (!txId) return;
    
    const explorerUrl = getExplorerUrl(txId, walletType);
    window.open(explorerUrl, '_blank');
  };

  // Wallet icon based on wallet type
  const renderWalletIcon = () => {
    switch (walletType) {
      case 'Phantom':
        return (
          <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2">
            <circle cx="20" cy="20" r="20" fill="#AB9FF2"/>
            <path d="M12 13C12 11.8954 12.8954 11 14 11H26C27.1046 11 28 11.8954 28 13V27C28 28.1046 27.1046 29 26 29H14C12.8954 29 12 28.1046 12 27V13Z" fill="white" stroke="white" strokeWidth="2"/>
            <circle cx="20" cy="20" r="4" fill="#AB9FF2"/>
          </svg>
        );
      case 'Solflare':
        return (
          <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2">
            <circle cx="20" cy="20" r="20" fill="white"/>
            <path d="M20 10L30 20L20 30L10 20L20 10Z" fill="#FC8E2D"/>
          </svg>
        );
      case 'OKX':
        return (
          <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2">
            <circle cx="20" cy="20" r="20" fill="white"/>
            <rect x="10" y="10" width="8" height="8" fill="black"/>
            <rect x="22" y="10" width="8" height="8" fill="black"/>
            <rect x="10" y="22" width="8" height="8" fill="black"/>
            <rect x="22" y="22" width="8" height="8" fill="black"/>
          </svg>
        );
      case 'MetaMask':
        return (
          <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2">
            <circle cx="20" cy="20" r="20" fill="white"/>
            <path d="M32.0502 8.94995L22.101 16.2262L24.3748 11.2758L32.0502 8.94995Z" fill="#E17726" stroke="#E17726" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7.9498 8.94995L17.8158 16.2927L15.6252 11.2758L7.9498 8.94995Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      {isWalletConnected ? (
        <div className="relative">
          <Button 
            variant="outline"
            className="bg-gold-500 hover:bg-gold-600 text-black border-gold-400 hover:border-gold-500 font-medium rounded-md 
                     shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform 
                     hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
            onClick={() => setShowWalletMenu(!showWalletMenu)}
          >
            {renderWalletIcon()}
            <span>{formatWalletAddress(walletAddress)}</span>
            <ChevronDown className="w-4 h-4" />
          </Button>
          
          {/* Wallet menu dropdown */}
          {showWalletMenu && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-md shadow-lg py-1 z-50">
              <div className="px-4 py-2 text-sm text-gray-700 font-medium border-b border-gray-100">
                {walletType} Wallet
              </div>
              <div className="px-4 py-2 text-xs text-gray-500 font-mono break-all">
                {walletAddress}
              </div>
              {donations.length > 0 && (
                <div className="px-4 py-2 text-xs text-gray-500">
                  <div className="flex justify-between items-center">
                    <span>Total Donated:</span>
                    <span className="font-medium text-gold-600">
                      ${donations.reduce((sum, d) => sum + d.amount, 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span>Transactions:</span>
                    <span className="font-medium text-gray-700">{donations.length}</span>
                  </div>
                </div>
              )}
              <button
                className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-red-50 text-red-600"
                onClick={() => {
                  disconnectWallet();
                  setShowWalletMenu(false);
                }}
              >
                <LogOut className="w-4 h-4 mr-3" />
                Disconnect Wallet
              </button>
              <button
                className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gold-50 text-gold-600"
                onClick={() => {
                  setShowWalletMenu(false);
                  const donationSection = document.getElementById('donation-section');
                  if (donationSection) {
                    donationSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {t('hero.donateNow')}
              </button>
            </div>
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
