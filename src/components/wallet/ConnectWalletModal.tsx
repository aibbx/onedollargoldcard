
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
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6 flex justify-between items-center border-b border-gray-100">
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
          <p className="text-gray-600 mb-6 font-light text-left">
            Connect your Solana wallet to donate and participate in the Gold Card program.
          </p>
          
          <div className="space-y-3">
            <button
              onClick={() => handleWalletConnect('Phantom')}
              className="w-full p-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-3 text-left"
            >
              <img src="https://phantom.app/favicon.ico" alt="Phantom" className="w-8 h-8" />
              <span className="font-normal text-lg">Phantom</span>
            </button>
            
            <button
              onClick={() => handleWalletConnect('Solflare')}
              className="w-full p-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-3 text-left"
            >
              <img src="https://solflare.com/favicon-32x32.png" alt="Solflare" className="w-8 h-8" />
              <span className="font-normal text-lg">Solflare</span>
            </button>
            
            <button
              onClick={() => handleWalletConnect('OKX')}
              className="w-full p-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-3 text-left"
            >
              <img src="https://www.okx.com/cdn/static/favicon.ico" alt="OKX" className="w-8 h-8" />
              <span className="font-normal text-lg">OKX Wallet</span>
            </button>
            
            <button
              onClick={() => handleWalletConnect('MetaMask')}
              className="w-full p-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-3 text-left"
            >
              <img src="https://metamask.io/images/favicon-32x32.png" alt="MetaMask" className="w-8 h-8" />
              <span className="font-normal text-lg">MetaMask</span>
            </button>
          </div>
          
          <p className="text-sm text-center text-gray-500 mt-6 font-light">
            By connecting your wallet, you agree to our <Link to="/terms" className="text-gold-600 hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-gold-600 hover:underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConnectWalletModal;
