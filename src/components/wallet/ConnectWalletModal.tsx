
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
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-gold-500/20 w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6 flex justify-between items-center border-b border-gold-500/20">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">Connect Wallet</h2>
            <p className="text-zinc-400 text-sm mt-1">Select your preferred wallet</p>
          </div>
          <button 
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition-colors bg-zinc-800/50 hover:bg-zinc-800 rounded-full p-2"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="grid gap-4">
            {WALLET_CONFIGS.map((config) => (
              <WalletButton
                key={config.type}
                walletType={config.type}
                isAvailable={!!availableWallets[config.type.toLowerCase() as keyof typeof availableWallets]}
                onClick={() => handleWalletConnect(config.type)}
                installUrl={config.installUrl}
              />
            ))}
          </div>
          
          <div className="mt-8 pt-4 border-t border-zinc-800">
            <p className="text-sm text-center text-zinc-500">
              By connecting your wallet, you agree to our <Link to="/terms" className="text-gold-500 hover:text-gold-400 hover:underline transition-colors">Terms of Service</Link> and <Link to="/privacy" className="text-gold-500 hover:text-gold-400 hover:underline transition-colors">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectWalletModal;
