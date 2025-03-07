
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useWalletConnectors } from '../hooks/useWalletConnectors';
import { useDonationHandlers } from '../hooks/useDonationHandlers';
import { WalletContextType, WalletType, DonationRecord } from '../types/wallet';
import { CONTRACT_ADDRESSES } from '../utils/walletUtils';

// Create the context
const WalletContext = createContext<WalletContextType | undefined>(undefined);

// WalletProvider props interface
interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const {
    provider,
    walletType,
    walletAddress,
    isWalletConnected,
    connectWallet,
    disconnectWallet,
    autoConnectWallet,
    walletDetectionComplete
  } = useWalletConnectors();

  // Initialize donation state
  const [initialDonations, setInitialDonations] = useState<DonationRecord[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const {
    donations,
    setDonations,
    totalDonationAmount,
    winningChance,
    sendDonation,
    updateDonationStats
  } = useDonationHandlers(isWalletConnected, walletAddress, walletType, provider, initialDonations);

  // Load saved donations from localStorage
  useEffect(() => {
    const loadSavedDonations = () => {
      const savedDonations = localStorage.getItem('donations');
      
      if (savedDonations) {
        try {
          const parsedDonations = JSON.parse(savedDonations);
          // Convert ISO string timestamps back to Date objects
          const processedDonations = parsedDonations.map((donation: any) => ({
            ...donation,
            timestamp: new Date(donation.timestamp)
          }));
          
          setInitialDonations(processedDonations);
          setDonations(processedDonations);
        } catch (error) {
          console.error('Failed to parse saved donations:', error);
          // Clear potentially corrupted data
          localStorage.removeItem('donations');
        }
      }
    };
    
    loadSavedDonations();
  }, []);

  // Check for existing wallet connection on load
  useEffect(() => {
    if (!walletDetectionComplete) return;
    
    const checkWalletConnection = async () => {
      const savedWalletType = localStorage.getItem('walletType') as WalletType;
      const savedWalletAddress = localStorage.getItem('walletAddress');
      
      if (savedWalletType && savedWalletAddress) {
        try {
          // Try to reconnect to the wallet
          await autoConnectWallet(savedWalletType);
          console.log(`Auto-connected to ${savedWalletType} wallet`);
        } catch (error) {
          console.error('Failed to auto-connect wallet:', error);
          // Clear storage if auto-connect fails
          localStorage.removeItem('walletType');
          localStorage.removeItem('walletAddress');
        } finally {
          setIsInitialized(true);
        }
      } else {
        setIsInitialized(true);
      }
    };
    
    checkWalletConnection();
  }, [walletDetectionComplete]);

  // Update statistics when donations change
  useEffect(() => {
    if (donations.length > 0) {
      updateDonationStats();
    }
  }, [donations]);

  // Wallet connection event handlers
  useEffect(() => {
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        // User disconnected their wallet
        disconnectWallet();
      } else if (accounts[0] !== walletAddress) {
        // User switched accounts
        window.location.reload();
      }
    };

    // Add event listeners for wallet changes
    if (isWalletConnected && window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', () => window.location.reload());
    }

    return () => {
      // Remove event listeners when component unmounts
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', () => {});
      }
    };
  }, [isWalletConnected, walletAddress]);

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

// Export types and constants
export type { WalletType, DonationRecord };
export { CONTRACT_ADDRESSES };
