
import { WalletType } from '../../types/wallet';
import { generateMockAddress } from '../walletUtils';

// Connect to Solflare wallet
export const connectSolflareWallet = async (): Promise<{ 
  address: string; 
  provider: any;
}> => {
  if (typeof window === 'undefined' || !window.solflare) {
    throw new Error('Solflare wallet not installed');
  }
  
  const provider = window.solflare;
  
  // Request connection to the wallet
  await provider.connect();
  const address = provider.publicKey?.toString();
  
  if (!address) {
    throw new Error('No public key found after connection');
  }
  
  return {
    address,
    provider
  };
};

// Auto-connect to Solflare wallet if already connected
export const autoConnectSolflareWallet = async (): Promise<{ 
  address: string; 
  provider: any;
} | null> => {
  if (typeof window === 'undefined' || !window.solflare) {
    return null;
  }
  
  const provider = window.solflare;
  if (provider.isConnected) {
    const address = provider.publicKey?.toString() || '';
    if (address) {
      return {
        address,
        provider
      };
    }
  }
  
  // If not already connected, try explicit connect
  try {
    return await connectSolflareWallet();
  } catch (error) {
    console.error('Error auto-connecting to Solflare:', error);
    return null;
  }
};

// Disconnect from Solflare wallet
export const disconnectSolflareWallet = (): void => {
  if (typeof window !== 'undefined' && window.solflare) {
    try {
      window.solflare.disconnect();
    } catch (err) {
      console.error('Error disconnecting Solflare wallet:', err);
    }
  }
};
