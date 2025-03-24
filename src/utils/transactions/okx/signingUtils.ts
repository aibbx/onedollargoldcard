
import { Connection, Transaction } from '@solana/web3.js';
import { toast } from "@/hooks/use-toast";

// Function to sign and send transaction with wallet
export const signAndSendTransaction = async (
  bscProvider: any,
  transaction: Transaction,
  connection: Connection
): Promise<string> => {
  console.log('Requesting BSC wallet signature...', {
    availableMethods: Object.keys(bscProvider)
  });
  
  // Show wallet approval toast
  toast({
    title: "Wallet Approval Required",
    description: "Please approve the transaction in your wallet",
    variant: "default",
  });
  
  // Add delay to ensure toast is visible before wallet popup
  await new Promise(resolve => setTimeout(resolve, 800));
  
  let signature: string = '';

  // Try all available signing methods one by one
  if (bscProvider.signAndSendTransaction) {
    console.log('Using signAndSendTransaction method');
    try {
      const result = await bscProvider.signAndSendTransaction(transaction);
      signature = result.signature || result;
      console.log('BSC transaction sent with signAndSendTransaction:', signature);
      return signature;
    } catch (signError) {
      console.error('Error with signAndSendTransaction method:', signError);
      // Continue to next method
    }
  } 
  
  if (bscProvider.signTransaction) {
    console.log('Using signTransaction method');
    try {
      const signedTransaction = await bscProvider.signTransaction(transaction);
      signature = await connection.sendRawTransaction(
        typeof signedTransaction.serialize === 'function'
          ? signedTransaction.serialize()
          : signedTransaction
      );
      console.log('BSC transaction sent with signTransaction method:', signature);
      return signature;
    } catch (signError) {
      console.error('Error with signTransaction method:', signError);
      // Continue to next method
    }
  }
  
  if (bscProvider.sign) {
    console.log('Using sign method');
    try {
      const signedTransaction = await bscProvider.sign(transaction);
      signature = await connection.sendRawTransaction(
        typeof signedTransaction.serialize === 'function' 
          ? signedTransaction.serialize() 
          : signedTransaction
      );
      console.log('BSC transaction sent with sign method:', signature);
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
  console.error('No compatible signing method found for wallet');
  toast({
    title: "Wallet Compatibility Error",
    description: "Your wallet version doesn't support the required transaction methods. Please try another wallet.",
    variant: "destructive",
  });
  throw new Error('No compatible signing methods available in wallet');
};
