
import React from 'react';
import { Button } from '@/components/ui/button';
import { WalletType } from '../../context/WalletContext';

interface WalletOptionsProps {
  onConnect: (type: WalletType) => Promise<void>;
}

const WalletOptions: React.FC<WalletOptionsProps> = ({ onConnect }) => {
  return (
    <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
      <h4 className="font-medium text-gray-800 mb-2">Select Wallet</h4>
      <Button 
        onClick={() => onConnect('Phantom')}
        className="w-full justify-between bg-purple-600 hover:bg-purple-700"
      >
        Phantom <img src="/wallet-icons/phantom-icon.svg" alt="Phantom" className="w-5 h-5" />
      </Button>
      <Button 
        onClick={() => onConnect('Solflare')}
        className="w-full justify-between bg-orange-500 hover:bg-orange-600"
      >
        Solflare <img src="/wallet-icons/solflare-icon.svg" alt="Solflare" className="w-5 h-5" />
      </Button>
      <Button 
        onClick={() => onConnect('OKX')}
        className="w-full justify-between bg-blue-600 hover:bg-blue-700"
      >
        OKX Wallet <img src="/wallet-icons/okx-icon.svg" alt="OKX" className="w-5 h-5" />
      </Button>
      <Button 
        onClick={() => onConnect('MetaMask')}
        className="w-full justify-between bg-amber-500 hover:bg-amber-600"
      >
        MetaMask <img src="/wallet-icons/metamask-icon.svg" alt="MetaMask" className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default WalletOptions;
