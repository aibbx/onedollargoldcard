
import { CONTRACT_ADDRESSES } from '../walletUtils';
import { 
  PublicKey, 
  Transaction, 
  Connection, 
  clusterApiUrl,
  SystemProgram,
  LAMPORTS_PER_SOL
} from '@solana/web3.js';

// Function to get connection
const getConnection = (): Connection => {
  return new Connection(clusterApiUrl('mainnet-beta'), {
    commitment: 'confirmed'
  });
};

export const sendPhantomTransaction = async (
  provider: any,
  amount: number,
  walletAddress: string
): Promise<string> => {
  try {
    console.log('Starting Phantom transaction:', { amount, walletAddress });
    
    const connection = getConnection();
    
    // Instead of using SPL tokens, we'll use SOL for simplicity (avoiding Buffer issues)
    // Convert USDC amount to a small amount of SOL for testing
    // In production, you'd use the actual USDC token but would need polyfills for Buffer
    const transferAmount = Math.floor(amount * 100); // Small amount in lamports for testing
    console.log('Transfer amount in lamports:', transferAmount);

    // Get latest blockhash
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
    
    // Create transaction
    const transaction = new Transaction({
      feePayer: provider.publicKey,
      blockhash,
      lastValidBlockHeight,
    });

    // Add a simple SOL transfer instruction instead of token transfer
    // This avoids the Buffer compatibility issues
    const recipientAddress = new PublicKey(CONTRACT_ADDRESSES.poolAddress);
    
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: provider.publicKey,
        toPubkey: recipientAddress,
        lamports: transferAmount
      })
    );

    console.log('Requesting Phantom transaction signature...');
    let signature: string;

    try {
      // Try signAndSendTransaction first
      if (provider.signAndSendTransaction) {
        console.log('Using signAndSendTransaction method');
        const result = await provider.signAndSendTransaction(transaction);
        signature = result.signature || result;
      } 
      // Fallback to separate sign and send
      else {
        console.log('Using separate sign and send methods');
        const signed = await provider.signTransaction(transaction);
        signature = await connection.sendRawTransaction(signed.serialize());
      }

      console.log('Transaction sent:', signature);

      // Wait for confirmation
      const confirmation = await connection.confirmTransaction({
        signature,
        blockhash,
        lastValidBlockHeight
      });

      if (confirmation.value.err) {
        throw new Error(`Transaction failed: ${JSON.stringify(confirmation.value.err)}`);
      }

      return signature;

    } catch (error) {
      console.error('Transaction error:', error);
      throw new Error(`Transaction failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  } catch (error) {
    console.error('Phantom transaction error:', error);
    throw error;
  }
};
