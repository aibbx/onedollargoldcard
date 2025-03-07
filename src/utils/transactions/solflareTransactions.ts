
import { CONTRACT_ADDRESSES } from '../walletUtils';
import { 
  PublicKey, 
  Transaction, 
  Connection
} from '@solana/web3.js';
import { 
  createTransferInstruction,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID
} from '@solana/spl-token';

// USDC token address on Solana mainnet
const USDC_TOKEN_ADDRESS = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';

// Function to get a reliable connection to Solana
const getConnection = (): Connection => {
  // Use the provided QuickNode RPC endpoint
  const endpoint = "https://snowy-capable-night.solana-mainnet.quiknode.pro/72424723ee91618f3c3a7c1415e06e6f66ff1035/";
  console.log('Using QuickNode RPC endpoint for Solflare transactions');
  return new Connection(endpoint, {
    commitment: 'confirmed',
    confirmTransactionInitialTimeout: 120000 // 120 seconds timeout for better reliability
  });
};

// Handle transactions specifically for Solflare wallet
export const sendSolflareTransaction = async (
  provider: any,
  amount: number,
  walletAddress: string
): Promise<string> => {
  try {
    console.log('Processing Solflare USDC transaction', { amount, walletAddress });
    
    if (!provider || !provider.publicKey) {
      throw new Error('Solflare wallet not properly connected');
    }

    // Get a reliable connection using QuickNode
    console.log('Establishing connection to Solana network via QuickNode...');
    const connection = getConnection();
    
    // Convert dollar amount to USDC tokens (USDC has 6 decimals)
    const transferAmountUSDC = Math.floor(amount * 1000000);
    console.log('Transfer amount in USDC (with decimals):', transferAmountUSDC);
    
    // Get USDC token mint
    const usdcMint = new PublicKey(USDC_TOKEN_ADDRESS);
    console.log('USDC token mint:', usdcMint.toString());
    
    // Get recent blockhash for transaction
    console.log('Getting recent blockhash for Solflare transaction...');
    try {
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('confirmed');
      console.log('Received blockhash:', blockhash.slice(0, 10) + '...');
      
      // Get source token account (sender's USDC account)
      console.log('Getting sender token account...');
      const senderTokenAccount = await getAssociatedTokenAddress(
        usdcMint,
        provider.publicKey
      );
      console.log('Sender token account:', senderTokenAccount.toString());
      
      // Get recipient token account (pool address USDC account)
      const recipientAddress = new PublicKey(CONTRACT_ADDRESSES.poolAddress);
      console.log('Recipient address:', recipientAddress.toString());
      
      console.log('Getting recipient token account...');
      const recipientTokenAccount = await getAssociatedTokenAddress(
        usdcMint,
        recipientAddress
      );
      console.log('Recipient token account:', recipientTokenAccount.toString());
      
      // Create a new transaction
      const transaction = new Transaction();
      transaction.feePayer = provider.publicKey;
      transaction.recentBlockhash = blockhash;
      
      // Add token transfer instruction
      transaction.add(
        createTransferInstruction(
          senderTokenAccount,
          recipientTokenAccount,
          provider.publicKey,
          transferAmountUSDC,
          [],
          TOKEN_PROGRAM_ID
        )
      );
      
      // Sign and send the transaction
      console.log('Sending transaction with Solflare wallet...');
      console.log('Available Solflare methods:', Object.keys(provider));
      
      let signature: string | null = null;
      
      try {
        // Try the preferred signAndSendTransaction method first
        if (provider.signAndSendTransaction) {
          console.log('Using Solflare signAndSendTransaction method...');
          const result = await provider.signAndSendTransaction(transaction);
          signature = typeof result === 'string' ? result : result.signature;
          console.log('Solflare transaction sent using signAndSendTransaction:', signature);
        }
        // Then try signTransaction + sendRawTransaction if the first method failed
        else if (provider.signTransaction) {
          console.log('Using Solflare separate sign and send transaction methods...');
          const signedTransaction = await provider.signTransaction(transaction);
          signature = await connection.sendRawTransaction(signedTransaction.serialize());
          console.log('Solflare transaction sent using separate sign and send:', signature);
        }
        else {
          throw new Error('Solflare wallet does not support required transaction methods');
        }
      } catch (e) {
        console.error('Error with initial Solflare transaction method:', e);
        
        // Try fallback method if the first attempt failed
        if (!signature && provider.signTransaction) {
          try {
            console.log('Using fallback Solflare transaction method...');
            const signedTransaction = await provider.signTransaction(transaction);
            signature = await connection.sendRawTransaction(signedTransaction.serialize());
            console.log('Solflare transaction sent with fallback method:', signature);
          } catch (fallbackError) {
            console.error('Error with fallback Solflare transaction method:', fallbackError);
            throw fallbackError;
          }
        }
      }
      
      if (!signature) {
        throw new Error('Failed to get transaction signature from Solflare wallet');
      }
      
      // Wait for confirmation with proper timeout
      console.log('Waiting for Solflare transaction confirmation...');
      try {
        const confirmation = await connection.confirmTransaction({
          signature,
          blockhash,
          lastValidBlockHeight
        }, 'confirmed');
        
        if (confirmation.value.err) {
          throw new Error(`Transaction confirmed but failed: ${JSON.stringify(confirmation.value.err)}`);
        }
        
        console.log('Solflare USDC transaction confirmed successfully');
        return signature;
      } catch (confirmError) {
        console.error('Error confirming Solflare transaction:', confirmError);
        // Even if confirmation verification fails, return the signature if we have it
        if (signature) {
          console.log('Returning Solflare signature despite confirmation error');
          return signature;
        }
        throw confirmError;
      }
    } catch (blockHashError) {
      console.error('Error getting blockhash:', blockHashError);
      throw new Error(`Failed to get blockhash: ${blockHashError instanceof Error ? blockHashError.message : 'Unknown error'}`);
    }
  } catch (error) {
    console.error('Error in Solflare USDC transaction:', error);
    throw error;
  }
};
