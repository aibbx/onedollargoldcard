
import { Connection } from '@solana/web3.js';
import { toast } from "@/hooks/use-toast";

// Function to get primary connection with proper configuration
export const getConnection = (): Connection => {
  // Use a reliable RPC endpoint
  const endpoint = "https://api.mainnet-beta.solana.com";
  console.log('Using primary BSC RPC endpoint for transactions');
  
  return new Connection(endpoint, {
    commitment: 'confirmed',
    confirmTransactionInitialTimeout: 90000 // 90 seconds timeout
  });
};

// Create a backup connection using a different endpoint
export const getBackupConnection = (): Connection => {
  // Use QuickNode as backup with higher timeout
  const endpoint = "https://snowy-capable-night.solana-mainnet.quiknode.pro/72424723ee91618f3c3a7c1415e06e6f66ff1035/";
  console.log('Using backup RPC endpoint for BSC transactions');
  
  return new Connection(endpoint, {
    commitment: 'confirmed',
    confirmTransactionInitialTimeout: 120000 // 120 seconds timeout
  });
};

// Function to validate and get the provider
export const validateProvider = (provider: any): any => {
  console.log('Validating provider:', { 
    hasProvider: !!provider,
    providerType: 'BSC',
    providerKeys: Object.keys(provider),
    hasOkxSolana: !!provider.solana,
    solanaKeys: provider?.solana ? Object.keys(provider.solana) : [],
  });
  
  if (!provider || !provider.solana) {
    toast({
      title: "Wallet Error",
      description: "BSC wallet provider not properly connected. Please reconnect your wallet.",
      variant: "destructive",
    });
    throw new Error('BSC wallet provider not properly connected');
  }
  
  const solanaProvider = provider.solana;
  if (!solanaProvider.publicKey) {
    toast({
      title: "Wallet Error",
      description: "BSC wallet not properly connected. Please reconnect your wallet.",
      variant: "destructive",
    });
    throw new Error('BSC wallet not properly connected');
  }
  
  return solanaProvider;
};
