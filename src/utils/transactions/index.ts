
import { WalletType } from '../../types/wallet';
import { sendPhantomTransaction } from './phantomTransactions';
import { sendSolflareTransaction } from './solflareTransactions';
import { sendOKXTransaction } from './okxTransactions';
import { toast } from "@/components/ui/use-toast";

// Process transaction based on wallet type
export const processTransaction = async (
  walletType: WalletType,
  provider: any,
  amount: number,
  walletAddress: string
): Promise<string> => {
  try {
    console.log('Processing transaction for:', walletType, { amount, walletAddress });
    
    if (!provider) {
      throw new Error('Wallet provider is not available');
    }
    
    if (!walletAddress) {
      throw new Error('Wallet address is not available');
    }
    
    // Validate transaction amount 
    if (amount <= 0) {
      throw new Error('Invalid donation amount. Amount must be greater than 0.');
    }
    
    // Process transaction based on wallet type
    switch (walletType) {
      case 'Phantom':
        if (!provider.publicKey) {
          throw new Error('Phantom wallet not properly connected. Please reconnect your wallet.');
        }
        console.log('Sending transaction via Phantom wallet...');
        console.log('Phantom provider details:', { 
          publicKey: provider.publicKey.toString(),
          isConnected: provider.isConnected,
          hasSignAndSendTransaction: !!provider.signAndSendTransaction,
          hasSignTransaction: !!provider.signTransaction 
        });
        return await sendPhantomTransaction(provider, amount, walletAddress);
        
      case 'Solflare':
        if (!provider.publicKey) {
          throw new Error('Solflare wallet not properly connected. Please reconnect your wallet.');
        }
        console.log('Sending transaction via Solflare wallet...');
        console.log('Solflare provider details:', { 
          publicKey: provider.publicKey.toString(),
          isConnected: provider.isConnected,
          hasSignAndSendTransaction: !!provider.signAndSendTransaction,
          hasSignTransaction: !!provider.signTransaction 
        });
        return await sendSolflareTransaction(provider, amount, walletAddress);
        
      case 'OKX':
        if (!provider.solana?.publicKey) {
          throw new Error('OKX wallet not properly connected. Please reconnect your wallet.');
        }
        console.log('Sending transaction via OKX wallet...');
        console.log('OKX provider details:', { 
          publicKey: provider.solana.publicKey.toString(),
          isConnected: provider.solana.isConnected,
          hasSignAndSendTransaction: !!provider.solana.signAndSendTransaction,
          hasSignTransaction: !!provider.solana.signTransaction 
        });
        return await sendOKXTransaction(provider, amount, walletAddress);
        
      default:
        throw new Error(`Unsupported wallet type: ${walletType}`);
    }
  } catch (err) {
    console.error("Error processing transaction:", err);
    // Display error toast to user
    toast({
      title: "Transaction Failed",
      description: err instanceof Error ? err.message : "Unknown error occurred during transaction",
      variant: "destructive",
    });
    throw err;
  }
};
