
import React from 'react';
import { X, Wallet } from 'lucide-react';

interface WalletModalHeaderProps {
  onClose: () => void;
}

const WalletModalHeader: React.FC<WalletModalHeaderProps> = ({ onClose }) => {
  return (
    <div className="relative p-6 border-b border-gold-500/20 bg-gradient-to-r from-zinc-900 to-zinc-800">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors bg-zinc-800/50 hover:bg-zinc-700 rounded-full p-2 z-10"
        aria-label="Close modal"
      >
        <X className="w-5 h-5" />
      </button>
      
      <div className="pr-12">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-gold-400 to-gold-600 flex items-center justify-center">
            <Wallet className="w-4 h-4 text-black" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">
            Connect Wallet
          </h2>
        </div>
        <p className="text-zinc-400 text-sm">
          Choose your wallet to start donating
        </p>
      </div>
    </div>
  );
};

export default WalletModalHeader;
