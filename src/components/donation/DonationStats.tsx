
import React from 'react';

interface DonationStatsProps {
  totalDonated: number;
  winningChance: number;
  walletType: string;
}

const DonationStats: React.FC<DonationStatsProps> = ({ 
  totalDonated, 
  winningChance, 
  walletType 
}) => {
  return (
    <div className="bg-gold-50 p-4 rounded-lg border border-gold-100">
      <h4 className="font-medium text-gray-800 mb-2">Your Stats</h4>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Total Donated:</span>
          <span className="font-medium">${totalDonated.toFixed(2)} USDC</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Winning Chance:</span>
          <span className="font-medium text-gold-600">{winningChance.toFixed(6)}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Wallet:</span>
          <span className="font-medium">{walletType}</span>
        </div>
      </div>
    </div>
  );
};

export default DonationStats;
