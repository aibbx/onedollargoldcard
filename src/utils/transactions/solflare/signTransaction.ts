
import { Connection, Transaction } from '@solana/web3.js';
import { toast } from "@/hooks/use-toast";

// Sign and send the transaction
export const signAndSendTransaction = async (
  provider: any,
  transaction: Transaction,
  connection: Connection
): Promise<string> => {
  console.log('Sending transaction with Solflare wallet...');
  console.log('Available Solflare methods:', Object.keys(provider));
  
  let signature: string | null = null;
  
  try {
    // Force a better toast visibility before wallet popup
    toast({
      title: "Approve Transaction",
      description: "Please approve the transaction in your Solflare wallet",
      variant: "default",
    });
    
    // Small delay to ensure toast is visible before wallet popup
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Try the preferred signAndSendTransaction method first
    if (provider.signAndSendTransaction) {
      console.log('Using Solflare signAndSendTransaction method...');
      try {
        const result = await provider.signAndSendTransaction(transaction);
        signature = typeof result === 'string' ? result : result.signature;
        console.log('Solflare transaction sent using signAndSendTransaction:', signature);
      } catch (e) {
        console.error('Error with signAndSendTransaction:', e);
        // Continue to fallback methods
      }
    }
    
    // Then try signTransaction + sendRawTransaction if the first method failed
    if (!signature && provider.signTransaction) {
      console.log('Using Solflare separate sign and send transaction methods...');
      try {
        const signedTransaction = await provider.signTransaction(transaction);
        
        // Add delay before sending to network
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        signature = await connection.sendRawTransaction(
          typeof signedTransaction.serialize === 'function' 
            ? signedTransaction.serialize() 
            : signedTransaction
        );
        console.log('Solflare transaction sent using separate sign and send:', signature);
      } catch (e) {
        console.error('Error with signTransaction method:', e);
        throw e;
      }
    }
    
    // Try basic sign method as last resort
    if (!signature && provider.sign) {
      console.log('Using Solflare basic sign method as fallback...');
      try {
        const signedTransaction = await provider.sign(transaction);
        signature = await connection.sendRawTransaction(
          typeof signedTransaction.serialize === 'function' 
            ? signedTransaction.serialize() 
            : signedTransaction
        );
        console.log('Solflare transaction sent with basic sign method:', signature);
      } catch (e) {
        console.error('Error with basic sign method:', e);
        throw e;
      }
    }
  } catch (e) {
    console.error('Error with all Solflare transaction methods:', e);
    
    // Provide more helpful error messages
    if (e.message && e.message.includes('insufficient funds')) {
      throw new Error('Insufficient USDC balance for this transaction. Please add more USDC to your wallet.');
    }
    
    throw e;
  }
  
  if (!signature) {
    throw new Error('Failed to get transaction signature from Solflare wallet');
  }
  
  return signature;
};
