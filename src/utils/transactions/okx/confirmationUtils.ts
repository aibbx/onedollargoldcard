
import { Connection, TransactionSignature } from '@solana/web3.js';
import { toast } from "@/hooks/use-toast";
import { getBackupConnection } from './connectionUtils';

// Define the confirmation response type
interface ConfirmationResponse {
  value: {
    err: any | null;
  } | null;
}

// Function to confirm transaction with retry logic
export const confirmTransaction = async (
  connection: Connection,
  signature: string,
  blockhash: string,
  lastValidBlockHeight: number
): Promise<void> => {
  console.log('Waiting for OKX transaction confirmation...', signature);
  
  // Show processing toast
  toast({
    title: "Transaction Submitted",
    description: "Your transaction is being processed on the Solana network...",
  });
  
  let confirmationAttempts = 0;
  let confirmed = false;
  let currentConnection = connection;
  let maxAttempts = 4;
  
  while (!confirmed && confirmationAttempts < maxAttempts) {
    try {
      confirmationAttempts++;
      console.log(`Confirmation attempt ${confirmationAttempts}/${maxAttempts}...`);
      
      // Use a timeout promise to limit wait time
      const timeoutDuration = 30000 + (confirmationAttempts * 5000);
      
      try {
        const confirmation = await Promise.race([
          currentConnection.confirmTransaction({
            signature,
            blockhash,
            lastValidBlockHeight
          }, 'confirmed'),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error(`Confirmation timeout (${timeoutDuration}ms)`)), timeoutDuration)
          )
        ]) as ConfirmationResponse;
        
        confirmed = true;
        
        if (confirmation?.value && confirmation.value.err) {
          console.error('Transaction error during confirmation:', confirmation.value.err);
          toast({
            title: "Transaction Failed on Network",
            description: `Transaction was sent but failed on the Solana network. Please check your wallet to verify.`,
            variant: "destructive",
          });
          throw new Error(`Transaction failed during confirmation: ${JSON.stringify(confirmation.value.err)}`);
        }
        
        console.log('OKX USDT transaction confirmed successfully!');
        toast({
          title: "Transaction Successful",
          description: "Your USDT transaction has been confirmed on the Solana network!",
        });
        return;
      } catch (timeoutError) {
        console.error(`Confirmation timeout on attempt ${confirmationAttempts}:`, timeoutError);
        // Will retry on next iteration
      }
    } catch (confirmError) {
      console.error(`Confirmation attempt ${confirmationAttempts} failed:`, confirmError);
      
      if (confirmationAttempts >= maxAttempts) {
        // If we've tried the maximum number of times, inform the user but don't throw
        toast({
          title: "Confirmation Status Unknown",
          description: "The transaction was submitted, but confirmation timed out. It may still complete successfully.",
          variant: "default",
        });
        console.log('Transaction may still be processing despite confirmation timeout');
        return;
      }
      
      // Try with backup connection if we have confirmation issues
      if (confirmationAttempts === 2) {
        console.log('Switching to backup connection for confirmation');
        currentConnection = getBackupConnection();
      }
      
      // Wait a bit before retrying
      const delay = 2000 * confirmationAttempts;
      console.log(`Waiting ${delay}ms before retry...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};
