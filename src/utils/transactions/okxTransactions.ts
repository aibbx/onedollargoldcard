
import { CONTRACT_ADDRESSES } from '../walletUtils';
import { PublicKey, Transaction } from '@solana/web3.js';
import { Token, TOKEN_PROGRAM_ID } from '@solana/spl-token';

// USDC token mint address on Solana
const USDC_MINT = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v');

// Handle transactions specifically for OKX wallet
export const sendOKXTransaction = async (
  provider: any,
  amount: number,
  walletAddress: string
): Promise<string> => {
  try {
    console.log('Processing OKX transaction', { amount, walletAddress });
    
    if (!provider || !provider.solana?.publicKey) {
      throw new Error('OKX wallet not properly connected');
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
      provider.solana.publicKey
    );
    
    // Create transfer instruction
    const transferInstruction = Token.createTransferInstruction(
      TOKEN_PROGRAM_ID,
      userTokenAccount,
      poolAddress,
      provider.solana.publicKey,
      [],
      amountInUsdcUnits
    );
    
    // Add the transfer instruction to the transaction
    transaction.add(transferInstruction);
    
    // Sign and send the transaction using OKX wallet
    console.log('Sending USDC transaction with OKX wallet...');
    const signature = await provider.solana.signAndSendTransaction({
      transaction: transaction
    });
    
    console.log('OKX USDC transaction sent with signature:', signature);
    return signature?.signature || signature;
  } catch (error) {
    console.error('Error in OKX USDC transaction:', error);
    throw error;
  }
};
