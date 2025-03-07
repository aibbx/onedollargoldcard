
import { WalletType } from '../types/wallet';

// Solana contract addresses (mainnet)
export const CONTRACT_ADDRESSES = {
  poolAddress: "BQ7HxJbuGjLxs6PDEg19RLmzHamdTjnByNqBiDTin3rt", // Pool address on mainnet
  feeAddress: "5ecoPEMgbz8CL8ymcLVhUNFkp3ded5mWH731L2So7e9Q", // Fee address on mainnet
};

// Get the explorer URL for a transaction - using Solscan for better visibility
export const getExplorerUrl = (transactionId: string, walletType: WalletType): string => {
  // Solana explorer URL (mainnet) - Solscan provides better UI and more details
  return `https://solscan.io/tx/${transactionId}`;
};

// Function to detect available wallets
export const detectWallets = (): Record<string, boolean> => {
  if (typeof window === 'undefined') return {};
  
  console.log('Detecting wallets...');
  
  const availableWallets: Record<string, boolean> = {
    phantom: false,
    solflare: false,
    okx: false
  };
  
  // Check for Phantom wallet
  if (window.solana) {
    console.log('Checking Phantom: solana exists:', !!window.solana);
    if (window.solana.isPhantom) {
      console.log('Phantom secondary check:', !!window.solana.isPhantom);
      availableWallets.phantom = true;
    }
  }
  
  // Check for Solflare wallet
  if (window.solflare) {
    console.log('Checking Solflare: solflare exists:', !!window.solflare);
    availableWallets.solflare = true;
  }
  
  // Check for OKX wallet
  if (window.okxwallet && window.okxwallet.solana) {
    console.log('Checking OKX: okxwallet exists:', !!window.okxwallet);
    console.log('OKX secondary check:', !!(window.okxwallet.solana));
    availableWallets.okx = true;
  }
  
  console.log('Available wallets:', availableWallets);
  return availableWallets;
};
