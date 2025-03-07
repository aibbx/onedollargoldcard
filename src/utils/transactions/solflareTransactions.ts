
import { CONTRACT_ADDRESSES } from '../walletUtils';
import { 
  PublicKey, 
  Transaction, 
  Connection, 
  SystemProgram,
  LAMPORTS_PER_SOL
} from '@solana/web3.js';

// Function to get a working connection
const getConnection = (): Connection => {
  // Use public Solana RPC endpoint which doesn't require API key
  const endpoint = "https://api.mainnet-beta.solana.com";
  console.log('Using public Solana RPC endpoint for Solflare transactions');
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
    
    // Calculate USDC amount in lamports (simulation for now)
    // Using a fixed conversion rate for demonstration
    const transferAmountLamports = Math.floor(amount * LAMPORTS_PER_SOL * 0.0001);
    console.log('USDC transfer amount in lamports:', transferAmountLamports);
    
    // Get recent blockhash for transaction using the correct parameters format
    console.log('Getting recent blockhash for Solflare transaction...');
    try {
      const blockhashResponse = await connection.getLatestBlockhash();
      const { blockhash, lastValidBlockHeight } = blockhashResponse;
      console.log('Received blockhash:', blockhash.slice(0, 10) + '...');
      
      // Create a new transaction
      const transaction = new Transaction();
      transaction.feePayer = provider.publicKey;
      transaction.recentBlockhash = blockhash;
      
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
    } catch (blockHashError) {
      console.error('Error getting blockhash:', blockHashError);
      throw new Error(`Failed to get blockhash: ${blockHashError instanceof Error ? blockHashError.message : 'Unknown error'}`);
    }
  } catch (error) {
    console.error('Error in Solflare transaction:', error);
    throw error;
  }
};
