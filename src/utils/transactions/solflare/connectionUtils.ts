
import { Connection } from '@solana/web3.js';

// Function to get a reliable connection to Solana
export const getConnection = (): Connection => {
  // Use the provided QuickNode RPC endpoint
  const endpoint = "https://snowy-capable-night.solana-mainnet.quiknode.pro/72424723ee91618f3c3a7c1415e06e6f66ff1035/";
  console.log('Using QuickNode RPC endpoint for Solflare transactions');
  return new Connection(endpoint, {
    commitment: 'confirmed',
    confirmTransactionInitialTimeout: 120000 // 120 seconds timeout for better reliability
  });
};

// Validate Solflare provider
export const validateProvider = (provider: any): any => {
  if (!provider || !provider.publicKey) {
    throw new Error('Solflare wallet not properly connected');
  }
  return provider;
};
