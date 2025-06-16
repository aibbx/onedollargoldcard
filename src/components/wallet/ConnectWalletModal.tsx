
import React, { useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { X, AlertCircle, Download } from 'lucide-react';
import { WalletType } from '../../types/wallet';
import { Link } from 'react-router-dom';
import WalletButton from './WalletButton';
import { useWalletDetection } from '../../hooks/useWalletDetection';
import { WALLET_CONFIGS, getWalletDisplayName, getWalletIcon } from '../../utils/walletConfig';

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

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '0px';
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

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

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={handleBackdropClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        margin: 0
      }}
    >
      <div 
        className="relative bg-zinc-900 border border-gold-500/30 w-full max-w-lg mx-auto my-8 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxHeight: 'calc(100vh - 64px)',
          minHeight: 'auto'
        }}
      >
        {/* Header */}
        <div className="relative p-6 border-b border-gold-500/20 bg-gradient-to-r from-zinc-900 to-zinc-800">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors bg-zinc-800/50 hover:bg-zinc-700 rounded-full p-2 z-10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="pr-12">
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">
              Connect Wallet
            </h2>
            <p className="text-zinc-400 text-sm mt-1">
              Choose your preferred wallet to get started
            </p>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          <div className="space-y-3">
            {WALLET_CONFIGS.map((config) => {
              const isAvailable = checkWalletAvailability(config.type, availableWallets);
              
              return (
                <div key={config.type} className="relative">
                  <button
                    onClick={() => isAvailable ? handleWalletConnect(config.type) : window.open(config.installUrl, '_blank')}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group ${
                      isAvailable 
                        ? 'border-zinc-700 bg-zinc-800/50 hover:border-gold-500/50 hover:bg-zinc-800 hover:shadow-lg'
                        : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-600'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center text-2xl border border-zinc-600">
                        {getWalletIcon(config.type)}
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-white text-lg">
                          {getWalletDisplayName(config.type)}
                        </h3>
                        <p className="text-zinc-400 text-sm">
                          {isAvailable ? 'Ready to connect' : 'Not installed'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {!isAvailable && (
                        <div className="flex items-center space-x-1 text-zinc-500">
                          <Download className="w-4 h-4" />
                          <span className="text-sm">Install</span>
                        </div>
                      )}
                      <div className={`w-3 h-3 rounded-full ${
                        isAvailable ? 'bg-green-500' : 'bg-zinc-600'
                      }`} />
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
          
          {/* Security Notice */}
          <div className="mt-6 p-4 bg-blue-900/20 border border-blue-700/30 rounded-xl">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-blue-200 font-medium text-sm mb-1">Security Reminder</h4>
                <p className="text-blue-300 text-xs leading-relaxed">
                  Only connect wallets you trust. Never share your private keys or seed phrases.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="px-6 pb-6">
          <p className="text-center text-xs text-zinc-500 leading-relaxed">
            By connecting your wallet, you agree to our{' '}
            <Link to="/terms" className="text-gold-400 hover:text-gold-300 hover:underline transition-colors">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-gold-400 hover:text-gold-300 hover:underline transition-colors">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

// Helper function to check wallet availability
const checkWalletAvailability = (type: WalletType, availableWallets: any): boolean => {
  const key = type.toLowerCase() as keyof typeof availableWallets;
  return !!availableWallets[key];
};

export default ConnectWalletModal;
