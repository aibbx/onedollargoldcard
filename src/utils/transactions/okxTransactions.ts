
import { CONTRACT_ADDRESSES } from '../walletUtils';
import { 
  PublicKey, 
  Transaction, 
  Connection,
  sendAndConfirmTransaction,
  Keypair
} from '@solana/web3.js';
import { 
  createTransferInstruction,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  getAccount
} from '@solana/spl-token';
import { toast } from "@/hooks/use-toast";

// USDC token address on Solana mainnet
const USDC_TOKEN_ADDRESS = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';

// Function to get connection with proper configuration
const getConnection = (): Connection => {
  // Use a reliable RPC endpoint
  const endpoint = "https://api.mainnet-beta.solana.com";
  console.log('Using primary Solana RPC endpoint for OKX transactions');
  
  return new Connection(endpoint, {
    commitment: 'confirmed',
    confirmTransactionInitialTimeout: 60000 // 60 seconds timeout
  });
};

// Create a backup connection using a different endpoint if needed
const getBackupConnection = (): Connection => {
  // Use QuickNode as backup
  const endpoint = "https://snowy-capable-night.solana-mainnet.quiknode.pro/72424723ee91618f3c3a7c1415e06e6f66ff1035/";
  console.log('Using backup RPC endpoint for OKX transactions');
  
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
    console.log('Starting OKX USDC transaction:', { amount, walletAddress });
    
    // More detailed provider logging
    console.log('Provider details:', { 
      hasProvider: !!provider,
      providerType: 'OKX',
      providerKeys: Object.keys(provider),
      hasOkxSolana: !!provider.solana,
      solanaKeys: provider?.solana ? Object.keys(provider.solana) : [],
    });
    
    if (!provider || !provider.solana) {
      toast({
        title: "Wallet Error",
        description: "OKX wallet provider not properly connected. Please reconnect your wallet.",
        variant: "destructive",
      });
      throw new Error('OKX wallet provider not properly connected');
    }
    
    const solanaProvider = provider.solana;
    if (!solanaProvider.publicKey) {
      toast({
        title: "Wallet Error",
        description: "OKX Solana wallet not properly connected. Please reconnect your wallet.",
        variant: "destructive",
      });
      throw new Error('OKX Solana wallet not properly connected');
    }
    
    // Get primary connection
    let connection: Connection;
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
      
      // Try backup connection
      connection = getBackupConnection();
    }
    
    // Convert dollar amount to USDC tokens (USDC has 6 decimals)
    const transferAmountUSDC = Math.floor(amount * 1000000);
    console.log('Transfer amount in USDC (with decimals):', transferAmountUSDC);
    
    // Get USDC token mint
    const usdcMint = new PublicKey(USDC_TOKEN_ADDRESS);
    console.log('USDC token mint:', usdcMint.toString());
    
    // Get the recipient address
    const recipientAddress = new PublicKey(CONTRACT_ADDRESSES.poolAddress);
    console.log('Recipient address:', recipientAddress.toString());

    // Show toast to inform user that we're preparing the transaction
    toast({
      title: "Preparing Transaction",
      description: "Setting up your USDC transaction. Please wait...",
    });

    // Get latest blockhash
    console.log('Getting latest blockhash for OKX transaction...');
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('confirmed');
    console.log('Blockhash obtained:', blockhash.slice(0, 10) + '...');
    
    // Get source token account (sender's USDC account)
    console.log('Getting sender token account...');
    const senderPublicKey = new PublicKey(solanaProvider.publicKey.toString());
    const senderTokenAccount = await getAssociatedTokenAddress(
      usdcMint,
      senderPublicKey
    );
    console.log('Sender token account:', senderTokenAccount.toString());
    
    // Verify sender has the token account
    try {
      const tokenAccount = await getAccount(connection, senderTokenAccount);
      console.log('Sender token account exists with balance:', tokenAccount.amount.toString());
      
      // Check if user has enough USDC
      if (Number(tokenAccount.amount) < transferAmountUSDC) {
        toast({
          title: "Insufficient USDC Balance",
          description: `You need at least ${amount} USDC for this donation. Please add more USDC to your wallet.`,
          variant: "destructive",
        });
        throw new Error(`Insufficient USDC balance: ${Number(tokenAccount.amount) / 1000000} USDC available, ${amount} USDC needed`);
      }
    } catch (error) {
      console.error('Sender does not have a USDC token account:', error);
      toast({
        title: "USDC Account Missing",
        description: "You don't have a USDC token account. Please add USDC to your wallet first.",
        variant: "destructive",
      });
      throw new Error('You do not have a USDC token account. Please add USDC to your wallet first.');
    }
    
    console.log('Getting recipient token account...');
    const recipientTokenAccount = await getAssociatedTokenAddress(
      usdcMint,
      recipientAddress
    );
    console.log('Recipient token account:', recipientTokenAccount.toString());
    
    // Create transaction
    const transaction = new Transaction();
    transaction.feePayer = senderPublicKey;
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
          senderPublicKey, // payer
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
        senderPublicKey,
        transferAmountUSDC,
        [],
        TOKEN_PROGRAM_ID
      )
    );

    // Show toast to inform user that we're requesting wallet approval
    toast({
      title: "Wallet Approval Required",
      description: "Please approve the transaction in your OKX wallet",
    });

    // Sign and send transaction
    console.log('Requesting OKX wallet signature...');
    let signature: string;

    try {
      // Try all available signing methods one by one
      if (solanaProvider.signAndSendTransaction) {
        console.log('Using OKX signAndSendTransaction method');
        try {
          const result = await solanaProvider.signAndSendTransaction(transaction);
          signature = result.signature || result;
          console.log('OKX transaction sent with signAndSendTransaction:', signature);
        } catch (signError) {
          console.error('Error with signAndSendTransaction method:', signError);
          throw signError;
        }
      } 
      else if (solanaProvider.signTransaction) {
        console.log('Using OKX signTransaction method');
        try {
          const signedTransaction = await solanaProvider.signTransaction(transaction);
          signature = await connection.sendRawTransaction(signedTransaction.serialize());
          console.log('OKX transaction sent with signTransaction method:', signature);
        } catch (signError) {
          console.error('Error with signTransaction method:', signError);
          throw signError;
        }
      }
      else if (solanaProvider.sign) {
        console.log('Using OKX sign method');
        try {
          const signedTransaction = await solanaProvider.sign(transaction);
          signature = await connection.sendRawTransaction(
            typeof signedTransaction.serialize === 'function' 
              ? signedTransaction.serialize() 
              : signedTransaction
          );
          console.log('OKX transaction sent with sign method:', signature);
        } catch (signError) {
          console.error('Error with sign method:', signError);
          throw signError;
        }
      }
      else {
        console.error('No compatible signing method found for OKX wallet');
        toast({
          title: "Wallet Compatibility Error",
          description: "Your OKX wallet version doesn't support the required transaction methods. Please try using Phantom or Solflare wallet instead.",
          variant: "destructive",
        });
        throw new Error('No compatible signing methods available in OKX wallet');
      }

      if (!signature) {
        toast({
          title: "Transaction Failed",
          description: "Couldn't get a transaction signature from your wallet. Please try again or use a different wallet.",
          variant: "destructive",
        });
        throw new Error('Failed to get transaction signature from OKX wallet');
      }

      // Show toast to inform user that transaction is processing
      toast({
        title: "Transaction Submitted",
        description: "Your transaction is being processed on the Solana network...",
      });

      // Wait for confirmation with proper handling
      console.log('Waiting for OKX transaction confirmation...');
      
      let confirmationAttempts = 0;
      let confirmed = false;
      
      while (!confirmed && confirmationAttempts < 3) {
        try {
          confirmationAttempts++;
          const confirmation = await connection.confirmTransaction({
            signature,
            blockhash,
            lastValidBlockHeight
          }, 'confirmed');
          
          confirmed = true;
          
          if (confirmation.value.err) {
            console.error('Transaction error during confirmation:', confirmation.value.err);
            toast({
              title: "Transaction Failed on Network",
              description: `Transaction was sent but failed on the Solana network. Please check your wallet to verify.`,
              variant: "destructive",
            });
            throw new Error(`Transaction failed during confirmation: ${JSON.stringify(confirmation.value.err)}`);
          }
        } catch (confirmError) {
          console.error(`Confirmation attempt ${confirmationAttempts} failed:`, confirmError);
          
          if (confirmationAttempts >= 3) {
            throw confirmError;
          }
          
          // Try with backup connection if we have confirmation issues
          if (confirmationAttempts === 2) {
            connection = getBackupConnection();
          }
          
          // Wait a bit before retrying
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }

      console.log('OKX USDC transaction confirmed successfully!');
      
      // Show success toast
      toast({
        title: "Donation Successful",
        description: `Your donation of $${amount.toFixed(2)} USDC has been processed successfully! Thank you for your support.`,
      });
      
      return signature;

    } catch (error) {
      console.error('OKX transaction error:', error);
      
      // More helpful error messages
      if (error.message && error.message.includes('insufficient funds')) {
        toast({
          title: "Insufficient Funds",
          description: "Insufficient USDC balance for this transaction. Please add more USDC to your wallet.",
          variant: "destructive",
        });
        throw new Error('Insufficient USDC balance for this transaction. Please add more USDC to your wallet.');
      } else if (error.message && error.message.includes('Blockhash not found')) {
        toast({
          title: "Transaction Timeout",
          description: "Transaction took too long to confirm. Please try again.",
          variant: "destructive",
        });
        throw new Error('Transaction took too long to confirm. Please try again.');
      } else if (error.message && error.message.includes('User rejected')) {
        toast({
          title: "Transaction Cancelled",
          description: "You cancelled the transaction in your wallet.",
          variant: "destructive",
        });
        throw new Error('Transaction was cancelled by the user');
      }
      
      toast({
        title: "Transaction Failed",
        description: `OKX transaction failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
      
      throw new Error(`OKX transaction failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  } catch (error) {
    console.error('OKX USDC transaction error:', error);
    throw error;
  }
};
