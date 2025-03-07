// Import Buffer polyfill first to ensure it's available globally
import '../buffer-polyfill';

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
      const error = new Error('Wallet provider is not available');
      toast({
        title: "Wallet Error",
        description: "Your wallet is not properly connected. Please try reconnecting.",
        variant: "destructive",
      });
      throw error;
    }
    
    if (!walletAddress) {
      const error = new Error('Wallet address is not available');
      toast({
        title: "Wallet Error",
        description: "Could not find your wallet address. Please reconnect your wallet.",
        variant: "destructive",
      });
      throw error;
    }
    
    // Validate transaction amount 
    if (amount <= 0) {
      const error = new Error('Invalid donation amount. Amount must be greater than 0.');
      toast({
        title: "Invalid Amount",
        description: "Donation amount must be greater than 0 USDC.",
        variant: "destructive",
      });
      throw error;
    }

    let transactionId: string;
    
    // Show preparing toast
    toast({
      title: "Preparing Transaction",
      description: `Setting up your donation of ${amount.toFixed(2)} USDC using ${walletType} wallet...`,
    });
    
    // Process transaction based on wallet type
    switch (walletType) {
      case 'Phantom':
        if (!provider.publicKey) {
          const error = new Error('Phantom wallet not properly connected');
          toast({
            title: "Wallet Error",
            description: "Phantom wallet is not properly connected. Please try reconnecting.",
            variant: "destructive",
          });
          throw error;
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
          const error = new Error('Solflare wallet not properly connected');
          toast({
            title: "Wallet Error",
            description: "Solflare wallet is not properly connected. Please try reconnecting.",
            variant: "destructive",
          });
          throw error;
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
          const error = new Error('OKX wallet not properly connected');
          toast({
            title: "Wallet Error",
            description: "OKX wallet is not properly connected. Please try reconnecting.",
            variant: "destructive",
          });
          throw error;
        }
        console.log('Sending USDC via OKX:', {
          publicKey: provider.solana.publicKey.toString(),
          isConnected: provider.solana.isConnected,
          amount
        });
        transactionId = await sendOKXTransaction(provider, amount, walletAddress);
        break;
        
      default:
        const error = new Error(`Unsupported wallet type: ${walletType}`);
        toast({
          title: "Unsupported Wallet",
          description: `${walletType} wallet is not supported for donations.`,
          variant: "destructive",
        });
        throw error;
    }

    if (!transactionId) {
      const error = new Error('Transaction failed - no transaction ID returned');
      toast({
        title: "Transaction Failed",
        description: "The transaction could not be completed. Please try again.",
        variant: "destructive",
      });
      throw error;
    }

    console.log('USDC Transaction completed successfully:', transactionId);
    return transactionId;

  } catch (err) {
    console.error("USDC Transaction processing error:", err);
    
    // Only show toast if not already shown in wallet-specific methods
    if (!err.message?.includes("already shown")) {
      toast({
        title: "Transaction Failed",
        description: err instanceof Error ? err.message : "Unknown error occurred during transaction",
        variant: "destructive",
      });
    }
    
    throw err;
  }
};
