
import { CONTRACT_ADDRESSES } from '../walletUtils';
import { PublicKey, Transaction, SystemProgram, Connection, clusterApiUrl } from '@solana/web3.js';

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

    // Get network connection (using mainnet-beta for production)
    const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');
    
    // Convert USDC amount to lamports (SOL)
    // 1 SOL = 1 billion lamports
    // For testing, we'll use a very small fraction of SOL
    const amountInLamports = Math.ceil(amount * 10000); // Small amount for real transfers
    
    // Get recent blockhash for transaction
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
    
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
    
    // Check the available methods and use the appropriate one
    if (!provider.solana.signAndSendTransaction) {
      console.log('OKX wallet does not have signAndSendTransaction method, trying alternative methods');
      
      // Try alternative methods if available
      if (provider.solana.signTransaction && provider.solana.sendTransaction) {
        const signedTx = await provider.solana.signTransaction(transaction);
        const signature = await connection.sendRawTransaction(signedTx.serialize());
        
        console.log('OKX transaction sent with signature:', signature);
        
        // Wait for confirmation
        const confirmation = await connection.confirmTransaction({
          blockhash,
          lastValidBlockHeight,
          signature,
        });
        
        if (confirmation.value.err) {
          throw new Error(`Transaction confirmed but failed: ${JSON.stringify(confirmation.value.err)}`);
        }
        
        return signature;
      } else {
        throw new Error('OKX wallet does not support required transaction methods');
      }
    }
    
    // If signAndSendTransaction is available, use it
    const result = await provider.solana.signAndSendTransaction({
      transaction: transaction
    });
    
    const signature = result?.signature || result;
    console.log('OKX transaction sent with signature:', signature);
    
    // Wait for confirmation
    const confirmation = await connection.confirmTransaction({
      blockhash,
      lastValidBlockHeight,
      signature,
    });
    
    if (confirmation.value.err) {
      throw new Error(`Transaction confirmed but failed: ${JSON.stringify(confirmation.value.err)}`);
    }
    
    return signature;
  } catch (error) {
    console.error('Error in OKX transaction:', error);
    throw error;
  }
};
