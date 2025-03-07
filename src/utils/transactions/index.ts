
// Add Buffer polyfill for browser compatibility
import { Buffer } from 'buffer';
// Make Buffer available globally
window.Buffer = Buffer;

import { WalletType } from '../../types/wallet';
import { sendPhantomTransaction } from './phantomTransactions';
import { sendSolflareTransaction } from './solflareTransactions';
import { sendOKXTransaction } from './okxTransactions';
import { toast } from "@/hooks/use-toast";

// Process transaction based on wallet type
export const processTransaction = async (
  walletType: WalletType,
  provider: any,
  amount: number,
  walletAddress: string
): Promise<string> => {
  try {
    console.log('Starting USDC transaction process:', { walletType, amount, walletAddress });
    console.log('Provider details:', { 
      hasProvider: !!provider,
      providerType: walletType,
      providerKeys: Object.keys(provider),
      solanaKeys: provider?.solana ? Object.keys(provider.solana) : [],
    });

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

    let transactionId: string;
    
    // Process transaction based on wallet type
    switch (walletType) {
      case 'Phantom':
        if (!provider.publicKey) {
          throw new Error('Phantom wallet not properly connected');
        }
        console.log('Sending USDC via Phantom:', {
          publicKey: provider.publicKey.toString(),
          isConnected: provider.isConnected,
          amount
        });
        transactionId = await sendPhantomTransaction(provider, amount, walletAddress);
        break;
        
      case 'Solflare':
        if (!provider.publicKey) {
          throw new Error('Solflare wallet not properly connected');
        }
        console.log('Sending USDC via Solflare:', {
          publicKey: provider.publicKey.toString(),
          isConnected: provider.isConnected,
          amount
        });
        transactionId = await sendSolflareTransaction(provider, amount, walletAddress);
        break;
        
      case 'OKX':
        if (!provider.solana?.publicKey) {
          throw new Error('OKX wallet not properly connected');
        }
        console.log('Sending USDC via OKX:', {
          publicKey: provider.solana.publicKey.toString(),
          isConnected: provider.solana.isConnected,
          amount
        });
        transactionId = await sendOKXTransaction(provider, amount, walletAddress);
        break;
        
      default:
        throw new Error(`Unsupported wallet type: ${walletType}`);
    }

    if (!transactionId) {
      throw new Error('Transaction failed - no transaction ID returned');
    }

    console.log('USDC Transaction completed successfully:', transactionId);
    return transactionId;

  } catch (err) {
    console.error("USDC Transaction processing error:", err);
    toast({
      title: "Transaction Failed",
      description: err instanceof Error ? err.message : "Unknown error occurred during transaction",
      variant: "destructive",
    });
    throw err;
  }
};
