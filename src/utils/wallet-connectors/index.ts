
import { WalletType } from '../../types/wallet';
import { NetworkType } from '../../hooks/useWalletConnectors';

// Connect to a wallet based on the given type
export const connectWallet = async (type: WalletType, network: NetworkType = 'mainnet-beta'): Promise<{ 
  address: string; 
  provider: any;
}> => {
  switch (type) {
    case 'MetaMask':
      return connectMetaMaskWallet();
    case 'OKX':
      return connectOKXWallet();
    case 'Binance':
      return connectBinanceWallet();
    case 'Bitget':
      return connectBitgetWallet();
    default:
      throw new Error(`Unsupported wallet type: ${type}`);
  }
};

// Auto-connect to a wallet based on the given type
export const autoConnectWallet = async (type: WalletType, network: NetworkType = 'mainnet-beta'): Promise<{ 
  address: string; 
  provider: any;
} | null> => {
  try {
    switch (type) {
      case 'MetaMask':
        return await autoConnectMetaMaskWallet();
      case 'OKX':
        return await autoConnectOKXWallet();
      case 'Binance':
        return await autoConnectBinanceWallet();
      case 'Bitget':
        return await autoConnectBitgetWallet();
      default:
        throw new Error(`Unsupported wallet type: ${type}`);
    }
  } catch (error) {
    console.error('Error auto-connecting wallet:', error);
    return null;
  }
};

// Disconnect from a wallet based on the given type
export const disconnectWallet = (type: WalletType): void => {
  switch (type) {
    case 'MetaMask':
      disconnectMetaMaskWallet();
      break;
    case 'OKX':
      disconnectOKXWallet();
      break;
    case 'Binance':
      disconnectBinanceWallet();
      break;
    case 'Bitget':
      disconnectBitgetWallet();
      break;
    default:
      console.warn(`No disconnect handler for wallet type: ${type}`);
      break;
  }
};

// MetaMask wallet functions
const connectMetaMaskWallet = async (): Promise<{ address: string; provider: any }> => {
  if (typeof window === 'undefined' || !window.ethereum || !window.ethereum.isMetaMask) {
    throw new Error('MetaMask wallet not installed');
  }
  
  const provider = window.ethereum;
  
  // Request accounts
  const accounts = await provider.request({ method: 'eth_requestAccounts' });
  const address = accounts[0];
  
  console.log('Connected to MetaMask wallet, address:', address);
  
  return {
    address,
    provider
  };
};

const autoConnectMetaMaskWallet = async (): Promise<{ address: string; provider: any } | null> => {
  if (typeof window === 'undefined' || !window.ethereum || !window.ethereum.isMetaMask) {
    return null;
  }
  
  const provider = window.ethereum;
  
  try {
    const accounts = await provider.request({ method: 'eth_accounts' });
    if (accounts && accounts.length > 0) {
      const address = accounts[0];
      console.log('Auto-connected to MetaMask wallet, address:', address);
      return {
        address,
        provider
      };
    }
  } catch (error) {
    console.error('Error getting MetaMask accounts:', error);
  }
  
  return null;
};

const disconnectMetaMaskWallet = (): void => {
  console.log('MetaMask disconnected');
};

// OKX wallet functions
const connectOKXWallet = async (): Promise<{ address: string; provider: any }> => {
  if (typeof window === 'undefined' || !window.okxwallet || !window.okxwallet.ethereum) {
    throw new Error('OKX wallet not installed');
  }
  
  const provider = window.okxwallet.ethereum;
  
  const accounts = await provider.request({ method: 'eth_requestAccounts' });
  const address = accounts[0];
  
  console.log('Connected to OKX wallet, address:', address);
  
  return {
    address,
    provider
  };
};

const autoConnectOKXWallet = async (): Promise<{ address: string; provider: any } | null> => {
  if (typeof window === 'undefined' || !window.okxwallet || !window.okxwallet.ethereum) {
    return null;
  }
  
  const provider = window.okxwallet.ethereum;
  
  try {
    const accounts = await provider.request({ method: 'eth_accounts' });
    if (accounts && accounts.length > 0) {
      const address = accounts[0];
      console.log('Auto-connected to OKX wallet, address:', address);
      return {
        address,
        provider
      };
    }
  } catch (error) {
    console.error('Error getting OKX accounts:', error);
  }
  
  return null;
};

const disconnectOKXWallet = (): void => {
  console.log('OKX wallet disconnected');
};

// Binance wallet functions
const connectBinanceWallet = async (): Promise<{ address: string; provider: any }> => {
  if (typeof window === 'undefined' || !window.BinanceChain) {
    throw new Error('Binance wallet not installed');
  }
  
  const provider = window.BinanceChain;
  
  const accounts = await provider.request({ method: 'eth_requestAccounts' });
  const address = accounts[0];
  
  console.log('Connected to Binance wallet, address:', address);
  
  return {
    address,
    provider
  };
};

const autoConnectBinanceWallet = async (): Promise<{ address: string; provider: any } | null> => {
  if (typeof window === 'undefined' || !window.BinanceChain) {
    return null;
  }
  
  const provider = window.BinanceChain;
  
  try {
    const accounts = await provider.request({ method: 'eth_accounts' });
    if (accounts && accounts.length > 0) {
      const address = accounts[0];
      console.log('Auto-connected to Binance wallet, address:', address);
      return {
        address,
        provider
      };
    }
  } catch (error) {
    console.error('Error getting Binance accounts:', error);
  }
  
  return null;
};

const disconnectBinanceWallet = (): void => {
  console.log('Binance wallet disconnected');
};

// Bitget wallet functions
const connectBitgetWallet = async (): Promise<{ address: string; provider: any }> => {
  if (typeof window === 'undefined' || !window.bitkeep || !window.bitkeep.ethereum) {
    throw new Error('Bitget wallet not installed');
  }
  
  const provider = window.bitkeep.ethereum;
  
  const accounts = await provider.request({ method: 'eth_requestAccounts' });
  const address = accounts[0];
  
  console.log('Connected to Bitget wallet, address:', address);
  
  return {
    address,
    provider
  };
};

const autoConnectBitgetWallet = async (): Promise<{ address: string; provider: any } | null> => {
  if (typeof window === 'undefined' || !window.bitkeep || !window.bitkeep.ethereum) {
    return null;
  }
  
  const provider = window.bitkeep.ethereum;
  
  try {
    const accounts = await provider.request({ method: 'eth_accounts' });
    if (accounts && accounts.length > 0) {
      const address = accounts[0];
      console.log('Auto-connected to Bitget wallet, address:', address);
      return {
        address,
        provider
      };
    }
  } catch (error) {
    console.error('Error getting Bitget accounts:', error);
  }
  
  return null;
};

const disconnectBitgetWallet = (): void => {
  console.log('Bitget wallet disconnected');
};
