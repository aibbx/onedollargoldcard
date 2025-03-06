
import React, { useState } from 'react';
import { Wallet, ChevronDown, LogOut, History } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from '../../context/LanguageContext';
import { useWallet, WalletType } from '../../context/WalletContext';
import { getExplorerUrl } from '../../utils/walletUtils';

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
  const [showWalletOptions, setShowWalletOptions] = useState(false);
  const [showWalletMenu, setShowWalletMenu] = useState(false);

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

  const handleConnectWallet = async (type: WalletType) => {
    try {
      await connectWallet(type);
      setShowWalletOptions(false);
      
      // After connecting wallet, scroll to donation section
      setTimeout(() => {
        const donationSection = document.getElementById('donation-section');
        if (donationSection) {
          donationSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
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

  return (
    <div className="relative">
      {isWalletConnected ? (
        <div className="relative">
          <button 
            className="btn-gold flex items-center gap-2"
            onClick={() => setShowWalletMenu(!showWalletMenu)}
          >
            <span>{formatWalletAddress(walletAddress)}</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          
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
        <button 
          className="btn-gold flex items-center gap-2"
          onClick={handleDonateClick}
        >
          {t('hero.donateButton')}
          <Wallet className="w-4 h-4" />
        </button>
      )}

      {/* Wallet options dropdown */}
      {showWalletOptions && !isWalletConnected && (
        <div className="absolute right-0 mt-2 w-52 bg-white rounded-md shadow-lg py-1 z-50">
          <div className="px-4 py-2 text-sm text-gray-700 font-medium border-b border-gray-100">
            Select Wallet
          </div>
          <button
            className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gold-50"
            onClick={() => handleConnectWallet('Phantom')}
          >
            <img src="/wallet-icons/phantom-icon.svg" alt="Phantom" className="w-5 h-5 mr-3" />
            Phantom
          </button>
          <button
            className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gold-50"
            onClick={() => handleConnectWallet('Solflare')}
          >
            <img src="/wallet-icons/solflare-icon.svg" alt="Solflare" className="w-5 h-5 mr-3" />
            Solflare
          </button>
          <button
            className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gold-50"
            onClick={() => handleConnectWallet('OKX')}
          >
            <img src="/wallet-icons/okx-icon.svg" alt="OKX" className="w-5 h-5 mr-3" />
            OKX Wallet
          </button>
          <button
            className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gold-50"
            onClick={() => handleConnectWallet('MetaMask')}
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
