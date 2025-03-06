
import { WalletType } from '../../types/wallet';
import { generateMockAddress } from '../walletUtils';

// Connect to Phantom wallet
export const connectPhantomWallet = async (): Promise<{ 
  address: string; 
  provider: any;
}> => {
  if (typeof window === 'undefined' || !window.solana) {
    throw new Error('Phantom wallet not installed');
  }
  
  const provider = window.solana;
  
  // Request connection to the wallet
  const response = await provider.connect();
  const address = response.publicKey.toString();
  
  return {
    address,
    provider
  };
};

// Auto-connect to Phantom wallet if already connected
export const autoConnectPhantomWallet = async (): Promise<{ 
  address: string; 
  provider: any;
} | null> => {
  if (typeof window === 'undefined' || !window.solana) {
    return null;
  }
  
  const provider = window.solana;
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
    return await connectPhantomWallet();
  } catch (error) {
    console.error('Error auto-connecting to Phantom:', error);
    return null;
  }
};

// Disconnect from Phantom wallet
export const disconnectPhantomWallet = (): void => {
  if (typeof window !== 'undefined' && window.solana) {
    try {
      window.solana.disconnect();
    } catch (err) {
      console.error('Error disconnecting Phantom wallet:', err);
    }
  }
};
