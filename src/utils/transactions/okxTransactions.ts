
import { CONTRACT_ADDRESSES } from '../walletUtils';

// Handle transactions specifically for OKX wallet
export const sendOKXTransaction = async (
  provider: any,
  amount: number,
  walletAddress: string
): Promise<string> => {
  // Create a simplified transaction for OKX wallet
  const transaction = {
    to: CONTRACT_ADDRESSES.poolAddress,
    amount: amount
  };
  
  const result = await provider.solana.signAndSendTransaction(transaction);
  return result?.signature || result;
};
