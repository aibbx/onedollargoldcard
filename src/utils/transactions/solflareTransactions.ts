
import { CONTRACT_ADDRESSES } from '../walletUtils';

// Handle transactions specifically for Solflare wallet
export const sendSolflareTransaction = async (
  provider: any,
  amount: number,
  walletAddress: string
): Promise<string> => {
  // Create a simplified transaction for Solflare wallet
  const transaction = {
    to: CONTRACT_ADDRESSES.poolAddress,
    amount: amount
  };
  
  // This is a simplified version - in production use proper Solana transaction building
  const result = await provider.signAndSendTransaction(transaction);
  return result?.signature || result;
};
