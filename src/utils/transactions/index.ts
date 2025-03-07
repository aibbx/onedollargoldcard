
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
