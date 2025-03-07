
import { CONTRACT_ADDRESSES } from '../walletUtils';
import { PublicKey, Transaction, Connection, clusterApiUrl } from '@solana/web3.js';
import { getAssociatedTokenAddress, createTransferInstruction } from '@solana/spl-token';

// Ensure Buffer is available
if (typeof window !== 'undefined' && !window.Buffer) {
  window.Buffer = require('buffer/').Buffer;
}

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

    // Establish connection to mainnet with confirmed commitment
    const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');
    
    // Convert to USDC amount (USDC has 6 decimals)
    const amountInUsdcUnits = Math.floor(amount * 1000000);
    console.log('Amount in USDC units:', amountInUsdcUnits);
    
    // Get the latest blockhash for transaction
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('finalized');
    console.log('Got blockhash:', blockhash, 'lastValidBlockHeight:', lastValidBlockHeight);
    
    // Create a new transaction with blockhash and fee payer
    const transaction = new Transaction({
      feePayer: provider.publicKey,
      blockhash: blockhash,
      lastValidBlockHeight: lastValidBlockHeight
    });
    
    // Get the pool address from our constants
    const poolAddress = new PublicKey(CONTRACT_ADDRESSES.poolAddress);
    console.log('Pool address:', poolAddress.toString());
    
    // Find the user's USDC token account
    const userTokenAccount = await getAssociatedTokenAddress(
      USDC_MINT,
      provider.publicKey
    );
    console.log('User token account:', userTokenAccount.toString());
    
    // Find the pool's USDC token account
    const poolTokenAccount = await getAssociatedTokenAddress(
      USDC_MINT,
      poolAddress,
      true // allowOwnerOffCurve = true since this is a PDA
    );
    console.log('Pool token account:', poolTokenAccount.toString());
    
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
    
    // Phantom expects an object with the transaction
    const { signature } = await provider.signAndSendTransaction(transaction);
    console.log('Phantom transaction sent with signature:', signature);
    
    // Wait for confirmation with appropriate timeout
    const confirmationStatus = await connection.confirmTransaction({
      blockhash,
      lastValidBlockHeight,
      signature
    }, 'confirmed');
    
    console.log('Transaction confirmation status:', confirmationStatus);
    
    if (confirmationStatus.value.err) {
      throw new Error(`Transaction confirmed but failed: ${JSON.stringify(confirmationStatus.value.err)}`);
    }
    
    return signature;
  } catch (error) {
    console.error('Error in Phantom USDC transaction:', error);
    throw error;
  }
};
