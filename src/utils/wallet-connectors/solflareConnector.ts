
import { WalletType } from '../../types/wallet';
import { NetworkType } from '../../hooks/useWalletConnectors';

// Connect to Solflare wallet
export const connectSolflareWallet = async (network: NetworkType = 'mainnet-beta'): Promise<{ 
  address: string; 
  provider: any;
}> => {
  if (typeof window === 'undefined' || !window.solflare) {
    throw new Error('Solflare wallet not installed');
  }
  
  const provider = window.solflare;
  
  console.log('Connecting to Solflare wallet with methods:', Object.keys(provider));
  
  // Set the network before connecting
  if (provider.setSolanaNetwork) {
    try {
      provider.setSolanaNetwork(network);
      console.log(`Switched to Solana ${network}`);
    } catch (error) {
      console.error('Error switching network:', error);
      // Continue anyway
    }
  }
  
  // Request connection to the wallet
  try {
    await provider.connect();
    
    if (!provider.publicKey) {
      throw new Error('No public key found after connection');
    }
    
    const address = provider.publicKey.toString();
    console.log(`Connected to Solflare wallet on ${network}, address:`, address);
    
    return {
      address,
      provider
    };
  } catch (error) {
    console.error('Error connecting to Solflare wallet:', error);
    throw new Error(`Failed to connect to Solflare wallet: ${error.message || 'Unknown error'}`);
  }
};

// Auto-connect to Solflare wallet if already connected
export const autoConnectSolflareWallet = async (network: NetworkType = 'mainnet-beta'): Promise<{ 
  address: string; 
  provider: any;
} | null> => {
  if (typeof window === 'undefined' || !window.solflare) {
    return null;
  }
  
  const provider = window.solflare;
  
  console.log('Auto-connecting to Solflare wallet with methods:', Object.keys(provider));
  
  // Try to set the network
  if (provider.setSolanaNetwork) {
    try {
      provider.setSolanaNetwork(network);
      console.log(`Switched to Solana ${network}`);
    } catch (error) {
      console.error('Error switching network:', error);
      // Continue anyway
    }
  }
  
  // Check if already connected
  try {
    if (provider.isConnected) {
      const address = provider.publicKey?.toString() || '';
      if (address) {
        console.log(`Solflare wallet already connected on ${network}, address:`, address);
        return {
          address,
          provider
        };
      }
    }
    
    // If not already connected, try explicit connect
    return await connectSolflareWallet(network);
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
      console.log('Disconnected from Solflare wallet');
    } catch (err) {
      console.error('Error disconnecting Solflare wallet:', err);
    }
  }
};
