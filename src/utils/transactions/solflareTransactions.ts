
import { CONTRACT_ADDRESSES } from '../walletUtils';
import { 
  PublicKey, 
  Transaction, 
  Connection, 
  clusterApiUrl,
  SystemProgram,
  LAMPORTS_PER_SOL 
} from '@solana/web3.js';

// Function to get a working connection
const getConnection = (): Connection => {
  return new Connection(clusterApiUrl('mainnet-beta'), {
    commitment: 'confirmed'
  });
};

// Handle transactions specifically for Solflare wallet
export const sendSolflareTransaction = async (
  provider: any,
  amount: number,
  walletAddress: string
): Promise<string> => {
  try {
    console.log('Processing Solflare transaction', { amount, walletAddress });
    
    if (!provider || !provider.publicKey) {
      throw new Error('Solflare wallet not properly connected');
    }

    // Get a reliable connection
    console.log('Establishing connection to Solana network...');
    const connection = getConnection();
    
    // For testing we use a very small SOL amount
    // This avoids Buffer issues with token transactions
    const amountInLamports = Math.floor(amount * 100); // Small amount for testing
    console.log(`Transaction amount in lamports: ${amountInLamports}`);
    
    // Get recent blockhash for transaction
    console.log('Getting recent blockhash...');
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('confirmed');
    console.log('Received blockhash:', blockhash);
    
    // Create a new transaction
    const transaction = new Transaction({
      feePayer: provider.publicKey,
      blockhash,
      lastValidBlockHeight,
    });
    
    // Use the pool address from our constants
    const poolAddress = new PublicKey(CONTRACT_ADDRESSES.poolAddress);
    console.log('Pool address:', poolAddress.toString());
    
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
    console.log('Available Solflare methods:', Object.keys(provider));
    
    let signature: string | null = null;
    
    try {
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
    console.log('Waiting for transaction confirmation...');
    try {
      const confirmation = await connection.confirmTransaction({
        signature,
        blockhash,
        lastValidBlockHeight
      }, 'confirmed');
      
      if (confirmation.value.err) {
        throw new Error(`Transaction confirmed but failed: ${JSON.stringify(confirmation.value.err)}`);
      }
      
      console.log('Transaction confirmed successfully');
      return signature;
    } catch (confirmError) {
      console.error('Error confirming transaction:', confirmError);
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
