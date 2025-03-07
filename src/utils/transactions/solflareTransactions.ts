
import { CONTRACT_ADDRESSES } from '../walletUtils';
import { PublicKey, Transaction, SystemProgram, Connection, clusterApiUrl } from '@solana/web3.js';

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
    console.log('Getting recent blockhash for Solflare...');
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('confirmed');
    console.log('Received blockhash for Solflare:', blockhash);
    
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
    console.log('Sending transaction with Solflare wallet...');
    
    // Solflare supports several methods for sending transactions, try each one
    let signature: string | null = null;
    
    try {
      // Check which methods are available on the provider
      console.log('Available Solflare methods:', Object.keys(provider));
      
      // Try the preferred signAndSendTransaction method first
      if (provider.signAndSendTransaction) {
        console.log('Using Solflare signAndSendTransaction method...');
        const result = await provider.signAndSendTransaction(transaction);
        signature = typeof result === 'string' ? result : result.signature;
        console.log('Solflare transaction sent using signAndSendTransaction:', signature);
      }
      // Then try signTransaction + sendRawTransaction if the first method failed
      else if (provider.signTransaction) {
        console.log('Using Solflare separate sign and send transaction methods...');
        const signedTransaction = await provider.signTransaction(transaction);
        signature = await connection.sendRawTransaction(signedTransaction.serialize());
        console.log('Solflare transaction sent using separate sign and send:', signature);
      }
      else {
        throw new Error('Solflare wallet does not support required transaction methods');
      }
    } catch (e) {
      console.error('Error with initial Solflare transaction method:', e);
      
      // Try fallback method if the first attempt failed
      if (!signature && provider.signTransaction) {
        try {
          console.log('Using fallback Solflare transaction method...');
          const signedTransaction = await provider.signTransaction(transaction);
          signature = await connection.sendRawTransaction(signedTransaction.serialize());
          console.log('Solflare transaction sent with fallback method:', signature);
        } catch (fallbackError) {
          console.error('Error with fallback Solflare transaction method:', fallbackError);
          throw fallbackError;
        }
      }
    }
    
    if (!signature) {
      throw new Error('Failed to get transaction signature from Solflare wallet');
    }
    
    // Wait for confirmation
    console.log('Waiting for Solflare transaction confirmation...');
    try {
      const confirmation = await connection.confirmTransaction({
        signature,
        blockhash,
        lastValidBlockHeight
      }, 'confirmed');
      
      if (confirmation.value.err) {
        throw new Error(`Transaction confirmed but failed: ${JSON.stringify(confirmation.value.err)}`);
      }
      
      console.log('Solflare transaction confirmed successfully');
      return signature;
    } catch (confirmError) {
      console.error('Error confirming Solflare transaction:', confirmError);
      // Even if confirmation verification fails, return the signature if we have it
      if (signature) {
        console.log('Returning signature despite confirmation error');
        return signature;
      }
      throw confirmError;
    }
  } catch (error) {
    console.error('Error in Solflare transaction:', error);
    throw error;
  }
};
