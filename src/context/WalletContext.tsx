
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from "@/hooks/use-toast";

// Define wallet connection types
export type WalletType = 'Phantom' | 'Solflare' | 'OKX' | 'MetaMask' | '';

// Define wallet context interface
interface WalletContextType {
  isWalletConnected: boolean;
  walletType: WalletType;
  walletAddress: string;
  connectWallet: (type: WalletType) => Promise<void>;
  disconnectWallet: () => void;
}

// Contract addresses
export const CONTRACT_ADDRESSES = {
  poolAddress: 'BQ7HxJbuGjLxs6PDEg19RLmzHamdTjnByNqBiDTin3rt', // Pool address (onedollargoldcard.sol)
  feeAddress: '5ecoPEMgbz8CL8ymcLVhUNFkp3ded5mWH731L2So7e9Q' // Platform fee address
};

// Create the context
const WalletContext = createContext<WalletContextType | undefined>(undefined);

// WalletProvider props interface
interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const { toast } = useToast();
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletType, setWalletType] = useState<WalletType>('');
  const [walletAddress, setWalletAddress] = useState('');

  // Check for existing wallet connection on load
  useEffect(() => {
    const savedWalletType = localStorage.getItem('walletType') as WalletType;
    const savedWalletAddress = localStorage.getItem('walletAddress');
    
    if (savedWalletType && savedWalletAddress) {
      setWalletType(savedWalletType);
      setWalletAddress(savedWalletAddress);
      setIsWalletConnected(true);
    }
  }, []);

  // Connect wallet function
  const connectWallet = async (type: WalletType) => {
    try {
      // In a real implementation, we would interact with the actual wallet APIs
      // This is a mock implementation for demonstration purposes
      
      // Generate a mock wallet address based on wallet type
      const mockAddress = generateMockAddress(type);
      
      // Save wallet info to state and localStorage
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
    setWalletType('');
    setWalletAddress('');
    setIsWalletConnected(false);
    
    localStorage.removeItem('walletType');
    localStorage.removeItem('walletAddress');
    
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    });
  };

  // Helper function to generate a mock wallet address
  const generateMockAddress = (type: WalletType) => {
    const prefix = type === 'MetaMask' ? '0x' : '';
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = prefix;
    
    // Generate a random string for the address
    for (let i = 0; i < (type === 'MetaMask' ? 40 : 32); i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    return result;
  };

  return (
    <WalletContext.Provider value={{ 
      isWalletConnected, 
      walletType, 
      walletAddress,
      connectWallet, 
      disconnectWallet 
    }}>
      {children}
    </WalletContext.Provider>
  );
};

// Hook to use the wallet context
export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
