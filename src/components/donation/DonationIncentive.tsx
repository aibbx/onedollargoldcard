
import React from 'react';
import { Sparkles, ArrowUpCircle } from 'lucide-react';

const DonationIncentive: React.FC = () => {
  return (
    <div className="bg-gold-50 p-4 rounded-lg border border-gold-200 my-3 animate-pulse">
      <div className="flex items-center text-gold-800 font-medium">
        <Sparkles className="w-5 h-5 mr-2 text-gold-500" />
        <span>Each donation increases your chance to win proportionally!</span>
      </div>
      <div className="flex items-center justify-between mt-2">
        <div className="text-sm text-gray-600">$1 = Basic Entry</div>
        <ArrowUpCircle className="w-4 h-4 text-gold-400" />
        <div className="text-sm text-gold-700 font-medium">$100 = 100x Chance</div>
      </div>
    </div>
  );
};

export default DonationIncentive;
