
import { Connection, TransactionSignature } from '@solana/web3.js';
import { toast } from "@/hooks/use-toast";
import { getBackupConnection } from './connectionUtils';

// Define a more specific type for the confirmation response
interface ConfirmationResponse {
  value: {
    err: any | null;
    slot?: number;
    confirmations?: number;
  } | null;
}

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
  console.log('Waiting for Solflare transaction confirmation...', signature);
  
  let confirmationAttempts = 0;
  let confirmed = false;
  let backupConnectionUsed = false;
  
  while (!confirmed && confirmationAttempts < 5) {
    try {
      confirmationAttempts++;
      console.log(`Confirmation attempt ${confirmationAttempts}...`);
      
      // Use the primary connection for first attempts, then try backup
      const currentConnection = (backupConnectionUsed || confirmationAttempts > 2) 
        ? getBackupConnection() 
        : connection;
      
      if (confirmationAttempts > 2 && !backupConnectionUsed) {
        console.log('Switching to backup connection for confirmation...');
        backupConnectionUsed = true;
      }
      
      // Confirm with increasing timeouts on retries
      const timeout = 30000 + (confirmationAttempts * 10000); // Increase timeout with each attempt
      const confirmation = await Promise.race([
        currentConnection.confirmTransaction({
          signature,
          blockhash,
          lastValidBlockHeight
        }, 'confirmed'),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error(`Confirmation timeout (${timeout}ms)`)), timeout)
        )
      ]) as ConfirmationResponse;
      
      // Check if promise was resolved with confirmation
      if (confirmation) {
        confirmed = true;
        
        if (confirmation?.value?.err) {
          throw new Error(`Transaction confirmed but failed: ${JSON.stringify(confirmation.value.err)}`);
        }
        
        console.log('Solflare USDC transaction confirmed successfully');
        
        // Show success toast
        toast({
          title: "Transaction Successful",
          description: "Your transaction has been confirmed on the Solana network!",
        });
        
        return;
      }
    } catch (confirmError) {
      console.error(`Confirmation attempt ${confirmationAttempts} failed:`, confirmError);
      
      // On last attempt, show a helpful message
      if (confirmationAttempts >= 5) {
        console.log('Transaction may still be processing despite confirmation timeout');
        toast({
          title: "Confirmation Status Unknown",
          description: "The transaction was submitted, but confirmation timed out. It may still complete successfully.",
          variant: "default",
        });
        return; // Return instead of throwing to avoid error state
      }
      
      // Wait a bit before retrying with increasing delays
      const delay = 1000 * confirmationAttempts;
      console.log(`Waiting ${delay}ms before retry...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};
