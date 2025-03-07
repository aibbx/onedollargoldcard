
import { CONTRACT_ADDRESSES } from '../walletUtils';
import { 
  PublicKey, 
  Transaction, 
  Connection, 
  clusterApiUrl,
  SystemProgram,
  LAMPORTS_PER_SOL
} from '@solana/web3.js';
import { 
  TOKEN_PROGRAM_ID,
  createTransferInstruction,
  getAssociatedTokenAddress,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from '@solana/spl-token';

// USDC token mint address on mainnet
const USDC_MINT = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v');

// Function to get connection
const getConnection = (): Connection => {
  return new Connection(clusterApiUrl('mainnet-beta'), {
    commitment: 'confirmed',
    wsEndpoint: 'wss://api.mainnet-beta.solana.com/'
  });
};

export const sendOKXTransaction = async (
  provider: any,
  amount: number,
  walletAddress: string
): Promise<string> => {
  try {
    console.log('Starting OKX transaction:', { amount, walletAddress });
    const solanaProvider = provider.solana;
    
    const connection = getConnection();
    
    // Convert USDC amount (USDC has 6 decimals)
    const transferAmount = Math.floor(amount * 1_000_000);
    console.log('Transfer amount in USDC decimals:', transferAmount);

    // Get the sender's token account
    const senderTokenAccount = await getAssociatedTokenAddress(
      USDC_MINT,
      solanaProvider.publicKey
    );
    console.log('Sender token account:', senderTokenAccount.toString());

    // Get the recipient's token account
    const recipientAddress = new PublicKey(CONTRACT_ADDRESSES.poolAddress);
    const recipientTokenAccount = await getAssociatedTokenAddress(
      USDC_MINT,
      recipientAddress
    );
    console.log('Recipient token account:', recipientTokenAccount.toString());

    // Get latest blockhash
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
    
    // Create transaction
    const transaction = new Transaction({
      feePayer: solanaProvider.publicKey,
      blockhash,
      lastValidBlockHeight,
    });

    // Add token transfer instruction
    transaction.add(
      createTransferInstruction(
        senderTokenAccount,
        recipientTokenAccount,
        solanaProvider.publicKey,
        transferAmount,
        [],
        TOKEN_PROGRAM_ID
      )
    );

    console.log('Requesting OKX transaction signature...');
    let signature: string;

    try {
      // Try signAndSendTransaction first
      if (solanaProvider.signAndSendTransaction) {
        const result = await solanaProvider.signAndSendTransaction(transaction);
        signature = result.signature || result;
      } 
      // Fallback to separate sign and send
      else {
        const signed = await solanaProvider.signTransaction(transaction);
        signature = await connection.sendRawTransaction(signed.serialize());
      }

      console.log('Transaction sent:', signature);

      // Wait for confirmation
      const confirmation = await connection.confirmTransaction({
        signature,
        blockhash,
        lastValidBlockHeight
      });

      if (confirmation.value.err) {
        throw new Error(`Transaction failed: ${JSON.stringify(confirmation.value.err)}`);
      }

      return signature;

    } catch (error) {
      console.error('Transaction error:', error);
      throw new Error(`Transaction failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  } catch (error) {
    console.error('OKX transaction error:', error);
    throw error;
  }
};
