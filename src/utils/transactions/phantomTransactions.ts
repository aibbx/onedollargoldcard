
import { CONTRACT_ADDRESSES } from '../walletUtils';

// Handle transactions specifically for Phantom wallet
export const sendPhantomTransaction = async (
  provider: any,
  amount: number,
  walletAddress: string
): Promise<string> => {
  // Create a simplified transaction for Phantom wallet
  const transaction = {
    to: CONTRACT_ADDRESSES.poolAddress,
    amount: amount
  };
  
  // For Phantom wallet
  const result = await provider.request({
    method: 'signAndSendTransaction',
    params: { 
      message: JSON.stringify(transaction) 
    }
  });
  
  return result?.signature || result;
};
