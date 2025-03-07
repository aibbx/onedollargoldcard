
import { WalletType } from '../types/wallet';

// Real mainnet contract addresses
export const CONTRACT_ADDRESSES = {
  // Solana contract addresses
  poolAddress: "BQ7HxJbuGjLxs6PDEg19RLmzHamdTjnByNqBiDTin3rt", // Updated pool address
  feeAddress: "5ecoPEMgbz8CL8ymcLVhUNFkp3ded5mWH731L2So7e9Q", // Updated fee address
};

// Get the explorer URL for a transaction
export const getExplorerUrl = (transactionId: string, walletType: WalletType): string => {
  // Solana explorer URL (mainnet)
  return `https://solscan.io/tx/${transactionId}`;
};

// Function to detect available wallets
export const detectWallets = (): Record<string, boolean> => {
  if (typeof window === 'undefined') return {};
  
  const availableWallets: Record<string, boolean> = {
    phantom: false,
    solflare: false,
    okx: false
  };
  
  if (window.solana && window.solana.isPhantom) {
    availableWallets.phantom = true;
  }
  
  if (window.solflare) {
    availableWallets.solflare = true;
  }
  
  if (window.okxwallet && window.okxwallet.solana) {
    availableWallets.okx = true;
  }
  
  return availableWallets;
};

// For simulation purposes only - should not be used in production
export const generateTransactionHash = (chain: string): string => {
  // Production fallback for testing only
  return '4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM95jPq6MfP8y4g8iTGVvWiLPxAcm';
};

// For simulation purposes only - should not be used in production
export const generateMockAddress = (type: string): string => {
  // Production fallback for testing only
  return 'BQ7HxJbuGjLxs6PDEg19RLmzHamdTjnByNqBiDTin3rt';
};
