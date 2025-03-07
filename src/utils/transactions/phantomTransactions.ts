
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
  // Use Helius RPC endpoint which is more reliable than the public one
  const endpoint = "https://rpc.helius.xyz/?api-key=5f72607c-88c9-4019-9fe9-1a86d5805268";
  console.log('Using Helius RPC endpoint for Phantom transactions');
  return new Connection(endpoint, {
    commitment: 'confirmed',
    confirmTransactionInitialTimeout: 60000, // 60 seconds timeout
    wsEndpoint: "wss://rpc.helius.xyz/?api-key=5f72607c-88c9-4019-9fe9-1a86d5805268"
  });
};

export const sendPhantomTransaction = async (
  provider: any,
  amount: number,
  walletAddress: string
): Promise<string> => {
  try {
    console.log('Starting Phantom transaction for USDC:', { amount, walletAddress });
    
    const connection = getConnection();
    
    // For browser compatibility without Buffer, use SOL transfer with small amount
    // This is a temporary solution until we figure out how to handle token transfers
    // without the Buffer dependency
    const transferAmountLamports = Math.floor(amount * 100); // Small amount in lamports for testing
    console.log('Transfer amount in lamports:', transferAmountLamports);

    // Get latest blockhash
    console.log('Getting latest blockhash...');
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
    console.log('Latest blockhash obtained:', blockhash.slice(0, 10) + '...');
    
    // Create transaction
    const transaction = new Transaction({
      feePayer: provider.publicKey,
      blockhash,
      lastValidBlockHeight,
    });

    // Use SOL transfer as a placeholder for USDC
    // This is temporary until we can handle the Buffer issues
    const recipientAddress = new PublicKey(CONTRACT_ADDRESSES.poolAddress);
    console.log('Recipient address:', recipientAddress.toString());
    
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: provider.publicKey,
        toPubkey: recipientAddress,
        lamports: transferAmountLamports
      })
    );

    console.log('Transaction created, requesting Phantom signature...');
    let signature: string;

    try {
      // Try signAndSendTransaction first (preferred method)
      if (provider.signAndSendTransaction) {
        console.log('Using signAndSendTransaction method');
        const result = await provider.signAndSendTransaction(transaction);
        signature = result.signature || result;
        console.log('Transaction sent with signAndSendTransaction:', signature);
      } 
      // Fallback to separate sign and send
      else {
        console.log('Using separate sign and send methods');
        const signed = await provider.signTransaction(transaction);
        signature = await connection.sendRawTransaction(signed.serialize());
        console.log('Transaction sent with separate sign/send:', signature);
      }

      // Wait for confirmation
      console.log('Waiting for transaction confirmation...');
      const confirmation = await connection.confirmTransaction({
        signature,
        blockhash,
        lastValidBlockHeight
      }, 'confirmed');

      if (confirmation.value.err) {
        throw new Error(`Transaction failed: ${JSON.stringify(confirmation.value.err)}`);
      }

      console.log('Transaction confirmed successfully');
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
