
import { WalletType } from '../../types/wallet';
import { generateMockAddress } from '../walletUtils';

import { 
  connectPhantomWallet, 
  autoConnectPhantomWallet, 
  disconnectPhantomWallet 
} from './phantomConnector';

import { 
  connectSolflareWallet, 
  autoConnectSolflareWallet, 
  disconnectSolflareWallet 
} from './solflareConnector';

import { 
  connectOKXWallet, 
  autoConnectOKXWallet, 
  disconnectOKXWallet 
} from './okxConnector';

import { 
  connectMetaMaskWallet, 
  autoConnectMetaMaskWallet, 
  disconnectMetaMaskWallet 
} from './metamaskConnector';

// Connect to a wallet based on the given type
export const connectWallet = async (type: WalletType): Promise<{ 
  address: string; 
  provider: any;
}> => {
  switch (type) {
    case 'Phantom':
      return connectPhantomWallet();
    case 'Solflare':
      return connectSolflareWallet();
    case 'OKX':
      return connectOKXWallet();
    case 'MetaMask':
      return connectMetaMaskWallet();
    default:
      // Fallback for testing or if a non-supported wallet type is passed
      const mockAddress = generateMockAddress(type);
      return {
        address: mockAddress,
        provider: null
      };
  }
};

// Auto-connect to a wallet based on the given type
export const autoConnectWallet = async (type: WalletType): Promise<{ 
  address: string; 
  provider: any;
} | null> => {
  try {
    switch (type) {
      case 'Phantom':
        return await autoConnectPhantomWallet();
      case 'Solflare':
        return await autoConnectSolflareWallet();
      case 'OKX':
        return await autoConnectOKXWallet();
      case 'MetaMask':
        return await autoConnectMetaMaskWallet();
      default:
        // Fallback for testing or if a non-supported wallet type is passed
        const mockAddress = generateMockAddress(type);
        return {
          address: mockAddress,
          provider: null
        };
    }
  } catch (error) {
    console.error('Error auto-connecting wallet:', error);
    return null;
  }
};

// Disconnect from a wallet based on the given type
export const disconnectWallet = (type: WalletType): void => {
  switch (type) {
    case 'Phantom':
      disconnectPhantomWallet();
      break;
    case 'Solflare':
      disconnectSolflareWallet();
      break;
    case 'OKX':
      disconnectOKXWallet();
      break;
    case 'MetaMask':
      disconnectMetaMaskWallet();
      break;
    default:
      // No action needed for mock wallets
      break;
  }
};
