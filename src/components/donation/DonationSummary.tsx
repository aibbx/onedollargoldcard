
import React from 'react';
import { useWallet } from '../../context/WalletContext';

interface DonationSummaryProps {
  fee: string;
  total: string;
  translatedFee: string;
  translatedTotal: string;
}

const DonationSummary: React.FC<DonationSummaryProps> = ({ 
  fee, 
  total, 
  translatedFee, 
  translatedTotal 
}) => {
  const { network } = useWallet();
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between py-2 border-b border-gray-200">
        <span className="text-gray-600">{translatedFee}</span>
        <span className="font-medium">${fee}</span>
      </div>
      
      <div className="flex justify-between py-2 border-b border-gray-200">
        <span className="text-gray-800 font-medium">{translatedTotal}</span>
        <span className="font-bold text-lg">${total}</span>
      </div>
      
      {network && (
        <div className="flex justify-end py-1">
          <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
            Solana {network}
          </span>
        </div>
      )}
    </div>
  );
};

export default DonationSummary;
