
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
    autoConnectWallet
  } = useWalletConnectors();

  // Initialize donation state
  const [initialDonations, setInitialDonations] = useState<DonationRecord[]>([]);
  
  const {
    donations,
    setDonations,
    totalDonationAmount,
    winningChance,
    sendDonation,
    updateDonationStats
  } = useDonationHandlers(isWalletConnected, walletAddress, walletType, provider, initialDonations);

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
          const parsedDonations = JSON.parse(savedDonations);
          setInitialDonations(parsedDonations);
          setDonations(parsedDonations);
        } catch (error) {
          console.error('Failed to parse saved donations:', error);
        }
      }
    };
    
    checkWalletConnection();
  }, []);

  // Update statistics when donations change
  useEffect(() => {
    updateDonationStats();
  }, [donations]);

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
