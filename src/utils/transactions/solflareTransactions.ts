
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

    // Get network connection (mainnet-beta, devnet, or testnet)
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    
    // Convert USDC amount to lamports (SOL)
    // 1 SOL = 1 billion lamports
    // For testing, we'll use a very small fraction of SOL
    const amountInLamports = Math.ceil(amount * 10000); // Small amount for real transfers
    
    // Get recent blockhash for transaction
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
    
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
    
    // Check if signAndSendTransaction method exists and call it, otherwise try to sign and send separately
    // Solflare's method signature can be different from Phantom
    let signature;
    
    if (provider.signAndSendTransaction) {
      signature = await provider.signAndSendTransaction(transaction);
    } else if (provider.signTransaction && provider.sendTransaction) {
      const signedTx = await provider.signTransaction(transaction);
      signature = await connection.sendRawTransaction(signedTx.serialize());
    } else {
      throw new Error('Solflare wallet does not support required transaction methods');
    }
    
    console.log('Solflare transaction sent with signature:', signature);
    
    // Wait for confirmation
    const confirmation = await connection.confirmTransaction({
      blockhash,
      lastValidBlockHeight,
      signature: typeof signature === 'string' ? signature : signature.signature,
    });
    
    if (confirmation.value.err) {
      throw new Error(`Transaction confirmed but failed: ${JSON.stringify(confirmation.value.err)}`);
    }
    
    return typeof signature === 'string' ? signature : signature.signature;
  } catch (error) {
    console.error('Error in Solflare transaction:', error);
    throw error;
  }
};
