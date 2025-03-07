
import { WalletType } from '../../types/wallet';
import { sendPhantomTransaction } from './phantomTransactions';
import { sendSolflareTransaction } from './solflareTransactions';
import { sendOKXTransaction } from './okxTransactions';

// Process transaction based on wallet type
export const processTransaction = async (
  walletType: WalletType,
  provider: any,
  amount: number,
  walletAddress: string
): Promise<string> => {
  try {
    console.log('Processing transaction for:', walletType, { amount, walletAddress });
    
    if (!provider) {
      throw new Error('Wallet provider is not available');
    }
    
    if (!walletAddress) {
      throw new Error('Wallet address is not available');
    }
    
    // Simulate network connection check to avoid silent failures
    if (navigator.onLine === false) {
      throw new Error('You appear to be offline. Please check your internet connection.');
    }
    
    // Validate transaction amount 
    if (amount <= 0) {
      throw new Error('Invalid donation amount. Amount must be greater than 0.');
    }
    
    // Process transaction based on wallet type
    switch (walletType) {
      case 'Phantom':
        if (!provider.publicKey) {
          throw new Error('Phantom wallet not properly connected. Please reconnect your wallet.');
        }
        console.log('Sending transaction via Phantom wallet...');
        return await sendPhantomTransaction(provider, amount, walletAddress);
        
      case 'Solflare':
        if (!provider.publicKey) {
          throw new Error('Solflare wallet not properly connected. Please reconnect your wallet.');
        }
        console.log('Sending transaction via Solflare wallet...');
        return await sendSolflareTransaction(provider, amount, walletAddress);
        
      case 'OKX':
        if (!provider.solana?.publicKey) {
          throw new Error('OKX wallet not properly connected. Please reconnect your wallet.');
        }
        console.log('Sending transaction via OKX wallet...');
        return await sendOKXTransaction(provider, amount, walletAddress);
        
      default:
        throw new Error(`Unsupported wallet type: ${walletType}`);
    }
  } catch (err) {
    console.error("Error processing transaction:", err);
    throw err;
  }
};
