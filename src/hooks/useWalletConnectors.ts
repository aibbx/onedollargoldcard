
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { WalletType } from '../types/wallet';
import { detectWallets } from '../utils/walletUtils';
import { 
  connectWallet as connectWalletUtil, 
  autoConnectWallet as autoConnectWalletUtil,
  disconnectWallet as disconnectWalletUtil
} from '../utils/wallet-connectors';

// Define the network type
export type NetworkType = 'mainnet-beta' | 'testnet' | 'devnet';

export const useWalletConnectors = () => {
  const { toast } = useToast();
  const [provider, setProvider] = useState<any>(null);
  const [walletType, setWalletType] = useState<WalletType>('');
  const [walletAddress, setWalletAddress] = useState('');
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletDetectionComplete, setWalletDetectionComplete] = useState(false);
  // Set the network to devnet
  const network: NetworkType = 'devnet';

  // Detect available wallets
  useEffect(() => {
    const detectAvailableWallets = () => {
      // Check what wallets are available for better UX
      const availableWallets = detectWallets();
      console.log('Available wallets:', availableWallets);
      setWalletDetectionComplete(true);
    };
    
    // Small delay to ensure browser extensions have loaded
    const timer = setTimeout(() => {
      detectAvailableWallets();
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Auto-connect to wallet
  const autoConnectWallet = async (type: WalletType) => {
    try {
      const result = await autoConnectWalletUtil(type, network);
      
      if (result) {
        const { address, provider: walletProvider } = result;
        
        setProvider(walletProvider);
        setWalletType(type);
        setWalletAddress(address);
        setIsWalletConnected(true);
        
        localStorage.setItem('walletType', type);
        localStorage.setItem('walletAddress', address);
        
        return Promise.resolve();
      } else {
        throw new Error(`Could not auto-connect to ${type} wallet`);
      }
    } catch (error) {
      console.error('Error auto-connecting wallet:', error);
      throw error;
    }
  };

  // Connect wallet function
  const connectWallet = async (type: WalletType) => {
    try {
      // Check if wallet is installed and show appropriate message if not
      if (type === 'Phantom' && (typeof window === 'undefined' || !window.solana)) {
        toast({
          title: "Wallet Not Found",
          description: "Please install the Phantom wallet extension and refresh the page.",
          variant: "destructive",
        });
        window.open("https://phantom.app/", "_blank");
        return Promise.reject(new Error('Phantom wallet not installed'));
      } else if (type === 'Solflare' && (typeof window === 'undefined' || !window.solflare)) {
        toast({
          title: "Wallet Not Found",
          description: "Please install the Solflare wallet extension and refresh the page.",
          variant: "destructive",
        });
        window.open("https://solflare.com/", "_blank");
        return Promise.reject(new Error('Solflare wallet not installed'));
      } else if (type === 'OKX' && (typeof window === 'undefined' || !window.okxwallet || !window.okxwallet.solana)) {
        toast({
          title: "Wallet Not Found",
          description: "Please install the OKX wallet extension and refresh the page.",
          variant: "destructive",
        });
        window.open("https://www.okx.com/web3", "_blank");
        return Promise.reject(new Error('OKX wallet not installed'));
      }
      
      try {
        const result = await connectWalletUtil(type, network);
        const { address, provider: walletProvider } = result;
        
        setProvider(walletProvider);
        setWalletType(type);
        setWalletAddress(address);
        setIsWalletConnected(true);
        
        localStorage.setItem('walletType', type);
        localStorage.setItem('walletAddress', address);
        
        toast({
          title: "Wallet Connected",
          description: `Your ${type} wallet has been connected successfully to Solana ${network}.`,
        });
        
        return Promise.resolve();
      } catch (err) {
        toast({
          title: "Connection Rejected",
          description: "The connection request was rejected by the user.",
          variant: "destructive",
        });
        return Promise.reject(err);
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect to wallet. Please try again.",
        variant: "destructive",
      });
      return Promise.reject(error);
    }
  };

  // Disconnect wallet function
  const disconnectWallet = () => {
    if (provider && walletType) {
      disconnectWalletUtil(walletType);
    }
    
    setProvider(null);
    setWalletType('');
    setWalletAddress('');
    setIsWalletConnected(false);
    
    localStorage.removeItem('walletType');
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('donations');
    
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    });
  };

  return {
    provider,
    setProvider,
    walletType,
    setWalletType,
    walletAddress,
    setWalletAddress,
    isWalletConnected,
    setIsWalletConnected,
    connectWallet,
    disconnectWallet,
    autoConnectWallet,
    walletDetectionComplete,
    network
  };
};
