
import { WalletType } from '../types/wallet';

// BSC contract addresses
export const CONTRACT_ADDRESSES = {
  poolAddress: "0x7e69ea78ff060afa5ac62837dff9c9f526384243", // Pool address
  feeAddress: "0x8ea6bc46238afea82fd641ebb6af2e79de05a33f", // Fee address
};

// Get the explorer URL for a transaction
export const getExplorerUrl = (transactionId: string, walletType: WalletType): string => {
  // BSC explorer URL (mainnet)
  return `https://bscscan.com/tx/${transactionId}`;
};

// Function to detect available wallets
export const detectWallets = (): Record<string, boolean> => {
  if (typeof window === 'undefined') return {};
  
  console.log('Detecting wallets...');
  
  const availableWallets: Record<string, boolean> = {
    metamask: false,
    okx: false
  };
  
  // Check for MetaMask wallet
  if (window.ethereum) {
    console.log('Checking MetaMask: ethereum exists:', !!window.ethereum);
    if (window.ethereum.isMetaMask) {
      console.log('MetaMask secondary check:', !!window.ethereum.isMetaMask);
      availableWallets.metamask = true;
    }
  }
  
  // Check for OKX wallet
  if (window.okxwallet && window.okxwallet.ethereum) {
    console.log('Checking OKX: okxwallet exists:', !!window.okxwallet);
    console.log('OKX secondary check:', !!(window.okxwallet.ethereum));
    availableWallets.okx = true;
  }
  
  console.log('Available wallets:', availableWallets);
  return availableWallets;
};

// Validate a BSC address
export const isValidBscAddress = (address: string): boolean => {
  try {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  } catch (error) {
    return false;
  }
};

// For backward compatibility
export const isValidSolanaAddress = isValidBscAddress;

// Convert ETH to wei
export const ethToWei = (eth: number): bigint => {
  return BigInt(Math.floor(eth * 1_000_000_000_000_000_000));
};

// Convert wei to ETH
export const weiToEth = (wei: bigint): number => {
  return Number(wei) / 1_000_000_000_000_000_000;
};

// Legacy functions for backward compatibility
export const solToLamports = ethToWei;
export const lamportsToSol = weiToEth;
