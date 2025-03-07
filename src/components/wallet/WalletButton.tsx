
import React from 'react';
import { WalletType } from '../../types/wallet';
import WalletIcon from './WalletIcon';

interface WalletButtonProps {
  walletType: WalletType;
  isAvailable: boolean;
  onClick: () => void;
  installUrl: string;
}

const WalletButton: React.FC<WalletButtonProps> = ({
  walletType,
  isAvailable,
  onClick,
  installUrl
}) => {
  const getButtonStyle = () => {
    switch (walletType) {
      case 'Phantom':
        return 'border-purple-200 hover:bg-purple-50';
      case 'Solflare':
        return 'border-orange-200 hover:bg-orange-50';
      case 'OKX':
        return 'border-blue-200 hover:bg-blue-50';
      case 'MetaMask':
        return 'border-amber-200 hover:bg-amber-50';
      default:
        return 'border-gray-200 hover:bg-gray-50';
    }
  };

  const openWalletSite = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(installUrl, '_blank');
  };

  const handleClick = () => {
    if (isAvailable) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`wallet-option-button flex items-center justify-between w-full p-4 rounded-lg border ${
        isAvailable 
          ? getButtonStyle() 
          : 'border-gray-200 bg-gray-50 opacity-70'
      }`}
      disabled={!isAvailable}
      data-wallet-type={walletType}
    >
      <div className="flex items-center">
        <WalletIcon walletType={walletType} className="w-10 h-10" />
        <span className="ml-3 font-medium">{walletType}{walletType === 'OKX' ? ' Wallet' : ''}</span>
      </div>
      {!isAvailable && (
        <span 
          className="text-xs text-purple-600 underline font-medium cursor-pointer" 
          onClick={openWalletSite}
        >
          Install
        </span>
      )}
    </button>
  );
};

export default WalletButton;
