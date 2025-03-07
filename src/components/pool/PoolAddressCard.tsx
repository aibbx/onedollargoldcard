
import React from 'react';
import { Copy, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { CONTRACT_ADDRESSES } from '../../utils/walletUtils';

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
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Pool Address</h3>
          <p className="text-sm text-gray-500">View and verify the smart contract on Solscan</p>
        </div>
        <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-100 w-full md:w-auto">
          <code className="text-sm text-gold-600 font-mono">
            {CONTRACT_ADDRESSES.poolAddress.slice(0, 4)}...{CONTRACT_ADDRESSES.poolAddress.slice(-4)}
          </code>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-500 hover:text-gold-600"
            onClick={handleCopyAddress}
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-500 hover:text-gold-600"
            onClick={openSolscan}
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PoolAddressCard;
