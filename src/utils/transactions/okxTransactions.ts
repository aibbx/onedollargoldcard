
import { CONTRACT_ADDRESSES } from '../walletUtils';
import { 
  PublicKey, 
  Transaction, 
  Connection, 
  clusterApiUrl,
  SystemProgram
} from '@solana/web3.js';

// Function to get connection
const getConnection = (): Connection => {
  // Use public Solana RPC endpoint
  const endpoint = clusterApiUrl('mainnet-beta');
  console.log('Using public Solana RPC endpoint for OKX transactions');
  return new Connection(endpoint, {
    commitment: 'confirmed',
    confirmTransactionInitialTimeout: 60000 // 60 seconds timeout
  });
};

export const sendOKXTransaction = async (
  provider: any,
  amount: number,
  walletAddress: string
): Promise<string> => {
  try {
    console.log('Starting OKX transaction for USDC:', { amount, walletAddress });
    const solanaProvider = provider.solana;
    
    // Establish connection
    const connection = getConnection();
    
    // For browser compatibility without Buffer, use SOL transfer with small amount
    // This is a temporary solution until we figure out how to handle token transfers
    // without the Buffer dependency
    const transferAmountLamports = Math.floor(amount * 100); // Small amount in lamports for testing
    console.log('Transfer amount in lamports:', transferAmountLamports);

    // Get the recipient address
    const recipientAddress = new PublicKey(CONTRACT_ADDRESSES.poolAddress);
    console.log('Recipient address:', recipientAddress.toString());

    // Get latest blockhash
    console.log('Getting latest blockhash for OKX transaction...');
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
    console.log('Blockhash obtained:', blockhash.slice(0, 10) + '...');
    
    // Create transaction
    const transaction = new Transaction({
      feePayer: solanaProvider.publicKey,
      blockhash,
      lastValidBlockHeight,
    });

    // Use SOL transfer as a placeholder for USDC
    // This is temporary until we can handle the Buffer issues
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: solanaProvider.publicKey,
        toPubkey: recipientAddress,
        lamports: transferAmountLamports
      })
    );

    console.log('Transaction created, requesting OKX signature...');
    let signature: string;

    try {
      // Try signAndSendTransaction first (preferred method)
      if (solanaProvider.signAndSendTransaction) {
        console.log('Using OKX signAndSendTransaction method');
        const result = await solanaProvider.signAndSendTransaction(transaction);
        signature = result.signature || result;
        console.log('OKX transaction sent with signAndSendTransaction:', signature);
      } 
      // Fallback to separate sign and send
      else {
        console.log('Using OKX separate sign and send methods');
        const signed = await solanaProvider.signTransaction(transaction);
        signature = await connection.sendRawTransaction(signed.serialize());
        console.log('OKX transaction sent with separate sign/send:', signature);
      }

      // Wait for confirmation
      console.log('Waiting for OKX transaction confirmation...');
      const confirmation = await connection.confirmTransaction({
        signature,
        blockhash,
        lastValidBlockHeight
      }, 'confirmed');

      if (confirmation.value.err) {
        throw new Error(`OKX transaction failed: ${JSON.stringify(confirmation.value.err)}`);
      }

      console.log('OKX transaction confirmed successfully');
      return signature;

    } catch (error) {
      console.error('OKX transaction error:', error);
      throw new Error(`OKX transaction failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  } catch (error) {
    console.error('OKX transaction error:', error);
    throw error;
  }
};
