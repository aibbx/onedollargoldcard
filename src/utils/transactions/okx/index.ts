
import { PublicKey } from '@solana/web3.js';
import { CONTRACT_ADDRESSES } from '../../walletUtils';
import { toast } from "@/hooks/use-toast";
import { getConnection } from './connectionUtils';
import { validateProvider } from './connectionUtils';
import { prepareTokenAccounts } from './tokenAccountUtils';
import { buildTransaction } from './transactionBuilder';
import { signAndSendTransaction } from './signingUtils';
import { confirmTransaction } from './confirmationUtils';
import { handleTransactionError } from './errorUtils';

export const sendOKXTransaction = async (
  provider: any,
  amount: number,
  walletAddress: string
): Promise<string> => {
  try {
    console.log('Starting OKX USDC transaction:', { amount, walletAddress });
    
    // Validate provider and get solana provider
    const solanaProvider = validateProvider(provider);
    
    // Get connection
    let connection;
    try {
      connection = getConnection();
      console.log('Connection established to primary endpoint');
      
      // Test the connection
      await connection.getVersion();
    } catch (connError) {
      console.error('Error with primary connection, trying backup:', connError);
      toast({
        title: "Network Connection Issue",
        description: "Had trouble connecting to Solana. Trying backup network...",
      });
      
      // Use backup connection
      connection = getConnection();
    }
    
    // Convert dollar amount to USDC tokens (USDC has 6 decimals)
    const transferAmountUSDC = Math.floor(amount * 1000000);
    console.log('Transfer amount in USDC (with decimals):', transferAmountUSDC);
    
    // Get the recipient address
    const recipientAddress = new PublicKey(CONTRACT_ADDRESSES.poolAddress);
    console.log('Recipient address:', recipientAddress.toString());

    // Show toast to inform user that we're preparing the transaction
    toast({
      title: "Preparing Transaction",
      description: "Setting up your USDC transaction. Please wait...",
    });

    // Get sender public key
    const senderPublicKey = new PublicKey(solanaProvider.publicKey.toString());
    
    // Prepare token accounts
    const { 
      usdcMint, 
      senderTokenAccount, 
      recipientTokenAccount, 
      recipientAccountExists 
    } = await prepareTokenAccounts(
      connection, 
      senderPublicKey, 
      recipientAddress,
      transferAmountUSDC
    );
    
    // Build transaction
    const { 
      transaction, 
      blockhash, 
      lastValidBlockHeight 
    } = await buildTransaction(
      connection,
      senderPublicKey,
      senderTokenAccount,
      recipientTokenAccount,
      recipientAddress,
      usdcMint,
      transferAmountUSDC,
      recipientAccountExists
    );
    
    // Sign and send transaction
    const signature = await signAndSendTransaction(solanaProvider, transaction, connection);
    
    // Confirm transaction
    await confirmTransaction(connection, signature, blockhash, lastValidBlockHeight);
    
    // Show success toast
    toast({
      title: "Donation Successful",
      description: `Your donation of $${amount.toFixed(2)} USDC has been processed successfully! Thank you for your support.`,
    });
    
    return signature;

  } catch (error) {
    return handleTransactionError(error);
  }
};
