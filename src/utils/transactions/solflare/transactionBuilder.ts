
import { 
  PublicKey, 
  Transaction,
  Connection
} from '@solana/web3.js';
import { 
  createTransferInstruction,
  createAssociatedTokenAccountInstruction,
  TOKEN_PROGRAM_ID
} from '@solana/spl-token';

// Build the transaction
export const buildTransaction = async (
  connection: Connection,
  senderPublicKey: PublicKey,
  senderTokenAccount: PublicKey,
  recipientTokenAccount: PublicKey,
  recipientAddress: PublicKey,
  usdcMint: PublicKey,
  transferAmountUSDC: number,
  recipientAccountExists: boolean
): Promise<{
  transaction: Transaction;
  blockhash: string;
  lastValidBlockHeight: number;
}> => {
  console.log('Building Solflare transaction...');
  
  // Get recent blockhash for transaction
  console.log('Getting recent blockhash for Solflare transaction...');
  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('confirmed');
  console.log('Received blockhash:', blockhash.slice(0, 10) + '...');
  
  // Create a new transaction
  const transaction = new Transaction();
  transaction.feePayer = senderPublicKey;
  transaction.recentBlockhash = blockhash;
  
  // Check if recipient token account exists, if not create it
  if (!recipientAccountExists) {
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
  
  return { transaction, blockhash, lastValidBlockHeight };
};
