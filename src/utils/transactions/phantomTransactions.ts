
import { CONTRACT_ADDRESSES } from '../walletUtils';
import { PublicKey, Transaction, Connection, clusterApiUrl } from '@solana/web3.js';
import { getAssociatedTokenAddress, createTransferInstruction } from '@solana/spl-token';

// USDC token mint address on Solana mainnet
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

    // Establish connection to mainnet
    const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');
    
    // Convert to USDC amount (USDC has 6 decimals)
    const amountInUsdcUnits = Math.floor(amount * 1000000);
    
    // Get the latest blockhash for transaction
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
    
    // Create a new transaction with blockhash and fee payer
    const transaction = new Transaction({
      feePayer: provider.publicKey,
      blockhash: blockhash,
      lastValidBlockHeight: lastValidBlockHeight
    });
    
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
    
    // Sign and send the transaction
    console.log('Sending USDC transaction with Phantom wallet...');
    const { signature } = await provider.signAndSendTransaction(transaction);
    console.log('Phantom USDC transaction sent with signature:', signature);
    
    // Confirm the transaction
    const confirmation = await connection.confirmTransaction({
      blockhash,
      lastValidBlockHeight,
      signature
    });
    
    if (confirmation.value.err) {
      throw new Error(`Transaction confirmed but failed: ${confirmation.value.err}`);
    }
    
    return signature;
  } catch (error) {
    console.error('Error in Phantom USDC transaction:', error);
    throw error;
  }
};
