
import { Connection, Transaction } from '@solana/web3.js';
import { toast } from "@/hooks/use-toast";

// Function to sign and send transaction with OKX wallet
export const signAndSendTransaction = async (
  solanaProvider: any,
  transaction: Transaction,
  connection: Connection
): Promise<string> => {
  console.log('Requesting OKX wallet signature...', {
    availableMethods: Object.keys(solanaProvider)
  });
  
  // Show wallet approval toast
  toast({
    title: "Wallet Approval Required",
    description: "Please approve the transaction in your OKX wallet",
    variant: "default",
  });
  
  // Add delay to ensure toast is visible before wallet popup
  await new Promise(resolve => setTimeout(resolve, 800));
  
  let signature: string = '';

  // Try all available signing methods one by one
  if (solanaProvider.signAndSendTransaction) {
    console.log('Using OKX signAndSendTransaction method');
    try {
      const result = await solanaProvider.signAndSendTransaction(transaction);
      signature = result.signature || result;
      console.log('OKX transaction sent with signAndSendTransaction:', signature);
      return signature;
    } catch (signError) {
      console.error('Error with signAndSendTransaction method:', signError);
      // Continue to next method
    }
  } 
  
  if (solanaProvider.signTransaction) {
    console.log('Using OKX signTransaction method');
    try {
      const signedTransaction = await solanaProvider.signTransaction(transaction);
      signature = await connection.sendRawTransaction(
        typeof signedTransaction.serialize === 'function'
          ? signedTransaction.serialize()
          : signedTransaction
      );
      console.log('OKX transaction sent with signTransaction method:', signature);
      return signature;
    } catch (signError) {
      console.error('Error with signTransaction method:', signError);
      // Continue to next method
    }
  }
  
  if (solanaProvider.sign) {
    console.log('Using OKX sign method');
    try {
      const signedTransaction = await solanaProvider.sign(transaction);
      signature = await connection.sendRawTransaction(
        typeof signedTransaction.serialize === 'function' 
          ? signedTransaction.serialize() 
          : signedTransaction
      );
      console.log('OKX transaction sent with sign method:', signature);
      return signature;
    } catch (signError) {
      console.error('Error with sign method:', signError);
      // Continue to next method
    }
  }
  
  if (signature) {
    return signature;
  }
  
  // If we reach here, no signing method worked
  console.error('No compatible signing method found for OKX wallet');
  toast({
    title: "Wallet Compatibility Error",
    description: "Your OKX wallet version doesn't support the required transaction methods. Please try using Phantom or Solflare wallet instead.",
    variant: "destructive",
  });
  throw new Error('No compatible signing methods available in OKX wallet');
};
