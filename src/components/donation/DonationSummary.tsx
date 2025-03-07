
import React from 'react';

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
  return (
    <>
      <div className="flex justify-between py-2 border-b border-gray-200">
        <span className="text-gray-600">{translatedFee}</span>
        <span className="font-medium">${fee}</span>
      </div>
      
      <div className="flex justify-between py-2">
        <span className="text-gray-800 font-medium">{translatedTotal}</span>
        <span className="font-bold text-lg">${total}</span>
      </div>
    </>
  );
};

export default DonationSummary;
