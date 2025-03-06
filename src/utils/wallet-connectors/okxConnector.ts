
import { WalletType } from '../../types/wallet';
import { generateMockAddress } from '../walletUtils';

// Connect to OKX wallet
export const connectOKXWallet = async (): Promise<{ 
  address: string; 
  provider: any;
}> => {
  if (typeof window === 'undefined' || !window.okxwallet || !window.okxwallet.solana) {
    throw new Error('OKX wallet not installed');
  }
  
  const provider = window.okxwallet.solana;
  
  // Request connection to the wallet
  const response = await provider.connect();
  const address = response.publicKey.toString();
  
  return {
    address,
    provider
  };
};

// Auto-connect to OKX wallet if already connected
export const autoConnectOKXWallet = async (): Promise<{ 
  address: string; 
  provider: any;
} | null> => {
  if (typeof window === 'undefined' || !window.okxwallet || !window.okxwallet.solana) {
    return null;
  }
  
  const provider = window.okxwallet.solana;
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
    return await connectOKXWallet();
  } catch (error) {
    console.error('Error auto-connecting to OKX:', error);
    return null;
  }
};

// Disconnect from OKX wallet
export const disconnectOKXWallet = (): void => {
  if (typeof window !== 'undefined' && window.okxwallet?.solana) {
    try {
      window.okxwallet.solana.disconnect();
    } catch (err) {
      console.error('Error disconnecting OKX wallet:', err);
    }
  }
};
