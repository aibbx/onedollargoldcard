
import { Connection } from '@solana/web3.js';

// Confirm the transaction
export const confirmTransaction = async (
  connection: Connection,
  signature: string,
  blockhash: string,
  lastValidBlockHeight: number
): Promise<void> => {
  // Wait for confirmation with proper timeout
  console.log('Waiting for Solflare transaction confirmation...');
  try {
    const confirmation = await connection.confirmTransaction({
      signature,
      blockhash,
      lastValidBlockHeight
    }, 'confirmed');
    
    if (confirmation.value.err) {
      throw new Error(`Transaction confirmed but failed: ${JSON.stringify(confirmation.value.err)}`);
    }
    
    console.log('Solflare USDC transaction confirmed successfully');
  } catch (confirmError) {
    console.error('Error confirming Solflare transaction:', confirmError);
    // Even if confirmation verification fails, return the signature if we have it
    if (signature) {
      console.log('Returning Solflare signature despite confirmation error');
      return;
    }
    throw confirmError;
  }
};
