
import { useEffect } from 'react';
import { WalletType } from '../../types/wallet';

export const useWalletAutoConnect = (
  setIsWalletConnected: (value: boolean) => void,
  setWalletType: (type: WalletType) => void,
  setWalletAddress: (address: string) => void,
  loadUserDonations: (address: string) => void,
  loadUserStats: (address: string) => void
) => {
  // Try to restore wallet connection from localStorage on component mount
  useEffect(() => {
    const isConnected = localStorage.getItem('walletConnected') === 'true';
    const savedWalletType = localStorage.getItem('walletType') as WalletType;
    const savedWalletAddress = localStorage.getItem('walletAddress');
    
    if (isConnected && savedWalletType && savedWalletAddress) {
      // Set initial state, but don't actually connect
      setIsWalletConnected(true);
      setWalletType(savedWalletType);
      setWalletAddress(savedWalletAddress);
      
      // Load user data
      loadUserDonations(savedWalletAddress);
      loadUserStats(savedWalletAddress);
    }
  }, []);
};
