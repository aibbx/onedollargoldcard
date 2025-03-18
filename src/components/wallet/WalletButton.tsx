
import React from 'react';
import { WalletType } from '../../types/wallet';
import WalletIcon from './WalletIcon';
import { ArrowRight, ExternalLink } from 'lucide-react';

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
        return 'hover:border-orange-500/50 from-orange-500/5 via-amber-500/10 to-transparent';
      case 'OKX':
        return 'hover:border-blue-500/50 from-blue-500/5 via-cyan-500/10 to-transparent';
      default:
        return 'hover:border-gold-500/50 from-gold-300/5 via-gold-500/10 to-transparent';
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
      className={`relative overflow-hidden flex items-center justify-between w-full p-5 rounded-xl border 
        bg-gradient-to-r transition-all duration-300 group ${
        isAvailable 
          ? `border-zinc-700 ${getButtonStyle()} hover:shadow-lg hover:shadow-gold-500/5` 
          : 'border-zinc-800 bg-zinc-900/50 opacity-70'
      }`}
      disabled={!isAvailable}
      data-wallet-type={walletType}
    >
      {/* Shine effect element */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent 
                     -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
      
      <div className="flex items-center z-10">
        <div className="bg-zinc-800 rounded-lg p-2 flex items-center justify-center">
          <WalletIcon walletType={walletType} className="w-8 h-8" />
        </div>
        <div className="ml-4">
          <span className="font-medium text-white text-lg">{walletType}{walletType === 'OKX' ? ' Wallet' : ''}</span>
          {isAvailable && (
            <p className="text-xs text-zinc-400 mt-0.5">Click to connect</p>
          )}
        </div>
      </div>
      
      {isAvailable ? (
        <div className="relative z-10">
          <div className="w-8 h-8 rounded-full bg-gold-500/10 flex items-center justify-center">
            <ArrowRight className="w-4 h-4 text-gold-500 group-hover:text-gold-400 group-hover:translate-x-0.5 transition-all duration-300" />
          </div>
        </div>
      ) : (
        <span 
          className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-1.5 rounded-full font-medium cursor-pointer 
                    transition-colors flex items-center gap-1 z-10"
          onClick={openWalletSite}
        >
          <span>Install</span>
          <ExternalLink className="w-3 h-3" />
        </span>
      )}
    </button>
  );
};

export default WalletButton;
