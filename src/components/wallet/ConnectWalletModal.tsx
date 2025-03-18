
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { X } from 'lucide-react';
import { WalletType } from '../../types/wallet';
import { Link } from 'react-router-dom';
import WalletButton from './WalletButton';
import { useWalletDetection } from '../../hooks/useWalletDetection';
import { WALLET_CONFIGS } from '../../utils/walletConfig';

interface ConnectWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnectWallet: (type: WalletType) => Promise<void>;
}

const ConnectWalletModal: React.FC<ConnectWalletModalProps> = ({ 
  isOpen, 
  onClose, 
  onConnectWallet 
}) => {
  const { t } = useLanguage();
  const { availableWallets } = useWalletDetection();

  if (!isOpen) return null;

  const handleWalletConnect = async (type: WalletType) => {
    try {
      console.log(`Connecting to ${type} wallet...`);
      await onConnectWallet(type);
      onClose();
    } catch (error) {
      console.error(`Failed to connect ${type} wallet:`, error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-xl overflow-hidden">
        <div className="p-6 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-900">Connect a Wallet</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 pt-0">
          <h3 className="text-xl text-gray-500 font-medium mb-4">Available wallets</h3>
          
          <div className="space-y-4">
            {WALLET_CONFIGS.map((config) => (
              <button
                key={config.type}
                onClick={() => handleWalletConnect(config.type)}
                disabled={!availableWallets[config.type.toLowerCase() as keyof typeof availableWallets]}
                className="w-full p-4 flex items-center hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="w-12 h-12 mr-3 flex-shrink-0">
                  <WalletIcon walletType={config.type} />
                </div>
                <span className="text-xl font-medium text-gray-900">
                  {config.name}
                </span>
              </button>
            ))}
          </div>
          
          <div className="border-t border-gray-200 mt-6 pt-6">
            <p className="text-sm text-center text-gray-500">
              By connecting your wallet, you agree to our <Link to="/terms" className="text-gold-600 hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-gold-600 hover:underline">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const WalletIcon = ({ walletType }: { walletType: WalletType }) => {
  switch (walletType) {
    case 'MetaMask':
      return (
        <img 
          src="/lovable-uploads/1d0e16e3-a930-4066-967e-657050af111a.png" 
          alt="MetaMask" 
          className="w-full h-full object-contain"
        />
      );
    case 'OKX':
      return (
        <img 
          src="/wallet-icons/okx-icon.svg" 
          alt="OKX Wallet" 
          className="w-full h-full object-contain"
        />
      );
    default:
      return null;
  }
};

export default ConnectWalletModal;
