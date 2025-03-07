
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
    walletDetectionComplete,
    network
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
    recoverDonation,
    updateDonationStats,
    isProcessing
  } = useDonationHandlers(isWalletConnected, walletAddress, walletType, provider, initialDonations);

  // Log provider to debug
  useEffect(() => {
    if (isWalletConnected && provider) {
      console.log(`Wallet provider available for ${walletType}:`, provider);
    }
  }, [isWalletConnected, provider, walletType]);

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

  // Handle wallet changes for Solana wallets
  useEffect(() => {
    const handleWalletAccountChange = () => {
      // If the wallet address changes, refresh the page
      // This is a simple approach to handle account changes
      window.location.reload();
    };

    // Add any wallet-specific event listeners if needed
    // For example, Phantom and other wallets might have their own events
    // This depends on the specific wallet implementations

    return () => {
      // Clean up any wallet-specific listeners if needed
    };
  }, [isWalletConnected, walletAddress]);

  return (
    <WalletContext.Provider value={{ 
      isWalletConnected, 
      walletType, 
      walletAddress,
      connectWallet, 
      disconnectWallet: async () => {
        disconnectWallet();
        return Promise.resolve();
      },
      sendDonation,
      recoverDonation,
      donations,
      totalDonationAmount,
      winningChance,
      network,
      isProcessing
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
