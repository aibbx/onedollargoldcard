
import { CONTRACT_ADDRESSES } from '../walletUtils';
import { 
  PublicKey, 
  Transaction, 
  Connection, 
  SystemProgram,
  LAMPORTS_PER_SOL,
  Keypair,
  sendAndConfirmTransaction
} from '@solana/web3.js';

// Function to get connection with proper configuration
const getConnection = (): Connection => {
  // Use the provided QuickNode RPC endpoint
  const endpoint = "https://snowy-capable-night.solana-mainnet.quiknode.pro/72424723ee91618f3c3a7c1415e06e6f66ff1035/";
  console.log('Using QuickNode RPC endpoint for Phantom transactions');
  return new Connection(endpoint, {
    commitment: 'confirmed',
    confirmTransactionInitialTimeout: 120000 // 120 seconds timeout for better reliability
  });
};

export const sendPhantomTransaction = async (
  provider: any,
  amount: number,
  walletAddress: string
): Promise<string> => {
  try {
    console.log('Starting Phantom transaction:', { amount, walletAddress });
    
    if (!provider || !provider.publicKey) {
      throw new Error('Phantom wallet not properly connected');
    }
    
    // Get connection with our QuickNode endpoint
    const connection = getConnection();
    console.log('Connection established to QuickNode');
    
    // For demonstration, we're using a small SOL transfer to simulate USDC
    // In production, this would be replaced with a proper USDC token transfer
    const transferAmountLamports = Math.floor(amount * LAMPORTS_PER_SOL * 0.0001);
    console.log('Transfer amount in lamports:', transferAmountLamports);
    
    // Verify wallet has sufficient balance
    const walletBalance = await connection.getBalance(provider.publicKey);
    console.log('Current wallet balance (lamports):', walletBalance);
    
    if (walletBalance < transferAmountLamports + 5000) { // Add buffer for fees
      throw new Error('Insufficient balance for transaction');
    }

    // Get latest blockhash
    console.log('Getting latest blockhash...');
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('confirmed');
    console.log('Blockhash obtained:', blockhash.slice(0, 10) + '...');
    
    // Create transaction
    const transaction = new Transaction();
    transaction.feePayer = provider.publicKey;
    transaction.recentBlockhash = blockhash;

    // Set up the transfer to pool address
    const recipientAddress = new PublicKey(CONTRACT_ADDRESSES.poolAddress);
    console.log('Recipient address:', recipientAddress.toString());
    
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: provider.publicKey,
        toPubkey: recipientAddress,
        lamports: transferAmountLamports
      })
    );

    // Sign and send transaction
    console.log('Requesting wallet signature...');
    let signature: string;

    try {
      // First attempt: Use signAndSendTransaction if available
      if (provider.signAndSendTransaction) {
        console.log('Using signAndSendTransaction method');
        const result = await provider.signAndSendTransaction(transaction);
        signature = result.signature || result;
      } 
      // Fallback: Use separate sign and send
      else {
        console.log('Using separate sign and send methods');
        const signedTransaction = await provider.signTransaction(transaction);
        signature = await connection.sendRawTransaction(signedTransaction.serialize());
      }
      
      console.log('Transaction sent, signature:', signature);

      // Wait for confirmation with proper error handling
      console.log('Waiting for transaction confirmation...');
      const confirmationStatus = await connection.confirmTransaction({
        signature,
        blockhash,
        lastValidBlockHeight
      }, 'confirmed');
      
      if (confirmationStatus.value.err) {
        console.error('Transaction error during confirmation:', confirmationStatus.value.err);
        throw new Error(`Transaction failed during confirmation: ${JSON.stringify(confirmationStatus.value.err)}`);
      }

      console.log('Transaction confirmed successfully!');
      return signature;
    } catch (error) {
      console.error('Transaction execution failed:', error);
      throw new Error(`Transaction failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  } catch (error) {
    console.error('Phantom transaction error:', error);
    throw error;
  }
};
