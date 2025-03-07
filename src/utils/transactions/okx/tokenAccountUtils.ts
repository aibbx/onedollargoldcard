
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

// USDC token address on Solana mainnet
export const USDC_TOKEN_ADDRESS = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';

// Function to prepare and validate token accounts
export const prepareTokenAccounts = async (
  connection: Connection,
  senderPublicKey: PublicKey,
  recipientAddress: PublicKey,
  transferAmountUSDC: number
) => {
  console.log('Preparing token accounts for OKX transaction...');
  
  // Get USDC token mint
  const usdcMint = new PublicKey(USDC_TOKEN_ADDRESS);
  console.log('USDC token mint:', usdcMint.toString());
  
  // Get source token account (sender's USDC account)
  console.log('Getting sender token account...');
  const senderTokenAccount = await getAssociatedTokenAddress(
    usdcMint,
    senderPublicKey
  );
  console.log('Sender token account:', senderTokenAccount.toString());
  
  // Verify sender has the token account and sufficient balance
  try {
    const tokenAccount = await getAccount(connection, senderTokenAccount);
    console.log('Sender token account exists with balance:', tokenAccount.amount.toString());
    
    // Check if user has enough USDC
    if (Number(tokenAccount.amount) < transferAmountUSDC) {
      toast({
        title: "Insufficient USDC Balance",
        description: `You need at least ${transferAmountUSDC / 1000000} USDC for this donation. Please add more USDC to your wallet.`,
        variant: "destructive",
      });
      throw new Error(`Insufficient USDC balance: ${Number(tokenAccount.amount) / 1000000} USDC available, ${transferAmountUSDC / 1000000} USDC needed`);
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
  
  // Get recipient token account
  console.log('Getting recipient token account...');
  const recipientTokenAccount = await getAssociatedTokenAddress(
    usdcMint,
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
    usdcMint,
    senderTokenAccount,
    recipientTokenAccount,
    recipientAccountExists
  };
};
