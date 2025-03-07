import { WalletType } from '../../types/wallet';
import { generateTransactionHash } from '../walletUtils';
import { sendPhantomTransaction } from './phantomTransactions';
import { sendSolflareTransaction } from './solflareTransactions';
import { sendOKXTransaction } from './okxTransactions';

// Process transaction based on wallet type
export const processTransaction = async (
  walletType: WalletType,
  provider: any,
  amount: number,
  walletAddress: string,
  isDevelopment: boolean = false
): Promise<string> => {
  try {
    // For simulation or development environment
    if (isDevelopment || !provider) {
      console.log("USING SIMULATION MODE - This should NOT happen in production");
      // Simulate transaction delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      return generateTransactionHash(walletType === 'MetaMask' ? 'ethereum' : 'solana');
    }
    
    // Process transaction based on wallet type
    switch (walletType) {
      case 'Phantom':
        return await sendPhantomTransaction(provider, amount, walletAddress);
      case 'Solflare':
        return await sendSolflareTransaction(provider, amount, walletAddress);
      case 'OKX':
        return await sendOKXTransaction(provider, amount, walletAddress);
      default:
        throw new Error(`Unsupported wallet type: ${walletType}`);
    }
  } catch (err) {
    console.error("Error processing transaction:", err);
    
    // For development & debugging - if transaction fails, create a mock hash
    if (isDevelopment) {
      console.warn("Using fallback transaction ID for development - REMOVE IN PRODUCTION");
      return generateTransactionHash(walletType === 'MetaMask' ? 'ethereum' : 'solana');
    }
    
    throw err;
  }
};
