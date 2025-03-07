
import React from 'react';
import { WalletType } from '../../context/WalletContext';

interface WalletIconProps {
  walletType: WalletType | null;
  className?: string;
}

const WalletIcon: React.FC<WalletIconProps> = ({ walletType, className = "w-4 h-4 mr-2" }) => {
  switch (walletType) {
    case 'Phantom':
      return (
        <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="20" cy="20" r="20" fill="#AB9FF2"/>
          <path d="M12 13C12 11.8954 12.8954 11 14 11H26C27.1046 11 28 11.8954 28 13V27C28 28.1046 27.1046 29 26 29H14C12.8954 29 12 28.1046 12 27V13Z" fill="white" stroke="white" strokeWidth="2"/>
          <circle cx="20" cy="20" r="4" fill="#AB9FF2"/>
        </svg>
      );
    case 'Solflare':
      return (
        <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="20" cy="20" r="20" fill="white"/>
          <path d="M20 10L30 20L20 30L10 20L20 10Z" fill="#FC8E2D"/>
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
    case 'MetaMask':
      return (
        <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="20" cy="20" r="20" fill="white"/>
          <path d="M32.0502 8.94995L22.101 16.2262L24.3748 11.2758L32.0502 8.94995Z" fill="#E17726" stroke="#E17726" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7.9498 8.94995L17.8158 16.2927L15.6252 11.2758L7.9498 8.94995Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    default:
      return null;
  }
};

export default WalletIcon;
