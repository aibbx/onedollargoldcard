
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { X } from 'lucide-react';
import { WalletType } from '../../types/wallet';
import { Link } from 'react-router-dom';

interface ConnectWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnectWallet: (type: WalletType) => Promise<void>;
}

// Wallet configuration with improved logos
const walletConfig = [
  {
    type: 'Phantom' as WalletType,
    name: 'Phantom',
    logoUrl: '/lovable-uploads/84792d4f-9926-4001-8797-bfb6a849a92e.png'
  },
  {
    type: 'Solflare' as WalletType,
    name: 'Solflare',
    logoUrl: 'https://solflare.com/icon-512.png'
  },
  {
    type: 'OKX' as WalletType,
    name: 'OKX Wallet',
    logoUrl: 'https://static.okx.com/cdn/assets/imgs/223/C6E0D7FF36211DF4.png'
  },
  {
    type: 'MetaMask' as WalletType,
    name: 'MetaMask',
    logoUrl: 'https://metamask.io/images/metamask-fox.svg'
  }
];

const ConnectWalletModal: React.FC<ConnectWalletModalProps> = ({ 
  isOpen, 
  onClose, 
  onConnectWallet 
}) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  const handleWalletConnect = async (type: WalletType) => {
    try {
      await onConnectWallet(type);
      onClose();
    } catch (error) {
      console.error(`Failed to connect ${type} wallet:`, error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl overflow-hidden">
        <div className="py-5 px-6 flex justify-between items-center border-b border-gray-100">
          <h2 className="text-2xl font-normal text-gray-800">Connect Wallet</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          <p className="text-gray-600 mb-6 font-light">
            Connect your Solana wallet to donate and participate in the Gold Card program.
          </p>
          
          <div className="space-y-4">
            {walletConfig.map((wallet) => (
              <button
                key={wallet.type}
                onClick={() => handleWalletConnect(wallet.type)}
                className="wallet-option-button"
              >
                <img 
                  src={wallet.logoUrl} 
                  alt={`${wallet.name} logo`} 
                  className="wallet-logo"
                  loading="lazy"
                />
                <span className="wallet-name">{wallet.name}</span>
              </button>
            ))}
          </div>
          
          <p className="text-sm text-center text-gray-500 mt-8 font-light">
            By connecting your wallet, you agree to our <Link to="/terms" className="text-gold-600 hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-gold-600 hover:underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConnectWalletModal;
