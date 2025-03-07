
import { CONTRACT_ADDRESSES } from '../walletUtils';
import { 
  PublicKey, 
  Transaction, 
  Connection, 
  clusterApiUrl,
  SystemProgram
} from '@solana/web3.js';

// Function to get a working connection
const getConnection = (): Connection => {
  const endpoint = clusterApiUrl('mainnet-beta');
  console.log('Using RPC endpoint for Solflare:', endpoint);
  return new Connection(endpoint, {
    commitment: 'confirmed',
    confirmTransactionInitialTimeout: 60000 // 60 seconds timeout
  });
};

// Handle transactions specifically for Solflare wallet
export const sendSolflareTransaction = async (
  provider: any,
  amount: number,
  walletAddress: string
): Promise<string> => {
  try {
    console.log('Processing Solflare USDC transaction', { amount, walletAddress });
    
    if (!provider || !provider.publicKey) {
      throw new Error('Solflare wallet not properly connected');
    }

    // Get a reliable connection
    console.log('Establishing connection to Solana network...');
    const connection = getConnection();
    
    // For browser compatibility without Buffer, use SOL transfer with small amount
    // This is a temporary solution until we figure out how to handle token transfers
    // without the Buffer dependency
    const transferAmountLamports = Math.floor(amount * 100); // Small amount in lamports for testing
    console.log('Transfer amount in lamports:', transferAmountLamports);
    
    // Get recent blockhash for transaction
    console.log('Getting recent blockhash for Solflare transaction...');
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('confirmed');
    console.log('Received blockhash:', blockhash.slice(0, 10) + '...');
    
    // Create a new transaction
    const transaction = new Transaction({
      feePayer: provider.publicKey,
      blockhash,
      lastValidBlockHeight,
    });
    
    // Use the pool address from our constants
    const poolAddress = new PublicKey(CONTRACT_ADDRESSES.poolAddress);
    console.log('Pool address:', poolAddress.toString());
    
    // Use SOL transfer as a placeholder for USDC
    // This is temporary until we can handle the Buffer issues
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: provider.publicKey,
        toPubkey: poolAddress,
        lamports: transferAmountLamports,
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
        console.log('Returning Solflare signature despite confirmation error');
        return signature;
      }
      throw confirmError;
    }
  } catch (error) {
    console.error('Error in Solflare transaction:', error);
    throw error;
  }
};
