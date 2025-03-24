
import { 
  PublicKey, 
  Connection
} from '@solana/web3.js';
import { 
  getAssociatedTokenAddress,
  getAccount,
  createAssociatedTokenAccountInstruction
} from '@solana/spl-token';
import { toast } from "@/hooks/use-toast";

// USDT token address on BSC mainnet
export const USDT_TOKEN_ADDRESS = 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB';

// Function to prepare and validate token accounts
export const prepareTokenAccounts = async (
  connection: Connection,
  senderPublicKey: PublicKey,
  recipientAddress: PublicKey,
  transferAmountUSDT: number
) => {
  console.log('Preparing token accounts for BSC transaction...');
  
  // Get USDT token mint
  const usdtMint = new PublicKey(USDT_TOKEN_ADDRESS);
  console.log('USDT token mint:', usdtMint.toString());
  
  // Get source token account (sender's USDT account)
  console.log('Getting sender token account...');
  const senderTokenAccount = await getAssociatedTokenAddress(
    usdtMint,
    senderPublicKey
  );
  console.log('Sender token account:', senderTokenAccount.toString());
  
  // Verify sender has the token account and sufficient balance
  try {
    const tokenAccount = await getAccount(connection, senderTokenAccount);
    console.log('Sender token account exists with balance:', tokenAccount.amount.toString());
    
    // Check if user has enough USDT
    if (Number(tokenAccount.amount) < transferAmountUSDT) {
      toast({
        title: "Insufficient USDT Balance",
        description: `You need at least ${transferAmountUSDT / 1000000} USDT for this donation. Please add more USDT to your wallet.`,
        variant: "destructive",
      });
      throw new Error(`Insufficient USDT balance: ${Number(tokenAccount.amount) / 1000000} USDT available, ${transferAmountUSDT / 1000000} USDT needed`);
    }
  } catch (error) {
    console.error('Sender does not have a USDT token account:', error);
    toast({
      title: "USDT Account Missing",
      description: "You don't have a USDT token account. Please add USDT to your wallet first.",
      variant: "destructive",
    });
    throw new Error('You do not have a USDT token account. Please add USDT to your wallet first.');
  }
  
  // Get recipient token account
  console.log('Getting recipient token account...');
  const recipientTokenAccount = await getAssociatedTokenAddress(
    usdtMint,
    recipientAddress
  );
  console.log('Recipient token account:', recipientTokenAccount.toString());
  
  // Check if recipient token account exists
  let recipientAccountExists = false;
  try {
    await getAccount(connection, recipientTokenAccount);
    recipientAccountExists = true;
    console.log('Recipient token account exists');
  } catch (error) {
    console.log('Recipient token account does not exist, will create it');
  }
  
  return {
    usdtMint,
    senderTokenAccount,
    recipientTokenAccount,
    recipientAccountExists
  };
};
