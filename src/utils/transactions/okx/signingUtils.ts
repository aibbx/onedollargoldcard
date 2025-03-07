
import { Connection, Transaction } from '@solana/web3.js';
import { toast } from "@/hooks/use-toast";

// Function to sign and send transaction with OKX wallet
export const signAndSendTransaction = async (
  solanaProvider: any,
  transaction: Transaction,
  connection: Connection
): Promise<string> => {
  console.log('Requesting OKX wallet signature...');
  
  if (!solanaProvider) {
    throw new Error('OKX Solana provider is not available');
  }
  
  // Add delay to ensure UI is rendered before wallet popup
  await new Promise(resolve => setTimeout(resolve, 500));
  
  toast({
    title: "Waiting for approval",
    description: "Please approve the transaction in your OKX wallet",
  });

  // Try all available signing methods one by one
  try {
    if (solanaProvider.signAndSendTransaction) {
      console.log('Using OKX signAndSendTransaction method');
      try {
        const result = await solanaProvider.signAndSendTransaction(transaction);
        const signature = result.signature || result;
        console.log('OKX transaction sent with signAndSendTransaction:', signature);
        return signature;
      } catch (signError) {
        console.error('Error with signAndSendTransaction method:', signError);
        // Check for user rejection
        if (signError.message && signError.message.toLowerCase().includes('user rejected')) {
          toast({
            title: "Transaction Cancelled",
            description: "You cancelled the transaction in your OKX wallet",
            variant: "destructive",
          });
          throw new Error('Transaction was rejected by user in wallet');
        }
        // Continue to next method
      }
    } 
    
    if (solanaProvider.signTransaction) {
      console.log('Using OKX signTransaction method');
      try {
        const signedTransaction = await solanaProvider.signTransaction(transaction);
        console.log('Transaction signed, now sending to network...');
        
        // Add delay before sending to network
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const signature = await connection.sendRawTransaction(
          typeof signedTransaction.serialize === 'function' 
            ? signedTransaction.serialize() 
            : signedTransaction
        );
        console.log('OKX transaction sent with signTransaction method:', signature);
        return signature;
      } catch (signError) {
        console.error('Error with signTransaction method:', signError);
        if (signError.message && signError.message.toLowerCase().includes('user rejected')) {
          toast({
            title: "Transaction Cancelled",
            description: "You cancelled the transaction in your OKX wallet",
            variant: "destructive",
          });
          throw new Error('Transaction was rejected by user in wallet');
        }
        // Continue to next method
      }
    }
    
    if (solanaProvider.sign) {
      console.log('Using OKX sign method');
      try {
        const signedTransaction = await solanaProvider.sign(transaction);
        console.log('Transaction signed with basic sign method, now sending to network...');
        
        const signature = await connection.sendRawTransaction(
          typeof signedTransaction.serialize === 'function' 
            ? signedTransaction.serialize() 
            : signedTransaction
        );
        console.log('OKX transaction sent with sign method:', signature);
        return signature;
      } catch (signError) {
        console.error('Error with sign method:', signError);
        if (signError.message && signError.message.toLowerCase().includes('user rejected')) {
          toast({
            title: "Transaction Cancelled",
            description: "You cancelled the transaction in your OKX wallet",
            variant: "destructive",
          });
          throw new Error('Transaction was rejected by user in wallet');
        }
        throw signError;
      }
    }
    
    // If we reach here, no signing method worked
    console.error('No compatible signing method found for OKX wallet');
    toast({
      title: "Wallet Compatibility Error",
      description: "Your OKX wallet version doesn't support the required transaction methods. Please try using Phantom or Solflare wallet instead.",
      variant: "destructive",
    });
    throw new Error('No compatible signing methods available in OKX wallet');
  } catch (error) {
    // If we already showed a toast for user rejection, just propagate the error
    if (error.message && error.message.includes('rejected by user')) {
      throw error;
    }
    
    console.error('Failed to sign and send transaction with OKX wallet:', error);
    toast({
      title: "Transaction Failed",
      description: error.message || "Failed to send transaction with OKX wallet",
      variant: "destructive",
    });
    throw error;
  }
};
