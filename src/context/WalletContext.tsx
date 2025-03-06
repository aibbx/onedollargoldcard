
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
  sendDonation: (amount: number) => Promise<string | null>;
  donations: DonationRecord[];
  totalDonationAmount: number;
  winningChance: number;
}

// Contract addresses
export const CONTRACT_ADDRESSES = {
  poolAddress: 'BQ7HxJbuGjLxs6PDEg19RLmzHamdTjnByNqBiDTin3rt', // Pool address (onedollargoldcard.sol)
  feeAddress: '5ecoPEMgbz8CL8ymcLVhUNFkp3ded5mWH731L2So7e9Q' // Platform fee address
};

// Define donation record interface
export interface DonationRecord {
  id: string;
  amount: number;
  timestamp: Date;
  transactionId: string;
}

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
  const [donations, setDonations] = useState<DonationRecord[]>([]);
  const [totalDonationAmount, setTotalDonationAmount] = useState(0);
  const [winningChance, setWinningChance] = useState(0);
  const [provider, setProvider] = useState<any>(null);

  // Calculate statistics when donations change
  useEffect(() => {
    if (donations.length > 0) {
      const total = donations.reduce((sum, donation) => sum + donation.amount, 0);
      setTotalDonationAmount(total);
      
      // Calculate winning chance (assumes total pool size of $1,250,000)
      const poolSize = 1250000;
      const chance = (total / poolSize) * 100;
      setWinningChance(chance);
    } else {
      setTotalDonationAmount(0);
      setWinningChance(0);
    }
  }, [donations]);

  // Check for existing wallet connection on load
  useEffect(() => {
    const checkWalletConnection = async () => {
      const savedWalletType = localStorage.getItem('walletType') as WalletType;
      const savedWalletAddress = localStorage.getItem('walletAddress');
      const savedDonations = localStorage.getItem('donations');
      
      if (savedWalletType && savedWalletAddress) {
        try {
          // Try to reconnect to the wallet
          await autoConnectWallet(savedWalletType);
        } catch (error) {
          console.error('Failed to auto-connect wallet:', error);
          // Clear storage if auto-connect fails
          localStorage.removeItem('walletType');
          localStorage.removeItem('walletAddress');
        }
      }
      
      if (savedDonations) {
        try {
          setDonations(JSON.parse(savedDonations));
        } catch (error) {
          console.error('Failed to parse saved donations:', error);
        }
      }
    };
    
    checkWalletConnection();
  }, []);

  // Auto-connect to wallet
  const autoConnectWallet = async (type: WalletType) => {
    try {
      if (type === 'Phantom') {
        if (!window.solana) {
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
        if (!window.solflare) {
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
      } else {
        // Fallback to mock connection for other wallet types
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
        if (!window.solana) {
          toast({
            title: "Wallet Not Found",
            description: "Please install the Phantom wallet extension and refresh the page.",
            variant: "destructive",
          });
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
        if (!window.solflare) {
          toast({
            title: "Wallet Not Found",
            description: "Please install the Solflare wallet extension and refresh the page.",
            variant: "destructive",
          });
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
      } else {
        // Mock connection for other wallet types or when in development
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
      }
    }
    
    setProvider(null);
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

  // Send donation function
  const sendDonation = async (amount: number): Promise<string | null> => {
    if (!isWalletConnected || !walletAddress) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to make a donation.",
        variant: "destructive",
      });
      return null;
    }
    
    try {
      // In production, this would be a real blockchain transaction
      // For now, we'll simulate a transaction
      
      let transactionId;
      
      if (provider && (walletType === 'Phantom' || walletType === 'Solflare')) {
        try {
          // This is where you would implement the actual transaction code
          // For now, we'll just generate a mock transaction ID
          transactionId = `TX_${Math.random().toString(36).substring(2, 15)}`;
          
          // In a real implementation, you would:
          // 1. Create a transaction to send USDC to the contract address
          // 2. Sign it with the wallet
          // 3. Send it to the network
          // 4. Get the transaction ID from the response
        } catch (err) {
          console.error('Error sending transaction:', err);
          throw new Error('Transaction failed');
        }
      } else {
        // Mock transaction for development
        transactionId = `TX_${Math.random().toString(36).substring(2, 15)}`;
      }
      
      // Create a donation record
      const newDonation: DonationRecord = {
        id: `donation_${Date.now()}`,
        amount: amount,
        timestamp: new Date(),
        transactionId: transactionId
      };
      
      // Update the donations state
      const updatedDonations = [...donations, newDonation];
      setDonations(updatedDonations);
      
      // Save to localStorage
      localStorage.setItem('donations', JSON.stringify(updatedDonations));
      
      toast({
        title: "Donation Successful",
        description: `Thank you for your donation of $${amount.toFixed(2)} USDC!`,
      });
      
      return transactionId;
    } catch (error) {
      console.error('Error sending donation:', error);
      toast({
        title: "Donation Failed",
        description: "Your donation could not be processed. Please try again.",
        variant: "destructive",
      });
      return null;
    }
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
      disconnectWallet,
      sendDonation,
      donations,
      totalDonationAmount,
      winningChance
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

// Add type definitions for wallet providers
declare global {
  interface Window {
    solana?: {
      isPhantom?: boolean;
      isConnected: boolean;
      connect: () => Promise<{ publicKey: { toString: () => string } }>;
      disconnect: () => Promise<void>;
      publicKey?: { toString: () => string };
    };
    solflare?: {
      isConnected: boolean;
      connect: () => Promise<void>;
      disconnect: () => Promise<void>;
      publicKey?: { toString: () => string };
    };
  }
}
