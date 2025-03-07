
import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { X, AlertCircle } from 'lucide-react';
import { WalletType } from '../../types/wallet';
import { Link } from 'react-router-dom';

interface ConnectWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnectWallet: (type: WalletType) => Promise<void>;
}

// Wallet configuration with native logo URLs
const walletConfig = [
  {
    type: 'Phantom' as WalletType,
    name: 'Phantom',
    logoUrl: 'https://phantom.app/favicon.ico'
  },
  {
    type: 'Solflare' as WalletType,
    name: 'Solflare',
    logoUrl: 'https://solflare.com/favicon.ico'
  },
  {
    type: 'OKX' as WalletType,
    name: 'OKX Wallet',
    logoUrl: 'https://www.okx.com/favicon.ico'
  },
  {
    type: 'MetaMask' as WalletType,
    name: 'MetaMask',
    logoUrl: 'https://metamask.io/favicon.ico'
  }
];

const ConnectWalletModal: React.FC<ConnectWalletModalProps> = ({ 
  isOpen, 
  onClose, 
  onConnectWallet 
}) => {
  const { t } = useLanguage();
  const [logoErrors, setLogoErrors] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const handleWalletConnect = async (type: WalletType) => {
    try {
      await onConnectWallet(type);
      onClose();
    } catch (error) {
      console.error(`Failed to connect ${type} wallet:`, error);
    }
  };

  const handleLogoError = (type: string) => {
    setLogoErrors(prev => ({ ...prev, [type]: true }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6 flex justify-between items-center border-b border-gray-100">
          <h2 className="text-2xl font-normal text-gray-800 wallet-modal-title">Connect Wallet</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          <p className="text-gray-600 mb-6 font-light text-left wallet-modal-text">
            Connect your Solana wallet to donate and participate in the Gold Card program.
          </p>
          
          <div className="space-y-3">
            {walletConfig.map((wallet) => (
              <button
                key={wallet.type}
                onClick={() => handleWalletConnect(wallet.type)}
                className="w-full p-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-3 text-left"
              >
                <div className="wallet-logo-container">
                  {logoErrors[wallet.type] ? (
                    <div className="wallet-logo-fallback">
                      <AlertCircle className="w-6 h-6 text-gray-400" />
                    </div>
                  ) : (
                    <img 
                      src={wallet.logoUrl} 
                      alt={wallet.name} 
                      className="wallet-logo-image"
                      onError={() => handleLogoError(wallet.type)}
                      loading="lazy"
                    />
                  )}
                </div>
                <span className="font-normal text-lg wallet-option">{wallet.name}</span>
              </button>
            ))}
          </div>
          
          <p className="text-sm text-center text-gray-500 mt-6 font-light wallet-modal-text">
            By connecting your wallet, you agree to our <Link to="/terms" className="text-gold-600 hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-gold-600 hover:underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConnectWalletModal;
