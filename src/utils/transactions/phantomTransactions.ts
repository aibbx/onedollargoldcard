
import { CONTRACT_ADDRESSES } from '../walletUtils';
import { PublicKey, Transaction, SystemProgram, Connection, clusterApiUrl } from '@solana/web3.js';

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

    // Use a reliable RPC endpoint for mainnet with fallback options
    const connection = new Connection(
      clusterApiUrl('mainnet-beta'),
      { commitment: 'confirmed' }
    );
    
    // Convert USDC amount to lamports (SOL)
    // 1 SOL = 1 billion lamports
    // For testing, we'll use a very small fraction of SOL
    const amountInLamports = Math.ceil(amount * 10000); // Small amount for real transfers
    
    // Get recent blockhash for transaction
    console.log('Getting recent blockhash for Phantom...');
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('confirmed');
    console.log('Received blockhash for Phantom:', blockhash);
    
    // Create a new transaction
    const transaction = new Transaction({
      feePayer: provider.publicKey,
      blockhash,
      lastValidBlockHeight,
    });
    
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
    
    // Sign and send the transaction
    console.log('Sending transaction with Phantom wallet...');
    console.log('Available Phantom methods:', Object.keys(provider));
    
    // Try different methods for sending transactions with Phantom
    let signature: string | null = null;
    
    try {
      // Modern Phantom wallet supports signAndSendTransaction
      if (provider.signAndSendTransaction) {
        console.log('Using Phantom signAndSendTransaction method...');
        const result = await provider.signAndSendTransaction(transaction);
        signature = result.signature || result;
        console.log('Phantom transaction sent with signature:', signature);
      } 
      // Fallback to separate sign and send methods
      else if (provider.signTransaction) {
        console.log('Using Phantom separate sign and send transaction methods...');
        const signedTransaction = await provider.signTransaction(transaction);
        signature = await connection.sendRawTransaction(signedTransaction.serialize());
        console.log('Phantom transaction sent with signature (fallback method):', signature);
      }
      else {
        throw new Error('Phantom wallet does not support required transaction methods');
      }
    } catch (e) {
      console.error('Error with initial Phantom transaction method:', e);
      
      // Try fallback method if the first attempt failed
      if (!signature && provider.signTransaction) {
        try {
          console.log('Using fallback Phantom transaction method...');
          const signedTransaction = await provider.signTransaction(transaction);
          signature = await connection.sendRawTransaction(signedTransaction.serialize());
          console.log('Phantom transaction sent with fallback method:', signature);
        } catch (fallbackError) {
          console.error('Error with fallback Phantom transaction method:', fallbackError);
          throw fallbackError;
        }
      }
    }
    
    if (!signature) {
      throw new Error('Failed to get transaction signature from Phantom wallet');
    }
    
    // Wait for confirmation
    console.log('Waiting for Phantom transaction confirmation...');
    try {
      const confirmation = await connection.confirmTransaction({
        signature,
        blockhash,
        lastValidBlockHeight
      }, 'confirmed');
      
      if (confirmation.value.err) {
        throw new Error(`Transaction confirmed but failed: ${JSON.stringify(confirmation.value.err)}`);
      }
      
      console.log('Phantom transaction confirmed successfully');
      return signature;
    } catch (confirmError) {
      console.error('Error confirming Phantom transaction:', confirmError);
      // Even if confirmation verification fails, return the signature if we have it
      if (signature) {
        console.log('Returning signature despite confirmation error');
        return signature;
      }
      throw confirmError;
    }
  } catch (error) {
    console.error('Error in Phantom transaction:', error);
    throw error;
  }
};
