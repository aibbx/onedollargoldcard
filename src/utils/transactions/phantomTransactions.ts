
import { CONTRACT_ADDRESSES } from '../walletUtils';
import { 
  PublicKey, 
  Transaction, 
  Connection, 
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';
import { 
  createTransferInstruction,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  TOKEN_PROGRAM_ID,
  getAccount
} from '@solana/spl-token';

// USDC token address on Solana mainnet
const USDC_TOKEN_ADDRESS = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';

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
    console.log('Starting Phantom USDC transaction:', { amount, walletAddress });
    
    if (!provider || !provider.publicKey) {
      throw new Error('Phantom wallet not properly connected');
    }
    
    // Get connection with our QuickNode endpoint
    const connection = getConnection();
    console.log('Connection established to QuickNode');
    
    // Convert dollar amount to USDC tokens (USDC has 6 decimals)
    const transferAmountUSDC = Math.floor(amount * 1000000);
    console.log('Transfer amount in USDC (with decimals):', transferAmountUSDC);
    
    // Get USDC token mint
    const usdcMint = new PublicKey(USDC_TOKEN_ADDRESS);
    console.log('USDC token mint:', usdcMint.toString());
    
    // Get the latest blockhash
    console.log('Getting latest blockhash...');
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('confirmed');
    console.log('Blockhash obtained:', blockhash.slice(0, 10) + '...');
    
    // Get source token account (sender's USDC account)
    console.log('Getting sender token account...');
    const senderTokenAccount = await getAssociatedTokenAddress(
      usdcMint,
      provider.publicKey
    );
    console.log('Sender token account:', senderTokenAccount.toString());
    
    // Verify sender has the token account
    try {
      await getAccount(connection, senderTokenAccount);
      console.log('Sender token account exists');
    } catch (error) {
      console.error('Sender does not have a USDC token account:', error);
      throw new Error('You do not have a USDC token account or balance. Please add USDC to your wallet first.');
    }
    
    // Get recipient token account (pool address USDC account)
    const recipientAddress = new PublicKey(CONTRACT_ADDRESSES.poolAddress);
    console.log('Recipient address:', recipientAddress.toString());
    
    console.log('Getting recipient token account...');
    const recipientTokenAccount = await getAssociatedTokenAddress(
      usdcMint,
      recipientAddress
    );
    console.log('Recipient token account:', recipientTokenAccount.toString());
    
    // Create transaction
    const transaction = new Transaction();
    transaction.feePayer = provider.publicKey;
    transaction.recentBlockhash = blockhash;
    
    // Check if recipient token account exists, if not create it
    let recipientAccountExists = false;
    try {
      await getAccount(connection, recipientTokenAccount);
      recipientAccountExists = true;
      console.log('Recipient token account exists');
    } catch (error) {
      console.log('Recipient token account does not exist, will create it');
      // Add instruction to create recipient token account
      transaction.add(
        createAssociatedTokenAccountInstruction(
          provider.publicKey, // payer
          recipientTokenAccount, // associated token account
          recipientAddress, // owner
          usdcMint // mint
        )
      );
    }
    
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
    
    console.log('Transaction created for USDC transfer');
    
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

      console.log('USDC Transaction confirmed successfully!');
      return signature;
    } catch (error) {
      console.error('Transaction execution failed:', error);
      
      // More helpful error message
      if (error.message && error.message.includes('insufficient funds')) {
        throw new Error('Insufficient USDC balance for this transaction. Please add more USDC to your wallet.');
      } else if (error.message && error.message.includes('Blockhash not found')) {
        throw new Error('Transaction took too long to confirm. Please try again.');
      }
      
      throw new Error(`Transaction failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  } catch (error) {
    console.error('Phantom USDC transaction error:', error);
    throw error;
  }
};
