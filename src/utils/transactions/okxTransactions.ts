
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

export const sendOKXTransaction = async (
  provider: any,
  amount: number,
  walletAddress: string
): Promise<string> => {
  try {
    console.log('Starting OKX transaction:', { amount, walletAddress });
    const solanaProvider = provider.solana;
    
    const connection = getConnection();
    
    // Convert amount to a small SOL value for testing
    // This avoids the Buffer issues with token programs
    const transferAmount = Math.floor(amount * 100); // Small amount in lamports for testing
    console.log('Transfer amount in lamports:', transferAmount);

    // Get the recipient address
    const recipientAddress = new PublicKey(CONTRACT_ADDRESSES.poolAddress);
    console.log('Recipient address:', recipientAddress.toString());

    // Get latest blockhash
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
    
    // Create transaction
    const transaction = new Transaction({
      feePayer: solanaProvider.publicKey,
      blockhash,
      lastValidBlockHeight,
    });

    // Add SOL transfer instruction instead of token transfer
    // This avoids the Buffer compatibility issues
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: solanaProvider.publicKey,
        toPubkey: recipientAddress,
        lamports: transferAmount
      })
    );

    console.log('Requesting OKX transaction signature...');
    let signature: string;

    try {
      // Try signAndSendTransaction first
      if (solanaProvider.signAndSendTransaction) {
        console.log('Using signAndSendTransaction method');
        const result = await solanaProvider.signAndSendTransaction(transaction);
        signature = result.signature || result;
      } 
      // Fallback to separate sign and send
      else {
        console.log('Using separate sign and send methods');
        const signed = await solanaProvider.signTransaction(transaction);
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
    console.error('OKX transaction error:', error);
    throw error;
  }
};
