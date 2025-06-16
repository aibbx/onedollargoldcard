
import React, { useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { WalletType } from '../../types/wallet';
import { useWalletDetection } from '../../hooks/useWalletDetection';
import { WALLET_CONFIGS } from '../../utils/walletConfig';
import WalletModalHeader from './modal/WalletModalHeader';
import WalletOption from './modal/WalletOption';
import SecurityNotice from './modal/SecurityNotice';
import WalletModalFooter from './modal/WalletModalFooter';
import { checkWalletAvailability } from './modal/walletAvailabilityUtils';

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

  // Prevent body scroll when modal is open and ensure proper positioning
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '0px';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    
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
      className="fixed inset-0 bg-black/80 backdrop-blur-sm"
      onClick={handleBackdropClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        margin: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '100px',
        paddingLeft: '16px',
        paddingRight: '16px',
        paddingBottom: '16px'
      }}
    >
      <div 
        className="relative bg-zinc-900 border border-gold-500/30 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxHeight: 'calc(100vh - 120px)',
          minHeight: 'auto'
        }}
      >
        <WalletModalHeader onClose={onClose} />
        
        <div className="p-6 max-h-96 overflow-y-auto">
          <div className="space-y-3">
            {WALLET_CONFIGS.map((config) => {
              const isAvailable = checkWalletAvailability(config.type, availableWallets);
              
              return (
                <WalletOption
                  key={config.type}
                  walletType={config.type}
                  isAvailable={isAvailable}
                  installUrl={config.installUrl}
                  onConnect={handleWalletConnect}
                />
              );
            })}
          </div>
          
          <SecurityNotice />
        </div>
        
        <WalletModalFooter />
      </div>
    </div>
  );
};

export default ConnectWalletModal;
