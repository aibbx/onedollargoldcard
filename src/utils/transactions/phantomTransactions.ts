
import { CONTRACT_ADDRESSES } from '../walletUtils';
import { PublicKey, Transaction, SystemProgram, Connection } from '@solana/web3.js';

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
    
    // Modern Phantom wallet now supports signAndSendTransaction
    if (provider.signAndSendTransaction) {
      try {
        console.log('Using signAndSendTransaction method...');
        const { signature } = await provider.signAndSendTransaction(transaction);
        console.log('Phantom transaction sent with signature:', signature);
        
        // Wait for confirmation
        const confirmation = await connection.confirmTransaction({
          blockhash,
          lastValidBlockHeight,
          signature,
        }, 'confirmed');
        
        if (confirmation.value.err) {
          throw new Error(`Transaction confirmed but failed: ${JSON.stringify(confirmation.value.err)}`);
        }
        
        return signature;
      } catch (error) {
        console.error('Error with signAndSendTransaction:', error);
        throw error;
      }
    } 
    // Fallback to separate sign and send methods
    else if (provider.signTransaction) {
      try {
        console.log('Using separate sign and send transaction methods...');
        const signedTransaction = await provider.signTransaction(transaction);
        const signature = await connection.sendRawTransaction(signedTransaction.serialize());
        
        console.log('Phantom transaction sent with signature (fallback method):', signature);
        
        // Wait for confirmation
        const confirmation = await connection.confirmTransaction(signature, 'confirmed');
        
        if (confirmation.value.err) {
          throw new Error(`Transaction confirmed but failed: ${JSON.stringify(confirmation.value.err)}`);
        }
        
        return signature;
      } catch (error) {
        console.error('Error with sign and send transaction:', error);
        throw error;
      }
    } else {
      throw new Error('Phantom wallet does not support required transaction methods');
    }
  } catch (error) {
    console.error('Error in Phantom transaction:', error);
    throw error;
  }
};
