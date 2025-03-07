
import { Connection } from '@solana/web3.js';
import { toast } from "@/hooks/use-toast";

// Confirm the transaction
export const confirmTransaction = async (
  connection: Connection,
  signature: string,
  blockhash: string,
  lastValidBlockHeight: number
): Promise<void> => {
  // Show processing toast
  toast({
    title: "Transaction Submitted",
    description: "Your transaction is being processed on the Solana network...",
  });
  
  // Wait for confirmation with proper timeout and retry logic
  console.log('Waiting for Solflare transaction confirmation...');
  
  let confirmationAttempts = 0;
  let confirmed = false;
  
  while (!confirmed && confirmationAttempts < 3) {
    try {
      confirmationAttempts++;
      console.log(`Confirmation attempt ${confirmationAttempts}...`);
      
      const confirmation = await connection.confirmTransaction({
        signature,
        blockhash,
        lastValidBlockHeight
      }, 'confirmed');
      
      confirmed = true;
      
      if (confirmation.value.err) {
        throw new Error(`Transaction confirmed but failed: ${JSON.stringify(confirmation.value.err)}`);
      }
      
      console.log('Solflare USDC transaction confirmed successfully');
      return;
    } catch (confirmError) {
      console.error(`Confirmation attempt ${confirmationAttempts} failed:`, confirmError);
      
      if (confirmationAttempts >= 3) {
        throw confirmError;
      }
      
      // Wait a bit before retrying
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
};
