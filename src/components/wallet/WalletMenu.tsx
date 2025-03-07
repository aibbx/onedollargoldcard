
import React from 'react';
import { LogOut } from 'lucide-react';
import { WalletType } from '../../context/WalletContext';
import { DonationType } from '../../types/wallet';

interface WalletMenuProps {
  walletType: WalletType;
  walletAddress: string;
  donations: DonationType[];
  onDisconnect: () => void;
  onDonateClick: () => void;
  onClose: () => void;
}

const WalletMenu: React.FC<WalletMenuProps> = ({
  walletType,
  walletAddress,
  donations,
  onDisconnect,
  onDonateClick,
  onClose
}) => {
  return (
    <div className="absolute right-0 mt-2 w-52 bg-white rounded-md shadow-lg py-1 z-50">
      <div className="px-4 py-2 text-sm text-gray-700 font-medium border-b border-gray-100">
        {walletType} Wallet
      </div>
      <div className="px-4 py-2 text-xs text-gray-500 font-mono break-all">
        {walletAddress}
      </div>
      {donations.length > 0 && (
        <div className="px-4 py-2 text-xs text-gray-500">
          <div className="flex justify-between items-center">
            <span>Total Donated:</span>
            <span className="font-medium text-gold-600">
              ${donations.reduce((sum, d) => sum + d.amount, 0).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span>Transactions:</span>
            <span className="font-medium text-gray-700">{donations.length}</span>
          </div>
        </div>
      )}
      <button
        className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-red-50 text-red-600"
        onClick={() => {
          onDisconnect();
          onClose();
        }}
      >
        <LogOut className="w-4 h-4 mr-3" />
        Disconnect Wallet
      </button>
      <button
        className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gold-50 text-gold-600"
        onClick={() => {
          onClose();
          onDonateClick();
        }}
      >
        Donate Now
      </button>
    </div>
  );
};

export default WalletMenu;
