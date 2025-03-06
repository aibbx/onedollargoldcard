
import React from 'react';
import { BarChart3, Award, Wallet, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface DonationStatsProps {
  totalDonated: number;
  winningChance: number;
  walletType: string;
  walletAddress: string;
  donationCount: number;
  lastDonationTime?: Date;
}

const DonationStats: React.FC<DonationStatsProps> = ({ 
  totalDonated, 
  winningChance, 
  walletType,
  walletAddress,
  donationCount,
  lastDonationTime
}) => {
  return (
    <div className="bg-gold-50 p-4 rounded-lg border border-gold-100">
      <h4 className="font-medium text-gray-800 mb-2">Your Stats</h4>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 flex items-center">
            <BarChart3 className="w-4 h-4 mr-2 text-gold-500" />
            Total Donated:
          </span>
          <span className="font-medium">${totalDonated.toFixed(2)} USDC</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 flex items-center">
            <Award className="w-4 h-4 mr-2 text-gold-500" />
            Winning Chance:
          </span>
          <span className="font-medium text-gold-600">{winningChance.toFixed(6)}%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 flex items-center">
            <Wallet className="w-4 h-4 mr-2 text-gold-500" />
            Wallet:
          </span>
          <span className="font-medium">{walletType}</span>
        </div>
        {donationCount > 0 && (
          <>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Transactions:</span>
              <span className="font-medium">{donationCount}</span>
            </div>
            {lastDonationTime && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600 flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-gold-500" />
                  Last Donation:
                </span>
                <span className="text-sm text-gray-500">
                  {formatDistanceToNow(lastDonationTime, { addSuffix: true })}
                </span>
              </div>
            )}
          </>
        )}
        <div className="pt-1 text-xs text-gray-500 truncate">
          Address: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
        </div>
      </div>
    </div>
  );
};

export default DonationStats;
