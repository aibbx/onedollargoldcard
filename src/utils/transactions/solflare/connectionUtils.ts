
import { Connection } from '@solana/web3.js';
import { toast } from "@/hooks/use-toast";

// Function to get a reliable connection to Solana
export const getConnection = (): Connection => {
  // Use a more reliable mainnet RPC endpoint
  const endpoint = "https://api.mainnet-beta.solana.com";
  console.log('Using official Solana RPC endpoint for Solflare transactions');
  
  return new Connection(endpoint, {
    commitment: 'confirmed',
    confirmTransactionInitialTimeout: 90000 // 90 seconds timeout
  });
};

// Get a backup connection
export const getBackupConnection = (): Connection => {
  // QuickNode RPC endpoint as backup
  const endpoint = "https://snowy-capable-night.solana-mainnet.quiknode.pro/72424723ee91618f3c3a7c1415e06e6f66ff1035/";
  console.log('Using QuickNode backup RPC endpoint for Solflare transactions');
  
  return new Connection(endpoint, {
    commitment: 'confirmed',
    confirmTransactionInitialTimeout: 90000 // 90 seconds timeout
  });
};

// Validate Solflare provider
export const validateProvider = (provider: any): any => {
  console.log('Validating Solflare provider:', provider);
  
  if (!provider) {
    toast({
      title: "Wallet Error",
      description: "Solflare wallet not detected. Please ensure you have the Solflare extension installed.",
      variant: "destructive",
    });
    throw new Error('Solflare wallet not properly connected');
  }
  
  if (!provider.publicKey) {
    toast({
      title: "Wallet Error",
      description: "Solflare wallet not properly connected. Please reconnect your wallet.",
      variant: "destructive",
    });
    throw new Error('Solflare wallet not properly connected (no public key)');
  }
  
  return provider;
};
