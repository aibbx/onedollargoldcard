
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from 'lucide-react';
import { WalletType } from '../../types/wallet';

interface WalletOptionsProps {
  onConnect: (type: WalletType) => Promise<void>;
}

const WalletOptions: React.FC<WalletOptionsProps> = ({ onConnect }) => {
  const [availableWallets, setAvailableWallets] = useState({
    phantom: false,
    solflare: false,
    okx: false,
    metamask: false
  });

  useEffect(() => {
    // Check what wallets are available in the browser
    const detectWallets = () => {
      setAvailableWallets({
        phantom: typeof window !== 'undefined' && 'solana' in window,
        solflare: typeof window !== 'undefined' && 'solflare' in window,
        okx: typeof window !== 'undefined' && 'okxwallet' in window && 'solana' in window.okxwallet,
        metamask: typeof window !== 'undefined' && 'ethereum' in window && window.ethereum?.isMetaMask
      });
    };
    
    // Small delay to ensure browser extensions have loaded
    const timer = setTimeout(() => {
      detectWallets();
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleConnect = async (type: WalletType) => {
    try {
      await onConnect(type);
    } catch (error) {
      console.error(`Failed to connect ${type} wallet:`, error);
    }
  };

  const openWalletSite = (url: string, e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
      <h4 className="font-medium text-gray-800 mb-2">Select Wallet</h4>
      
      <Button 
        onClick={() => handleConnect('Phantom')}
        className={`w-full justify-between ${availableWallets.phantom ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-300'}`}
        disabled={!availableWallets.phantom}
      >
        Phantom 
        {availableWallets.phantom ? (
          <img src="/wallet-icons/phantom-icon.png" alt="Phantom" className="w-5 h-5" />
        ) : (
          <span 
            className="text-xs underline cursor-pointer" 
            onClick={(e) => openWalletSite('https://phantom.app/', e)}
          >
            Install
          </span>
        )}
      </Button>
      
      <Button 
        onClick={() => handleConnect('Solflare')}
        className={`w-full justify-between ${availableWallets.solflare ? 'bg-orange-500 hover:bg-orange-600' : 'bg-orange-300'}`}
        disabled={!availableWallets.solflare}
      >
        Solflare 
        {availableWallets.solflare ? (
          <img src="/wallet-icons/solflare-icon.png" alt="Solflare" className="w-5 h-5" />
        ) : (
          <span 
            className="text-xs underline cursor-pointer" 
            onClick={(e) => openWalletSite('https://solflare.com/', e)}
          >
            Install
          </span>
        )}
      </Button>
      
      <Button 
        onClick={() => handleConnect('OKX')}
        className={`w-full justify-between ${availableWallets.okx ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-300'}`}
        disabled={!availableWallets.okx}
      >
        OKX Wallet 
        {availableWallets.okx ? (
          <img src="/wallet-icons/okx-icon.png" alt="OKX" className="w-5 h-5" />
        ) : (
          <span 
            className="text-xs underline cursor-pointer" 
            onClick={(e) => openWalletSite('https://www.okx.com/web3', e)}
          >
            Install
          </span>
        )}
      </Button>
      
      <Button 
        onClick={() => handleConnect('MetaMask')}
        className={`w-full justify-between ${availableWallets.metamask ? 'bg-amber-500 hover:bg-amber-600' : 'bg-amber-300'}`}
        disabled={!availableWallets.metamask}
      >
        MetaMask 
        {availableWallets.metamask ? (
          <img src="/wallet-icons/metamask-icon.png" alt="MetaMask" className="w-5 h-5" />
        ) : (
          <span 
            className="text-xs underline cursor-pointer" 
            onClick={(e) => openWalletSite('https://metamask.io/', e)}
          >
            Install
          </span>
        )}
      </Button>

      {!Object.values(availableWallets).some(Boolean) && (
        <Alert variant="destructive" className="mt-3">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            No compatible wallets detected. Please install one of the wallets above to continue.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default WalletOptions;
