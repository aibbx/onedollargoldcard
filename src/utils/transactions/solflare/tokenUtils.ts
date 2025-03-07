
import { 
  PublicKey, 
  Connection
} from '@solana/web3.js';
import { 
  getAssociatedTokenAddress,
  getAccount
} from '@solana/spl-token';
import { CONTRACT_ADDRESSES } from '../../walletUtils';

// USDC token address on Solana mainnet
export const USDC_TOKEN_ADDRESS = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';

// Prepare token accounts for transaction
export const prepareTokenAccounts = async (
  connection: Connection,
  senderPublicKey: PublicKey
): Promise<{
  usdcMint: PublicKey;
  senderTokenAccount: PublicKey;
  recipientTokenAccount: PublicKey;
  recipientAddress: PublicKey;
  recipientAccountExists: boolean;
}> => {
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
    recipientAddress,
    recipientAccountExists
  };
};
