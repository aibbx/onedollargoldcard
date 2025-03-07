
import { CONTRACT_ADDRESSES } from '../walletUtils';
import { web3 } from '@project-serum/anchor';
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Token, TOKEN_PROGRAM_ID } from '@solana/spl-token';

// Handle transactions specifically for Phantom wallet
export const sendPhantomTransaction = async (
  provider: any,
  amount: number,
  walletAddress: string
): Promise<string> => {
  try {
    console.log('Processing Phantom transaction', { amount, walletAddress });
    
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
    
    // Sign and send the transaction
    const signature = await provider.signAndSendTransaction(transaction);
    console.log('Transaction sent with signature:', signature);
    
    return signature;
  } catch (error) {
    console.error('Error in Phantom transaction:', error);
    throw error;
  }
};
