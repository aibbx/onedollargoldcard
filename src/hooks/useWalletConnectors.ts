
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { WalletType } from '../types/wallet';
import { generateMockAddress } from '../utils/walletUtils';

export const useWalletConnectors = () => {
  const { toast } = useToast();
  const [provider, setProvider] = useState<any>(null);
  const [walletType, setWalletType] = useState<WalletType>('');
  const [walletAddress, setWalletAddress] = useState('');
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletDetectionComplete, setWalletDetectionComplete] = useState(false);

  // Detect available wallets
  useEffect(() => {
    const detectWallets = () => {
      // Check what wallets are available for better UX
      const availableWallets = {
        phantom: typeof window !== 'undefined' && 'solana' in window,
        solflare: typeof window !== 'undefined' && 'solflare' in window,
        okx: typeof window !== 'undefined' && 'okxwallet' in window && 'solana' in window.okxwallet,
        metamask: typeof window !== 'undefined' && 'ethereum' in window && window.ethereum?.isMetaMask
      };
      
      console.log('Available wallets:', availableWallets);
      setWalletDetectionComplete(true);
    };
    
    // Small delay to ensure browser extensions have loaded
    const timer = setTimeout(() => {
      detectWallets();
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Auto-connect to wallet
  const autoConnectWallet = async (type: WalletType) => {
    try {
      if (type === 'Phantom') {
        if (typeof window === 'undefined' || !window.solana) {
          throw new Error('Phantom wallet not installed');
        }
        
        const provider = window.solana;
        if (provider.isConnected) {
          setProvider(provider);
          setWalletType(type);
          const address = provider.publicKey?.toString() || '';
          setWalletAddress(address);
          setIsWalletConnected(true);
          return;
        }
        
        // If not connected, try to connect
        const response = await provider.connect();
        const address = response.publicKey.toString();
        setProvider(provider);
        setWalletType(type);
        setWalletAddress(address);
        setIsWalletConnected(true);
        
        localStorage.setItem('walletType', type);
        localStorage.setItem('walletAddress', address);
      } else if (type === 'Solflare') {
        if (typeof window === 'undefined' || !window.solflare) {
          throw new Error('Solflare wallet not installed');
        }
        
        const provider = window.solflare;
        if (provider.isConnected) {
          setProvider(provider);
          setWalletType(type);
          const address = provider.publicKey?.toString() || '';
          setWalletAddress(address);
          setIsWalletConnected(true);
          return;
        }
        
        // If not connected, try to connect
        await provider.connect();
        const address = provider.publicKey?.toString() || '';
        setProvider(provider);
        setWalletType(type);
        setWalletAddress(address);
        setIsWalletConnected(true);
        
        localStorage.setItem('walletType', type);
        localStorage.setItem('walletAddress', address);
      } else if (type === 'OKX') {
        if (typeof window === 'undefined' || !window.okxwallet || !window.okxwallet.solana) {
          throw new Error('OKX wallet not installed');
        }
        
        const provider = window.okxwallet.solana;
        if (provider.isConnected) {
          setProvider(provider);
          setWalletType(type);
          const address = provider.publicKey?.toString() || '';
          setWalletAddress(address);
          setIsWalletConnected(true);
          return;
        }
        
        // If not connected, try to connect
        const response = await provider.connect();
        const address = response.publicKey.toString();
        setProvider(provider);
        setWalletType(type);
        setWalletAddress(address);
        setIsWalletConnected(true);
        
        localStorage.setItem('walletType', type);
        localStorage.setItem('walletAddress', address);
      } else if (type === 'MetaMask') {
        if (typeof window === 'undefined' || !window.ethereum) {
          throw new Error('MetaMask wallet not installed');
        }
        
        const provider = window.ethereum;
        // Get the current accounts
        const accounts = await provider.request({ method: 'eth_accounts' });
        
        if (accounts && accounts.length > 0) {
          setProvider(provider);
          setWalletType(type);
          setWalletAddress(accounts[0]);
          setIsWalletConnected(true);
          return;
        }
        
        // If not connected, try to connect
        const newAccounts = await provider.request({ method: 'eth_requestAccounts' });
        if (newAccounts && newAccounts.length > 0) {
          setProvider(provider);
          setWalletType(type);
          setWalletAddress(newAccounts[0]);
          setIsWalletConnected(true);
          
          localStorage.setItem('walletType', type);
          localStorage.setItem('walletAddress', newAccounts[0]);
        } else {
          throw new Error('No accounts found');
        }
      } else {
        // Fallback to mock connection for other wallet types (should not reach here)
        const mockAddress = generateMockAddress(type);
        setWalletType(type);
        setWalletAddress(mockAddress);
        setIsWalletConnected(true);
        
        localStorage.setItem('walletType', type);
        localStorage.setItem('walletAddress', mockAddress);
      }
    } catch (error) {
      console.error('Error auto-connecting wallet:', error);
      throw error;
    }
  };

  // Connect wallet function
  const connectWallet = async (type: WalletType) => {
    try {
      if (type === 'Phantom') {
        if (typeof window === 'undefined' || !window.solana) {
          toast({
            title: "Wallet Not Found",
            description: "Please install the Phantom wallet extension and refresh the page.",
            variant: "destructive",
          });
          window.open("https://phantom.app/", "_blank");
          return Promise.reject(new Error('Phantom wallet not installed'));
        }
        
        const provider = window.solana;
        
        // Request connection to the wallet
        try {
          const response = await provider.connect();
          const address = response.publicKey.toString();
          
          setProvider(provider);
          setWalletType(type);
          setWalletAddress(address);
          setIsWalletConnected(true);
          
          localStorage.setItem('walletType', type);
          localStorage.setItem('walletAddress', address);
          
          toast({
            title: "Wallet Connected",
            description: "Your Phantom wallet has been connected successfully.",
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
      } else if (type === 'Solflare') {
        if (typeof window === 'undefined' || !window.solflare) {
          toast({
            title: "Wallet Not Found",
            description: "Please install the Solflare wallet extension and refresh the page.",
            variant: "destructive",
          });
          window.open("https://solflare.com/", "_blank");
          return Promise.reject(new Error('Solflare wallet not installed'));
        }
        
        const provider = window.solflare;
        
        // Request connection to the wallet
        try {
          await provider.connect();
          const address = provider.publicKey?.toString();
          
          if (!address) {
            throw new Error('No public key found after connection');
          }
          
          setProvider(provider);
          setWalletType(type);
          setWalletAddress(address);
          setIsWalletConnected(true);
          
          localStorage.setItem('walletType', type);
          localStorage.setItem('walletAddress', address);
          
          toast({
            title: "Wallet Connected",
            description: "Your Solflare wallet has been connected successfully.",
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
      } else if (type === 'OKX') {
        if (typeof window === 'undefined' || !window.okxwallet || !window.okxwallet.solana) {
          toast({
            title: "Wallet Not Found",
            description: "Please install the OKX wallet extension and refresh the page.",
            variant: "destructive",
          });
          window.open("https://www.okx.com/web3", "_blank");
          return Promise.reject(new Error('OKX wallet not installed'));
        }
        
        const provider = window.okxwallet.solana;
        
        // Request connection to the wallet
        try {
          const response = await provider.connect();
          const address = response.publicKey.toString();
          
          setProvider(provider);
          setWalletType(type);
          setWalletAddress(address);
          setIsWalletConnected(true);
          
          localStorage.setItem('walletType', type);
          localStorage.setItem('walletAddress', address);
          
          toast({
            title: "Wallet Connected",
            description: "Your OKX wallet has been connected successfully.",
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
      } else if (type === 'MetaMask') {
        if (typeof window === 'undefined' || !window.ethereum) {
          toast({
            title: "Wallet Not Found",
            description: "Please install the MetaMask extension and refresh the page.",
            variant: "destructive",
          });
          window.open("https://metamask.io/", "_blank");
          return Promise.reject(new Error('MetaMask wallet not installed'));
        }
        
        const provider = window.ethereum;
        
        // Request connection to the wallet
        try {
          const accounts = await provider.request({ method: 'eth_requestAccounts' });
          if (accounts && accounts.length > 0) {
            setProvider(provider);
            setWalletType(type);
            setWalletAddress(accounts[0]);
            setIsWalletConnected(true);
            
            localStorage.setItem('walletType', type);
            localStorage.setItem('walletAddress', accounts[0]);
            
            toast({
              title: "Wallet Connected",
              description: "Your MetaMask wallet has been connected successfully.",
            });
            
            return Promise.resolve();
          } else {
            throw new Error('No accounts found');
          }
        } catch (err) {
          toast({
            title: "Connection Rejected",
            description: "The connection request was rejected by the user.",
            variant: "destructive",
          });
          return Promise.reject(err);
        }
      } else {
        // This should not be reached, but keeping as fallback
        const mockAddress = generateMockAddress(type);
        
        setWalletType(type);
        setWalletAddress(mockAddress);
        setIsWalletConnected(true);
        
        localStorage.setItem('walletType', type);
        localStorage.setItem('walletAddress', mockAddress);
        
        toast({
          title: "Wallet Connected",
          description: `Your ${type} wallet has been connected successfully.`,
        });
        
        return Promise.resolve();
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
    if (provider) {
      if (walletType === 'Phantom' && window.solana) {
        try {
          window.solana.disconnect();
        } catch (err) {
          console.error('Error disconnecting Phantom wallet:', err);
        }
      } else if (walletType === 'Solflare' && window.solflare) {
        try {
          window.solflare.disconnect();
        } catch (err) {
          console.error('Error disconnecting Solflare wallet:', err);
        }
      } else if (walletType === 'OKX' && window.okxwallet?.solana) {
        try {
          window.okxwallet.solana.disconnect();
        } catch (err) {
          console.error('Error disconnecting OKX wallet:', err);
        }
      }
      // MetaMask doesn't have a disconnect method in the same way
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
    walletDetectionComplete
  };
};
