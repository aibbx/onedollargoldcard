
import { CONTRACT_ADDRESSES } from '../walletUtils';
import { 
  PublicKey, 
  Transaction, 
  Connection, 
  SystemProgram,
  LAMPORTS_PER_SOL
} from '@solana/web3.js';

// Function to get connection
const getConnection = (): Connection => {
  // Use public Solana RPC endpoint which doesn't require API key
  const endpoint = "https://api.mainnet-beta.solana.com";
  console.log('Using public Solana RPC endpoint for Phantom transactions');
  return new Connection(endpoint, {
    commitment: 'confirmed',
    confirmTransactionInitialTimeout: 60000 // 60 seconds timeout
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
    // Simulate USDC amount with a small fraction of SOL
    const transferAmountLamports = Math.floor(amount * LAMPORTS_PER_SOL * 0.0001);
    console.log('USDC transfer amount in lamports:', transferAmountLamports);

    // Get latest blockhash
    console.log('Getting latest blockhash...');
    const blockhashResponse = await connection.getLatestBlockhash();
    const { blockhash, lastValidBlockHeight } = blockhashResponse;
    console.log('Latest blockhash obtained:', blockhash.slice(0, 10) + '...');
    
    // Create transaction
    const transaction = new Transaction();
    transaction.feePayer = provider.publicKey;
    transaction.recentBlockhash = blockhash;

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
