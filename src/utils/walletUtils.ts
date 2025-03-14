
import { WalletType } from '../types/wallet';
import { PublicKey } from '@solana/web3.js';

// Solana contract addresses
export const CONTRACT_ADDRESSES = {
  poolAddress: "BQ7HxJbuGjLxs6PDEg19RLmzHamdTjnByNqBiDTin3rt", // Pool address
  feeAddress: "5ecoPEMgbz8CL8ymcLVhUNFkp3ded5mWH731L2So7e9Q", // Fee address
};

// Get the explorer URL for a transaction
export const getExplorerUrl = (transactionId: string, walletType: WalletType): string => {
  // Solana explorer URL (mainnet)
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

// Validate a Solana address
export const isValidSolanaAddress = (address: string): boolean => {
  try {
    new PublicKey(address);
    return true;
  } catch (error) {
    return false;
  }
};

// Convert SOL to lamports
export const solToLamports = (sol: number): number => {
  return Math.floor(sol * 1_000_000_000);
};

// Convert lamports to SOL
export const lamportsToSol = (lamports: number): number => {
  return lamports / 1_000_000_000;
};
