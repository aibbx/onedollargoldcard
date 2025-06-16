
import React from 'react';
import { Download } from 'lucide-react';
import { WalletType } from '../../../types/wallet';
import { getWalletDisplayName, getWalletIcon } from '../../../utils/walletConfig';

interface WalletOptionProps {
  walletType: WalletType;
  isAvailable: boolean;
  installUrl: string;
  onConnect: (type: WalletType) => void;
}

const WalletOption: React.FC<WalletOptionProps> = ({ 
  walletType, 
  isAvailable, 
  installUrl, 
  onConnect 
}) => {
  const handleClick = () => {
    if (isAvailable) {
      onConnect(walletType);
    } else {
      window.open(installUrl, '_blank');
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className={`w-full p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group ${
          isAvailable 
            ? 'border-zinc-700 bg-zinc-800/50 hover:border-gold-500/50 hover:bg-zinc-800 hover:shadow-lg hover:shadow-gold-500/10'
            : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-600'
        }`}
      >
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center text-2xl border border-zinc-600">
            {getWalletIcon(walletType)}
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-white text-lg">
              {getWalletDisplayName(walletType)}
            </h3>
            <p className="text-zinc-400 text-sm">
              {isAvailable ? 'Ready to connect' : 'Click to install'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {!isAvailable && (
            <div className="flex items-center space-x-1 text-zinc-500">
              <Download className="w-4 h-4" />
              <span className="text-sm">Install</span>
            </div>
          )}
          <div className={`w-3 h-3 rounded-full ${
            isAvailable ? 'bg-green-500' : 'bg-orange-500'
          }`} />
        </div>
      </button>
    </div>
  );
};

export default WalletOption;
