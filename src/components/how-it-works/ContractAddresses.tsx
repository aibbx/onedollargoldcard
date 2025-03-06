
import React from 'react';
import { CONTRACT_ADDRESSES } from '../../utils/walletUtils';

const ContractAddresses: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg border border-gold-200 mt-8">
      <h4 className="text-xl font-bold text-gray-800 mb-3">Contract Addresses</h4>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Pool Contract:</span>
          <code className="bg-gray-100 px-2 py-1 rounded text-gold-600 font-mono">
            {CONTRACT_ADDRESSES.poolAddress}
          </code>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Fee Recipient:</span>
          <code className="bg-gray-100 px-2 py-1 rounded text-gold-600 font-mono">
            {CONTRACT_ADDRESSES.feeAddress}
          </code>
        </div>
      </div>
    </div>
  );
};

export default ContractAddresses;
