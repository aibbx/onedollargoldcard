
import { CONTRACT_ADDRESSES } from '../walletUtils';
import { PublicKey, Transaction, SystemProgram } from '@solana/web3.js';

// Handle transactions specifically for Solflare wallet
export const sendSolflareTransaction = async (
  provider: any,
  amount: number,
  walletAddress: string
): Promise<string> => {
  try {
    console.log('Processing Solflare transaction', { amount, walletAddress });
    
    if (!provider || !provider.publicKey) {
      throw new Error('Wallet not properly connected');
    }

    // Convert USDC amount to lamports (assuming USDC decimal places)
    const amountInLamports = amount * 1000000; // USDC has 6 decimal places
    
    // Create a new transaction
    const transaction = new Transaction();
    
    // Use the pool address from our constants
    const poolAddress = new PublicKey(CONTRACT_ADDRESSES.poolAddress);
    
    // Add a simple SOL transfer instruction as placeholder
    // In production, this would be a proper USDC transfer
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: provider.publicKey,
        toPubkey: poolAddress,
        lamports: Math.round(amountInLamports),
      })
    );
    
    // Sign and send the transaction using Solflare
    const signature = await provider.signAndSendTransaction(transaction);
    console.log('Solflare transaction sent with signature:', signature);
    
    return signature;
  } catch (error) {
    console.error('Error in Solflare transaction:', error);
    throw error;
  }
};
