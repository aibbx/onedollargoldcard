
import { Connection } from '@solana/web3.js';
import { toast } from "@/hooks/use-toast";
import { getBackupConnection } from './connectionUtils';

// Function to confirm transaction with retry logic
export const confirmTransaction = async (
  connection: Connection,
  signature: string,
  blockhash: string,
  lastValidBlockHeight: number
): Promise<void> => {
  console.log('Waiting for OKX transaction confirmation...');
  
  // Show processing toast
  toast({
    title: "Transaction Submitted",
    description: "Your transaction is being processed on the Solana network...",
  });
  
  let confirmationAttempts = 0;
  let confirmed = false;
  let currentConnection = connection;
  
  while (!confirmed && confirmationAttempts < 3) {
    try {
      confirmationAttempts++;
      console.log(`Confirmation attempt ${confirmationAttempts}...`);
      
      const confirmation = await currentConnection.confirmTransaction({
        signature,
        blockhash,
        lastValidBlockHeight
      }, 'confirmed');
      
      confirmed = true;
      
      if (confirmation.value.err) {
        console.error('Transaction error during confirmation:', confirmation.value.err);
        toast({
          title: "Transaction Failed on Network",
          description: `Transaction was sent but failed on the Solana network. Please check your wallet to verify.`,
          variant: "destructive",
        });
        throw new Error(`Transaction failed during confirmation: ${JSON.stringify(confirmation.value.err)}`);
      }
    } catch (confirmError) {
      console.error(`Confirmation attempt ${confirmationAttempts} failed:`, confirmError);
      
      if (confirmationAttempts >= 3) {
        throw confirmError;
      }
      
      // Try with backup connection if we have confirmation issues
      if (confirmationAttempts === 2) {
        console.log('Switching to backup connection for confirmation');
        currentConnection = getBackupConnection();
      }
      
      // Wait a bit before retrying
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  // Show success toast
  console.log('OKX USDC transaction confirmed successfully!');
};
