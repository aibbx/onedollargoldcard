
import React from 'react';
import { Sparkles, ArrowUpCircle, TrendingUp } from 'lucide-react';

interface DonationIncentiveProps {
  amount: string;
}

const DonationIncentive: React.FC<DonationIncentiveProps> = ({ amount }) => {
  // Calculate multiplier based on donation amount
  const numericAmount = parseFloat(amount) || 0;
  const multiplier = Math.floor(numericAmount);
  
  return (
    <div className="bg-gold-50 p-5 rounded-lg border border-gold-200 my-4 shadow-sm">
      <div className="flex items-center text-gold-800 font-medium mb-2">
        <Sparkles className="w-5 h-5 mr-2 text-gold-500 flex-shrink-0" />
        <span className="text-base">More you donate, higher your chances!</span>
      </div>
      <div className="flex items-center justify-between mt-3 px-2">
        <div className="flex flex-col items-center">
          <div className="text-sm text-gray-600 mb-1">$1</div>
          <div className="text-xs text-gray-500">Basic Entry</div>
        </div>
        
        <TrendingUp className="w-5 h-5 text-gold-500 mx-2" />
        
        <div className="flex flex-col items-center">
          <div className="text-sm font-medium text-gold-700 mb-1">${numericAmount > 0 ? numericAmount.toFixed(2) : '100.00'}</div>
          <div className="text-xs text-gold-600">{multiplier > 0 ? `${multiplier}× Chance!` : '100× Chance!'}</div>
        </div>
      </div>
    </div>
  );
};

export default DonationIncentive;
