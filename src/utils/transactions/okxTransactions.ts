
import { CONTRACT_ADDRESSES } from '../walletUtils';
import { PublicKey, Transaction, SystemProgram, Connection } from '@solana/web3.js';

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

    // Use a reliable RPC endpoint for mainnet
    const connection = new Connection(
      'https://api.mainnet-beta.solana.com', 
      { commitment: 'confirmed' }
    );
    
    // Convert USDC amount to lamports (SOL)
    // 1 SOL = 1 billion lamports
    // For testing, we'll use a very small fraction of SOL
    const amountInLamports = Math.ceil(amount * 10000); // Small amount for real transfers
    
    // Get recent blockhash for transaction
    console.log('Getting recent blockhash for OKX...');
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('confirmed');
    console.log('Received blockhash for OKX:', blockhash);
    
    // Create a new transaction
    const transaction = new Transaction({
      feePayer: provider.solana.publicKey,
      blockhash,
      lastValidBlockHeight,
    });
    
    // Use the pool address from our constants
    const poolAddress = new PublicKey(CONTRACT_ADDRESSES.poolAddress);
    
    // Add a SOL transfer instruction
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: provider.solana.publicKey,
        toPubkey: poolAddress,
        lamports: amountInLamports,
      })
    );
    
    // Sign and send the transaction using OKX wallet
    console.log('Sending transaction with OKX wallet...');
    
    let signature;
    
    // Try using the signAndSendTransaction method if available
    if (provider.solana.signAndSendTransaction) {
      try {
        console.log('Using OKX signAndSendTransaction method...');
        // OKX might require different parameters structure
        const response = await provider.solana.signAndSendTransaction(transaction);
        signature = response?.signature || response;
        console.log('OKX transaction sent using signAndSendTransaction:', signature);
      } catch (e) {
        console.error('Error with OKX signAndSendTransaction method:', e);
        signature = null;
      }
    }
    
    // If direct method failed, try alternative approach
    if (!signature) {
      try {
        if (provider.solana.signTransaction) {
          console.log('Using OKX separate sign and send transaction methods...');
          // Try to use the separate signTransaction and sendTransaction methods
          const signedTransaction = await provider.solana.signTransaction(transaction);
          signature = await connection.sendRawTransaction(signedTransaction.serialize());
          console.log('OKX transaction sent using separate sign and send:', signature);
        } else {
          throw new Error('OKX wallet does not support required transaction methods');
        }
      } catch (e) {
        console.error('Error with alternative OKX transaction method:', e);
        throw e;
      }
    }
    
    if (!signature) {
      throw new Error('Failed to get transaction signature from OKX wallet');
    }
    
    // Wait for confirmation
    console.log('Waiting for OKX transaction confirmation...');
    const confirmation = await connection.confirmTransaction(signature, 'confirmed');
    
    if (confirmation.value.err) {
      throw new Error(`Transaction confirmed but failed: ${JSON.stringify(confirmation.value.err)}`);
    }
    
    return signature;
  } catch (error) {
    console.error('Error in OKX transaction:', error);
    throw error;
  }
};
