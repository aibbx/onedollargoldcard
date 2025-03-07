
import { WalletType } from '../../types/wallet';
import { sendPhantomTransaction } from './phantomTransactions';
import { sendSolflareTransaction } from './solflareTransactions';
import { sendOKXTransaction } from './okxTransactions';

// Ensure Buffer is available in browser
if (typeof window !== 'undefined') {
  if (!window.Buffer) {
    window.Buffer = window.Buffer || require('buffer/').Buffer;
  }
}

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
    throw err;
  }
};
