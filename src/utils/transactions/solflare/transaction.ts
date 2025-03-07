
import { PublicKey } from '@solana/web3.js';
import { toast } from "@/hooks/use-toast";
import { getConnection, validateProvider } from './connectionUtils';
import { prepareTokenAccounts } from './tokenUtils';
import { buildTransaction } from './transactionBuilder';
import { signAndSendTransaction } from './signTransaction';
import { confirmTransaction } from './confirmTransaction';
import { handleTransactionError } from './errorHandler';

// Handle transactions specifically for Solflare wallet
export const sendSolflareTransaction = async (
  provider: any,
  amount: number,
  walletAddress: string
): Promise<string> => {
  try {
    console.log('Processing Solflare USDT transaction', { amount, walletAddress });
    
    // Validate provider
    provider = validateProvider(provider);

    // Get a reliable connection
    console.log('Establishing connection to Solana network...');
    const connection = getConnection();
    
    // Convert dollar amount to USDT tokens (USDT has 6 decimals)
    const transferAmountUSDT = Math.floor(amount * 1000000);
    console.log('Transfer amount in USDT (with decimals):', transferAmountUSDT);
    
    // Show toast notification
    toast({
      title: "Preparing Transaction",
      description: "Setting up your USDT transaction. Please wait...",
    });
    
    // Get sender public key
    const senderPublicKey = provider.publicKey;
    console.log('Sender public key:', senderPublicKey.toString());
    
    // Prepare token accounts
    console.log('Preparing token accounts...');
    const { 
      usdtMint, 
      senderTokenAccount, 
      recipientTokenAccount, 
      recipientAddress, 
      recipientAccountExists 
    } = await prepareTokenAccounts(connection, senderPublicKey);
    
    console.log('Token accounts prepared:', {
      senderTokenAccount: senderTokenAccount.toString(),
      recipientTokenAccount: recipientTokenAccount.toString(),
      recipientExists: recipientAccountExists
    });
    
    // Build transaction
    console.log('Building transaction...');
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
      usdtMint,
      transferAmountUSDT,
      recipientAccountExists
    );
    
    // Show wallet approval toast
    toast({
      title: "Wallet Approval Required",
      description: "Please approve the transaction in your Solflare wallet",
      variant: "default",
    });
    
    // Add delay to ensure toast is visible before wallet popup
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Sign and send transaction
    console.log('Signing and sending transaction...');
    const signature = await signAndSendTransaction(provider, transaction, connection);
    console.log('Transaction sent with signature:', signature);
    
    // Show processing toast
    toast({
      title: "Transaction Submitted",
      description: "Your transaction is being processed on the Solana network...",
    });
    
    // Confirm transaction
    await confirmTransaction(connection, signature, blockhash, lastValidBlockHeight);
    
    // Show success toast
    toast({
      title: "Donation Successful",
      description: `Your donation of $${amount.toFixed(2)} USDT has been processed successfully! Thank you for your support.`,
    });
    
    return signature;
  } catch (error) {
    return handleTransactionError(error);
  }
};
