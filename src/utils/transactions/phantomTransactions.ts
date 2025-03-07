
import { CONTRACT_ADDRESSES } from '../walletUtils';
import { PublicKey, Transaction } from '@solana/web3.js';
import { Token, TOKEN_PROGRAM_ID } from '@solana/spl-token';

// USDC token mint address on Solana
const USDC_MINT = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v');

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

    // Convert to USDC amount (USDC has 6 decimals)
    const amountInUsdcUnits = Math.ceil(amount * 1000000);
    
    // Create a new transaction
    const transaction = new Transaction();
    
    // Get the pool address from our constants
    const poolAddress = new PublicKey(CONTRACT_ADDRESSES.poolAddress);
    
    // Find the user's USDC token account
    const userTokenAccount = await Token.getAssociatedTokenAddress(
      TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      USDC_MINT,
      provider.publicKey
    );
    
    // Create transfer instruction
    const transferInstruction = Token.createTransferInstruction(
      TOKEN_PROGRAM_ID,
      userTokenAccount,
      poolAddress,
      provider.publicKey,
      [],
      amountInUsdcUnits
    );
    
    // Add the transfer instruction to the transaction
    transaction.add(transferInstruction);
    
    // Sign and send the transaction
    console.log('Sending USDC transaction with Phantom wallet...');
    const { signature } = await provider.signAndSendTransaction(transaction);
    console.log('Phantom USDC transaction sent with signature:', signature);
    
    return signature;
  } catch (error) {
    console.error('Error in Phantom USDC transaction:', error);
    throw error;
  }
};
