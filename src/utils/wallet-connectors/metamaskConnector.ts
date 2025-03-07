
import { WalletType } from '../../types/wallet';
import { generateMockAddress } from '../walletUtils';

// Connect to MetaMask wallet
export const connectMetaMaskWallet = async (): Promise<{ 
  address: string; 
  provider: any;
}> => {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('MetaMask wallet not installed');
  }
  
  const provider = window.ethereum;
  
  try {
    // Request connection to the wallet
    const accounts = await provider.request({ method: 'eth_requestAccounts' });
    
    if (!accounts || accounts.length === 0) {
      throw new Error('No accounts found');
    }
    
    return {
      address: accounts[0],
      provider
    };
  } catch (error) {
    console.error('MetaMask connection error:', error);
    throw error;
  }
};

// Auto-connect to MetaMask wallet if already connected
export const autoConnectMetaMaskWallet = async (): Promise<{ 
  address: string; 
  provider: any;
} | null> => {
  if (typeof window === 'undefined' || !window.ethereum) {
    return null;
  }
  
  const provider = window.ethereum;
  
  // Get the current accounts
  try {
    const accounts = await provider.request({ method: 'eth_accounts' });
    
    if (accounts && accounts.length > 0) {
      return {
        address: accounts[0],
        provider
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error auto-connecting to MetaMask:', error);
    return null;
  }
};

// MetaMask doesn't have a disconnect method in the same way as Solana wallets
// This is a no-op function for consistency
export const disconnectMetaMaskWallet = (): void => {
  // MetaMask doesn't support programmatic disconnection
  console.log('Note: MetaMask does not support programmatic disconnection');
};
