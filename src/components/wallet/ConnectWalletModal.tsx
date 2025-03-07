
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
      <div className="bg-white w-full max-w-md rounded-xl shadow-xl overflow-hidden">
        <div className="p-6 flex justify-between items-center border-b border-gray-100">
          <h2 className="text-2xl font-medium text-gray-800">Connect Wallet</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          <p className="text-gray-600 mb-6 wallet-modal-text">
            Connect your Solana wallet to donate and participate in the Gold Card program.
          </p>
          
          <div className="space-y-4">
            <button
              onClick={() => handleWalletConnect('Phantom')}
              className="wallet-option-button"
            >
              <img src="/wallet-icons/phantom-icon.png" alt="Phantom" className="w-10 h-10" />
              <span className="wallet-option-text">Phantom</span>
            </button>
            
            <button
              onClick={() => handleWalletConnect('Solflare')}
              className="wallet-option-button"
            >
              <img src="/wallet-icons/solflare-icon.png" alt="Solflare" className="w-10 h-10" />
              <span className="wallet-option-text">Solflare</span>
            </button>
            
            <button
              onClick={() => handleWalletConnect('OKX')}
              className="wallet-option-button"
            >
              <img src="/wallet-icons/okx-icon.png" alt="OKX" className="w-10 h-10" />
              <span className="wallet-option-text">OKX Wallet</span>
            </button>
            
            <button
              onClick={() => handleWalletConnect('MetaMask')}
              className="wallet-option-button"
            >
              <img src="/wallet-icons/metamask-icon.png" alt="MetaMask" className="w-10 h-10" />
              <span className="wallet-option-text">MetaMask</span>
            </button>
          </div>
          
          <p className="text-sm text-center text-gray-500 mt-6 wallet-disclaimer">
            By connecting your wallet, you agree to our <Link to="/terms" className="text-gold-600 hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-gold-600 hover:underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConnectWalletModal;
