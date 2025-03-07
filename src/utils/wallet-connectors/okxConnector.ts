
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
    const address = response.publicKey.toString();
    
    console.log(`Connected to OKX wallet on ${network}`);
    
    return {
      address,
      provider
    };
  } catch (error) {
    console.error('Error connecting to OKX wallet:', error);
    throw new Error(`Failed to connect to OKX wallet: ${error.message}`);
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
  try {
    if (provider.isConnected && provider.publicKey) {
      const address = provider.publicKey.toString();
      if (address) {
        console.log(`Auto-connected to OKX wallet: ${address.substring(0, 8)}...`);
        return {
          address,
          provider
        };
      }
    }
  } catch (error) {
    console.error('Error checking OKX connection status:', error);
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
