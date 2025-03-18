
import React from 'react';
import { WalletType } from '../../types/wallet';

interface WalletIconProps {
  walletType: WalletType | null;
  className?: string;
}

const WalletIcon: React.FC<WalletIconProps> = ({ walletType, className = "w-12 h-12" }) => {
  switch (walletType) {
    case 'MetaMask':
      return (
        <div className={className}>
          <img 
            src="/lovable-uploads/1d0e16e3-a930-4066-967e-657050af111a.png" 
            alt="MetaMask" 
            className="w-full h-full object-contain"
          />
        </div>
      );
    case 'OKX':
      return (
        <div className={className}>
          <img 
            src="/wallet-icons/okx-icon.svg" 
            alt="OKX Wallet" 
            className="w-full h-full object-contain"
          />
        </div>
      );
    default:
      return null;
  }
};

export default WalletIcon;
