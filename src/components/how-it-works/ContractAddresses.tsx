
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { CONTRACT_ADDRESSES } from '../../utils/walletUtils';

const ContractAddresses: React.FC = () => {
  const openSolscan = () => {
    window.open(`https://solscan.io/account/${CONTRACT_ADDRESSES.poolAddress}`, '_blank');
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gold-200 mt-8">
      <h4 className="text-xl font-bold text-gray-800 mb-3">Contract Addresses</h4>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Pool Contract:</span>
          <div className="flex items-center gap-2">
            <code className="bg-gray-100 px-2 py-1 rounded text-gold-600 font-mono">
              {CONTRACT_ADDRESSES.poolAddress}
            </code>
            <button 
              onClick={openSolscan}
              className="text-gold-600 hover:text-gold-800 transition-colors"
              aria-label="View on Solscan"
            >
              <ExternalLink className="h-4 w-4" />
            </button>
          </div>
        </div>
        <p className="text-gray-500 text-sm mt-1">
          <span className="font-medium">OneDollarGoldCard.sol</span> - View this contract on Solscan
        </p>
      </div>
    </div>
  );
};

export default ContractAddresses;
