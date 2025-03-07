
import { WalletType } from '../../types/wallet';
import { NetworkType } from '../../hooks/useWalletConnectors';

// Connect to OKX wallet
export const connectOKXWallet = async (network: NetworkType = 'mainnet-beta'): Promise<{ 
  address: string; 
  provider: any;
}> => {
  if (typeof window === 'undefined' || !window.okxwallet || !window.okxwallet.solana) {
    throw new Error('OKX wallet not installed');
  }
  
  const provider = window.okxwallet.solana;
  
  console.log('Connecting to OKX wallet with methods:', Object.keys(provider));
  
  // Try to set the network
  try {
    if (provider.switchNetwork) {
      await provider.switchNetwork(network);
      console.log(`Switched to Solana ${network}`);
    }
  } catch (error) {
    console.error('Error switching network:', error);
    // Continue anyway
  }
  
  // Request connection to the wallet
  try {
    const response = await provider.connect();
    console.log('OKX connect response:', response);
    
    if (!response || !response.publicKey) {
      throw new Error('Failed to connect to OKX wallet: No public key returned');
    }
    
    const address = response.publicKey.toString();
    
    console.log(`Connected to OKX wallet on ${network}, address:`, address);
    
    return {
      address,
      provider: window.okxwallet // Return the full provider
    };
  } catch (error) {
    console.error('Error connecting to OKX wallet:', error);
    throw new Error(`Failed to connect to OKX wallet: ${error.message || 'Unknown error'}`);
  }
};

// Auto-connect to OKX wallet if already connected
export const autoConnectOKXWallet = async (network: NetworkType = 'mainnet-beta'): Promise<{ 
  address: string; 
  provider: any;
} | null> => {
  if (typeof window === 'undefined' || !window.okxwallet || !window.okxwallet.solana) {
    return null;
  }
  
  const provider = window.okxwallet.solana;
  
  console.log('Auto-connecting to OKX wallet with methods:', Object.keys(provider));
  
  // Try to set the network
  try {
    if (provider.switchNetwork) {
      await provider.switchNetwork(network);
      console.log(`Switched to Solana ${network}`);
    }
  } catch (error) {
    console.error('Error switching network:', error);
    // Continue anyway
  }
  
  // Check if already connected
  if (provider.isConnected) {
    const address = provider.publicKey?.toString() || '';
    if (address) {
      console.log(`OKX wallet already connected on ${network}, address:`, address);
      return {
        address,
        provider: window.okxwallet // Return the full provider
      };
    }
  }
  
  // If not already connected, try explicit connect
  try {
    return await connectOKXWallet(network);
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
      console.log('Disconnected from OKX wallet');
    } catch (err) {
      console.error('Error disconnecting OKX wallet:', err);
    }
  }
};
