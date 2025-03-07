
import { Connection, Transaction } from '@solana/web3.js';

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
    // Try the preferred signAndSendTransaction method first
    if (provider.signAndSendTransaction) {
      console.log('Using Solflare signAndSendTransaction method...');
      const result = await provider.signAndSendTransaction(transaction);
      signature = typeof result === 'string' ? result : result.signature;
      console.log('Solflare transaction sent using signAndSendTransaction:', signature);
    }
    // Then try signTransaction + sendRawTransaction if the first method failed
    else if (provider.signTransaction) {
      console.log('Using Solflare separate sign and send transaction methods...');
      const signedTransaction = await provider.signTransaction(transaction);
      signature = await connection.sendRawTransaction(signedTransaction.serialize());
      console.log('Solflare transaction sent using separate sign and send:', signature);
    }
    else {
      throw new Error('Solflare wallet does not support required transaction methods');
    }
  } catch (e) {
    console.error('Error with initial Solflare transaction method:', e);
    
    // Try fallback method if the first attempt failed
    if (!signature && provider.signTransaction) {
      try {
        console.log('Using fallback Solflare transaction method...');
        const signedTransaction = await provider.signTransaction(transaction);
        signature = await connection.sendRawTransaction(signedTransaction.serialize());
        console.log('Solflare transaction sent with fallback method:', signature);
      } catch (fallbackError) {
        console.error('Error with fallback Solflare transaction method:', fallbackError);
        
        // More helpful error messages
        if (fallbackError.message && fallbackError.message.includes('insufficient funds')) {
          throw new Error('Insufficient USDC balance for this transaction. Please add more USDC to your wallet.');
        }
        
        throw fallbackError;
      }
    }
  }
  
  if (!signature) {
    throw new Error('Failed to get transaction signature from Solflare wallet');
  }
  
  return signature;
};
