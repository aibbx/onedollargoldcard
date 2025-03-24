
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
    console.log('Starting OKX USDT transaction:', { amount, walletAddress });
    
    // Validate provider and get provider
    const bscProvider = validateProvider(provider);
    
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
        description: "Had trouble connecting to BSC. Trying backup network...",
      });
      
      // Use backup connection
      connection = getConnection();
    }
    
    // Convert dollar amount to USDT tokens (USDT has 6 decimals)
    const transferAmountUSDT = Math.floor(amount * 1000000);
    console.log('Transfer amount in USDT (with decimals):', transferAmountUSDT);
    
    // Get the recipient address
    const recipientAddress = new PublicKey(CONTRACT_ADDRESSES.poolAddress);
    console.log('Recipient address:', recipientAddress.toString());

    // Show toast to inform user that we're preparing the transaction
    toast({
      title: "Preparing Transaction",
      description: "Setting up your USDT transaction. Please wait...",
    });

    // Get sender public key
    const senderPublicKey = new PublicKey(bscProvider.publicKey.toString());
    
    // Prepare token accounts
    const { 
      usdtMint, 
      senderTokenAccount, 
      recipientTokenAccount, 
      recipientAccountExists 
    } = await prepareTokenAccounts(
      connection, 
      senderPublicKey, 
      recipientAddress,
      transferAmountUSDT
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
      usdtMint,
      transferAmountUSDT,
      recipientAccountExists
    );
    
    // Sign and send transaction
    const signature = await signAndSendTransaction(bscProvider, transaction, connection);
    
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
