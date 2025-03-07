
import { 
  PublicKey, 
  Connection
} from '@solana/web3.js';
import { 
  getAssociatedTokenAddress,
  getAccount
} from '@solana/spl-token';
import { CONTRACT_ADDRESSES } from '../../walletUtils';

// USDT token address on Solana mainnet
export const USDT_TOKEN_ADDRESS = 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB';

// Prepare token accounts for transaction
export const prepareTokenAccounts = async (
  connection: Connection,
  senderPublicKey: PublicKey
): Promise<{
  usdtMint: PublicKey;
  senderTokenAccount: PublicKey;
  recipientTokenAccount: PublicKey;
  recipientAddress: PublicKey;
  recipientAccountExists: boolean;
}> => {
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
  
  // Verify sender has the token account
  try {
    await getAccount(connection, senderTokenAccount);
    console.log('Sender token account exists');
  } catch (error) {
    console.error('Sender does not have a USDT token account:', error);
    throw new Error('You do not have a USDT token account or balance. Please add USDT to your wallet first.');
  }
  
  // Get recipient token account (pool address USDT account)
  const recipientAddress = new PublicKey(CONTRACT_ADDRESSES.poolAddress);
  console.log('Recipient address:', recipientAddress.toString());
  
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
    recipientAddress,
    recipientAccountExists
  };
};
