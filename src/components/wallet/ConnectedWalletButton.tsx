
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import { WalletType } from '../../types/wallet';
import WalletIcon from './WalletIcon';

interface ConnectedWalletButtonProps {
  walletType: WalletType;
  walletAddress: string;
  onClick: () => void;
}

const ConnectedWalletButton: React.FC<ConnectedWalletButtonProps> = ({
  walletType,
  walletAddress,
  onClick
}) => {
  const formatWalletAddress = (address: string) => {
    if (!address) return '';
    return `${address.substring(0, 4)}...${address.substring(address.length - 4)}`;
  };

  return (
    <Button 
      variant="outline"
      className="bg-gradient-to-r from-gold-300/10 to-gold-500/10 border border-gold-300 hover:border-gold-400 
               text-gold-800 font-medium rounded-lg px-4 py-2
               shadow-md hover:shadow-gold-500/20 transition-all duration-300 ease-in-out transform 
               hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className="relative">
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
          <WalletIcon walletType={walletType} />
        </div>
        <span className="ml-2 font-medium">{formatWalletAddress(walletAddress)}</span>
      </div>
      <ChevronDown className="w-4 h-4 ml-1 opacity-70" />
    </Button>
  );
};

export default ConnectedWalletButton;
