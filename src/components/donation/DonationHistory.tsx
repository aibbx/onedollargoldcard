
import React from 'react';
import { ExternalLink, Clock } from 'lucide-react';
import { DonationRecord } from '../../types/wallet';
import { formatDistanceToNow } from 'date-fns';

interface DonationHistoryProps {
  donations: DonationRecord[];
  openTransaction: (txId: string) => void;
}

const DonationHistory: React.FC<DonationHistoryProps> = ({ 
  donations,
  openTransaction
}) => {
  if (donations.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        No donations yet. Make your first donation to see your records here.
      </div>
    );
  }

  return (
    <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
      {donations.map((donation) => (
        <div 
          key={donation.id}
          className="bg-gray-50 rounded-lg p-3 text-sm border border-gray-100 hover:border-gold-200 transition-colors"
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="font-medium text-gray-800">
                ${donation.amount.toFixed(2)} USDC
              </div>
              <div className="text-gray-500 flex items-center text-xs mt-1">
                <Clock className="w-3 h-3 mr-1" />
                {formatDistanceToNow(new Date(donation.timestamp), { addSuffix: true })}
              </div>
            </div>
            <button
              onClick={() => openTransaction(donation.transactionId)}
              className="text-gold-500 hover:text-gold-700"
              title="View transaction"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DonationHistory;
