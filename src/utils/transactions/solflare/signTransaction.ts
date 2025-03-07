
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
  
  if (!provider) {
    throw new Error('Solflare provider is not available');
  }
  
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
    if (typeof provider.signAndSendTransaction === 'function') {
      console.log('Using Solflare signAndSendTransaction method...');
      try {
        console.log('Transaction before sending:', transaction);
        const result = await provider.signAndSendTransaction(transaction);
        signature = typeof result === 'string' ? result : result.signature;
        console.log('Solflare transaction sent using signAndSendTransaction:', signature);
        return signature;
      } catch (e) {
        console.error('Error with signAndSendTransaction:', e);
        if (e.message && e.message.toLowerCase().includes('user rejected')) {
          toast({
            title: "Transaction Cancelled",
            description: "You cancelled the transaction in your Solflare wallet",
            variant: "destructive",
          });
          throw new Error('Transaction was rejected by user in wallet');
        }
        // Continue to fallback methods
      }
    }
    
    // Then try signTransaction + sendRawTransaction if the first method failed
    if (!signature && typeof provider.signTransaction === 'function') {
      console.log('Using Solflare separate sign and send transaction methods...');
      try {
        // Add delay before signing
        await new Promise(resolve => setTimeout(resolve, 300));
        
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
        if (e.message && e.message.toLowerCase().includes('user rejected')) {
          toast({
            title: "Transaction Cancelled",
            description: "You cancelled the transaction in your Solflare wallet",
            variant: "destructive",
          });
          throw new Error('Transaction was rejected by user in wallet');
        }
        throw e;
      }
    }
    
    // Try basic sign method as last resort
    if (!signature && typeof provider.sign === 'function') {
      console.log('Using Solflare basic sign method as fallback...');
      try {
        const signedTransaction = await provider.sign(transaction);
        console.log('Transaction signed with basic sign method');
        
        signature = await connection.sendRawTransaction(
          signedTransaction.serialize ? signedTransaction.serialize() : signedTransaction
        );
        console.log('Solflare transaction sent with basic sign method:', signature);
        return signature;
      } catch (e) {
        console.error('Error with basic sign method:', e);
        if (e.message && e.message.toLowerCase().includes('user rejected')) {
          toast({
            title: "Transaction Cancelled",
            description: "You cancelled the transaction in your Solflare wallet",
            variant: "destructive",
          });
          throw new Error('Transaction was rejected by user in wallet');
        }
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
    
    // If we already showed a toast for user rejection, just propagate the error
    if (e.message && e.message.includes('rejected by user')) {
      throw e;
    }
    
    // Provide more helpful error messages
    if (e.message && e.message.includes('insufficient funds')) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough USDT for this transaction. Please add more USDT to your wallet.",
        variant: "destructive",
      });
      throw new Error('Insufficient USDT balance for this transaction. Please add more USDT to your wallet.');
    }
    
    toast({
      title: "Transaction Error",
      description: e.message || "Error sending transaction with Solflare wallet",
      variant: "destructive",
    });
    
    throw e;
  }
};
