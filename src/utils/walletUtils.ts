
import { WalletType } from '../types/wallet';

// Real mainnet contract addresses
export const CONTRACT_ADDRESSES = {
  // Solana contract addresses
  poolAddress: "BQ7HxJbuGjLxs6PDEg19RLmzHamdTjnByNqBiDTin3rt", // Updated pool address
  feeAddress: "5ecoPEMgbz8CL8ymcLVhUNFkp3ded5mWH731L2So7e9Q", // Updated fee address
  // Ethereum contract addresses (for MetaMask)
  ethereumPoolAddress: "0xE1F4Af4D3Bc52d82387E86C2635C92DD2E301dAE" // Update with actual Ethereum mainnet pool address
};

// Get the explorer URL for a transaction
export const getExplorerUrl = (transactionId: string, walletType: WalletType): string => {
  if (walletType === 'MetaMask') {
    return `https://etherscan.io/tx/${transactionId}`;
  } else {
    // Solana explorer URL (mainnet)
    return `https://solscan.io/tx/${transactionId}`;
  }
};

// Function to detect available wallets
export const detectWallets = (): Record<string, boolean> => {
  if (typeof window === 'undefined') return {};
  
  const availableWallets: Record<string, boolean> = {
    phantom: false,
    solflare: false,
    okx: false,
    metamask: false
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
  
  if (window.ethereum && window.ethereum.isMetaMask) {
    availableWallets.metamask = true;
  }
  
  return availableWallets;
};

// Update to remove mock data generation and use real transactions only
export const generateTransactionHash = (chain: string): string => {
  console.warn('Warning: Using generateTransactionHash which should not be used in production');
  // This function should ideally not be used in production
  // Return empty string to indicate failure or for testing only
  return '';
};

// Remove mock address generation
export const generateMockAddress = (type: string): string => {
  console.warn('Warning: Using generateMockAddress which should not be used in production');
  // This function should ideally not be used in production
  return '';
};
