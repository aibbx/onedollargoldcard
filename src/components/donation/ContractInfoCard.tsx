
import React from 'react';
import { ExternalLink } from 'lucide-react';

interface ContractInfoCardProps {
  contractName: string;
  contractAddress: string;
  onClick: () => void;
}

const ContractInfoCard: React.FC<ContractInfoCardProps> = ({ 
  contractName, 
  contractAddress, 
  onClick 
}) => {
  return (
    <div 
      className="bg-gradient-to-r from-gold-200 via-gold-100 to-gold-200 p-4 rounded-lg border border-gold-300 text-center hover:shadow-lg transition-all duration-300 cursor-pointer relative overflow-hidden group" 
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-card-shimmer opacity-0 group-hover:opacity-100"></div>
      <div className="text-sm font-medium text-gray-700 mb-1">Verified Smart Contract</div>
      <div className="flex items-center justify-center">
        <span className="text-gold-600 font-bold tracking-wide">{contractName}</span>
        <ExternalLink className="w-4 h-4 ml-2 text-gold-500" />
      </div>
      <div className="text-xs text-gray-600 mt-1 font-medium">View on Solscan Explorer</div>
    </div>
  );
};

export default ContractInfoCard;
