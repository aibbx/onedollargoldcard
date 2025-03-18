
import React from 'react';
import { WalletType } from '../../types/wallet';
import WalletIcon from './WalletIcon';
import { ArrowRight } from 'lucide-react';

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
      case 'MetaMask':
        return 'border-orange-200 hover:bg-orange-50 from-orange-500/5 to-amber-500/5';
      case 'OKX':
        return 'border-blue-200 hover:bg-blue-50 from-blue-500/5 to-cyan-500/5';
      default:
        return 'border-gold-200 hover:bg-gold-50 from-gold-300/5 to-gold-500/5';
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
      className={`wallet-option-button flex items-center justify-between w-full p-4 rounded-xl border 
        bg-gradient-to-r transition-all duration-300 group ${
        isAvailable 
          ? `${getButtonStyle()} hover:shadow-md` 
          : 'border-gray-200 bg-gray-50 opacity-70'
      }`}
      disabled={!isAvailable}
      data-wallet-type={walletType}
    >
      <div className="flex items-center">
        <WalletIcon walletType={walletType} className="w-10 h-10" />
        <div className="ml-3">
          <span className="font-medium text-gray-900">{walletType}{walletType === 'OKX' ? ' Wallet' : ''}</span>
          {isAvailable && (
            <p className="text-xs text-gray-500 mt-0.5">Click to connect</p>
          )}
        </div>
      </div>
      
      {isAvailable ? (
        <ArrowRight className="w-5 h-5 text-gold-600 group-hover:text-gold-700 group-hover:translate-x-1 transition-all duration-300" />
      ) : (
        <span 
          className="text-xs bg-gold-100 text-gold-700 px-3 py-1 rounded-full font-medium cursor-pointer hover:bg-gold-200 transition-colors" 
          onClick={openWalletSite}
        >
          Install
        </span>
      )}
    </button>
  );
};

export default WalletButton;
