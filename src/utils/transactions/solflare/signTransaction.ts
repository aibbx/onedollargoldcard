
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
    // Show clear wallet approval toast
    toast({
      title: "Approve Transaction",
      description: "Please approve the transaction in your Solflare wallet popup",
      variant: "default",
    });
    
    // Small delay to ensure toast is visible before wallet popup
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Try the preferred signAndSendTransaction method first
    if (provider.signAndSendTransaction) {
      console.log('Using Solflare signAndSendTransaction method...');
      try {
        console.log('Transaction before sending:', transaction);
        const result = await provider.signAndSendTransaction(transaction);
        signature = typeof result === 'string' ? result : result.signature;
        console.log('Solflare transaction sent using signAndSendTransaction:', signature);
        return signature;
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
        console.log('Transaction signed, now sending to network...');
        
        // Add delay before sending to network
        await new Promise(resolve => setTimeout(resolve, 500));
        
        signature = await connection.sendRawTransaction(
          signedTransaction.serialize ? signedTransaction.serialize() : signedTransaction
        );
        console.log('Solflare transaction sent using separate sign and send:', signature);
        return signature;
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
          signedTransaction.serialize ? signedTransaction.serialize() : signedTransaction
        );
        console.log('Solflare transaction sent with basic sign method:', signature);
        return signature;
      } catch (e) {
        console.error('Error with basic sign method:', e);
        throw e;
      }
    }
    
    // If we get here with no signature, throw an error
    if (!signature) {
      toast({
        title: "Transaction Failed",
        description: "Could not sign transaction with Solflare wallet. Please try again.",
        variant: "destructive",
      });
      throw new Error('Failed to sign transaction with any available method');
    }
    
    return signature;
  } catch (e) {
    console.error('Error with all Solflare transaction methods:', e);
    
    // Provide more helpful error messages
    if (e.message && e.message.includes('insufficient funds')) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough USDC for this transaction. Please add more USDC to your wallet.",
        variant: "destructive",
      });
      throw new Error('Insufficient USDC balance for this transaction. Please add more USDC to your wallet.');
    }
    
    if (e.message && e.message.includes('User rejected')) {
      toast({
        title: "Transaction Cancelled",
        description: "You cancelled the transaction in your Solflare wallet.",
        variant: "destructive",
      });
      throw new Error('Transaction was rejected by user in wallet');
    }
    
    toast({
      title: "Transaction Error",
      description: e.message || "Error sending transaction with Solflare wallet",
      variant: "destructive",
    });
    
    throw e;
  }
};
