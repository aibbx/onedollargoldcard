
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

    // Convert USDC amount to lamports (1 SOL = 1 billion lamports)
    // For testing, we'll use a very small amount of SOL instead of actual USDC
    const amountInLamports = Math.ceil(amount * 100); // Using a tiny fraction of SOL for testing
    
    // Create a new transaction
    const transaction = new Transaction();
    
    // Use the pool address from our constants
    const poolAddress = new PublicKey(CONTRACT_ADDRESSES.poolAddress);
    
    // Add a SOL transfer instruction
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: provider.publicKey,
        toPubkey: poolAddress,
        lamports: amountInLamports,
      })
    );
    
    // Sign and send the transaction using Solflare
    console.log('Sending transaction with Solflare wallet...');
    const signature = await provider.signAndSendTransaction(transaction);
    console.log('Solflare transaction sent with signature:', signature);
    
    return signature;
  } catch (error) {
    console.error('Error in Solflare transaction:', error);
    throw error;
  }
};
