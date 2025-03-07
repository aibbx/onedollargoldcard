
import { CONTRACT_ADDRESSES } from '../walletUtils';
import { PublicKey, Transaction, SystemProgram, Connection, Keypair, clusterApiUrl, LAMPORTS_PER_SOL } from '@solana/web3.js';

// List of reliable Solana RPC endpoints
const RPC_ENDPOINTS = [
  clusterApiUrl('mainnet-beta'),
  'https://api.mainnet-beta.solana.com',
  'https://solana-mainnet.g.alchemy.com/v2/demo',
  'https://solana-api.projectserum.com'
];

// Function to get a working connection with fallbacks
const getConnection = async (): Promise<Connection> => {
  // Try endpoints in sequence until one works
  for (const endpoint of RPC_ENDPOINTS) {
    try {
      const connection = new Connection(endpoint, { commitment: 'confirmed' });
      // Quick test to ensure connection works
      await connection.getVersion();
      console.log(`Connected to Solana RPC: ${endpoint}`);
      return connection;
    } catch (error) {
      console.warn(`Failed to connect to ${endpoint}:`, error);
      // Try next endpoint
    }
  }
  throw new Error("All RPC endpoints failed. Please try again later.");
};

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

    const solanaProvider = provider.solana;

    // Get a reliable connection
    console.log('Establishing connection to Solana network...');
    const connection = await getConnection();
    
    // For testing/development we use a very small SOL amount
    // 1 SOL = 1 billion lamports (LAMPORTS_PER_SOL)
    const amountInLamports = Math.ceil(amount * 10000); // Small amount for testing
    console.log(`Transaction amount in lamports: ${amountInLamports}`);
    
    // Get recent blockhash for transaction
    console.log('Getting recent blockhash...');
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('confirmed');
    console.log('Received blockhash:', blockhash);
    
    // Create a new transaction
    const transaction = new Transaction({
      feePayer: solanaProvider.publicKey,
      blockhash,
      lastValidBlockHeight,
    });
    
    // Use the pool address from our constants
    const poolAddress = new PublicKey(CONTRACT_ADDRESSES.poolAddress);
    console.log('Pool address:', poolAddress.toString());
    
    // Add a SOL transfer instruction
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: solanaProvider.publicKey,
        toPubkey: poolAddress,
        lamports: amountInLamports,
      })
    );
    
    // Sign and send the transaction using OKX wallet
    console.log('Sending transaction with OKX wallet...');
    console.log('Available OKX methods:', Object.keys(solanaProvider));
    
    let signature: string | null = null;
    
    try {
      // Try using the signAndSendTransaction method if available
      if (solanaProvider.signAndSendTransaction) {
        console.log('Using OKX signAndSendTransaction method...');
        // OKX might require different parameters structure
        const response = await solanaProvider.signAndSendTransaction(transaction);
        signature = response?.signature || response;
        console.log('OKX transaction sent using signAndSendTransaction:', signature);
      }
      // Fallback to separate sign and send methods
      else if (solanaProvider.signTransaction) {
        console.log('Using OKX separate sign and send transaction methods...');
        const signedTransaction = await solanaProvider.signTransaction(transaction);
        signature = await connection.sendRawTransaction(signedTransaction.serialize());
        console.log('OKX transaction sent using separate sign and send:', signature);
      }
      else {
        throw new Error('OKX wallet does not support required transaction methods');
      }
    } catch (e) {
      console.error('Error with initial OKX transaction method:', e);
      
      // Try fallback method if the first attempt failed
      if (!signature && solanaProvider.signTransaction) {
        try {
          console.log('Using fallback OKX transaction method...');
          const signedTransaction = await solanaProvider.signTransaction(transaction);
          signature = await connection.sendRawTransaction(signedTransaction.serialize());
          console.log('OKX transaction sent with fallback method:', signature);
        } catch (fallbackError) {
          console.error('Error with fallback OKX transaction method:', fallbackError);
          throw fallbackError;
        }
      }
    }
    
    if (!signature) {
      throw new Error('Failed to get transaction signature from OKX wallet');
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
    console.error('Error in OKX transaction:', error);
    throw error;
  }
};
