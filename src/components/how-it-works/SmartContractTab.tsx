
import React from 'react';
import { CONTRACT_ADDRESSES } from '../../utils/walletUtils';

const SmartContractTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Fund Information</h3>
      
      <p className="text-gray-700 mb-8">
        Our platform is built on robust, audited smart contracts deployed on the BSC blockchain. 
        These contracts manage the entire donation process, winner selection, and backup mechanisms 
        with complete transparency and security.
      </p>
      
      <div className="border-l-4 border-gold-400 pl-4 py-2 mb-6 bg-gold-50">
        <h4 className="font-medium text-gold-800">Active Contract Addresses:</h4>
        <div className="mt-2 grid gap-1">
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="text-sm font-medium text-gray-600 min-w-24">Pool Address:</span>
            <code className="font-mono text-xs bg-white px-2 py-1 rounded border ml-0 sm:ml-2 mt-1 sm:mt-0 break-all">
              {CONTRACT_ADDRESSES.poolAddress}
            </code>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="text-sm font-medium text-gray-600 min-w-24">Fee Address:</span>
            <code className="font-mono text-xs bg-white px-2 py-1 rounded border ml-0 sm:ml-2 mt-1 sm:mt-0 break-all">
              {CONTRACT_ADDRESSES.feeAddress}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartContractTab;
