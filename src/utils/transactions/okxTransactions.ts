
import { CONTRACT_ADDRESSES } from '../walletUtils';
import { 
  PublicKey, 
  Transaction, 
  Connection, 
  SystemProgram,
  LAMPORTS_PER_SOL
} from '@solana/web3.js';

// Function to get connection with proper configuration
const getConnection = (): Connection => {
  // Use the provided QuickNode RPC endpoint
  const endpoint = "https://snowy-capable-night.solana-mainnet.quiknode.pro/72424723ee91618f3c3a7c1415e06e6f66ff1035/";
  console.log('Using QuickNode RPC endpoint for OKX transactions');
  return new Connection(endpoint, {
    commitment: 'confirmed',
    confirmTransactionInitialTimeout: 120000 // 120 seconds timeout for better reliability
  });
};

export const sendOKXTransaction = async (
  provider: any,
  amount: number,
  walletAddress: string
): Promise<string> => {
  try {
    console.log('Starting OKX transaction:', { amount, walletAddress });
    if (!provider || !provider.solana) {
      throw new Error('OKX wallet provider not properly connected');
    }
    
    const solanaProvider = provider.solana;
    if (!solanaProvider.publicKey) {
      throw new Error('OKX Solana wallet not properly connected');
    }
    
    // Get connection using QuickNode
    const connection = getConnection();
    console.log('Connection established to QuickNode');
    
    // Verify wallet has sufficient balance
    const walletBalance = await connection.getBalance(solanaProvider.publicKey);
    console.log('Current wallet balance (lamports):', walletBalance);
    
    // For demonstration, using a small SOL transfer to simulate USDC
    // In production, this would be replaced with a proper USDC token transfer
    const transferAmountLamports = Math.floor(amount * LAMPORTS_PER_SOL * 0.0001);
    console.log('Transfer amount in lamports:', transferAmountLamports);
    
    if (walletBalance < transferAmountLamports + 5000) { // Add buffer for fees
      throw new Error('Insufficient balance for transaction');
    }

    // Get the recipient address
    const recipientAddress = new PublicKey(CONTRACT_ADDRESSES.poolAddress);
    console.log('Recipient address:', recipientAddress.toString());

    // Get latest blockhash
    console.log('Getting latest blockhash for OKX transaction...');
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('confirmed');
    console.log('Blockhash obtained:', blockhash.slice(0, 10) + '...');
    
    // Create transaction
    const transaction = new Transaction();
    transaction.feePayer = solanaProvider.publicKey;
    transaction.recentBlockhash = blockhash;

    // Add transfer instruction
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: solanaProvider.publicKey,
        toPubkey: recipientAddress,
        lamports: transferAmountLamports
      })
    );

    // Sign and send transaction
    console.log('Requesting OKX wallet signature...');
    let signature: string;

    try {
      // Try signAndSendTransaction method first
      if (solanaProvider.signAndSendTransaction) {
        console.log('Using OKX signAndSendTransaction method');
        const result = await solanaProvider.signAndSendTransaction(transaction);
        signature = result.signature || result;
        console.log('OKX transaction sent with signAndSendTransaction:', signature);
      } 
      // Fallback to separate sign and send
      else {
        console.log('Using OKX separate sign and send methods');
        const signedTransaction = await solanaProvider.signTransaction(transaction);
        signature = await connection.sendRawTransaction(signedTransaction.serialize());
        console.log('OKX transaction sent with separate sign/send:', signature);
      }

      // Wait for confirmation with proper handling
      console.log('Waiting for OKX transaction confirmation...');
      const confirmation = await connection.confirmTransaction({
        signature,
        blockhash,
        lastValidBlockHeight
      }, 'confirmed');
      
      if (confirmation.value.err) {
        console.error('Transaction error during confirmation:', confirmation.value.err);
        throw new Error(`Transaction failed during confirmation: ${JSON.stringify(confirmation.value.err)}`);
      }

      console.log('OKX transaction confirmed successfully!');
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
