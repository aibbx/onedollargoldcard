
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
    
    // Ensure Buffer is available in the global space
    if (typeof window !== 'undefined' && !window.Buffer) {
      console.error('Buffer is not available globally');
      throw new Error('Buffer polyfill is not properly configured');
    }
    
    console.log('Buffer check passed, proceeding with transaction');
    
    // Process transaction based on wallet type
    let signature;
    switch (walletType) {
      case 'Phantom':
        console.log('Using Phantom transaction handler');
        signature = await sendPhantomTransaction(provider, amount, walletAddress);
        break;
      case 'Solflare':
        console.log('Using Solflare transaction handler');
        signature = await sendSolflareTransaction(provider, amount, walletAddress);
        break;
      case 'OKX':
        console.log('Using OKX transaction handler');
        signature = await sendOKXTransaction(provider, amount, walletAddress);
        break;
      default:
        throw new Error(`Unsupported wallet type: ${walletType}`);
    }
    
    console.log('Transaction completed successfully with signature:', signature);
    return signature;
  } catch (err) {
    console.error("Error processing transaction:", err);
    throw err;
  }
};
