
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import { WalletType } from '../../context/WalletContext';
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
      className="bg-gold-500 hover:bg-gold-600 text-black border-gold-400 hover:border-gold-500 font-medium rounded-md 
               shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform 
               hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
      onClick={onClick}
    >
      <WalletIcon walletType={walletType} />
      <span>{formatWalletAddress(walletAddress)}</span>
      <ChevronDown className="w-4 h-4" />
    </Button>
  );
};

export default ConnectedWalletButton;
