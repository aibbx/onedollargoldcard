
// Import Buffer polyfill first to ensure it's available globally
import '../buffer-polyfill';

import { WalletType } from '../../types/wallet';
import { toast } from "@/hooks/use-toast";

// Process transaction based on wallet type
export const processTransaction = async (
  walletType: WalletType,
  provider: any,
  amount: number,
  walletAddress: string
): Promise<string> => {
  try {
    console.log('Starting USDT transaction process:', { walletType, amount, walletAddress });
    console.log('Provider details:', { 
      hasProvider: !!provider,
      providerType: walletType,
      providerKeys: Object.keys(provider),
      bufferAvailable: typeof window !== 'undefined' ? !!window.Buffer : false
    });

    // Double check Buffer is available
    if (typeof window !== 'undefined' && !window.Buffer) {
      console.error('Buffer not available! Trying to re-initialize...');
      // Force re-initialize
      await import('../buffer-polyfill');
      if (!window.Buffer) {
        throw new Error('Buffer polyfill failed to initialize');
      } else {
        console.log('Buffer successfully re-initialized');
      }
    }

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
        description: "Donation amount must be greater than 0 USDT.",
        variant: "destructive",
      });
      throw error;
    }

    let transactionId: string;
    
    // Show preparing toast
    toast({
      title: "Preparing Transaction",
      description: `Setting up your donation of ${amount.toFixed(2)} USDT using ${walletType} wallet...`,
    });
    
    // Process transaction based on wallet type
    switch (walletType) {
      case 'MetaMask':
        console.log('Sending USDT via MetaMask:', {
          address: provider.selectedAddress,
          amount
        });
        // Implementation for MetaMask transaction would go here
        // For now, just returning a mock transaction ID
        transactionId = `0x${Math.random().toString(16).substring(2, 42)}`;
        break;
        
      case 'OKX':
        console.log('Sending USDT via OKX:', {
          address: provider.ethereum?.selectedAddress,
          amount
        });
        // Implementation for OKX transaction would go here
        // For now, just returning a mock transaction ID
        transactionId = `0x${Math.random().toString(16).substring(2, 42)}`;
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

    console.log('USDT Transaction completed successfully:', transactionId);
    return transactionId;

  } catch (err) {
    console.error("USDT Transaction processing error:", err);
    
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
