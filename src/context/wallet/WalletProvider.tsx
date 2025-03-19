
import React, { ReactNode } from 'react';
import WalletContext from './WalletContext';
import { useDonationHandlers } from '../../hooks/useDonationHandlers';
import { useWalletConnection } from '../../hooks/wallet/useWalletConnection';
import { useWalletData } from '../../hooks/wallet/useWalletData';
import { useWalletAutoConnect } from '../../hooks/wallet/useWalletAutoConnect';
import { useWalletStatsSubscription } from '../../hooks/wallet/useWalletStatsSubscription';

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Use the wallet connection hook
  const {
    isWalletConnected,
    setIsWalletConnected,
    walletType,
    setWalletType,
    walletAddress,
    setWalletAddress,
    network,
    provider,
    setProvider,
    connectWallet,
    disconnectWallet
  } = useWalletConnection();
  
  // Use the wallet data hook
  const {
    donations,
    setDonations,
    userStats,
    setUserStats,
    totalDonationAmount,
    winningChance,
    loadUserDonations,
    loadUserStats
  } = useWalletData(isWalletConnected, walletAddress);
  
  // Use the auto-connect hook
  useWalletAutoConnect(
    setIsWalletConnected,
    setWalletType,
    setWalletAddress,
    loadUserDonations,
    loadUserStats
  );
  
  // Use the stats subscription hook
  useWalletStatsSubscription(
    isWalletConnected,
    walletAddress,
    setUserStats
  );
  
  // Use the donation handlers hook
  const {
    sendDonation,
    recoverDonation,
    isProcessing
  } = useDonationHandlers(
    isWalletConnected,
    walletAddress,
    walletType,
    provider,
    donations
  );

  // Prepare the context value
  const contextValue = {
    isWalletConnected,
    walletType,
    walletAddress,
    network,
    provider,
    donations,
    totalDonationAmount,
    winningChance,
    isProcessing,
    connectWallet,
    disconnectWallet,
    sendDonation,
    recoverDonation
  };

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
};
