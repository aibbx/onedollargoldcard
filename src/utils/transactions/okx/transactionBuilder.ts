
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
import { toast } from "@/hooks/use-toast";

// Function to build the transaction
export const buildTransaction = async (
  connection: Connection,
  senderPublicKey: PublicKey,
  senderTokenAccount: PublicKey,
  recipientTokenAccount: PublicKey,
  recipientAddress: PublicKey,
  usdtMint: PublicKey,
  transferAmountUSDT: number,
  recipientAccountExists: boolean
) => {
  console.log('Building OKX transaction...');
  
  // Get latest blockhash
  console.log('Getting latest blockhash for OKX transaction...');
  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('confirmed');
  console.log('Blockhash obtained:', blockhash.slice(0, 10) + '...');
  
  // Create transaction
  const transaction = new Transaction();
  transaction.feePayer = senderPublicKey;
  transaction.recentBlockhash = blockhash;

  // Add instruction to create recipient token account if it doesn't exist
  if (!recipientAccountExists) {
    transaction.add(
      createAssociatedTokenAccountInstruction(
        senderPublicKey, // payer
        recipientTokenAccount, // associated token account
        recipientAddress, // owner
        usdtMint // mint
      )
    );
  }

  // Add token transfer instruction
  transaction.add(
    createTransferInstruction(
      senderTokenAccount,
      recipientTokenAccount,
      senderPublicKey,
      transferAmountUSDT,
      [],
      TOKEN_PROGRAM_ID
    )
  );
  
  // Show toast to inform user that we're requesting wallet approval
  toast({
    title: "Wallet Approval Required",
    description: "Please approve the transaction in your OKX wallet",
  });
  
  return { transaction, blockhash, lastValidBlockHeight };
};
