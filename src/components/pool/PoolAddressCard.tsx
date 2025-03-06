
import React from 'react';
import { Copy, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { CONTRACT_ADDRESSES } from '../../context/WalletContext';

const PoolAddressCard = () => {
  const { toast } = useToast();

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESSES.poolAddress);
    toast({
      title: "Address Copied",
      description: "Pool address has been copied to clipboard",
    });
  };

  const openSolscan = () => {
    window.open(`https://solscan.io/account/${CONTRACT_ADDRESSES.poolAddress}`, '_blank');
  };

  return (
    <div className="mb-8 bg-white rounded-xl p-6 shadow-sm border border-gold-100">
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Pool Address</h3>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <span>OneDollarGoldCard.sol</span> - 
            <button 
              onClick={openSolscan}
              className="text-gold-600 hover:text-gold-800 transition-colors flex items-center gap-1"
            >
              View on Solscan
              <ExternalLink className="h-3.5 w-3.5" />
            </button>
          </p>
        </div>
        <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-100">
          <code className="text-sm text-gold-600 font-mono flex-1 break-all">
            {CONTRACT_ADDRESSES.poolAddress}
          </code>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-500 hover:text-gold-600 shrink-0"
            onClick={handleCopyAddress}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PoolAddressCard;
