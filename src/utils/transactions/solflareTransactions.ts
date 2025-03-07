
import { CONTRACT_ADDRESSES } from '../walletUtils';
import { PublicKey, Transaction } from '@solana/web3.js';
import { getAssociatedTokenAddress, createTransferInstruction } from '@solana/spl-token';

// USDC token mint address on Solana
const USDC_MINT = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v');

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

    // Convert to USDC amount (USDC has 6 decimals)
    const amountInUsdcUnits = Math.ceil(amount * 1000000);
    
    // Create a new transaction
    const transaction = new Transaction();
    
    // Get the pool address from our constants
    const poolAddress = new PublicKey(CONTRACT_ADDRESSES.poolAddress);
    
    // Find the user's USDC token account
    const userTokenAccount = await getAssociatedTokenAddress(
      USDC_MINT,
      provider.publicKey
    );
    
    // Find the pool's USDC token account
    const poolTokenAccount = await getAssociatedTokenAddress(
      USDC_MINT,
      poolAddress,
      true // allowOwnerOffCurve = true since this is a PDA
    );
    
    // Create transfer instruction
    const transferInstruction = createTransferInstruction(
      userTokenAccount,
      poolTokenAccount,
      provider.publicKey,
      amountInUsdcUnits
    );
    
    // Add the transfer instruction to the transaction
    transaction.add(transferInstruction);
    
    // Sign and send the transaction using Solflare
    console.log('Sending USDC transaction with Solflare wallet...');
    const signature = await provider.signAndSendTransaction(transaction);
    console.log('Solflare USDC transaction sent with signature:', signature);
    
    return signature;
  } catch (error) {
    console.error('Error in Solflare USDC transaction:', error);
    throw error;
  }
};
