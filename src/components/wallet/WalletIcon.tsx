
import React from 'react';
import { WalletType } from '../../types/wallet';

interface WalletIconProps {
  walletType: WalletType | null;
  className?: string;
}

const WalletIcon: React.FC<WalletIconProps> = ({ walletType, className = "w-4 h-4 mr-2" }) => {
  switch (walletType) {
    case 'MetaMask':
      return (
        <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="20" cy="20" r="20" fill="#F6851B"/>
          <path d="M31 12L22 18L23.5 14L31 12Z" fill="white"/>
          <path d="M9 12L18 18L16.5 14L9 12Z" fill="white"/>
          <path d="M28 25L25 29L30 30L31 25H28Z" fill="white"/>
          <path d="M12 25L13 30L18 29L15 25H12Z" fill="white"/>
          <path d="M18 18L16.5 22L22 22L23.5 18L18 18Z" fill="white"/>
          <path d="M22 22L21 25H19L18 22L22 22Z" fill="white"/>
          <path d="M22 22L25 25H21L22 22Z" fill="white"/>
          <path d="M18 22L19 25H15L18 22Z" fill="white"/>
        </svg>
      );
    case 'OKX':
      return (
        <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="20" cy="20" r="20" fill="white"/>
          <rect x="10" y="10" width="8" height="8" fill="black"/>
          <rect x="22" y="10" width="8" height="8" fill="black"/>
          <rect x="10" y="22" width="8" height="8" fill="black"/>
          <rect x="22" y="22" width="8" height="8" fill="black"/>
        </svg>
      );
    default:
      return null;
  }
};

export default WalletIcon;
