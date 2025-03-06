
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { CONTRACT_ADDRESSES } from '../../utils/walletUtils';

const ContractAddresses: React.FC = () => {
  const openSolscan = () => {
    window.open(`https://solscan.io/account/${CONTRACT_ADDRESSES.poolAddress}`, '_blank');
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gold-200 mt-8">
      <h4 className="text-xl font-bold text-gray-800 mb-3">Contract Address</h4>
      <div className="flex flex-col gap-2">
        <div className="border border-gray-100 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-medium text-gray-800">OneDollarGoldCard.sol</span>
            <button 
              onClick={openSolscan}
              className="text-gold-600 hover:text-gold-800 transition-colors flex items-center gap-1 text-sm"
              aria-label="View on Solscan"
            >
              <span>View on Solscan</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="bg-gray-50 p-3 rounded-md border border-gray-100">
            <code className="text-gold-600 font-mono text-sm break-all">
              {CONTRACT_ADDRESSES.poolAddress}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractAddresses;
