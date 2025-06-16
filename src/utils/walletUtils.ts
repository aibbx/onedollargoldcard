
import { WalletType } from '../types/wallet';

// BSC contract addresses for production - 这些地址是固定的，不能更改
export const CONTRACT_ADDRESSES = {
  poolAddress: "0x2CdF636C5C3Ef95811dFf26062cdC3c888CC93C0", // Pool address - 固定不变
  feeAddress: "0x6c521c6eB53361e901EC2bC1a2D392c8e9796f77", // Fee address (隐藏在前端) - 固定不变
};

// Get the explorer URL for a transaction
export const getExplorerUrl = (transactionId: string, walletType: WalletType): string => {
  // BSC explorer URL (mainnet)
  return `https://bscscan.com/tx/${transactionId}`;
};

// Function to detect available wallets
export const detectWallets = (): Record<string, boolean> => {
  if (typeof window === 'undefined') return {};
  
  console.log('正在检测钱包...');
  
  const availableWallets: Record<string, boolean> = {
    metamask: false,
    okx: false,
    binance: false,
    bitget: false
  };
  
  // 检测 MetaMask 钱包
  if (window.ethereum) {
    console.log('检测到 ethereum 对象:', !!window.ethereum);
    if (window.ethereum.isMetaMask) {
      console.log('确认是 MetaMask 钱包');
      availableWallets.metamask = true;
    }
  }
  
  // 检测 OKX 钱包
  if (window.okxwallet && window.okxwallet.ethereum) {
    console.log('检测到 OKX 钱包');
    availableWallets.okx = true;
  }
  
  // 检测 Binance 钱包
  if (window.BinanceChain && window.BinanceChain.isBinance) {
    console.log('检测到 Binance 钱包');
    availableWallets.binance = true;
  }
  
  // 检测 Bitget 钱包
  if (window.bitkeep && window.bitkeep.ethereum) {
    console.log('检测到 Bitget 钱包');
    availableWallets.bitget = true;
  }
  
  console.log('钱包检测结果:', availableWallets);
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
