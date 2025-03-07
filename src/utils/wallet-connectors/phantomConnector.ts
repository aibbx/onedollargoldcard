
import { WalletType } from '../../types/wallet';
import { NetworkType } from '../../hooks/useWalletConnectors';

// Connect to Phantom wallet
export const connectPhantomWallet = async (network: NetworkType = 'mainnet-beta'): Promise<{ 
  address: string; 
  provider: any;
}> => {
  if (typeof window === 'undefined' || !window.solana) {
    throw new Error('Phantom wallet not installed');
  }
  
  const provider = window.solana;
  
  // Set the network
  if (provider.isPhantom) {
    try {
      await provider.connect();
      // Switch to the specified network
      await provider.request({
        method: 'switchNetwork',
        params: { network }
      });
      console.log(`Switched to Solana ${network}`);
    } catch (error) {
      console.error('Error switching network:', error);
      // Continue anyway as we want to connect regardless
    }
  }
  
  // Request connection to the wallet
  const response = await provider.connect();
  const address = response.publicKey.toString();
  
  console.log(`Connected to Phantom wallet on ${network}`);
  
  return {
    address,
    provider
  };
};

// Auto-connect to Phantom wallet if already connected
export const autoConnectPhantomWallet = async (network: NetworkType = 'mainnet-beta'): Promise<{ 
  address: string; 
  provider: any;
} | null> => {
  if (typeof window === 'undefined' || !window.solana) {
    return null;
  }
  
  const provider = window.solana;
  
  // Try to switch to the specified network
  if (provider.isPhantom) {
    try {
      // Switch to the specified network
      await provider.request({
        method: 'switchNetwork',
        params: { network }
      });
      console.log(`Switched to Solana ${network}`);
    } catch (error) {
      console.error('Error switching network:', error);
      // Continue anyway
    }
  }
  
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
    return await connectPhantomWallet(network);
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
